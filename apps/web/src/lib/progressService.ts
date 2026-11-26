import { supabaseServer } from '@/lib/supabaseServer';
import { resolveToDbLessonId, resolveToFrontendLessonCode } from '@/lib/lessonMapping';

export interface ModuleProgressItem {
  id: string;
  orderIndex: number;
  title: string;
  totalLessons: number;
  completedLessons: number;
  progressPct: number;
  isCompleted: boolean;
}

export interface CourseProgressResult {
  isEnrolled: boolean;
  enrollmentId: string | null;
  courseId: string;
  courseSlug: string;
  courseTitle: string;
  completedLessonIds: string[]; // List of both canonical codes ('l-1-1') and UUIDs for reliable frontend matching
  completedCount: number;
  totalLessons: number;
  totalModules: number;
  progressPercentage: number;
  progressPct: number;
  isCompleted: boolean;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
  lastAccessedLessonId?: string | null;
  modules?: ModuleProgressItem[];
}

/**
 * Universal authoritative progress calculation engine.
 * Dynamically queries modules and lessons from PostgreSQL belonging to courseId,
 * counts strictly distinct completed lessons where isCompleted = true for the authenticated student,
 * prevents cross-course leakage, computes accurate module & course percentages,
 * synchronizes PostgreSQL Enrollment records, and guarantees 100% only when all lessons are completed.
 */
