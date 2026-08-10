import DownloadForm from '@/components/DownloadForm';
import JsonLd from '@/components/JsonLd';
import { generateFAQSchema, generateHowToSchema, generateBreadcrumbSchema } from '@/lib/schema';
import Link from 'next/link';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { InstagramIcon, FacebookIcon, YouTubeIcon, XTwitterIcon, PinterestIcon, TikTokIcon } from '@/components/PlatformIcons';export const metadata = {
  title: 'TikTok Video Downloader - No Watermark, HD',
  description: 'Download TikTok videos without watermark in HD quality. Free TikTok to MP4 & MP3 converter. No registration required. Works on all devices.',
  keywords: [
    'tiktok video downloader',
    'download tiktok videos',
    'tiktok downloader no watermark',
    'save tiktok videos',
    'tiktok mp4 download',
    'tiktok to mp3',
    'tiktok video saver',
    'download tiktok without watermark',
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
    title: 'TikTok Video Downloader - No Watermark, HD',
    description: 'Download TikTok videos without watermark in HD quality. Free TikTok to MP4 & MP3 converter.',
    url: 'https://socialpully.com/tiktok-video-downloader',
    type: 'website',
  },
  alternates: {
    canonical: 'https://socialpully.com/tiktok-video-downloader',
  },
};

const faqs = [
  { question: 'Is SocialPully free to use?', answer: 'Yes, completely free with no hidden charges or registration required.' },
  { question: 'Can I download without watermark?', answer: 'Yes, we automatically remove TikTok watermarks from downloaded videos.' },
  { question: 'Does it work on iPhone?', answer: 'Yes, works perfectly on iPhone, iPad, and all iOS devices using Safari.' },
  { question: 'What video quality is available?', answer: 'We support HD 1080p, 720p SD, and original quality downloads.' },
  { question: 'Can I download private videos?', answer: 'No, only public TikTok videos can be downloaded due to privacy settings.' },
  { question: 'Is there a download limit?', answer: 'No, download unlimited videos without any restrictions or quotas.' },
  { question: 'Do I need to install an app?', answer: 'No installation needed. Use directly from your web browser.' },
  { question: 'Is it safe?', answer: "Yes, completely safe. We don't store your videos or personal data." },
];

const features = [
  {
    icon: '🚫',
    title: 'No Watermark Downloads',
    desc: 'We remove the TikTok watermark and username overlay, giving you a clean, original-quality video file. Ideal for content creators repurposing clips for Instagram Reels or YouTube Shorts.',
  },
  {
    icon: '📺',
    title: 'HD & Full HD Quality',
    desc: 'While many downloaders compress video quality, our tool preserves the original resolution. If the TikTok video was uploaded in 1080p, you get 1080p.',
  },
  {
    icon: '🌐',
    title: 'No App Installation',
    desc: 'Everything works directly in your browser. No APK files, no Chrome extensions, no desktop software — consistent with cybersecurity best practices.',
  },
  {
    icon: '💎',
    title: '100% Free — No Hidden Charges',
    desc: 'No premium tiers, no trial periods, no credit card required. Unlimited downloads, always free.',
  },
  {
    icon: '📱',
    title: 'Works on All Devices',
    desc: 'Android, iPhone/iPad, Windows PC, Mac, and Linux. Compatible with Chrome, Safari, Firefox, and all major browsers.',
  },
  {
    icon: '⚡',
    title: 'Fast Processing Speed',
    desc: 'Our servers are optimized for high-speed processing. Average download time: 2–5 seconds per video.',
  },
  {
    icon: '🔒',
    title: 'Private & Secure',
    desc: "We don't store your downloaded videos on our servers. All files are processed in real-time and deleted immediately. GDPR-aligned data practices.",
  },
  {
    icon: '👤',
    title: 'No Login or Registration',
    desc: "We don't ask for your email, TikTok credentials, or any personal information. Your privacy matters.",
  },
];

const steps = [
  { num: '01', title: 'Open TikTok', desc: 'Open TikTok and find the video you want to download.' },
  { num: '02', title: 'Copy Link', desc: 'Tap the Share button and select "Copy Link" from the options.' },
  { num: '03', title: 'Paste URL', desc: 'Paste the TikTok video link in our downloader above.' },
  { num: '04', title: 'Download!', desc: 'Click Download — your TikTok video saves instantly to your device!' },
];

