import DownloadForm from '@/components/DownloadForm';
import JsonLd from '@/components/JsonLd';
import { generateFAQSchema, generateBreadcrumbSchema } from '@/lib/schema';
import Link from 'next/link';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { InstagramIcon, TikTokIcon, FacebookIcon, XTwitterIcon, PinterestIcon, YouTubeIcon} from '@/components/PlatformIcons';

export const metadata = {
  title: 'YouTube Video Downloader - MP4, HD 1080p',
  description: 'Download YouTube videos in MP4, HD 1080p, 4K quality. Free YouTube to MP4 converter. Save YouTube videos offline. No software installation required.',
  keywords: [
    'youtube video downloader',
    'download youtube videos',
    'youtube to mp4',
    'youtube mp4 downloader',
    'youtube downloader online',
    'save youtube videos offline',
    'youtube to mp3',
    'youtube shorts downloader',
    'youtube 4k downloader',
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
    title: 'YouTube Video Downloader - MP4, HD 1080p',
    description: 'Download YouTube videos in MP4, HD 1080p, 4K quality. Free YouTube to MP4 converter. No software required.',
    url: 'https://socialpully.com/youtube-video-downloader',
    type: 'website',
  },
  alternates: {
    canonical: 'https://socialpully.com/youtube-video-downloader',
  },
};

const faqs = [
  { question: 'Is this YouTube video downloader free?', answer: 'Yes, completely free with no hidden charges, subscriptions, or registration required. Download YouTube videos unlimited times without any cost.' },
  { question: 'What video quality options are available?', answer: 'We support 4K Ultra HD (2160p), Full HD (1080p), HD (720p), SD (480p, 360p), and Low (240p, 144p) quality options. Our YouTube MP4 downloader preserves the original upload quality.' },
  { question: 'Can I convert YouTube to MP3?', answer: 'Yes! Extract audio from YouTube videos and convert YouTube to MP3 format. Perfect for music, podcasts, audiobooks, educational lectures, and more.' },
  { question: 'Does it work on iPhone?', answer: 'Yes, works perfectly on iPhone, iPad, and all iOS devices using Safari or Chrome. Special iOS optimization ensures smooth downloads.' },
  { question: 'Can I download YouTube Shorts?', answer: 'Yes, our YouTube Shorts downloader works just like regular YouTube videos. Shorts are automatically detected and saved in vertical format optimized for mobile viewing.' },
  { question: 'Is there a download limit?', answer: 'No, download YouTube videos online with unlimited downloads. No restrictions or quotas on how many videos you can save.' },
  { question: 'Do I need to install any software?', answer: 'No installation needed. Our YouTube video downloader works directly from your web browser without any app downloads or extensions.' },
  { question: 'Is it safe and secure?', answer: "Yes, completely safe and secure. We don't store your downloaded videos on our servers. All files are processed in real-time and deleted immediately after download." },
];

const features = [
  {
    icon: '🎬',
    title: 'Multiple Quality Options',
    desc: 'Download YouTube videos in 4K Ultra HD (2160p), Full HD (1080p), HD (720p), SD (480p, 360p), and Low (240p, 144p). Our YouTube MP4 downloader preserves the original upload quality.',
  },
  {
    icon: '🎵',
    title: 'YouTube to MP3 Converter',
    desc: 'Extract audio from YouTube videos and convert YouTube to MP3 format. Perfect for music downloads, podcasts, audiobooks, educational lectures, guided meditations, and language learning content.',
  },
  {
    icon: '🌐',
    title: 'No Software Installation Required',
    desc: 'Everything works directly in your browser. No APK files, no Chrome extensions, no desktop applications. Consistent with cybersecurity best practices recommended by CISA.',
  },
  {
    icon: '💎',
    title: '100% Free — No Hidden Costs',
    desc: 'No premium tiers, no trial periods, no credit card required. Save YouTube videos offline with unlimited downloads, always free. No ads during the download process.',
  },
  {
    icon: '⚡',
    title: 'Lightning-Fast Processing Speed',
    desc: 'Average YouTube video download time: 5–15 seconds. Multiple concurrent downloads supported. No queuing or waiting times. Smart CDN routing for fastest speeds worldwide.',
  },
  {
    icon: '📱',
    title: 'Works on All Devices & Browsers',
    desc: 'Android (Chrome, Firefox, Opera, Samsung Internet), iPhone/iPad (Safari, Chrome) with special iOS optimization, Windows PC, Mac, and Linux — all major browsers supported.',
  },
  {
    icon: '🎞️',
    title: 'YouTube Shorts Downloader',
    desc: 'Download YouTube Shorts videos just like regular YouTube videos. Shorts are automatically detected and can be saved in vertical format optimized for mobile viewing.',
  },
  {
    icon: '👤',
    title: 'No Registration or Login Required',
    desc: "We don't ask for your email, YouTube account, or any personal information. Simply paste the link and download YouTube videos instantly. Your privacy matters to us.",
  },
];

const steps = [
  { num: '01', title: 'Open YouTube', desc: 'Open YouTube and find the video you want to download.' },
  { num: '02', title: 'Copy URL', desc: 'Copy the video URL from the address bar.' },
  { num: '03', title: 'Paste & Select', desc: 'Paste the YouTube video link in our downloader above and select your preferred quality (MP4 or MP3).' },
  { num: '04', title: 'Download!', desc: 'Click Download — your YouTube video saves instantly to your device!' },
];

