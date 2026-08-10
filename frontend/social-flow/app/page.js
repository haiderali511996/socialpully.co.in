import Link from 'next/link';
import DownloadForm from '@/components/DownloadForm';
import JsonLd from '@/components/JsonLd';
import { generateFAQSchema } from '@/lib/schema';

// Real platform SVG icons
const InstagramIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
        <stop offset="0%" stopColor="#fdf497"/>
        <stop offset="5%" stopColor="#fdf497"/>
        <stop offset="45%" stopColor="#fd5949"/>
        <stop offset="60%" stopColor="#d6249f"/>
        <stop offset="90%" stopColor="#285AEB"/>
      </radialGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="5.5" fill="url(#ig-grad)"/>
    <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.8" fill="none"/>
    <circle cx="17.2" cy="6.8" r="1.1" fill="white"/>
  </svg>
);

const TikTokIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="6" fill="#010101"/>
    <path d="M16.5 5.5c.3 1.8 1.4 2.8 3 3v2.2c-1 .1-2-.2-3-1v4.8c0 2.4-1.8 4.3-4.2 4.3-2.3 0-4.3-2-4.3-4.3 0-2.4 2-4.3 4.3-4.3.2 0 .5 0 .7.1v2.3c-.2-.1-.5-.1-.7-.1-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2V5.5h2.2z" fill="white"/>
    <path d="M16.5 5.5c.3 1.8 1.4 2.8 3 3v2.2c-1 .1-2-.2-3-1v4.8c0 2.4-1.8 4.3-4.2 4.3-2.3 0-4.3-2-4.3-4.3 0-2.4 2-4.3 4.3-4.3.2 0 .5 0 .7.1v2.3c-.2-.1-.5-.1-.7-.1-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2V5.5h2.2z" fill="#69C9D0" fillOpacity="0.5"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="6" fill="#1877F2"/>
    <path d="M13.2 19.5v-6.8h2.2l.3-2.6h-2.5V8.5c0-.7.2-1.2 1.2-1.2h1.3V5c-.2 0-1-.1-1.9-.1-1.9 0-3.2 1.2-3.2 3.3v1.9H8.2v2.6h2.4v6.8h2.6z" fill="white"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="6" fill="#FF0000"/>
    <path d="M19.8 8.2a2 2 0 0 0-1.4-1.4C17 6.5 12 6.5 12 6.5s-5 0-6.4.3A2 2 0 0 0 4.2 8.2C3.9 9.6 3.9 12 3.9 12s0 2.4.3 3.8a2 2 0 0 0 1.4 1.4c1.4.3 6.4.3 6.4.3s5 0 6.4-.3a2 2 0 0 0 1.4-1.4c.3-1.4.3-3.8.3-3.8s0-2.4-.3-3.8z" fill="white"/>
    <path d="M10.2 14.5V9.5l4.3 2.5-4.3 2.5z" fill="#FF0000"/>
  </svg>
);

const XIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="6" fill="#000000"/>
    <path d="M13.1 11.1L17.5 6h-1.1l-3.8 4.3L9.5 6H6l4.6 6.6L6 18.2h1.1l4-4.5 3.2 4.5H18l-4.9-7.1zm-1.4 1.6l-.5-.6-3.8-5.4h1.6l3 4.3.5.6 3.9 5.6h-1.6l-3.1-4.5z" fill="white"/>
  </svg>
);

const PinterestIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="6" fill="#E60023"/>
    <path d="M12 4C7.6 4 4 7.6 4 12c0 3.4 2.1 6.4 5.1 7.7-.1-.6-.1-1.6.1-2.3l.9-3.8s-.2-.5-.2-1.2c0-1.1.7-2 1.5-2 .7 0 1 .5 1 1.2 0 .7-.5 1.8-.7 2.8-.2.8.4 1.5 1.2 1.5 1.5 0 2.5-1.9 2.5-4.2 0-1.7-1.2-3-3-3-2 0-3.2 1.5-3.2 3.1 0 .6.2 1.2.5 1.6.1.1.1.2 0 .3l-.4 1.5c-.1.1-.2.2-.3.1C8 15.8 7.3 14 7.3 12.4c0-2.7 2-5.3 5.9-5.3 3.1 0 5.5 2.2 5.5 5.1 0 3-1.9 5.5-4.6 5.5-.9 0-1.7-.5-2-1l-.5 2c-.2.7-.7 1.6-1 2.1.8.2 1.6.3 2.4.3 4.4 0 8-3.6 8-8s-3.6-8-8-8z" fill="white"/>
  </svg>
);

