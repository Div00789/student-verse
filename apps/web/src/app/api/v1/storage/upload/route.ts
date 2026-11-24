import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { supabaseServer, JWT_SECRET } from '@/lib/supabaseServer';

const ALLOWED_STUDENT_FOLDERS = [
  'profile',
  'resume',
  'assignments',
  'projects',
  'portfolio',
  'certificates',
  'documents',
];

const ALLOWED_EMPLOYER_FOLDERS = [
  'profile',
  'company-logo',
  'verification',
  'job-descriptions',
  'documents',
];

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
    const roles: string[] = decoded.roles || [];
    const isEmployer = roles.includes('EMPLOYER');

    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'documents';

    if (!file) {
      return NextResponse.json({ message: 'No file provided' }, { status: 400 });
    }

    // Determine bucket and validate folder
    const bucket = isEmployer ? 'employers' : 'students';
    const allowedFolders = isEmployer ? ALLOWED_EMPLOYER_FOLDERS : ALLOWED_STUDENT_FOLDERS;

    if (!allowedFolders.includes(folder)) {
      return NextResponse.json(
        { message: `Invalid folder. Allowed folders: ${allowedFolders.join(', ')}` },
        { status: 400 }
      );
    }

    // Sanitize file name and construct path: {bucket}/{userId}/{folder}/{timestamp}-{safeName}
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const storagePath = `${userId}/${folder}/${Date.now()}_${cleanFileName}`;

    const buffer = Buffer.from(await file.arrayBuffer());

    const { data: uploadData, error: uploadErr } = await supabaseServer.storage
      .from(bucket)
      .upload(storagePath, buffer, {
        contentType: file.type || 'application/octet-stream',
        upsert: true,
      });

    if (uploadErr) {
      return NextResponse.json(
        { message: `Storage upload failed: ${uploadErr.message}` },
        { status: 500 }
      );
    }

    // Generate short-lived signed URL (3600 seconds = 1 hour) for private secure access
    const { data: signedData } = await supabaseServer.storage
      .from(bucket)
      .createSignedUrl(storagePath, 3600);

    return NextResponse.json({
      success: true,
      bucket,
      path: storagePath,
      fullPath: `${bucket}/${storagePath}`,
      signedUrl: signedData?.signedUrl || null,
      message: 'File successfully uploaded to private storage namespace.',
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'Storage error' }, { status: 500 });
  }
}
