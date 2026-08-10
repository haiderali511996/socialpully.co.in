import { Download, Copy, MousePointer } from 'lucide-react';
import JsonLd from '@/components/JsonLd';
import { generateHowToSchema } from '@/lib/schema';

export const metadata = {
  title: 'How It Works - Download Videos in 3 Easy Steps | SocialPully',
  description: 'Learn how to download videos from Instagram, TikTok, Facebook, YouTube in just 3 simple steps. Free, fast, and easy video downloader guide.',
  alternates: {
    canonical: 'https://socialpully.com/how-it-works',
  },
  openGraph: {
    title: 'How It Works - Download Videos in 3 Easy Steps | SocialPully',
    description: 'Learn how to download videos from Instagram, TikTok, Facebook, YouTube in just 3 simple steps.',
    url: 'https://socialpully.com/how-it-works',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
    },
  },
};

const FONT = "'Outfit', sans-serif";

const steps = [
  {
    icon: Copy,
    title: 'Copy Video URL',
    description: 'Find the video you want on Instagram, TikTok, Facebook, or any supported platform. Copy the video link or URL.',
    gradient: 'linear-gradient(135deg, #c471ed 0%, #f64f59 100%)',
    shadow: 'rgba(196,113,237,0.4)',
    num: '01',
  },
  {
    icon: MousePointer,
    title: 'Paste & Select Quality',
    description: 'Paste the URL into SocialPully downloader. Choose your preferred quality (360p to 4K) and format.',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    shadow: 'rgba(79,172,254,0.4)',
    num: '02',
  },
  {
    icon: Download,
    title: 'Download & Enjoy',
    description: 'Click the Download button. Your video will be saved to your device instantly. Watch offline anytime!',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    shadow: 'rgba(67,233,123,0.4)',
    num: '03',
  },
];

export default function HowItWorks() {
  const schemaData = generateHowToSchema('instagram');

  return (
    <>
      <JsonLd data={schemaData} />

      <div className="min-h-screen" style={{ background: '#f9fafb' }}>
        {/* Hero */}
        <div style={{ background: 'linear-gradient(160deg, #0a0a0a 0%, #130f1f 100%)', padding: '64px 0 72px' }}>
          <div className="container mx-auto px-4" style={{ textAlign: 'center', maxWidth: '640px' }}>
            <div style={{ display: 'inline-block', background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.35)', color: '#818cf8', padding: '5px 16px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '20px' }}>
              Simple as 1-2-3
            </div>
            <h1 style={{ fontFamily: FONT, fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#fff', lineHeight: 1.15, marginBottom: '16px', letterSpacing: '-0.02em' }}>
              How It Works
            </h1>
            <p style={{ color: '#9ca3af', fontSize: '1.05rem', lineHeight: 1.7 }}>
              Download videos from any social media platform in just 3 simple steps
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="container mx-auto px-4 py-16" style={{ maxWidth: '900px' }}>
          <div className="grid md:grid-cols-3 gap-7">
            {steps.map((step, index) => (
              <div
                key={index}
                style={{
                  background: '#fff',
                  borderRadius: '20px',
                  padding: '36px 28px',
                  border: '1px solid #e5e7eb',
                  textAlign: 'left',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
                }}
              >
                {/* Top accent bar */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: step.gradient }} />

                {/* Decorative number (background) */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '18px',
                  fontFamily: FONT,
                  fontWeight: 900,
                  fontSize: '4rem',
                  color: 'rgba(0,0,0,0.04)',
                  lineHeight: 1,
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}>{step.num}</div>

                {/* Colored circle with number */}
                <div style={{
                  width: '58px',
                  height: '58px',
                  borderRadius: '50%',
                  background: step.gradient,
                  boxShadow: `0 8px 24px ${step.shadow}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                }}>
                  <span style={{
                    fontFamily: FONT,
                    fontWeight: 900,
                    fontSize: '1.3rem',
                    color: '#fff',
                    lineHeight: 1,
                  }}>{index + 1}</span>
                </div>

                {/* H2 per user request */}
                <h2 style={{ fontFamily: FONT, fontWeight: 800, fontSize: '1.1rem', color: '#0a0a0a', marginBottom: '10px', lineHeight: 1.3 }}>
                  {step.title}
                </h2>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.65, margin: 0 }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '56px' }}>
            <a
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                color: 'white',
                padding: '16px 40px',
                borderRadius: '14px',
                fontSize: '1rem',
                fontFamily: FONT,
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(99,102,241,0.35)',
                transition: 'all 0.2s',
              }}
            >
              <Download size={18} />
              Start Downloading Now
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
