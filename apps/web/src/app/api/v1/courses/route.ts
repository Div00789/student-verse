import { NextRequest, NextResponse } from 'next/server';
import { getAllCourses } from '@/lib/courseService';

export async function GET(req: NextRequest) {
  try {
    const courses = await getAllCourses();
    return NextResponse.json(courses);
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'Failed to fetch courses' }, { status: 500 });
  }
}
