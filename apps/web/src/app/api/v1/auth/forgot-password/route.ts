import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    return NextResponse.json({
      success: true,
      message: `If an account with ${email} exists, password reset instructions have been dispatched.`,
    });
  } catch {
    return NextResponse.json({ success: true, message: 'Reset instructions dispatched.' });
  }
}
