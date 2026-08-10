import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { url, resolution } = await request.json();

    // Call your Python backend API
    const response = await fetch('https://socialpullybackend-production.up.railway.app/api/download/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, resolution })
    });

    if (!response.ok) {
      throw new Error('Download failed');
    }

    const blob = await response.blob();
    
    return new NextResponse(blob, {
      headers: {
        'Content-Type': 'video/mp4',
        'Content-Disposition': 'attachment; filename="video.mp4"'
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Download failed' },
      { status: 500 }
    );
  }
}