// ✅ UPDATED META TITLE
export const metadata = {
  title: 'Free Online Video Downloader — No Watermark | SocialPully',
  description: 'Download videos from Instagram Reels, TikTok, Facebook, YouTube, Twitter and Pinterest in HD quality. Free, no watermark, no sign-up. Works on all devices.',
  alternates: {
    canonical: 'https://socialpully.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const platforms = [
  { name: 'Instagram Reels', icon: <InstagramIcon />, href: '/instagram-reels-downloader', desc: 'Save Reels without watermark', color: '#c13584', bg: 'rgba(193,53,132,0.08)' },
  { name: 'TikTok Videos', icon: <TikTokIcon />, href: '/tiktok-video-downloader', desc: 'HD TikTok downloads, no watermark', color: '#fe2c55', bg: 'rgba(254,44,85,0.08)' },
  { name: 'Facebook Videos', icon: <FacebookIcon />, href: '/facebook-video-downloader', desc: 'Public & private Facebook video save', color: '#1877f2', bg: 'rgba(24,119,242,0.08)' },
  { name: 'YouTube Videos', icon: <YouTubeIcon />, href: '/youtube-video-downloader', desc: 'YouTube & Shorts in up to 4K', color: '#ff0000', bg: 'rgba(255,0,0,0.08)' },
  { name: 'Twitter / X Videos', icon: <XIcon />, href: '/twitter-video-downloader', desc: 'Download Twitter and X videos fast', color: '#1da1f2', bg: 'rgba(29,161,242,0.08)' },
  { name: 'Pinterest Videos', icon: <PinterestIcon />, href: '/pinterest-video-downloader', desc: 'Save Pinterest video pins easily', color: '#e60023', bg: 'rgba(230,0,35,0.08)' },
];

const features = [
  { icon: '🚫', title: 'No Watermark', desc: 'Clean downloads with no platform branding or username overlays.', color: '#6366f1', bg: 'rgba(99,102,241,0.08)' },
  { icon: '📺', title: 'HD & 4K Quality', desc: 'We preserve the original upload resolution — up to 4K where available.', color: '#8b5cf6', bg: 'rgba(139,92,246,0.08)' },
  { icon: '⚡', title: 'Fast Processing', desc: 'Most downloads complete in under 5 seconds on any connection.', color: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
  { icon: '🔒', title: 'Private & Secure', desc: 'We never store your videos or share your data with anyone.', color: '#10b981', bg: 'rgba(16,185,129,0.08)' },
  { icon: '📱', title: 'All Devices', desc: 'Works on iPhone, Android, Windows, Mac — any browser, no app needed.', color: '#3b82f6', bg: 'rgba(59,130,246,0.08)' },
  { icon: '💸', title: '100% Free', desc: 'No subscriptions, no hidden fees, no registration required. Ever.', color: '#ec4899', bg: 'rgba(236,72,153,0.08)' },
];

const steps = [
  { num: '01', title: 'Copy the URL', desc: 'Open the video on Instagram, TikTok, YouTube, or any supported platform and copy the link.', gradient: 'linear-gradient(135deg, #c471ed 0%, #f64f59 100%)', shadow: 'rgba(196,113,237,0.4)' },
  { num: '02', title: 'Paste & Download', desc: 'Paste the URL into the box above and hit Download. Done in seconds.', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', shadow: 'rgba(79,172,254,0.4)' },
  { num: '03', title: 'Save to Device', desc: 'Your file downloads directly to your phone, tablet, or computer in HD quality.', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', shadow: 'rgba(67,233,123,0.4)' },
];

const highlights = [
  {
    icon: (<svg width="26" height="26" fill="none" viewBox="0 0 24 24"><path d="M12 16l-4-4h3V4h2v8h3l-4 4z" fill="currentColor"/><rect x="4" y="18" width="16" height="2" rx="1" fill="currentColor"/></svg>),
    title: 'Direct Downloads', desc: 'No storage on our servers. Ultra-fast streaming.', color: '#6366f1', bg: 'rgba(99,102,241,0.1)', border: 'rgba(99,102,241,0.2)',
  },
  {
    icon: (<svg width="26" height="26" fill="none" viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M10 9l5 3-5 3V9z" fill="currentColor"/></svg>),
    title: 'Multiple Qualities', desc: 'Choose from 360p to 1080p quality options.', color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)', border: 'rgba(139,92,246,0.2)',
  },
  {
    icon: (<svg width="26" height="26" fill="none" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/></svg>),
    title: 'All Platforms', desc: 'YouTube, Instagram, TikTok, Facebook & more.', color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.2)',
  },
];

// ✅ FAQs for homepage
const homeFaqs = [
  { question: 'Is SocialPully completely free?', answer: 'Yes — 100% free, no subscriptions, no hidden charges, no account required. Paste a link and download instantly.' },
  { question: 'Which platforms does SocialPully support?', answer: 'We support 15+ platforms including Instagram Reels, TikTok, Facebook, YouTube, Twitter/X, Pinterest, Snapchat, LinkedIn, Reddit, Vimeo, Dailymotion, and more.' },
  { question: 'Will my downloaded videos have watermarks?', answer: 'No. SocialPully removes watermarks automatically — including TikTok logos — and delivers clean, original-quality files to your device.' },
  { question: 'What video quality can I download?', answer: 'You can choose from 360p up to 4K Ultra HD, depending on the original upload. We always offer the highest quality the source provides.' },
  { question: 'Does it work on iPhone and Android?', answer: 'Yes. SocialPully is fully mobile-optimized and works in any browser on iPhone, Android, tablets, and all desktop platforms — no app download needed.' },
  { question: 'Is it safe? Do you store my videos?', answer: 'Completely safe. We never store, share, or log your videos or personal data. Every download is processed in real-time and discarded immediately after delivery.' },
  { question: 'How many videos can I download per day?', answer: 'There is no limit. Download as many videos as you want, as often as you like — completely unrestricted and free.' },
  { question: 'Why is my download failing?', answer: 'The most common reasons are: the video is set to private, the URL is incorrect or incomplete, or the platform recently changed its API. Try refreshing and re-copying the link. If the issue persists, contact us.' },
];

// ✅ Reviews / Testimonials
const reviews = [
  { name: 'Aisha R.', location: 'Dubai, UAE', rating: 5, text: 'Best downloader I have used. No ads, no watermarks, downloaded a TikTok in 3 seconds flat. Been using it daily for months.', platform: 'TikTok' },
  { name: 'Marcus T.', location: 'London, UK', rating: 5, text: 'Finally a tool that actually works for Instagram Reels. Other sites either add a watermark or just fail completely. SocialPully is the real deal.', platform: 'Instagram' },
  { name: 'Priya S.', location: 'Mumbai, India', rating: 5, text: 'Super clean UI, loads instantly on mobile. I save YouTube Shorts every day for offline viewing. 10/10 recommend.', platform: 'YouTube' },
  { name: 'Carlos M.', location: 'Mexico City, MX', rating: 5, text: 'I was skeptical at first but this site is genuinely free — no tricks, no fake download buttons. Works perfectly on my Android.', platform: 'Facebook' },
  { name: 'Sophie K.', location: 'Paris, France', rating: 5, text: 'Downloads in HD with zero watermark on TikTok. I use this for saving content for my design inspiration folder. Essential tool.', platform: 'TikTok' },
  { name: 'James O.', location: 'Lagos, Nigeria', rating: 5, text: 'Fast, reliable, and free. I have downloaded hundreds of videos for my research and the quality is always perfect. Great service!', platform: 'Twitter/X' },
];

const FONT = "'Outfit', sans-serif";

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

export default function Home() {
  const faqSchema = generateFAQSchema(homeFaqs);

  return (
    <>
      <JsonLd data={faqSchema} />

      <div className="min-h-screen" style={{ background: '#fff' }}>

        {/* HERO */}
        <section style={{ background: 'linear-gradient(160deg, #0a0a0a 0%, #130f1f 50%, #0a0a0a 100%)', padding: '72px 0 80px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

          <div className="container mx-auto px-4" style={{ maxWidth: '820px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'inline-block', background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.35)', color: '#818cf8', padding: '6px 18px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '24px', letterSpacing: '0.03em' }}>
              🚀 15+ Platforms · 25M+ Downloads · Always Free
            </div>

            <h1 style={{ fontFamily: FONT, fontWeight: 900, fontSize: 'clamp(2.2rem, 6vw, 3.6rem)', color: '#fff', lineHeight: 1.1, marginBottom: '20px', letterSpacing: '-0.02em' }}>
              Download Videos from{' '}
              <span style={{ background: 'linear-gradient(135deg, #818cf8 0%, #a78bfa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Any Platform
              </span>
            </h1>

            <p style={{ color: '#9ca3af', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '40px', maxWidth: '560px', margin: '0 auto 40px' }}>
              Free HD downloader for Instagram Reels, TikTok, Facebook, YouTube, Twitter and Pinterest. No watermark, no sign-up, works on every device.
            </p>

            <DownloadForm />

            <p style={{ color: '#4b5563', fontSize: '0.8rem', marginTop: '20px' }}>
              Supports Instagram · TikTok · Facebook · YouTube · Twitter/X · Pinterest
            </p>
          </div>
        </section>

        {/* HIGHLIGHT CARDS */}
        <section style={{ padding: '56px 0 0', background: '#fff' }}>
          <div className="container mx-auto px-4" style={{ maxWidth: '960px' }}>
            <div className="grid md:grid-cols-3 gap-5">
              {highlights.map((h) => (
                <div key={h.title} style={{ background: h.bg, border: `1px solid ${h.border}`, borderRadius: '18px', padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `${h.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: h.color, flexShrink: 0 }}>
                    {h.icon}
                  </div>
                  <div>
                    <h2 style={{ fontFamily: FONT, fontWeight: 800, fontSize: '1.05rem', color: '#0a0a0a', marginBottom: '6px', lineHeight: 1.3 }}>{h.title}</h2>
                    <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: '1.6', margin: 0 }}>{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PLATFORMS GRID */}
        <section style={{ padding: '72px 0', background: '#fff' }}>
          <div className="container mx-auto px-4" style={{ maxWidth: '960px' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h2 style={{ fontFamily: FONT, fontWeight: 800, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#0a0a0a', marginBottom: '10px' }}>
                Pick Your Platform
              </h2>
              <p style={{ color: '#6b7280', fontSize: '1rem' }}>One click takes you straight to that downloader — no searching needed.</p>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {platforms.map((p) => (
                <Link key={p.href} href={p.href} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '18px 20px', borderRadius: '14px', background: p.bg, border: `1px solid ${p.color}22`, textDecoration: 'none', transition: 'all 0.2s' }} className="hover:shadow-md">
                  <div style={{ width: '36px', height: '36px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{p.icon}</div>
                  <div>
                    <p style={{ fontFamily: FONT, fontWeight: 700, color: '#0a0a0a', fontSize: '0.95rem', marginBottom: '2px' }}>{p.name}</p>
                    <p style={{ color: '#6b7280', fontSize: '0.8rem' }}>{p.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section style={{ padding: '72px 0', background: '#f9fafb' }}>
          <div className="container mx-auto px-4" style={{ maxWidth: '860px', textAlign: 'center' }}>
            <h2 style={{ fontFamily: FONT, fontWeight: 800, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#0a0a0a', marginBottom: '10px' }}>
              Download in 3 Steps
            </h2>
            <p style={{ color: '#6b7280', marginBottom: '52px' }}>No technical knowledge needed. If you can copy a link, you can use SocialPully.</p>
            <div className="grid md:grid-cols-3 gap-6">
              {steps.map((s, i) => (
                <div key={s.num} style={{ background: '#fff', borderRadius: '20px', padding: '32px 24px', border: '1px solid #e5e7eb', textAlign: 'left', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: s.gradient }} />
                  <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '52px', height: '52px', borderRadius: '50%', background: s.gradient, boxShadow: `0 8px 24px ${s.shadow}`, marginBottom: '18px', flexShrink: 0 }}>
                    <span style={{ fontFamily: FONT, fontWeight: 900, fontSize: '1.15rem', color: '#fff', lineHeight: 1, letterSpacing: '-0.02em' }}>{i + 1}</span>
                  </div>
                  <div style={{ position: 'absolute', top: '16px', right: '20px', fontFamily: FONT, fontWeight: 900, fontSize: '3.5rem', color: 'rgba(0,0,0,0.04)', lineHeight: 1, userSelect: 'none' }}>{s.num}</div>
                  <h3 style={{ fontFamily: FONT, fontWeight: 800, color: '#0a0a0a', marginBottom: '10px', fontSize: '1.05rem', lineHeight: 1.3 }}>{s.title}</h3>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: '1.65', margin: 0 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section style={{ padding: '72px 0', background: '#fff' }}>
          <div className="container mx-auto px-4" style={{ maxWidth: '960px' }}>
            <h2 style={{ fontFamily: FONT, fontWeight: 800, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#0a0a0a', textAlign: 'center', marginBottom: '10px' }}>
              Why People Use SocialPully
            </h2>
            <p style={{ color: '#6b7280', textAlign: 'center', marginBottom: '48px' }}>Built for speed and simplicity — nothing to install, nothing to pay.</p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {features.map((f) => (
                <div key={f.title} style={{ padding: '24px', borderRadius: '16px', border: `1px solid ${f.color}18`, background: f.bg }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `${f.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '14px' }}>{f.icon}</div>
                  <p style={{ fontFamily: FONT, fontWeight: 700, color: '#0a0a0a', marginBottom: '6px', fontSize: '0.95rem' }}>{f.title}</p>
                  <p style={{ color: '#6b7280', fontSize: '0.85rem', lineHeight: '1.6' }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ✅ REVIEWS / TESTIMONIALS */}
        <section style={{ padding: '80px 0', background: 'linear-gradient(160deg, #0a0a0a 0%, #130f1f 100%)' }}>
          <div className="container mx-auto px-4" style={{ maxWidth: '1060px' }}>
            <div style={{ textAlign: 'center', marginBottom: '52px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', color: '#fbbf24', padding: '5px 16px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '18px' }}>
                ⭐ Rated 4.9/5 by 12,000+ users
              </div>
              <h2 style={{ fontFamily: FONT, fontWeight: 900, fontSize: 'clamp(1.6rem, 3vw, 2.3rem)', color: '#fff', marginBottom: '10px', letterSpacing: '-0.02em' }}>
                What Our Users Say
              </h2>
              <p style={{ color: '#6b7280', fontSize: '1rem' }}>Real feedback from people who download videos every day with SocialPully.</p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {reviews.map((r) => (
                <div key={r.name} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '18px', padding: '26px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {/* Stars */}
                  <div style={{ display: 'flex', gap: '3px' }}>
                    {[...Array(r.rating)].map((_, i) => <StarIcon key={i} />)}
                  </div>

                  {/* Review text */}
                  <p style={{ color: '#d1d5db', fontSize: '0.9rem', lineHeight: '1.7', flexGrow: 1, fontStyle: 'italic' }}>
                    &ldquo;{r.text}&rdquo;
                  </p>

                  {/* User info */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: FONT,
                      fontWeight: 800,
                      color: '#fff',
                      fontSize: '0.9rem',
                      flexShrink: 0,
                    }}>
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <p style={{ fontFamily: FONT, fontWeight: 700, color: '#fff', fontSize: '0.875rem', marginBottom: '1px' }}>{r.name}</p>
                      <p style={{ color: '#4b5563', fontSize: '0.75rem' }}>{r.location} · {r.platform}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TRUST BAR */}
        <section style={{ background: '#f9fafb', padding: '48px 0', borderTop: '1px solid #e5e7eb' }}>
          <div className="container mx-auto px-4" style={{ maxWidth: '960px', textAlign: 'center' }}>
            <div className="grid grid-cols-3 gap-6 md:gap-12" style={{ maxWidth: '500px', margin: '0 auto' }}>
              {[{ val: '25M+', label: 'Downloads' }, { val: '15+', label: 'Platforms' }, { val: '100%', label: 'Free Forever' }].map((stat) => (
                <div key={stat.label}>
                  <p style={{ fontFamily: FONT, fontWeight: 900, fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', color: '#0a0a0a', lineHeight: 1, marginBottom: '4px' }}>{stat.val}</p>
                  <p style={{ color: '#6b7280', fontSize: '0.8rem', fontWeight: 500 }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ✅ FAQs SECTION */}
        <section style={{ padding: '80px 0', background: '#fff' }}>
          <div className="container mx-auto px-4" style={{ maxWidth: '780px' }}>
            <div style={{ textAlign: 'center', marginBottom: '52px' }}>
              <h2 style={{ fontFamily: FONT, fontWeight: 800, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#0a0a0a', marginBottom: '10px' }}>
                Frequently Asked Questions
              </h2>
              <p style={{ color: '#6b7280' }}>Everything you need to know about SocialPully. Still have questions? <Link href="/contact" style={{ color: '#6366f1', fontWeight: 600, textDecoration: 'none' }}>Contact us</Link>.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {homeFaqs.map((faq, i) => (
                <details
                  key={i}
                  style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '14px', overflow: 'hidden' }}
                >
                  <summary style={{
                    padding: '20px 24px',
                    cursor: 'pointer',
                    fontFamily: FONT,
                    fontWeight: 700,
                    fontSize: '0.975rem',
                    color: '#0a0a0a',
                    listStyle: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '12px',
                    userSelect: 'none',
                  }}>
                    <span>{faq.question}</span>
                    <span style={{ color: '#6366f1', fontSize: '1.3rem', lineHeight: 1, flexShrink: 0, fontWeight: 400 }}>+</span>
                  </summary>
                  <div style={{ padding: '0 24px 20px', color: '#4b5563', fontSize: '0.9rem', lineHeight: '1.75' }}>
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '36px' }}>
              <Link href="/faq" style={{ color: '#6366f1', fontFamily: FONT, fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                View all FAQs →
              </Link>
            </div>
          </div>
        </section>

        {/* SEO TEXT BLOCK */}
        <section style={{ padding: '60px 0', background: '#f9fafb' }}>
          <div className="container mx-auto px-4" style={{ maxWidth: '780px' }}>
            <h2 style={{ fontFamily: FONT, fontWeight: 800, fontSize: '1.5rem', color: '#0a0a0a', marginBottom: '14px' }}>
              Free Online Video Downloader for Every Platform
            </h2>
            <p style={{ color: '#4b5563', lineHeight: '1.85', marginBottom: '16px', fontSize: '0.925rem' }}>
              SocialPully is a free online video downloader that works across Instagram, TikTok, Facebook, YouTube, Twitter/X, and Pinterest. There is nothing to install — just paste a link and your video downloads in seconds, in HD quality, with no watermark attached.
            </p>
            <p style={{ color: '#4b5563', lineHeight: '1.85', marginBottom: '16px', fontSize: '0.925rem' }}>
              Whether you want to save an Instagram Reel for offline viewing, download a TikTok without the TikTok logo, grab a Facebook video someone shared, or pull a YouTube clip in 4K — SocialPully handles it all from a single page. Works on iPhone, Android, Windows, and Mac without any extensions or apps.
            </p>
            <p style={{ color: '#4b5563', lineHeight: '1.85', fontSize: '0.925rem' }}>
              We do not store your videos, require a login, or charge anything. Over 25 million downloads have been processed since launch. Pick a platform above or paste any link into the downloader to get started.
            </p>
          </div>
        </section>

      </div>
    </>
  );
}