export async function calculateStudentCourseProgress(
  userId: string,
  courseSlug: string
): Promise<CourseProgressResult> {
  // 1. Fetch course identity
  const { data: course } = await supabaseServer
    .from('Course')
    .select('id, slug, title')
    .eq('slug', courseSlug)
    .maybeSingle();

  if (!course) {
    return {
      isEnrolled: false,
      enrollmentId: null,
      courseId: '',
      courseSlug,
      courseTitle: '',
      completedLessonIds: [],
      completedCount: 0,
      totalLessons: 0,
      totalModules: 0,
      progressPercentage: 0,
      progressPct: 0,
      isCompleted: false,
      status: 'NOT_STARTED',
      modules: [],
    };
  }

  // 2. Query all modules and lessons belonging STRICTLY to this course
  const { data: modulesData } = await supabaseServer
    .from('CourseModule')
    .select(`
      id,
      title,
      orderIndex,
      Lesson (
        id,
        title,
        orderIndex,
        contentType
      )
    `)
    .eq('courseId', course.id)
    .order('orderIndex');

  const modules = modulesData || [];
  const courseLessons: Array<{ id: string; moduleId: string; orderIndex: number; modOrder: number; code: string }> = [];

  modules.forEach((mod: any, mIdx: number) => {
    const modOrder = mod.orderIndex || mIdx + 1;
    const lessons = (mod.Lesson || []).sort((a: any, b: any) => a.orderIndex - b.orderIndex);
    lessons.forEach((l: any, lIdx: number) => {
      const lessonOrder = l.orderIndex || lIdx + 1;
      const code = `l-${modOrder}-${lessonOrder}`;
      courseLessons.push({
        id: l.id,
        moduleId: mod.id,
        orderIndex: lessonOrder,
        modOrder,
        code,
      });
    });
  });

  const totalLessons = courseLessons.length;
  const totalModules = modules.length;

  // Set of valid lesson UUIDs and canonical codes for this course
  const validDbLessonIds = new Set(courseLessons.map((l) => l.id));
  const validCodes = new Set(courseLessons.map((l) => l.code));
  const dbIdToCode = new Map<string, string>();
  const codeToDbId = new Map<string, string>();
  courseLessons.forEach((l) => {
    dbIdToCode.set(l.id, l.code);
    codeToDbId.set(l.code, l.id);
  });

  // 3. Query enrollment for authenticated student
  const { data: enrollment } = await supabaseServer
    .from('Enrollment')
    .select('id, progressPct, isCompleted, completedAt')
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
      totalLessons,
      totalModules,
      progressPercentage: 0,
      progressPct: 0,
      isCompleted: false,
      status: 'NOT_STARTED',
      modules: modules.map((m: any) => ({
        id: m.id,
        orderIndex: m.orderIndex,
        title: m.title,
        totalLessons: m.Lesson?.length || 0,
        completedLessons: 0,
        progressPct: 0,
        isCompleted: false,
      })),
    };
  }

  // 4. Query authenticated student's completion records for this enrollment
  const { data: progressRecords } = await supabaseServer
    .from('LessonProgress')
    .select('id, lessonId, isCompleted, updatedAt')
    .eq('enrollmentId', enrollment.id)
    .eq('isCompleted', true)
    .order('updatedAt', { ascending: false });

  // Filter STRICTLY to lessons that belong to this course (prevents cross-course leakage)
  const completedCanonicalCodes = new Set<string>();
  const completedDbIds = new Set<string>();
  let lastAccessedLessonId: string | null = null;

  (progressRecords || []).forEach((p: any) => {
    let resolvedCode: string | null = null;
    let resolvedDbId: string | null = null;

    if (validDbLessonIds.has(p.lessonId)) {
      resolvedDbId = p.lessonId;
      resolvedCode = dbIdToCode.get(p.lessonId) || null;
    } else if (validCodes.has(p.lessonId)) {
      resolvedCode = p.lessonId;
      resolvedDbId = codeToDbId.get(p.lessonId) || null;
    } else {
      // Legacy AI course fallback mapping if applicable
      const legacyCode = resolveToFrontendLessonCode(p.lessonId);
      if (validCodes.has(legacyCode)) {
        resolvedCode = legacyCode;
        resolvedDbId = codeToDbId.get(legacyCode) || p.lessonId;
      }
    }

    if (resolvedCode && resolvedDbId) {
      completedCanonicalCodes.add(resolvedCode);
      completedDbIds.add(resolvedDbId);
      if (!lastAccessedLessonId) {
        lastAccessedLessonId = resolvedCode;
      }
    }
  });

  const completedCount = Math.min(completedCanonicalCodes.size, totalLessons);

  // Authoritative Formula: (Completed Lessons / Total Eligible Lessons in Enrolled Course) * 100
  // Rule: Show 100% ONLY when all required lessons are completed; prevent rounding to 100% on incomplete courses
  let progressPercentage = 0;
  if (totalLessons > 0) {
    if (completedCount >= totalLessons) {
      progressPercentage = 100;
    } else {
      const rawPct = (completedCount / totalLessons) * 100;
      // Round to 1 decimal place, capping strictly below 100% if incomplete
      progressPercentage = Math.min(99.9, Math.round(rawPct * 10) / 10);
    }
  }

  const isCompleted = totalLessons > 0 && completedCount === totalLessons;
  const status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' = isCompleted
    ? 'COMPLETED'
    : (completedCount > 0 ? 'IN_PROGRESS' : 'NOT_STARTED');

  // 5. Calculate module-level breakdown
  const moduleProgressList: ModuleProgressItem[] = modules.map((m: any, mIdx: number) => {
    const modOrder = m.orderIndex || mIdx + 1;
    const modLessons = (m.Lesson || []).sort((a: any, b: any) => a.orderIndex - b.orderIndex);
    const modTotal = modLessons.length;
    let modCompleted = 0;

    modLessons.forEach((l: any, lIdx: number) => {
      const code = `l-${modOrder}-${l.orderIndex || lIdx + 1}`;
      if (completedCanonicalCodes.has(code) || completedDbIds.has(l.id)) {
        modCompleted++;
      }
    });

    const modPct = modTotal > 0
      ? (modCompleted >= modTotal ? 100 : Math.min(99.9, Math.round((modCompleted / modTotal) * 1000) / 10))
      : 0;

    return {
      id: m.id,
      orderIndex: modOrder,
      title: m.title,
      totalLessons: modTotal,
      completedLessons: modCompleted,
      progressPct: modPct,
      isCompleted: modTotal > 0 && modCompleted >= modTotal,
    };
  });

  // 6. Reconcile Enrollment table in PostgreSQL if stale
  if (enrollment.progressPct !== progressPercentage || enrollment.isCompleted !== isCompleted) {
    const now = new Date().toISOString();
    await supabaseServer
      .from('Enrollment')
      .update({
        progressPct: progressPercentage,
        isCompleted,
        completedAt: isCompleted ? (enrollment.completedAt || now) : null,
        updatedAt: now,
      })
      .eq('id', enrollment.id);
  }

  // Combined list of both codes (e.g. 'l-1-1') and UUIDs for seamless UI checkboxes
  const completedLessonIds = Array.from(new Set([
    ...Array.from(completedCanonicalCodes),
    ...Array.from(completedDbIds),
  ]));

  return {
    isEnrolled: true,
    enrollmentId: enrollment.id,
    courseId: course.id,
    courseSlug: course.slug,
    courseTitle: course.title,
    completedLessonIds,
    completedCount,
    totalLessons,
    totalModules,
    progressPercentage,
    progressPct: progressPercentage,
    isCompleted,
    status,
    lastAccessedLessonId: lastAccessedLessonId || (courseLessons[0]?.code ?? null),
    modules: moduleProgressList,
  };
}

