import { NextRequest } from 'next/server';
import { GET as handlerGET, POST as handlerPOST } from '@/app/api/v1/courses/[slug]/progress/route';

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('courseSlug') || req.nextUrl.searchParams.get('slug') || 'ai-digital-marketing-course';
  return handlerGET(req, { params: { slug } });
}

export async function POST(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('courseSlug') || req.nextUrl.searchParams.get('slug') || 'ai-digital-marketing-course';
  return handlerPOST(req, { params: { slug } });
}
