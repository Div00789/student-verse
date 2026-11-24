import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { supabaseServer, JWT_SECRET } from '@/lib/supabaseServer';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ completedLessonIds: [], progressPercentage: 0 });
    }

    const token = authHeader.replace('Bearer ', '').trim();
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch {
      return NextResponse.json({ completedLessonIds: [], progressPercentage: 0 });
    }

    const userId = decoded.sub;
    const { slug } = params;

    const { data: course } = await supabaseServer
      .from('Course')
      .select('id')
      .eq('slug', slug)
      .maybeSingle();

    if (!course) {
      return NextResponse.json({ completedLessonIds: [], progressPercentage: 0 });
    }

    const { data: enrollment } = await supabaseServer
      .from('Enrollment')
      .select('id, progressPct')
      .eq('userId', userId)
      .eq('courseId', course.id)
      .maybeSingle();

    if (!enrollment) {
      return NextResponse.json({ completedLessonIds: [], progressPercentage: 0 });
    }

    const { data: progressRecords } = await supabaseServer
      .from('LessonProgress')
      .select('lessonId')
      .eq('enrollmentId', enrollment.id)
      .eq('isCompleted', true);

    const completedLessonIds = progressRecords ? progressRecords.map((p: any) => p.lessonId) : [];

    return NextResponse.json({
      completedLessonIds,
      progressPercentage: enrollment.progressPct || 0,
    });
  } catch {
    return NextResponse.json({ completedLessonIds: [], progressPercentage: 0 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '').trim();
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    const userId = decoded.sub;
    const { slug } = params;
    const { lessonId, isCompleted, totalLessons } = await req.json();

    const { data: course } = await supabaseServer
      .from('Course')
      .select('id')
      .eq('slug', slug)
      .maybeSingle();

    if (!course) {
      return NextResponse.json({ message: 'Course not found' }, { status: 404 });
    }

    // Get or create enrollment
    let { data: enrollment } = await supabaseServer
      .from('Enrollment')
      .select('id')
      .eq('userId', userId)
      .eq('courseId', course.id)
      .maybeSingle();

    if (!enrollment) {
      const newEnrollmentId = crypto.randomUUID();
      await supabaseServer.from('Enrollment').insert({
        id: newEnrollmentId,
        userId,
        courseId: course.id,
        progressPct: 0,
        isCompleted: false,
      });
      enrollment = { id: newEnrollmentId };
    }

    // Upsert lesson progress
    const { data: existingProgress } = await supabaseServer
      .from('LessonProgress')
      .select('id')
      .eq('enrollmentId', enrollment.id)
      .eq('lessonId', lessonId)
      .maybeSingle();

    if (existingProgress) {
      await supabaseServer
        .from('LessonProgress')
        .update({ isCompleted, completedAt: isCompleted ? new Date().toISOString() : null })
        .eq('id', existingProgress.id);
    } else {
      await supabaseServer.from('LessonProgress').insert({
        id: crypto.randomUUID(),
        enrollmentId: enrollment.id,
        lessonId,
        isCompleted,
        completedAt: isCompleted ? new Date().toISOString() : null,
      });
    }

    // Recalculate progress
    const { data: completedRecords } = await supabaseServer
      .from('LessonProgress')
      .select('lessonId')
      .eq('enrollmentId', enrollment.id)
      .eq('isCompleted', true);

    const completedLessonIds = completedRecords ? completedRecords.map((r: any) => r.lessonId) : [];
    const count = completedLessonIds.length;
    const total = totalLessons || 41;
    const progressPercentage = Math.min(100, Math.round((count / total) * 100));

    await supabaseServer
      .from('Enrollment')
      .update({ progressPct: progressPercentage, isCompleted: progressPercentage >= 100 })
      .eq('id', enrollment.id);

    return NextResponse.json({
      success: true,
      completedLessonIds,
      progressPercentage,
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'Failed' }, { status: 500 });
  }
}
