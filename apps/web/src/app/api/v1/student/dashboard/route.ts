import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { supabaseServer, JWT_SECRET } from '@/lib/supabaseServer';
import { calculateStudentCourseProgress } from '@/lib/progressService';

export async function GET(req: NextRequest) {
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

    // 1. Query enrollments from Supabase
    const { data: enrollmentsData, error } = await supabaseServer
      .from('Enrollment')
      .select(`
        id,
        courseId,
        progressPct,
        isCompleted,
        enrolledAt,
        Course (
          id,
          slug,
          title,
          category,
          subtitle,
          durationHours,
          thumbnailUrl
        )
      `)
      .eq('userId', userId);

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    // Fallback course detail lookup if join was empty
    const missingCourseIds = (enrollmentsData || [])
      .filter((e: any) => !e.Course && e.courseId)
      .map((e: any) => e.courseId);

    let coursesMap: Record<string, any> = {};
    if (missingCourseIds.length > 0) {
      const { data: fallbackCourses } = await supabaseServer
        .from('Course')
        .select('id, slug, title, category, subtitle, durationHours, thumbnailUrl')
        .in('id', missingCourseIds);
      if (fallbackCourses) {
        for (const c of fallbackCourses) {
          coursesMap[c.id] = c;
        }
      }
    }

    // 2. Synchronize each enrollment with the single authoritative progress calculation
    const enrollments = await Promise.all(
      (enrollmentsData || []).map(async (e: any) => {
        const courseObj = e.Course || coursesMap[e.courseId] || {};
        const slug = courseObj.slug || 'ai-digital-marketing-course';
        const title = courseObj.title || 'Course';
        const subtitle = courseObj.subtitle || '100% Live Instructor-Led Cohort & Verified Skill Mastery';
        const durationHours = courseObj.durationHours || 30;
        const category = courseObj.category || 'Digital Skills & Career Track';
        const thumbnailUrl = courseObj.thumbnailUrl || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80';

        // Calculate genuine progress directly from actual database LessonProgress rows
        const progressResult = await calculateStudentCourseProgress(userId, slug);

        return {
          id: e.id,
          enrollmentId: e.id,
          courseId: e.courseId || courseObj.id,
          slug,
          courseSlug: slug,
          title,
          courseTitle: title,
          subtitle,
          durationHours,
          category,
          thumbnailUrl,
          totalModules: progressResult.totalModules,
          modulesCount: progressResult.totalModules,
          totalLessons: progressResult.totalLessons,
          completedLessons: progressResult.completedCount,
          completedCount: progressResult.completedCount,
          progressPercentage: progressResult.progressPercentage,
          progressPct: progressResult.progressPercentage,
          isCompleted: progressResult.isCompleted,
          status: progressResult.status,
          lastAccessedLessonId: progressResult.lastAccessedLessonId,
          modules: progressResult.modules,
          enrolledAt: e.enrolledAt,
          course: {
            id: e.courseId || courseObj.id,
            slug,
            title,
            subtitle,
            durationHours,
            category,
            thumbnailUrl,
            totalModules: progressResult.totalModules,
            totalLessons: progressResult.totalLessons,
          },
        };
      })
    );

    // Query student learner profile for talent pool discovery consent
    const { data: learnerProfile } = await supabaseServer
      .from('LearnerProfile')
      .select('visibility')
      .eq('userId', userId)
      .maybeSingle();

    const talentPoolOptIn = learnerProfile?.visibility === 'SEARCHABLE';

    return NextResponse.json({
      enrolledCourseCount: enrollments.length,
      activeCohortCount: enrollments.length > 0 ? 1 : 0,
      enrollments,
      nextLiveClass: enrollments.length > 0 ? {
        courseTitle: enrollments[0].title,
        sessionTitle: '1.1 Search Foundations, Indexation & Keyword Intelligence',
        scheduledAt: '2026-11-26T18:00:00Z',
        trainerName: 'StudentVerse Expert Faculty',
      } : null,
      overallSkillScore: enrollments.length > 0 ? 78 : null,
      assessmentStatus: enrollments.length > 0 ? 'PENDING' : 'NOT_ASSESSED',
      placementStatus: enrollments.length > 0 ? 'REQUIREMENTS_PENDING' : 'NOT_ASSESSED',
      activePlacementTrackCount: enrollments.length > 0 ? 1 : 0,
      assignments: [],
      certificates: [],
      skillRatings: [],
      talentPoolOptIn,
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'Failed' }, { status: 500 });
  }
}
