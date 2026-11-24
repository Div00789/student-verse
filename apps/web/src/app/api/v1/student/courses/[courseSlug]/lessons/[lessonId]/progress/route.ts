import { NextRequest, NextResponse } from 'next/server';
import { POST as coursesPostHandler } from '@/app/api/v1/courses/[slug]/progress/route';

export async function POST(
  req: NextRequest,
  { params }: { params: { courseSlug: string; lessonId: string } }
) {
  const body = await req.json().catch(() => ({}));
  const payload = {
    ...body,
    lessonId: params.lessonId || body.lessonId,
  };

  const clonedReq = new NextRequest(req.url, {
    method: 'POST',
    headers: req.headers,
    body: JSON.stringify(payload),
  });

  return coursesPostHandler(clonedReq, { params: { slug: params.courseSlug } });
}
