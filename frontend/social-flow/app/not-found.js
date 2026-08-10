import Link from 'next/link';
import { Home } from 'lucide-react';

export const metadata = {
  title: '404 - Page Not Found | SocialPully',
  description: 'The page you are looking for does not exist.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  const tools = [
    { href: '/instagram-reels-downloader', label: '📸 Instagram' },
    { href: '/tiktok-video-downloader', label: '🎵 TikTok' },
    { href: '/facebook-video-downloader', label: '📘 Facebook' },
    { href: '/youtube-video-downloader', label: '▶️ YouTube' },
    { href: '/twitter-video-downloader', label: '🐦 Twitter' },
    { href: '/pinterest-video-downloader', label: '📌 Pinterest' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)' }}>
      <div style={{ textAlign: 'center', maxWidth: '560px' }}>
        <div style={{ fontSize: '6rem', fontWeight: 900, color: '#6366f1', lineHeight: 1, marginBottom: '16px', fontFamily: "'Outfit', sans-serif" }}>404</div>
        <h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: '1.8rem', color: '#0a0a0a', marginBottom: '12px' }}>
          Page Not Found
        </h1>
        <p style={{ color: '#6b7280', lineHeight: '1.7', marginBottom: '32px' }}>
          That page does not exist — but our video downloader tools are all working perfectly. Pick one below and get back to saving videos.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '28px' }}>
          {tools.map(tool => (
            <Link
              key={tool.href}
              href={tool.href}
              style={{
                padding: '10px 18px',
                borderRadius: '10px',
                background: '#fff',
                border: '1px solid #e5e7eb',
                color: '#374151',
                fontWeight: 600,
                fontSize: '0.875rem',
                textDecoration: 'none',
                fontFamily: "'Outfit', sans-serif",
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              }}
            >
              {tool.label}
            </Link>
          ))}
        </div>

        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            color: '#fff',
            padding: '12px 28px',
            borderRadius: '12px',
            fontWeight: 700,
            fontSize: '0.95rem',
            textDecoration: 'none',
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          <Home size={18} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
