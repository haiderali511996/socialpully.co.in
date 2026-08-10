import DownloadForm from '@/components/DownloadForm';
import JsonLd from '@/components/JsonLd';
import { generateFAQSchema, generateBreadcrumbSchema } from '@/lib/schema';
import Link from 'next/link';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { InstagramIcon, TikTokIcon, YouTubeIcon, XTwitterIcon, PinterestIcon, FacebookIcon } from '@/components/PlatformIcons';

export const metadata = {
  title: 'Facebook Video Downloader - HD Quality, Free',
  description: 'Download Facebook videos in HD quality for free. Save FB videos, reels, and stories to your device. No registration required. Works on all devices instantly.',
  keywords: [
    'facebook video downloader',
    'download facebook videos',
    'fb video downloader online',
    'facebook video download',
    'save facebook videos',
    'facebook reels downloader',
    'download fb videos',
    'facebook video downloader online',
  ],
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
  openGraph: {
    title: 'Facebook Video Downloader - HD Quality, Free',
    description: 'Download Facebook videos in HD quality for free. Save FB videos, reels, and stories. No registration required.',
    url: 'https://socialpully.com/facebook-video-downloader',
    type: 'website',
  },
  alternates: {
    canonical: 'https://socialpully.com/facebook-video-downloader',
  },
};

const faqs = [
  { question: 'Is this Facebook video downloader free to use?', answer: 'Yes, completely free with no hidden charges, subscriptions, or registration required. Download Facebook videos unlimited times without any cost.' },
  { question: 'Can I download Facebook videos in HD quality?', answer: 'Yes, our FB video downloader supports HD (720p), Full HD (1080p), and even 4K quality when the original video was uploaded in that resolution.' },
  { question: 'Does it work on iPhone and iPad?', answer: 'Yes, works perfectly on iPhone, iPad, and all iOS devices using Safari or Chrome. You can easily download videos from Facebook on any iOS device.' },
  { question: 'What video formats are available?', answer: 'We support MP4 (most popular), WebM, and audio formats like MP3 and M4A. MP4 is recommended for maximum compatibility.' },
  { question: 'Can I download private Facebook videos?', answer: 'Yes, you can save Facebook videos from your own timeline or videos shared privately with you. For private videos, you may need to log in to verify access.' },
  { question: 'Is there a download limit?', answer: 'No, Facebook video downloader online allows unlimited downloads. No restrictions or quotas on how many videos you can save.' },
  { question: 'Do I need to install an app or software?', answer: 'No installation needed. Our FB video downloader online works directly from your web browser without any app downloads or extensions.' },
  { question: 'Is it safe to use this tool?', answer: "Yes, completely safe and secure. We don't store your videos, personal data, or Facebook credentials. All Facebook video download processes are encrypted and private." },
  { question: 'Can I download Facebook Reels?', answer: 'Yes, our tool supports Facebook Reels, Stories, Watch videos, and all other video content available on Facebook.' },
  { question: 'Can I download Facebook Live videos?', answer: 'Yes, but only after the live broadcast has ended and the video is saved to the creator\'s timeline or page.' },
  { question: 'Do I need a Facebook account to download videos?', answer: 'No, you can download Facebook videos from public posts without logging in. Only private videos require authentication.' },
];

