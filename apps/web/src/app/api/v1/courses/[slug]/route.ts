import { NextRequest, NextResponse } from 'next/server';
import { getCourseBySlug } from '@/lib/courseService';

export async function GET(
  req: NextRequest,
  { params }: { params?: { slug?: string } }
) {
  try {
    const slug = params?.slug || req.nextUrl.searchParams.get('slug') || 'ai-digital-marketing-course';
    const course = await getCourseBySlug(slug);

    if (!course) {
      return NextResponse.json({ message: 'Course not found' }, { status: 404 });
    }

    return NextResponse.json(course);
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'Failed to fetch course' }, { status: 500 });
  }
}
