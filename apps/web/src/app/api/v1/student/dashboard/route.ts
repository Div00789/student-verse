import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { supabaseServer, JWT_SECRET } from '@/lib/supabaseServer';

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

    // Query enrollments with course details
    const { data: enrollmentsData, error } = await supabaseServer
      .from('Enrollment')
      .select(`
        id,
        progressPct,
        isCompleted,
        enrolledAt,
        course:Course (
          id,
          slug,
          title,
          category,
          thumbnailUrl
        )
      `)
      .eq('userId', userId);

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    const enrollments = (enrollmentsData || []).map((e: any) => ({
      id: e.id,
      courseId: e.course?.id,
      courseTitle: e.course?.title || 'Course',
      courseSlug: e.course?.slug || '',
      category: e.course?.category || 'General',
      thumbnailUrl: e.course?.thumbnailUrl || '',
      progressPct: e.progressPct || 0,
      isCompleted: e.isCompleted || false,
      enrolledAt: e.enrolledAt,
    }));

    return NextResponse.json({
      enrolledCourseCount: enrollments.length,
      activeCohortCount: enrollments.length > 0 ? 1 : 0,
      enrollments,
      nextLiveClass: null,
      overallSkillScore: null,
      assessmentStatus: 'NOT_ASSESSED',
      placementStatus: 'NOT_ASSESSED',
      activePlacementTrackCount: 0,
      assignments: [],
      certificates: [],
      skillRatings: [],
      talentPoolOptIn: false,
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'Failed' }, { status: 500 });
  }
}
