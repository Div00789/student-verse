import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { supabaseServer, JWT_SECRET } from '@/lib/supabaseServer';
import { resolveToDbLessonId, resolveToFrontendLessonCode } from '@/lib/lessonMapping';
import { calculateStudentCourseProgress, COURSE_TOTAL_LESSONS } from '@/lib/progressService';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({
        isEnrolled: false,
        completedLessonIds: [],
        progressPercentage: 0,
        progressPct: 0,
        completedCount: 0,
        totalLessons: 41,
      });
    }

    const token = authHeader.replace('Bearer ', '').trim();
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch {
      return NextResponse.json({
        isEnrolled: false,
        completedLessonIds: [],
        progressPercentage: 0,
        progressPct: 0,
        completedCount: 0,
        totalLessons: 41,
      });
    }

    const userId = decoded.sub;
    const { slug } = params;

    // Use centralized progress service
    const progress = await calculateStudentCourseProgress(userId, slug);

    return NextResponse.json({
      isEnrolled: progress.isEnrolled,
      enrollmentId: progress.enrollmentId,
      courseId: progress.courseId,
      courseSlug: progress.courseSlug,
      completedLessonIds: progress.completedLessonIds,
      completedCount: progress.completedCount,
      completedLessons: progress.completedCount,
      totalLessons: progress.totalLessons,
      progressPercentage: progress.progressPercentage,
      progressPct: progress.progressPercentage,
      isCompleted: progress.isCompleted,
    });
  } catch (err: any) {
    return NextResponse.json({
      isEnrolled: false,
      completedLessonIds: [],
      progressPercentage: 0,
      progressPct: 0,
      completedCount: 0,
      totalLessons: 41,
      error: err.message,
    });
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
    const body = await req.json();
    const { lessonId, isCompleted, totalLessons: clientTotal } = body;

    if (!lessonId) {
      return NextResponse.json({ message: 'Lesson ID required' }, { status: 400 });
    }

    const { data: course } = await supabaseServer
      .from('Course')
      .select('id, slug')
      .eq('slug', slug)
      .maybeSingle();

    if (!course) {
      return NextResponse.json({ message: 'Course not found' }, { status: 404 });
    }

    // Get or create permanent enrollment
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

    // Canonicalize lessonId to match foreign key / UUID in Lesson table
    const targetDbLessonId = resolveToDbLessonId(lessonId);
    const targetFrontendCode = resolveToFrontendLessonCode(targetDbLessonId);

    // Check if progress row already exists under either targetDbLessonId or targetFrontendCode
    const { data: existingProgress } = await supabaseServer
      .from('LessonProgress')
      .select('id, lessonId')
      .eq('enrollmentId', enrollment.id)
      .or(`lessonId.eq.${targetDbLessonId},lessonId.eq.${targetFrontendCode}`)
      .maybeSingle();

    const now = new Date().toISOString();
    const markComplete = Boolean(isCompleted);

    if (existingProgress) {
      await supabaseServer
        .from('LessonProgress')
        .update({
          isCompleted: markComplete,
          status: markComplete ? 'COMPLETED' : 'NOT_STARTED',
          completedAt: markComplete ? now : null,
          updatedAt: now,
        })
        .eq('id', existingProgress.id);
    } else {
      await supabaseServer.from('LessonProgress').insert({
        id: crypto.randomUUID(),
        enrollmentId: enrollment.id,
        lessonId: targetDbLessonId,
        isCompleted: markComplete,
        status: markComplete ? 'COMPLETED' : 'NOT_STARTED',
        completedAt: markComplete ? now : null,
        startedAt: now,
        createdAt: now,
        updatedAt: now,
      });
    }

    // Calculate updated progress using the single centralized progress service
    const progressResult = await calculateStudentCourseProgress(userId, slug);

    return NextResponse.json({
      success: true,
      completed: markComplete,
      completedLessonIds: progressResult.completedLessonIds,
      completedCount: progressResult.completedCount,
      completedLessons: progressResult.completedCount,
      totalLessons: progressResult.totalLessons,
      progressPercentage: progressResult.progressPercentage,
      progressPct: progressResult.progressPercentage,
      courseProgress: progressResult.progressPercentage,
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'Failed to update progress' }, { status: 500 });
  }
}
