import { NextRequest, NextResponse } from 'next/server';

/**
 * Universal Video Stream Proxy for Google Drive and external videos.
 * Enables HTML5 native playback with byte-range seeking, custom controls,
 * and reliable `onEnded` event detection without cross-origin iframe limitations.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  let fileId = searchParams.get('fileId') || searchParams.get('id');
  const urlParam = searchParams.get('url');

  if (!fileId && urlParam) {
    const match = urlParam.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || urlParam.match(/id=([a-zA-Z0-9_-]+)/);
    if (match) {
      fileId = match[1];
    }
  }

  if (!fileId) {
    return NextResponse.json({ message: 'Valid fileId or url is required' }, { status: 400 });
  }

  const range = req.headers.get('range');
  const driveUrl = `https://drive.usercontent.google.com/download?id=${fileId}&export=download&confirm=t`;

  try {
    const fetchHeaders: Record<string, string> = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    };
    if (range) {
      fetchHeaders['Range'] = range;
    }

    const driveRes = await fetch(driveUrl, { headers: fetchHeaders });

    if (!driveRes.ok && driveRes.status !== 206) {
      // Fallback redirect if direct stream is unavailable
      return NextResponse.redirect(`https://drive.google.com/file/d/${fileId}/preview`);
    }

    const responseHeaders = new Headers();
    responseHeaders.set('Content-Type', driveRes.headers.get('content-type') || 'video/mp4');
    const contentLength = driveRes.headers.get('content-length');
    if (contentLength) {
      responseHeaders.set('Content-Length', contentLength);
    }
    const contentRange = driveRes.headers.get('content-range');
    if (contentRange) {
      responseHeaders.set('Content-Range', contentRange);
    }
    responseHeaders.set('Accept-Ranges', 'bytes');
    responseHeaders.set('Cache-Control', 'public, max-age=7200, stale-while-revalidate=86400');

    return new NextResponse(driveRes.body, {
      status: driveRes.status,
      headers: responseHeaders,
    });
  } catch (err: any) {
    return NextResponse.json({ message: 'Stream failed', error: err.message }, { status: 502 });
  }
}
