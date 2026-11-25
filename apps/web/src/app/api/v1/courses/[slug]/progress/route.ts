import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@/lib/supabaseServer';
import { calculateStudentCourseProgress, saveStudentLessonProgress } from '@/lib/progressService';

export async function GET(
  req: NextRequest,
  { params }: { params?: { slug?: string } }
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
    const slug = params?.slug || req.nextUrl.searchParams.get('slug') || req.nextUrl.searchParams.get('courseSlug') || 'ai-digital-marketing-course';

    // Use centralized progress service
    const progress = await calculateStudentCourseProgress(userId, slug);

    return NextResponse.json({
      isEnrolled: progress.isEnrolled,
      enrollmentId: progress.enrollmentId,
      courseId: progress.courseId,
      courseSlug: progress.courseSlug,
      courseTitle: progress.courseTitle,
      completedLessonIds: progress.completedLessonIds,
      completedCount: progress.completedCount,
      completedLessons: progress.completedCount,
      totalLessons: progress.totalLessons,
      totalModules: progress.totalModules,
      progressPercentage: progress.progressPercentage,
      progressPct: progress.progressPercentage,
      isCompleted: progress.isCompleted,
      status: progress.status,
      lastAccessedLessonId: progress.lastAccessedLessonId,
      modules: progress.modules,
    });
  } catch (err: any) {
    return NextResponse.json({
      isEnrolled: false,
      completedLessonIds: [],
      progressPercentage: 0,
      progressPct: 0,
      completedCount: 0,
      totalLessons: 0,
      totalModules: 0,
      status: 'NOT_STARTED',
      error: err.message,
    });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params?: { slug?: string } }
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
    const body = await req.json().catch(() => ({}));
    const slug = params?.slug || req.nextUrl.searchParams.get('slug') || req.nextUrl.searchParams.get('courseSlug') || body?.courseSlug || 'ai-digital-marketing-course';
    const { lessonId, isCompleted, completionMethod } = body;

    if (!lessonId) {
      return NextResponse.json({ message: 'Lesson ID required' }, { status: 400 });
    }

    const progressResult = await saveStudentLessonProgress(userId, slug, lessonId, Boolean(isCompleted), completionMethod);

    return NextResponse.json({
      success: true,
      completed: Boolean(isCompleted),
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
