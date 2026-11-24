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

    // 1. Query Order table directly without broken foreign-key relation
    const { data: ordersData, error } = await supabaseServer
      .from('Order')
      .select('id, courseId, amountMinorUnits, currency, status, createdAt')
      .eq('userId', userId)
      .order('createdAt', { ascending: false });

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    // 2. Fetch Course details for each courseId safely
    const courseIds = (ordersData || []).map((o: any) => o.courseId).filter(Boolean);
    let coursesMap: Record<string, any> = {};
    if (courseIds.length > 0) {
      const { data: courses } = await supabaseServer
        .from('Course')
        .select('id, slug, title')
        .in('id', courseIds);
      if (courses) {
        for (const c of courses) {
          coursesMap[c.id] = c;
        }
      }
    }

    // 3. Map orders providing all expected property names
    const purchases = (ordersData || []).map((o: any) => {
      const course = coursesMap[o.courseId];
      const amount = (o.amountMinorUnits || 2999900) / 100;
      const date = o.createdAt || new Date().toISOString();
      return {
        id: o.id,
        orderReference: `SV-ORD-${o.id.slice(0, 8).toUpperCase()}`,
        courseId: o.courseId,
        courseTitle: course?.title || 'AI Digital Marketing Course',
        courseSlug: course?.slug || 'ai-digital-marketing-course',
        amount,
        amountPaid: amount,
        currency: o.currency || 'INR',
        status: o.status || 'COMPLETED',
        purchaseDate: date,
        createdAt: date,
      };
    });

    return NextResponse.json(purchases);
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'Failed' }, { status: 500 });
  }
}