const features = [
  {
    icon: '🎬',
    title: 'HD & 4K Video Quality',
    desc: 'Download videos from Facebook in their original uploaded quality. Supports SD (480p), HD (720p), Full HD (1080p), and even 4K resolution when available. No compression, no quality loss.',
  },
  {
    icon: '📱',
    title: 'Download Facebook Reels',
    desc: 'Save Facebook Reels just like regular videos. Our Facebook video downloader supports all content types including Reels, Watch videos, Live videos (after broadcast), and Stories.',
  },
  {
    icon: '🎵',
    title: 'Multiple Format Support',
    desc: 'MP4 — Universal format compatible with all devices. WebM — Smaller file size with good quality. MP3 — Extract audio from Facebook videos. M4A — High-quality audio format.',
  },
  {
    icon: '🌐',
    title: 'No App Installation Required',
    desc: 'Everything works directly in your browser. No APK files, no Chrome extensions, no desktop software. This Facebook video downloader online tool is 100% web-based.',
  },
  {
    icon: '💎',
    title: '100% Free — No Hidden Charges',
    desc: 'No premium tiers, no trial periods, no credit card required. Download FB videos unlimited times, always free. No watermarks, no ads on downloaded videos.',
  },
  {
    icon: '⚡',
    title: 'Lightning-Fast Processing',
    desc: 'Our servers use advanced video processing technology. Average Facebook video download time: 3–5 seconds per video. Large videos may take slightly longer.',
  },
  {
    icon: '🔒',
    title: 'Private & Secure Downloads',
    desc: "We don't store your downloaded videos on our servers. All files are processed in real-time and deleted immediately after download. GDPR-aligned data practices.",
  },
  {
    icon: '📂',
    title: 'Download from Pages, Groups & Profiles',
    desc: 'Save Facebook videos from personal profiles, Facebook Pages, public and private groups, Facebook Watch, Marketplace videos, and event videos.',
  },
];

const steps = [
  { num: '01', title: 'Open Facebook', desc: 'Open Facebook and find the video you want to download.' },
  { num: '02', title: 'Copy Link', desc: 'Click the three dots (•••) on the video post and select "Copy Link".' },
  { num: '03', title: 'Paste URL', desc: 'Paste the Facebook video URL in our downloader above.' },
  { num: '04', title: 'Download!', desc: 'Click Download — choose your preferred quality and format. Your Facebook video download starts automatically!' },
];

const stats = [
  { value: '15M+', label: 'Downloads' },
  { value: '4.9★', label: 'Rating' },
  { value: '170+', label: 'Countries' },
  { value: '99.9%', label: 'Uptime' },
];

