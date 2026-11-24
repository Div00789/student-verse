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

    const { data: ordersData, error } = await supabaseServer
      .from('Order')
      .select(`
        id,
        courseId,
        amountMinorUnits,
        currency,
        status,
        createdAt,
        course:Course (
          id,
          slug,
          title
        )
      `)
      .eq('userId', userId)
      .order('createdAt', { ascending: false });

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    const purchases = (ordersData || []).map((o: any) => ({
      id: o.id,
      orderReference: `SV-ORD-${o.id.slice(0, 8).toUpperCase()}`,
      courseId: o.courseId,
      courseTitle: o.course?.title || 'AI Digital Marketing Course',
      courseSlug: o.course?.slug || 'ai-digital-marketing-course',
      amountPaid: (o.amountMinorUnits || 2999900) / 100,
      currency: o.currency || 'INR',
      status: o.status || 'COMPLETED',
      createdAt: o.createdAt,
    }));

    return NextResponse.json(purchases);
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'Failed' }, { status: 500 });
  }
}
