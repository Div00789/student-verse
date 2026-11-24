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
    try {
      jwt.verify(token, JWT_SECRET);
    } catch {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    const body = await req.json();
    const { candidateId, candidateName, jobTitle, jobDescription, salaryRange } = body;

    if (!candidateId || !jobTitle) {
      return NextResponse.json(
        { message: 'Candidate ID and Job Title are required.' },
        { status: 400 }
      );
    }

    const reqId = `hr-${Date.now()}`;
    return NextResponse.json({
      success: true,
      message: 'Hiring request successfully submitted to StudentVerse Placement Team.',
      request: {
        id: reqId,
        candidateId,
        candidateName: candidateName || 'Candidate',
        jobTitle,
        jobDescription: jobDescription || '',
        salaryRange: salaryRange || 'Standard Industry Package',
        status: 'SUBMITTED',
        statusText: 'Submitted for Admin Review',
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      },
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'Failed' }, { status: 500 });
  }
}