/**
 * Universal authoritative function to record or update a student's lesson completion state.
 * Validates authentication, enrollment, and verifies lesson belongs strictly to the enrolled course.
 */
export async function saveStudentLessonProgress(
  userId: string,
  courseSlug: string,
  lessonId: string,
  isCompleted: boolean,
  completionMethod?: string
): Promise<CourseProgressResult> {
  const { data: course } = await supabaseServer
    .from('Course')
    .select('id, slug, title')
    .eq('slug', courseSlug)
    .maybeSingle();

  if (!course) {
    throw new Error('Course not found');
  }

  // 1. Get or create enrollment
  let { data: enrollment } = await supabaseServer
    .from('Enrollment')
    .select('id')
    .eq('userId', userId)
    .eq('courseId', course.id)
    .maybeSingle();

  if (!enrollment) {
    throw new Error('Unauthorized: User must be enrolled in this course to save progress.');
  }

  // 2. Fetch all valid lessons for this course
  const { data: modulesData } = await supabaseServer
    .from('CourseModule')
    .select(`
      id,
      orderIndex,
      Lesson (
        id,
        orderIndex
      )
    `)
    .eq('courseId', course.id);

  const courseLessons: Array<{ id: string; code: string }> = [];
  (modulesData || []).forEach((mod: any) => {
    (mod.Lesson || []).forEach((l: any) => {
      courseLessons.push({
        id: l.id,
        code: `l-${mod.orderIndex}-${l.orderIndex}`,
      });
    });
  });

  // Match target lesson
  let targetLesson = courseLessons.find(
    (l) => l.id === lessonId || l.code === lessonId
  );

  // If not found directly, try legacy mapping
  if (!targetLesson) {
    const legacyDbId = resolveToDbLessonId(lessonId);
    const legacyCode = resolveToFrontendLessonCode(lessonId);
    targetLesson = courseLessons.find(
      (l) => l.id === legacyDbId || l.code === legacyCode
    );
  }

  if (!targetLesson) {
    throw new Error(`Lesson ${lessonId} does not belong to course ${courseSlug}`);
  }

  const targetDbLessonId = targetLesson.id;
  const targetCode = targetLesson.code;

  // 3. Upsert LessonProgress row
  const { data: existingProgress } = await supabaseServer
    .from('LessonProgress')
    .select('id')
    .eq('enrollmentId', enrollment.id)
    .or(`lessonId.eq.${targetDbLessonId},lessonId.eq.${targetCode}`)
    .maybeSingle();

  const now = new Date().toISOString();
  const markComplete = Boolean(isCompleted);
  const resolvedMethod = markComplete ? (completionMethod || 'MANUAL_CHECKBOX') : null;

  if (existingProgress) {
    await supabaseServer
      .from('LessonProgress')
      .update({
        isCompleted: markComplete,
        status: markComplete ? 'COMPLETED' : 'NOT_STARTED',
        completionMethod: resolvedMethod,
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
      completionMethod: resolvedMethod,
      completedAt: markComplete ? now : null,
      startedAt: now,
      createdAt: now,
      updatedAt: now,
    });
  }

  return calculateStudentCourseProgress(userId, courseSlug);
}
