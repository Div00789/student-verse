import { supabaseServer } from '@/lib/supabaseServer';
import { resolveToDbLessonId, resolveToFrontendLessonCode } from '@/lib/lessonMapping';

// Fallback total published required lessons per course slug
export const COURSE_TOTAL_LESSONS: Record<string, number> = {
  'ai-digital-marketing-course': 41,
  'digital-marketing-foundations': 8,
  'seo-and-ai-search-optimization': 8,
  'paid-performance-google-meta-ads': 8,
  'analytics-ga4-google-tag-manager': 8,
  'social-media-marketing-strategy': 6,
  'ai-tools-for-digital-marketers': 8,
};

export interface CourseProgressResult {
  isEnrolled: boolean;
  enrollmentId: string | null;
  courseId: string;
  courseSlug: string;
  courseTitle: string;
  completedLessonIds: string[]; // Set of unique canonical frontend codes ONLY (e.g. ['l-1-1', 'l-1-2'])
  completedCount: number;
  totalLessons: number;
  progressPercentage: number;
  progressPct: number;
  isCompleted: boolean;
  lastAccessedLessonId?: string | null;
}

/**
 * Single authoritative source of truth for calculating course and enrollment progress.
 * Always dynamically counts distinct completed required lessons where isCompleted = true,
 * prevents duplicates by resolving to canonical frontend codes ('l-1-1'),
 * ensures completedCount <= totalLessons and progress <= 100%,
 * synchronizes Enrollment.progressPct in PostgreSQL, and formats to 1 decimal place.
 */
export async function calculateStudentCourseProgress(
  userId: string,
  courseSlug: string
): Promise<CourseProgressResult> {
  const { data: course } = await supabaseServer
    .from('Course')
    .select('id, slug, title')
    .eq('slug', courseSlug)
    .maybeSingle();

  const totalPublished = COURSE_TOTAL_LESSONS[courseSlug] || 41;

  if (!course) {
    return {
      isEnrolled: false,
      enrollmentId: null,
      courseId: '',
      courseSlug,
      courseTitle: '',
      completedLessonIds: [],
      completedCount: 0,
      totalLessons: totalPublished,
      progressPercentage: 0,
      progressPct: 0,
      isCompleted: false,
    };
  }

  const { data: enrollment } = await supabaseServer
    .from('Enrollment')
    .select('id, progressPct, isCompleted')
    .eq('userId', userId)
    .eq('courseId', course.id)
    .maybeSingle();

  if (!enrollment) {
    return {
      isEnrolled: false,
      enrollmentId: null,
      courseId: course.id,
      courseSlug: course.slug,
      courseTitle: course.title,
      completedLessonIds: [],
      completedCount: 0,
      totalLessons: totalPublished,
      progressPercentage: 0,
      progressPct: 0,
      isCompleted: false,
    };
  }

  // Authoritative query: fetch rows where isCompleted is true for this enrollment
  const { data: progressRecords } = await supabaseServer
    .from('LessonProgress')
    .select('lessonId')
    .eq('enrollmentId', enrollment.id)
    .eq('isCompleted', true);

  const rawLessonIds = progressRecords ? progressRecords.map((p: any) => p.lessonId) : [];

  // Deduplicate strictly to canonical frontend codes (e.g., 'l-1-1')
  // NEVER add both the code and the UUID to the array!
  const uniqueCanonicalCodes = new Set<string>();
  rawLessonIds.forEach((id: string) => {
    const canonicalCode = resolveToFrontendLessonCode(id);
    uniqueCanonicalCodes.add(canonicalCode);
  });

  const completedLessonIds = Array.from(uniqueCanonicalCodes);
  // Authoritative unique completed lesson count: strictly distinct lessons
  const completedCount = Math.min(completedLessonIds.length, totalPublished);

  // Authoritative Formula: (Unique Completed Required Lessons / Total Published Required Lessons) * 100
  // Round consistently to one decimal place
  const progressPercentage = totalPublished > 0
    ? Math.min(100, Math.round((completedCount / totalPublished) * 1000) / 10)
    : 0;

  // Reconcile and synchronize Enrollment table in PostgreSQL if stale
  if (enrollment.progressPct !== progressPercentage) {
    await supabaseServer
      .from('Enrollment')
      .update({
        progressPct: progressPercentage,
        isCompleted: progressPercentage >= 100,
        updatedAt: new Date().toISOString(),
      })
      .eq('id', enrollment.id);
  }

  return {
    isEnrolled: true,
    enrollmentId: enrollment.id,
    courseId: course.id,
    courseSlug: course.slug,
    courseTitle: course.title,
    completedLessonIds,
    completedCount,
    totalLessons: totalPublished,
    progressPercentage,
    progressPct: progressPercentage,
    isCompleted: progressPercentage >= 100,
  };
}

/**
 * Single authoritative service function to record or update a student's lesson completion state in PostgreSQL.
 * Inserts or updates LessonProgress, then synchronizes Course/Enrollment progress.
 */
export async function saveStudentLessonProgress(
  userId: string,
  courseSlug: string,
  lessonId: string,
  isCompleted: boolean
): Promise<CourseProgressResult> {
  const { data: course } = await supabaseServer
    .from('Course')
    .select('id, slug, title')
    .eq('slug', courseSlug)
    .maybeSingle();

  if (!course) {
    throw new Error('Course not found');
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

  return calculateStudentCourseProgress(userId, courseSlug);
}