const stats = [
  { value: '10M+', label: 'Downloads' },
  { value: '4.9★', label: 'Rating' },
  { value: '150+', label: 'Countries' },
  { value: '99.9%', label: 'Uptime' },
];

export default function TikTokDownloader() {
  const faqSchema = generateFAQSchema(faqs);
  const howToSchema = generateHowToSchema('tiktok');
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://socialpully.com' },
    { name: 'TikTok Video Downloader', url: 'https://socialpully.com/tiktok-video-downloader' },
  ]);

  return (
    <div className="min-h-screen" style={{ background: '#fff' }}>
      <JsonLd data={faqSchema} />
      <JsonLd data={howToSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* ── HERO SECTION ── */}
      <section
        style={{
          background: 'linear-gradient(160deg, #0a0a0a 0%, #1a0a0f 50%, #0a0a1a 100%)',
          padding: '72px 0 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative blobs */}
        <div style={{
          position: 'absolute', top: '-80px', right: '-80px',
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(254,44,85,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-60px', left: '-60px',
          width: '300px', height: '300px',
          background: 'radial-gradient(circle, rgba(105,201,208,0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }} />

        <div className="container mx-auto px-4" style={{ position: 'relative', zIndex: 1 }}>
          {/* Breadcrumb */}
          <nav style={{ marginBottom: '24px' }} aria-label="Breadcrumb">
            <ol style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.8rem', color: '#6b7280' }}>
              <li><Link href="/" style={{ color: '#9ca3af' }} className="hover:text-white">Home</Link></li>
              <li style={{ color: '#4b5563' }}>›</li>
              <li style={{ color: '#fe2c55' }}>TikTok Video Downloader</li>
            </ol>
          </nav>

          {/* Badge */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
            <span style={{
              background: 'linear-gradient(135deg, rgba(254,44,85,0.15), rgba(105,201,208,0.15))',
              border: '1px solid rgba(254,44,85,0.3)',
              color: '#fe2c55',
              padding: '6px 16px',
              borderRadius: '100px',
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.03em',
            }}>
              #1 TikTok Downloader · 15M+ Downloads Since 2022
            </span>
          </div>

          {/* H1 */}
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
            <TikTokIcon size={48} /> TikTok Video Downloader
          </h1>

          <p style={{
            textAlign: 'center',
            color: '#9ca3af',
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            marginBottom: '12px',
            fontWeight: 500,
          }}>
            Download TikTok Videos Without Watermark — Free & HD
          </p>

          {/* Trust badges inline */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '40px',
          }}>
            {['✅ No Watermark', '✅ HD Quality', '✅ 100% Free', '✅ No Registration'].map(b => (
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

          {/* Download Form */}
          <DownloadForm platform="tiktok" />
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section style={{ background: '#fe2c55', padding: '28px 0' }}>
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
                background: 'linear-gradient(135deg, #fe2c55 0%, #ff6b6b 100%)',
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
                What Is a TikTok Video Downloader?
              </h2>
              <p style={{ color: '#4b5563', lineHeight: '1.7', marginBottom: '16px' }}>
                A TikTok Video Downloader is a free online tool that allows you to save TikTok videos directly to your device — whether it&apos;s a smartphone, tablet, or desktop computer — without needing to install any software or create an account.
              </p>
              <p style={{ color: '#4b5563', lineHeight: '1.7', marginBottom: '20px' }}>
                TikTok&apos;s native app allows you to save some videos, but they come with a TikTok watermark overlaid on the content, and many creators disable the download option entirely. Our TikTok Video Downloader solves both problems.
              </p>
              <div style={{ background: '#fef9f0', borderLeft: '3px solid #fe2c55', padding: '16px 20px', borderRadius: '0 8px 8px 0' }}>
                <p style={{ color: '#374151', fontSize: '0.875rem', lineHeight: '1.6', margin: 0 }}>
                  💡 <strong>Our Experience:</strong> We&apos;ve processed over 15 million TikTok downloads since 2022. Our tool is optimized for speed, reliability, and the highest output quality available.
                </p>
              </div>
            </div>

            {/* Feature list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                'Download any public TikTok video, even when the download button is disabled',
                'Remove the TikTok watermark automatically',
                'Save videos in HD quality (up to 1080p)',
                'Convert TikTok videos to MP3 for audio-only saves',
                'Download on any device — iPhone, Android, PC, or Mac',
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
                    background: 'linear-gradient(135deg, #fe2c55 0%, #ff6b6b 100%)',
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
              How to Download TikTok Videos Without Watermark
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
                transition: 'all 0.2s',
              }}
              className="hover:border-red-500/30 hover:bg-white/5"
              >
                <div style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 800,
                  fontSize: '2.2rem',
                  background: 'linear-gradient(135deg, #fe2c55 0%, #69c9d0 100%)',
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

      {/* ── WHY CHOOSE SECTION (bullets) ── */}
      <section style={{ padding: '80px 0', background: '#fff' }}>
        <div className="container mx-auto px-4" style={{ maxWidth: '900px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '48px',
            alignItems: 'center',
          }}>
            <div>
              <h2 style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                color: '#0a0a0a',
                marginBottom: '12px',
              }}>
                Why Choose Our TikTok Downloader?
              </h2>
              <p style={{ color: '#6b7280', lineHeight: '1.7', marginBottom: '28px' }}>
                Download TikTok videos without watermark using SocialPully&apos;s free TikTok downloader. Save TikTok videos in HD and 4K quality directly to your device. No app installation, no login required — just paste the TikTok link and download.
              </p>
              <ScrollToTopButton
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'linear-gradient(135deg, #fe2c55 0%, #c8002e 100%)',
                  color: '#fff',
                  padding: '14px 28px',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  textDecoration: 'none',
                  boxShadow: '0 8px 30px rgba(254,44,85,0.35)',
                }}
              >
                ⬇️ Download TikTok Video Free
              </ScrollToTopButton>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'No Watermark', desc: 'Download TikTok videos without the TikTok watermark' },
                { label: 'HD & 4K Quality', desc: 'Save videos in original quality up to 4K resolution' },
                { label: 'MP4 Format', desc: 'Downloaded TikTok videos in universal MP4 format' },
                { label: 'No App Required', desc: 'Download TikTok videos directly in browser' },
                { label: 'Unlimited Downloads', desc: 'Download as many TikTok videos as you want' },
                { label: 'All Devices', desc: 'iPhone, Android, PC, Mac compatible' },
              ].map((item) => (
                <div key={item.label} style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start',
                  padding: '12px 0',
                  borderBottom: '1px solid #f3f4f6',
                }}>
                  <span style={{
                    color: '#fe2c55',
                    fontWeight: 800,
                    fontSize: '1rem',
                    marginTop: '1px',
                    flexShrink: 0,
                  }}>✓</span>
                  <div>
                    <strong style={{ color: '#0a0a0a', fontSize: '0.9rem' }}>{item.label}:</strong>{' '}
                    <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
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
            <p style={{ color: '#6b7280' }}>Everything you need to know about downloading TikTok videos.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, i) => (
              <details
                key={i}
                style={{
                  background: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  overflow: 'hidden',
                }}
              >
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
                  <span style={{ color: '#fe2c55', fontWeight: 700, flexShrink: 0, marginLeft: '12px' }}>+</span>
                </summary>
                <div style={{
                  padding: '0 24px 18px',
                  color: '#6b7280',
                  fontSize: '0.875rem',
                  lineHeight: '1.7',
                  borderTop: '1px solid #f3f4f6',
                  marginTop: '-1px',
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
        background: 'linear-gradient(135deg, #fe2c55 0%, #010101 100%)',
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
            Ready to Download Your TikTok Video?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '32px', fontSize: '1.05rem' }}>
            Free, fast, no watermark. No account needed. Works on all devices.
          </p>
          <ScrollToTopButton
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: '#fff',
              color: '#fe2c55',
              padding: '16px 36px',
              borderRadius: '14px',
              fontWeight: 800,
              fontSize: '1.05rem',
              textDecoration: 'none',
              boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            ⬇️ Download TikTok Video Now
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
            <a href="/facebook-video-downloader" style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '9px 18px', borderRadius: '10px', background: '#fff', border: '1px solid #e5e7eb', color: '#374151', fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', whiteSpace: 'nowrap' }}>
              <span style={{ display: 'flex', alignItems: 'center' }}><FacebookIcon size={18} /></span> Facebook Download
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