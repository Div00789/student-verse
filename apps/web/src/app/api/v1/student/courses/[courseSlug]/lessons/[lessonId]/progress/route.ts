import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@/lib/supabaseServer';
import { saveStudentLessonProgress } from '@/lib/progressService';

export async function POST(
  req: NextRequest,
  { params }: { params: { courseSlug: string; lessonId: string } }
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
    const slug = params?.courseSlug || req.nextUrl.searchParams.get('courseSlug') || req.nextUrl.searchParams.get('slug') || body?.courseSlug || 'ai-digital-marketing-course';
    const lessonId = params?.lessonId || body?.lessonId;
    const isCompleted = body.isCompleted !== undefined ? Boolean(body.isCompleted) : (body.status === 'COMPLETED');
    const completionMethod = body?.completionMethod || (isCompleted ? 'MANUAL_CHECKBOX' : undefined);

    if (!lessonId) {
      return NextResponse.json({ message: 'Lesson ID required' }, { status: 400 });
    }

    const progressResult = await saveStudentLessonProgress(userId, slug, lessonId, isCompleted, completionMethod);

    return NextResponse.json({
      success: true,
      lessonId,
      slugId: slug,
      status: isCompleted ? 'COMPLETED' : 'NOT_STARTED',
      isCompleted,
      completedCount: progressResult.completedCount,
      completedLessons: progressResult.completedCount,
      totalLessons: progressResult.totalLessons,
      progressPct: progressResult.progressPercentage,
      progressPercentage: progressResult.progressPercentage,
      completedLessonIds: progressResult.completedLessonIds,
      completedAt: isCompleted ? new Date().toISOString() : null,
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'Failed to update lesson progress' }, { status: 500 });
  }
}
