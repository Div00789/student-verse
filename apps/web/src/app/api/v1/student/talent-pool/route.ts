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
    const { optIn } = await req.json().catch(() => ({ optIn: false }));

    const visibility = optIn ? 'SEARCHABLE' : 'PRIVATE';
    const now = new Date().toISOString();

    // Check if LearnerProfile exists
    const { data: existingProfile } = await supabaseServer
      .from('LearnerProfile')
      .select('id')
      .eq('userId', userId)
      .maybeSingle();

    if (existingProfile) {
      await supabaseServer
        .from('LearnerProfile')
        .update({
          visibility,
          updatedAt: now,
        })
        .eq('id', existingProfile.id);
    } else {
      await supabaseServer.from('LearnerProfile').insert({
        id: crypto.randomUUID(),
        userId,
        headline: 'Student Learner',
        visibility,
        skills: [],
        createdAt: now,
        updatedAt: now,
      });
    }

    return NextResponse.json({
      success: true,
      visibility,
      message: optIn
        ? 'Your professional profile is now discoverable by vetted hiring partners.'
        : 'Your profile has been made private and removed from employer discovery.',
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || 'Failed to update discovery preferences' },
      { status: 500 }
    );
  }
}