export default function FacebookDownloader() {
  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://socialpully.com' },
    { name: 'Facebook Video Downloader', url: 'https://socialpully.com/facebook-video-downloader' },
  ]);

  return (
    <div className="min-h-screen" style={{ background: '#fff' }}>
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* ── HERO SECTION ── */}
      <section style={{
        background: 'linear-gradient(160deg, #0a0a0a 0%, #0a0f1a 50%, #0a1020 100%)',
        padding: '72px 0 80px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-80px', right: '-80px',
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(24,119,242,0.18) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-60px', left: '-60px',
          width: '300px', height: '300px',
          background: 'radial-gradient(circle, rgba(66,183,42,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }} />

        <div className="container mx-auto px-4" style={{ position: 'relative', zIndex: 1 }}>
          <nav style={{ marginBottom: '24px' }} aria-label="Breadcrumb">
            <ol style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.8rem', color: '#6b7280' }}>
              <li><Link href="/" style={{ color: '#9ca3af' }}>Home</Link></li>
              <li style={{ color: '#4b5563' }}>›</li>
              <li style={{ color: '#1877f2' }}>Facebook Video Downloader</li>
            </ol>
          </nav>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
            <span style={{
              background: 'linear-gradient(135deg, rgba(24,119,242,0.15), rgba(66,183,42,0.1))',
              border: '1px solid rgba(24,119,242,0.3)',
              color: '#4293f5',
              padding: '6px 16px',
              borderRadius: '100px',
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.03em',
            }}>
              #1 Facebook Downloader · 15M+ Downloads Served
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            textAlign: 'center',
            marginBottom: '16px',
            color: '#fff',
            lineHeight: 1.1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            flexWrap: 'wrap',
          }}>
            <FacebookIcon size={48} /> Facebook Video Downloader
          </h1>

          <p style={{
            textAlign: 'center',
            color: '#9ca3af',
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            marginBottom: '12px',
            fontWeight: 500,
          }}>
            Download Facebook Videos in HD Quality — Free & Fast
          </p>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '40px',
          }}>
            {['✅ HD Quality', '✅ 100% Free', '✅ All Formats', '✅ No Registration'].map(b => (
              <span key={b} style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#d1fae5',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 600,
              }}>
                {b}
              </span>
            ))}
          </div>

          <DownloadForm platform="facebook" />
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section style={{ background: '#1877f2', padding: '28px 0' }}>
        <div className="container mx-auto px-4">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '48px' }}>
            {stats.map(({ value, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 800,
                  fontSize: '1.8rem',
                  color: '#fff',
                  lineHeight: 1,
                  marginBottom: '4px',
                }}>
                  {value}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.8rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT IS SECTION ── */}
      <section style={{ padding: '80px 0', background: '#fff' }}>
        <div className="container mx-auto px-4" style={{ maxWidth: '900px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '48px',
            alignItems: 'center',
          }}>
            <div>
              <div style={{
                display: 'inline-block',
                background: '#1877f2',
                color: '#fff',
                padding: '6px 16px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}>
                About This Tool
              </div>
              <h2 style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                marginBottom: '20px',
                color: '#0a0a0a',
                lineHeight: 1.2,
              }}>
                What Is a Facebook Video Downloader?
              </h2>
              <p style={{ color: '#4b5563', lineHeight: '1.7', marginBottom: '16px' }}>
                A Facebook Video Downloader is a free online tool that allows you to save Facebook videos directly to your device — whether it&apos;s a smartphone, tablet, or desktop computer — without needing to install any software or create an account.
              </p>
              <p style={{ color: '#4b5563', lineHeight: '1.7', marginBottom: '20px' }}>
                Facebook&apos;s platform allows you to watch videos and save them to your &quot;Saved Items,&quot; but these videos remain locked within Facebook. Many content creators also restrict video downloads entirely. Our <strong>Facebook video downloader</strong> solves this problem.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                'Download Facebook videos from any public post, page, or group',
                'Save videos in HD quality (up to 1080p)',
                'Download FB videos in multiple formats (MP4, WebM)',
                'Convert Facebook videos to MP3 for audio extraction',
                'Save Facebook videos on any device — iPhone, Android, PC, or Mac',
                'Download videos from Facebook Watch, Reels, and Stories',
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '14px 16px',
                  background: '#f9fafb',
                  borderRadius: '10px',
                  border: '1px solid #f3f4f6',
                }}>
                  <span style={{
                    width: '22px', height: '22px', minWidth: '22px',
                    background: '#1877f2',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.65rem', color: '#fff', fontWeight: 800,
                    marginTop: '1px',
                  }}>✓</span>
                  <span style={{ color: '#374151', fontSize: '0.875rem', lineHeight: '1.5' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW TO SECTION ── */}
      <section style={{ padding: '80px 0', background: '#0a0a0a' }}>
        <div className="container mx-auto px-4" style={{ maxWidth: '900px' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
              color: '#fff',
              marginBottom: '12px',
            }}>
              How to Download Facebook Videos?
            </h2>
            <p style={{ color: '#9ca3af' }}>Four simple steps. Done in seconds.</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
          }}>
            {steps.map((step) => (
              <div key={step.num} style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '28px 24px',
                textAlign: 'center',
              }}>
                <div style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 800,
                  fontSize: '2.2rem',
                  background: 'linear-gradient(135deg, #1877f2 0%, #42b7f5 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '12px',
                }}>
                  {step.num}
                </div>
                <h3 style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  color: '#fff',
                  marginBottom: '8px',
                  fontSize: '1rem',
                }}>
                  {step.title}
                </h3>
                <p style={{ color: '#9ca3af', fontSize: '0.875rem', lineHeight: '1.6' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES SECTION ── */}
      <section style={{ padding: '80px 0', background: '#f9fafb' }}>
        <div className="container mx-auto px-4" style={{ maxWidth: '1100px' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
              color: '#0a0a0a',
              marginBottom: '12px',
            }}>
              Key Features of Our Facebook Video Downloader
            </h2>
            <p style={{ color: '#6b7280', maxWidth: '520px', margin: '0 auto' }}>
              Here&apos;s what sets our <strong>FB video downloader</strong> apart from other Facebook video download tools available online.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px',
          }}>
            {features.map((f, i) => (
              <div key={i} style={{
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '16px',
                padding: '28px 24px',
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '12px', lineHeight: 1 }}>{f.icon}</div>
                <h3 style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  color: '#0a0a0a',
                  marginBottom: '8px',
                  fontSize: '1rem',
                }}>
                  {f.title}
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: '1.6' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section style={{ padding: '80px 0', background: '#f9fafb' }}>
        <div className="container mx-auto px-4" style={{ maxWidth: '780px' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
              color: '#0a0a0a',
              marginBottom: '12px',
            }}>
              Frequently Asked Questions
            </h2>
            <p style={{ color: '#6b7280' }}>Everything you need to know about downloading Facebook videos.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, i) => (
              <details key={i} style={{
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                overflow: 'hidden',
              }}>
                <summary style={{
                  padding: '18px 24px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  color: '#0a0a0a',
                  fontSize: '0.95rem',
                  listStyle: 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  userSelect: 'none',
                }}>
                  {faq.question}
                  <span style={{ color: '#1877f2', fontWeight: 700, flexShrink: 0, marginLeft: '12px' }}>+</span>
                </summary>
                <div style={{
                  padding: '0 24px 18px',
                  color: '#6b7280',
                  fontSize: '0.875rem',
                  lineHeight: '1.7',
                  borderTop: '1px solid #f3f4f6',
                }}>
                  <div style={{ paddingTop: '14px' }}>{faq.answer}</div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BOTTOM ── */}
      <section style={{
        background: 'linear-gradient(135deg, #1877f2 0%, #010101 100%)',
        padding: '80px 0',
        textAlign: 'center',
      }}>
        <div className="container mx-auto px-4">
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            color: '#fff',
            marginBottom: '16px',
          }}>
            Ready to Download Your Facebook Video?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '32px', fontSize: '1.05rem' }}>
            Free, fast, HD quality. No account needed. Works on all devices.
          </p>
          <ScrollToTopButton style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            background: '#fff',
            color: '#1877f2',
            padding: '16px 36px',
            borderRadius: '14px',
            fontWeight: 800,
            fontSize: '1.05rem',
            textDecoration: 'none',
            boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
            fontFamily: "'Outfit', sans-serif",
          }}>
            ⬇️ Download Facebook Video Now
          </ScrollToTopButton>
        </div>
      </section>

      {/* OTHER TOOLS */}
      <section style={{ padding: '40px 0', background: '#f9fafb', borderTop: '1px solid #e5e7eb' }}>
        <div className="container mx-auto px-4" style={{ maxWidth: '900px', textAlign: 'center' }}>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '16px' }}>
            Also Download From
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            <a href="/instagram-reels-downloader" style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '9px 18px', borderRadius: '10px', background: '#fff', border: '1px solid #e5e7eb', color: '#374151', fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', whiteSpace: 'nowrap' }}>
              <span style={{ display: 'flex', alignItems: 'center' }}><InstagramIcon size={18} /></span> Instagram Download
            </a>
            <a href="/tiktok-video-downloader" style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '9px 18px', borderRadius: '10px', background: '#fff', border: '1px solid #e5e7eb', color: '#374151', fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', whiteSpace: 'nowrap' }}>
              <span style={{ display: 'flex', alignItems: 'center' }}><TikTokIcon size={18} /></span> TikTok Download
            </a>
            <a href="/youtube-video-downloader" style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '9px 18px', borderRadius: '10px', background: '#fff', border: '1px solid #e5e7eb', color: '#374151', fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', whiteSpace: 'nowrap' }}>
              <span style={{ display: 'flex', alignItems: 'center' }}><YouTubeIcon size={18} /></span> YouTube Download
            </a>
            <a href="/twitter-video-downloader" style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '9px 18px', borderRadius: '10px', background: '#fff', border: '1px solid #e5e7eb', color: '#374151', fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', whiteSpace: 'nowrap' }}>
              <span style={{ display: 'flex', alignItems: 'center' }}><XTwitterIcon size={18} /></span> Twitter Download
            </a>
            <a href="/pinterest-video-downloader" style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '9px 18px', borderRadius: '10px', background: '#fff', border: '1px solid #e5e7eb', color: '#374151', fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', whiteSpace: 'nowrap' }}>
              <span style={{ display: 'flex', alignItems: 'center' }}><PinterestIcon size={18} /></span> Pinterest Download
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
