import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'studentverse-nextjs-serverless',
    timestamp: new Date().toISOString(),
  });
}
