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

    const { data: user, error } = await supabaseServer
      .from('User')
      .select('id, email, fullName, country, createdAt')
      .eq('id', userId)
      .maybeSingle();

    if (error || !user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const { data: rolesData } = await supabaseServer
      .from('UserRoleAssignment')
      .select('role')
      .eq('userId', userId);

    const roles = rolesData ? rolesData.map((r: any) => r.role) : ['STUDENT'];

    const { data: profile } = await supabaseServer
      .from('LearnerProfile')
      .select('headline, avatarUrl')
      .eq('userId', userId)
      .maybeSingle();

    return NextResponse.json({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      roles,
      country: user.country,
      headline: profile?.headline,
      profilePicture: profile?.avatarUrl,
      createdAt: user.createdAt,
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'Failed' }, { status: 500 });
  }
}
