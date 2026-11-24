import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { supabaseServer, JWT_SECRET } from '@/lib/supabaseServer';
import { resolveToDbLessonId, resolveToFrontendLessonCode } from '@/lib/lessonMapping';

// Fallback total published required lessons per course
const COURSE_TOTAL_LESSONS: Record<string, number> = {
  'ai-digital-marketing-course': 41,
  'digital-marketing-foundations': 8,
  'seo-and-ai-search-optimization': 8,
  'paid-performance-google-meta-ads': 8,
  'analytics-ga4-google-tag-manager': 8,
  'social-media-marketing-strategy': 6,
  'ai-tools-for-digital-marketers': 8,
};

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

    const { data: course } = await supabaseServer
      .from('Course')
      .select('id, slug')
      .eq('slug', slug)
      .maybeSingle();

    if (!course) {
      return NextResponse.json({
        isEnrolled: false,
        completedLessonIds: [],
        progressPercentage: 0,
        progressPct: 0,
        completedCount: 0,
        totalLessons: 41,
      });
    }

    const { data: enrollment } = await supabaseServer
      .from('Enrollment')
      .select('id, progressPct, isCompleted')
      .eq('userId', userId)
      .eq('courseId', course.id)
      .maybeSingle();

    if (!enrollment) {
      return NextResponse.json({
        isEnrolled: false,
        completedLessonIds: [],
        progressPercentage: 0,
        progressPct: 0,
        completedCount: 0,
        totalLessons: COURSE_TOTAL_LESSONS[slug] || 41,
      });
    }

    // Query permanent LessonProgress from PostgreSQL
    const { data: progressRecords } = await supabaseServer
      .from('LessonProgress')
      .select('lessonId, isCompleted')
      .eq('enrollmentId', enrollment.id)
      .eq('isCompleted', true);

    const rawLessonIds = progressRecords ? progressRecords.map((p: any) => p.lessonId) : [];

    // Return both canonical frontend codes and UUIDs so any matching logic succeeds
    const frontendCodes = new Set<string>();
    rawLessonIds.forEach((id: string) => {
      const code = resolveToFrontendLessonCode(id);
      frontendCodes.add(code);
      frontendCodes.add(id);
    });

    const uniqueCompletedCount = rawLessonIds.length;
    const totalLessons = COURSE_TOTAL_LESSONS[slug] || 41;
    const computedPct = totalLessons > 0
      ? Math.min(100, Math.round((uniqueCompletedCount / totalLessons) * 1000) / 10)
      : (enrollment.progressPct || 0);

    return NextResponse.json({
      isEnrolled: true,
      enrollmentId: enrollment.id,
      completedLessonIds: Array.from(frontendCodes),
      completedCount: uniqueCompletedCount,
      totalLessons,
      progressPercentage: computedPct,
      progressPct: computedPct,
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

    // Query all completed records for this enrollment to compute accurate total
    const { data: completedRecords } = await supabaseServer
      .from('LessonProgress')
      .select('lessonId')
      .eq('enrollmentId', enrollment.id)
      .eq('isCompleted', true);

    const completedLessonIdsSet = new Set<string>();
    (completedRecords || []).forEach((r: any) => {
      const code = resolveToFrontendLessonCode(r.lessonId);
      completedLessonIdsSet.add(code);
      completedLessonIdsSet.add(r.lessonId);
    });

    const uniqueCompletedCount = completedRecords ? completedRecords.length : 0;
    const total = clientTotal || COURSE_TOTAL_LESSONS[slug] || 41;
    const progressPercentage = Math.min(100, Math.round((uniqueCompletedCount / total) * 1000) / 10);

    // Update Enrollment table with verified progress
    await supabaseServer
      .from('Enrollment')
      .update({
        progressPct: progressPercentage,
        isCompleted: progressPercentage >= 100,
        updatedAt: now,
      })
      .eq('id', enrollment.id);

    return NextResponse.json({
      success: true,
      completed: markComplete,
      completedLessonIds: Array.from(completedLessonIdsSet),
      completedCount: uniqueCompletedCount,
      completedLessons: uniqueCompletedCount,
      totalLessons: total,
      progressPercentage,
      progressPct: progressPercentage,
      courseProgress: progressPercentage,
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'Failed to update progress' }, { status: 500 });
  }
}
