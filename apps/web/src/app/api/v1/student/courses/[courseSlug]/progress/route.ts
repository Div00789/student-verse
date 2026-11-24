import { NextRequest, NextResponse } from 'next/server';
import { GET as coursesGetHandler } from '@/app/api/v1/courses/[slug]/progress/route';

export async function GET(
  req: NextRequest,
  { params }: { params: { courseSlug: string } }
) {
  return coursesGetHandler(req, { params: { slug: params.courseSlug } });
}
