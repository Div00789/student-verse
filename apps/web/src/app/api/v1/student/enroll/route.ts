import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { supabaseServer, JWT_SECRET } from '@/lib/supabaseServer';

export async function POST(req: NextRequest) {
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
    const { courseSlug } = await req.json();

    if (!courseSlug) {
      return NextResponse.json({ message: 'courseSlug is required' }, { status: 400 });
    }

    // 1. Find course
    const { data: course, error: cErr } = await supabaseServer
      .from('Course')
      .select('id, slug, title, priceMinorUnits, currency')
      .eq('slug', courseSlug)
      .maybeSingle();

    if (cErr || !course) {
      return NextResponse.json({ message: 'Course not found' }, { status: 404 });
    }

    // 2. Check if already enrolled
    const { data: existingEnrollment } = await supabaseServer
      .from('Enrollment')
      .select('id')
      .eq('userId', userId)
      .eq('courseId', course.id)
      .maybeSingle();

    if (existingEnrollment) {
      return NextResponse.json({
        success: true,
        message: 'Already enrolled in this course.',
        enrolled: true,
        enrollmentId: existingEnrollment.id,
      });
    }

    // 3. Create completed Order record
    const orderId = crypto.randomUUID();
    await supabaseServer.from('Order').insert({
      id: orderId,
      userId,
      courseId: course.id,
      amountMinorUnits: course.priceMinorUnits || 2999900,
      currency: 'INR',
      status: 'COMPLETED',
      gatewayPaymentId: `PAY-MANUAL-${Date.now()}`,
      idempotencyKey: `IDEMP-${userId}-${course.id}`,
    });

    // 4. Create Enrollment linked to Order
    const enrollmentId = crypto.randomUUID();
    await supabaseServer.from('Enrollment').insert({
      id: enrollmentId,
      userId,
      courseId: course.id,
      orderId,
      progressPct: 0,
      isCompleted: false,
    });

    return NextResponse.json({
      success: true,
      message: 'Successfully enrolled in course.',
      enrolled: true,
      enrollmentId,
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'Failed' }, { status: 500 });
  }
}
