import { NextRequest, NextResponse } from 'next/server';
import { GET as coursesGetHandler, POST as coursesPostHandler } from '@/app/api/v1/courses/[slug]/progress/route';

export async function GET(
  req: NextRequest,
  { params }: { params?: { courseSlug?: string } }
) {
  const slug = params?.courseSlug || req.nextUrl.searchParams.get('courseSlug') || req.nextUrl.searchParams.get('slug') || 'ai-digital-marketing-course';
  return coursesGetHandler(req, { params: { slug } });
}

export async function POST(
  req: NextRequest,
  { params }: { params?: { courseSlug?: string } }
) {
  const slug = params?.courseSlug || req.nextUrl.searchParams.get('courseSlug') || req.nextUrl.searchParams.get('slug') || 'ai-digital-marketing-course';
  return coursesPostHandler(req, { params: { slug } });
}
