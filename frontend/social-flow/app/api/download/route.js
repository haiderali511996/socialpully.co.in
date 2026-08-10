import { NextResponse } from 'next/server';

const API_BASE = (
  process.env.NEXT_PUBLIC_API_BASE || 'https://socialpullybackend-production.up.railway.app'
).replace(/\/$/, '');

export async function POST(request) {
  try {
    const body = await request.json();
    const url = body?.url;

    if (!url) {
      return NextResponse.json({ success: false, error: 'A video URL is required' }, { status: 400 });
    }

    // The Django API expects `quality` (and optionally `format`), and answers
    // with JSON describing the prepared file — not with the file itself.
    const response = await fetch(`${API_BASE}/api/download/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url,
        quality: body?.quality || body?.resolution || 'best',
        format: body?.format || 'mp4',
      }),
    });

    const data = await response.json();

    // download_url comes back relative to the backend; make it usable
    // from the browser.
    if (data?.download_url) {
      data.download_url = new URL(data.download_url, API_BASE).toString();
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Download failed', details: error.message },
      { status: 502 }
    );
  }
}