const stats = [
  { value: '25M+', label: 'Downloads' },
  { value: '4.9★', label: 'Rating' },
  { value: '180+', label: 'Countries' },
  { value: '99.9%', label: 'Uptime' },
];

export default function YouTubeDownloader() {
  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://socialpully.com' },
    { name: 'YouTube Video Downloader', url: 'https://socialpully.com/youtube-video-downloader' },
  ]);

  return (
    <div className="min-h-screen" style={{ background: '#fff' }}>
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* ── HERO SECTION ── */}
      <section style={{
        background: 'linear-gradient(160deg, #0a0a0a 0%, #1a0a0a 50%, #0a0a0a 100%)',
        padding: '72px 0 80px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-80px', right: '-80px',
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(255,0,0,0.18) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-60px', left: '-60px',
          width: '300px', height: '300px',
          background: 'radial-gradient(circle, rgba(255,100,0,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }} />

        <div className="container mx-auto px-4" style={{ position: 'relative', zIndex: 1 }}>
          <nav style={{ marginBottom: '24px' }} aria-label="Breadcrumb">
            <ol style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.8rem', color: '#6b7280' }}>
              <li><Link href="/" style={{ color: '#9ca3af' }}>Home</Link></li>
              <li style={{ color: '#4b5563' }}>›</li>
              <li style={{ color: '#ff0000' }}>YouTube Video Downloader</li>
            </ol>
          </nav>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
            <span style={{
              background: 'linear-gradient(135deg, rgba(255,0,0,0.15), rgba(255,100,0,0.1))',
              border: '1px solid rgba(255,0,0,0.3)',
              color: '#ff4444',
              padding: '6px 16px',
              borderRadius: '100px',
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.03em',
            }}>
              #1 YouTube Downloader · 25M+ Downloads Served
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
            <YouTubeIcon size={48} /> YouTube Video Downloader
          </h1>

          <p style={{
            textAlign: 'center',
            color: '#9ca3af',
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            marginBottom: '12px',
            fontWeight: 500,
          }}>
            Download YouTube Videos in HD, 4K &amp; MP4 — Fast &amp; Free
          </p>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '40px',
          }}>
            {['✅ HD & 4K Quality', '✅ MP4 Format', '✅ 100% Free', '✅ No Limitations'].map(b => (
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

          <DownloadForm platform="youtube" />
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section style={{ background: '#ff0000', padding: '28px 0' }}>
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
                background: '#ff0000',
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
                What Is a YouTube Video Downloader?
              </h2>
              <p style={{ color: '#4b5563', lineHeight: '1.7', marginBottom: '16px' }}>
                A YouTube Video Downloader is a free online tool that allows you to save YouTube videos directly to your device — without needing to install any software or create an account.
              </p>
              <p style={{ color: '#4b5563', lineHeight: '1.7', marginBottom: '20px' }}>
                YouTube&apos;s official platform doesn&apos;t provide a built-in download option for most videos. While YouTube Premium offers offline viewing, it requires a monthly subscription. Our <strong>YouTube video downloader</strong> solves these limitations — for free.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                'Download YouTube videos in multiple formats (MP4, MP3, WEBM)',
                'Save videos in various qualities: 144p to 4K Ultra HD',
                'Convert YouTube to MP4 for universal device compatibility',
                'Convert YouTube to MP3 for audio-only downloads',
                'Download YouTube Shorts, live streams, and more',
                'Save YouTube videos offline on any device — iPhone, Android, PC, or Mac',
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
                    background: '#ff0000',
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
              How to Download YouTube Videos to MP4
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
                  background: 'linear-gradient(135deg, #ff0000 0%, #ff6600 100%)',
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
              Key Features of Our YouTube Video Downloader
            </h2>
            <p style={{ color: '#6b7280', maxWidth: '520px', margin: '0 auto' }}>
              Here&apos;s what sets our <strong>YouTube video downloader</strong> apart from other download tools available online.
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
            <p style={{ color: '#6b7280' }}>Everything you need to know about downloading YouTube videos.</p>
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
                  <span style={{ color: '#ff0000', fontWeight: 700, flexShrink: 0, marginLeft: '12px' }}>+</span>
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
        background: 'linear-gradient(135deg, #ff0000 0%, #010101 100%)',
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
            Ready to Download Your YouTube Video?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '32px', fontSize: '1.05rem' }}>
            Free, fast, HD & 4K quality. No account needed. Works on all devices.
          </p>
          <ScrollToTopButton style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            background: '#fff',
            color: '#ff0000',
            padding: '16px 36px',
            borderRadius: '14px',
            fontWeight: 800,
            fontSize: '1.05rem',
            textDecoration: 'none',
            boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
            fontFamily: "'Outfit', sans-serif",
          }}>
            ⬇️ Download YouTube Video Now
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
            <a href="/facebook-video-downloader" style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '9px 18px', borderRadius: '10px', background: '#fff', border: '1px solid #e5e7eb', color: '#374151', fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', whiteSpace: 'nowrap' }}>
              <span style={{ display: 'flex', alignItems: 'center' }}><FacebookIcon size={18} /></span> Facebook Download
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
