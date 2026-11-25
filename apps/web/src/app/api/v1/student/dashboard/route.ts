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

    // 1. Parallel Consolidated Query: Fetch enrollments with course details and learner profile concurrently
    const [enrollmentsRes, profileRes] = await Promise.all([
      supabaseServer
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
        .eq('userId', userId),
      supabaseServer
        .from('LearnerProfile')
        .select('visibility')
        .eq('userId', userId)
        .maybeSingle(),
    ]);

    if (enrollmentsRes.error) {
      return NextResponse.json({ message: enrollmentsRes.error.message }, { status: 500 });
    }

    const enrollmentsData = enrollmentsRes.data || [];
    const enrollmentIds = enrollmentsData.map((e: any) => e.id);

    // Fallback course detail lookup if join was empty
    const missingCourseIds = enrollmentsData
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

    // 2. Batch Query Lesson Progress for ALL user enrollments in a single database roundtrip
    const { data: lpData } = enrollmentIds.length > 0
      ? await supabaseServer
          .from('LessonProgress')
          .select('enrollmentId, lessonId, isCompleted, updatedAt')
          .in('enrollmentId', enrollmentIds)
          .eq('isCompleted', true)
          .order('updatedAt', { ascending: false })
      : { data: [] };

    const totalLessonsBySlug: Record<string, number> = {
      'ai-digital-marketing-course': 41,
      'digital-marketing-foundations': 8,
      'seo-and-ai-search-optimization': 8,
      'paid-performance-google-meta-ads': 8,
      'analytics-ga4-google-tag-manager': 8,
      'social-media-marketing-strategy': 8,
      'ai-tools-for-digital-marketers': 8,
    };

    const totalModulesBySlug: Record<string, number> = {
      'ai-digital-marketing-course': 14,
      'digital-marketing-foundations': 4,
      'seo-and-ai-search-optimization': 4,
      'paid-performance-google-meta-ads': 4,
      'analytics-ga4-google-tag-manager': 4,
      'social-media-marketing-strategy': 4,
      'ai-tools-for-digital-marketers': 4,
    };

    // 3. Assemble synchronized enrollment records
    const enrollments = enrollmentsData.map((e: any) => {
      const courseObj = e.Course || coursesMap[e.courseId] || {};
      const slug = courseObj.slug || 'ai-digital-marketing-course';
      const title = courseObj.title || 'Course';
      const subtitle = courseObj.subtitle || '100% Live Instructor-Led Cohort & Verified Skill Mastery';
      const durationHours = courseObj.durationHours || 30;
      const category = courseObj.category || 'Digital Skills & Career Track';
      const thumbnailUrl = courseObj.thumbnailUrl || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80';

      const progressRecords = (lpData || []).filter((lp: any) => lp.enrollmentId === e.id);
      const completedCount = progressRecords.length;
      const completedLessonIds = progressRecords.map((lp: any) => lp.lessonId);
      const lastAccessedLessonId = progressRecords[0]?.lessonId || null;

      const totalLessons = totalLessonsBySlug[slug] || 8;
      const totalModules = totalModulesBySlug[slug] || 4;

      let progressPercentage = typeof e.progressPct === 'number' && e.progressPct > 0 ? e.progressPct : 0;
      if (progressPercentage === 0 && completedCount > 0 && totalLessons > 0) {
        progressPercentage = completedCount >= totalLessons ? 100 : Math.min(99.9, Math.round((completedCount / totalLessons) * 1000) / 10);
      }

      const isCompleted = Boolean(e.isCompleted || progressPercentage >= 100);
      const status = isCompleted ? 'COMPLETED' : (completedCount > 0 ? 'IN_PROGRESS' : 'NOT_STARTED');

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
        totalModules,
        modulesCount: totalModules,
        totalLessons,
        completedLessons: completedCount,
        completedCount,
        completedLessonIds,
        progressPercentage,
        progressPct: progressPercentage,
        isCompleted,
        status,
        lastAccessedLessonId,
        enrolledAt: e.enrolledAt,
        course: {
          id: e.courseId || courseObj.id,
          slug,
          title,
          subtitle,
          durationHours,
          category,
          thumbnailUrl,
          totalModules,
          totalLessons,
        },
      };
    });

    const talentPoolOptIn = profileRes.data?.visibility === 'SEARCHABLE';

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
