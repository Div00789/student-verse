import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { supabaseServer, JWT_SECRET } from '@/lib/supabaseServer';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json([], { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '').trim();
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch {
      return NextResponse.json([], { status: 401 });
    }

    const userId = decoded.sub;

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

    const enrollments = (enrollmentsData || []).map((e: any) => {
      const courseObj = e.Course || coursesMap[e.courseId] || {};
      const slug = courseObj.slug || '';
      const title = courseObj.title || 'Course';
      return {
        id: e.id,
        courseId: e.courseId || courseObj.id,
        slug,
        title,
        subtitle: courseObj.subtitle || '',
        category: courseObj.category || 'Digital Marketing',
        durationHours: courseObj.durationHours || 48,
        thumbnailUrl: courseObj.thumbnailUrl || '',
        progressPct: typeof e.progressPct === 'number' ? e.progressPct : 0,
        isCompleted: Boolean(e.isCompleted),
        enrolledAt: e.enrolledAt,
        courseSlug: slug,
        courseTitle: title,
        course: {
          id: e.courseId || courseObj.id,
          slug,
          title,
          subtitle: courseObj.subtitle || '',
          durationHours: courseObj.durationHours || 48,
          category: courseObj.category || 'Digital Marketing',
          thumbnailUrl: courseObj.thumbnailUrl || '',
        },
      };
    });

    return NextResponse.json(enrollments);
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'Failed' }, { status: 500 });
  }
}
