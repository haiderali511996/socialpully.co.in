import DownloadForm from '@/components/DownloadForm';
import JsonLd from '@/components/JsonLd';
import { generateFAQSchema, generateHowToSchema, generateBreadcrumbSchema } from '@/lib/schema';
import Link from 'next/link';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { InstagramIcon, TikTokIcon, FacebookIcon, YouTubeIcon, XTwitterIcon, PinterestIcon } from '@/components/PlatformIcons';

export const metadata = {
  title: 'Pinterest Video Downloader - Save Pinterest Videos Free',
  description: 'Download Pinterest videos, GIFs and pins in HD quality. Free Pinterest video downloader online. Save Pinterest videos to MP4. No registration required.',
  keywords: [
    'pinterest video downloader',
    'download pinterest videos',
    'pinterest downloader',
    'save pinterest videos',
    'pinterest video downloader online',
    'pinterest video downloader free',
    'pinterest gif downloader',
    'download pinterest pins',
    'pinterest to mp4',
    'pinterest idea pin downloader',
    'download videos from pinterest',
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
    title: 'Pinterest Video Downloader - Save Pinterest Videos Free',
    description: 'Download Pinterest videos, GIFs and pins in HD quality. Free online tool — no registration, works on all devices.',
    url: 'https://socialpully.com/pinterest-video-downloader',
    type: 'website',
  },
  alternates: {
    canonical: 'https://socialpully.com/pinterest-video-downloader',
  },
};

const faqs = [
  { question: 'Is this Pinterest video downloader free?', answer: 'Yes, completely free with no hidden charges, premium plans, or registration requirements. Download Pinterest videos online unlimited times.' },
  { question: 'Can I download Pinterest videos on iPhone?', answer: 'Yes, our tool works perfectly on iPhone and iPad using Safari or Chrome. After clicking download, you can save the video to your Photos app or Files.' },
  { question: 'Can I download Pinterest GIFs?', answer: 'Yes, our Pinterest video downloader online saves Pinterest GIFs as MP4 video files. Animated pins on Pinterest are short looping videos, so they download as standard video files.' },
  { question: 'What video quality can I download?', answer: 'We support multiple qualities: 1080p Full HD, 720p HD, 480p SD, and 360p. The available qualities depend on what the original creator uploaded.' },
  { question: 'Do I need to install an app?', answer: 'No app installation needed. Our Pinterest video downloader free tool works directly in your web browser on any device. No downloads, no APK files, no software required.' },
  { question: 'Can I download private Pinterest videos?', answer: "No. We can only download videos from Pinterest that are publicly accessible. If a pin is from a private/secret board, you must have board access and view it within Pinterest itself." },
  { question: 'Is there a download limit?', answer: 'No limits whatsoever. Download Pinterest videos as many times as you want, whenever you want. No daily caps, no monthly restrictions.' },
  { question: 'What format are downloaded videos?', answer: 'All videos are downloaded as MP4 files, which is the most universal video format. MP4 plays on virtually every device, media player, and platform.' },
  { question: 'Can I download Pinterest videos on Android?', answer: 'Yes, our tool works perfectly on all Android devices. Videos download directly to your Gallery or Downloads folder. Use any browser like Chrome, Firefox, or Samsung Internet.' },
  { question: 'Can I download Idea Pins / Story Pins?', answer: 'Yes! Copy the link to any Idea Pin or Story Pin that contains video content, and you can save Pinterest videos from it directly.' },
  { question: 'How do I find the Pinterest video URL?', answer: 'On the pin with the video: click/tap the Share button (arrow icon), select "Copy Link", then paste it in our downloader.' },
  { question: 'Is it safe to use this downloader?', answer: "Completely safe. We don't store your videos, don't track your activity, and don't require any personal information. Your downloaded videos are processed and delivered securely." },
];

const features = [
  { icon: '📌', title: 'Videos, GIFs & Animated Pins', desc: 'Download Pinterest videos, animated GIFs, and idea pins in MP4 format. Perfect for saving creative DIY tutorials, recipe animations, and inspirational content.' },
  { icon: '📺', title: 'HD Quality — Up to 1080p', desc: 'Save videos in original quality up to 1080p Full HD. Choose from multiple quality options: 1080p, 720p, 480p, and 360p depending on what the original creator uploaded.' },
  { icon: '🌐', title: 'No App Installation', desc: 'Everything works directly in your browser. No APK files, no App Store downloads, no desktop software — consistent with CISA cybersecurity best practices.' },
  { icon: '💎', title: '100% Free — Forever', desc: "No premium plans, no trial periods, no hidden fees. Download videos from Pinterest unlimited times, completely free. We don't even ask for your email address." },
  { icon: '📱', title: 'All Devices Supported', desc: 'iPhone, iPad, Android, Windows PC, Mac, and Linux. Compatible with Chrome, Safari, Firefox, Opera, and all major browsers — even Samsung Internet.' },
  { icon: '⚡', title: 'Lightning-Fast Processing', desc: 'Our optimized servers process Pinterest video downloads in under 3 seconds on average. Multiple global CDN endpoints ensure fast download speeds regardless of your location.' },
  { icon: '🔒', title: 'Private & Secure', desc: "We don't store downloaded videos on our servers. All video processing happens in real-time. Files are automatically deleted after delivery. GDPR compliant and privacy-focused." },
  { icon: '💡', title: 'Idea Pins & Story Pins', desc: 'Our Pinterest video downloader works with regular video pins, Story Pins / Idea Pins, animated GIF pins, videos with multiple media slides, and embedded videos in boards.' },
];

const steps = [
  { num: '01', title: 'Open Pinterest', desc: 'Open Pinterest and find the video pin you want to save.' },
  { num: '02', title: 'Copy the Link', desc: 'Click the Share icon and select "Copy Link".' },
  { num: '03', title: 'Paste the URL', desc: 'Paste the pin link in our downloader input field above.' },
  { num: '04', title: 'Download!', desc: 'Click Download — your Pinterest video saves instantly to your device!' },
];

const stats = [
  { value: '12M+', label: 'Downloads' },
  { value: '4.9★', label: 'Rating' },
  { value: '160+', label: 'Countries' },
  { value: '99.9%', label: 'Uptime' },
];

const FONT = "'Outfit', sans-serif";
const PINTEREST_RED = '#E60023';
const PINTEREST_DARK = '#ad081b';

export default function PinterestVideoDownloaderPage() {
  const faqSchema = generateFAQSchema(faqs);
  const howToSchema = generateHowToSchema('pinterest');
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://socialpully.com' },
    { name: 'Pinterest Video Downloader', url: 'https://socialpully.com/pinterest-video-downloader' },
  ]);

  return (
    <div className="min-h-screen" style={{ background: '#fff' }}>
      <JsonLd data={faqSchema} />
      <JsonLd data={howToSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* HERO */}
      <section style={{
        background: 'linear-gradient(160deg, #1a0008 0%, #2a000e 45%, #0f0a00 100%)',
        padding: '72px 0 80px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '420px', height: '420px', background: 'radial-gradient(circle, rgba(230,0,35,0.18) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '320px', height: '320px', background: 'radial-gradient(circle, rgba(255,150,150,0.1) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

        <div className="container mx-auto px-4" style={{ position: 'relative', zIndex: 1 }}>
          <nav style={{ marginBottom: '28px' }} aria-label="Breadcrumb">
            <ol style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.82rem', color: '#6b7280' }}>
              <li><Link href="/" style={{ color: '#9ca3af' }}>Home</Link></li>
              <li style={{ color: '#4b5563' }}>›</li>
              <li style={{ color: '#ff8fa3' }}>Pinterest Video Downloader</li>
            </ol>
          </nav>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
            <span style={{ background: 'linear-gradient(135deg, rgba(230,0,35,0.15), rgba(255,150,150,0.12))', border: '1px solid rgba(230,0,35,0.35)', color: '#ff8fa3', padding: '6px 18px', borderRadius: '100px', fontSize: '0.8rem', fontFamily: FONT, fontWeight: 700 }}>
              Pinterest Video Downloader · 12M+ Videos Saved
            </span>
          </div>

          <h1 style={{ fontFamily: FONT, fontWeight: 900, fontSize: 'clamp(2.4rem, 5.5vw, 4rem)', textAlign: 'center', marginBottom: '16px', color: '#fff', lineHeight: 1.05, letterSpacing: '-0.03em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <PinterestIcon size={48} /> Pinterest Video Downloader
          </h1>

          <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: 'clamp(1rem, 2vw, 1.2rem)', marginBottom: '14px', fontFamily: FONT, fontWeight: 500 }}>
            Download Pinterest Videos, GIFs &amp; Pins — Free &amp; HD Quality
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginBottom: '42px' }}>
            {['✅ Videos & GIFs', '✅ HD Quality', '✅ 100% Free', '✅ No Registration'].map(b => (
              <span key={b} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fecdd3', padding: '6px 14px', borderRadius: '8px', fontSize: '0.8rem', fontFamily: FONT, fontWeight: 600 }}>{b}</span>
            ))}
          </div>

          <DownloadForm platform="pinterest" />
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: PINTEREST_RED, padding: '28px 0' }}>
        <div className="container mx-auto px-4">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '48px' }}>
            {stats.map(({ value, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: '2rem', color: '#fff', lineHeight: 1, marginBottom: '4px' }}>{value}</div>
                <div style={{ color: 'rgba(255,255,255,0.82)', fontSize: '0.78rem', fontFamily: FONT, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT IS */}
      <section style={{ padding: '88px 0', background: '#fff' }}>
        <div className="container mx-auto px-4" style={{ maxWidth: '960px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '56px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-block', background: `linear-gradient(135deg, ${PINTEREST_RED} 0%, #ff8fa3 100%)`, color: '#fff', padding: '5px 14px', borderRadius: '6px', fontSize: '0.72rem', fontFamily: FONT, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', marginBottom: '18px' }}>About This Tool</div>
              <h2 style={{ fontFamily: FONT, fontWeight: 800, fontSize: 'clamp(1.7rem, 3.2vw, 2.3rem)', marginBottom: '20px', color: '#0a0a0a', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
                What Is a Pinterest Video Downloader?
              </h2>
              <p style={{ color: '#4b5563', lineHeight: '1.78', marginBottom: '16px' }}>
                A Pinterest Video Downloader is a free online tool that allows you to save Pinterest videos, GIFs, and animated pins directly to your device — whether it&apos;s a smartphone, tablet, or desktop computer — without needing to install any software or create an account.
              </p>
              <p style={{ color: '#4b5563', lineHeight: '1.78', marginBottom: '22px' }}>
                Pinterest doesn&apos;t provide a native download button for videos. You can only save pins to your boards or share them within the platform. Our Pinterest video downloader online tool solves this problem instantly.
              </p>
              <div style={{ background: '#fff0f3', borderLeft: `3px solid ${PINTEREST_RED}`, padding: '16px 20px', borderRadius: '0 10px 10px 0' }}>
                <p style={{ color: '#374151', fontSize: '0.875rem', lineHeight: '1.65', margin: 0 }}>
                  💡 <strong>Works with Idea Pins &amp; Story Pins:</strong> Our tool supports all Pinterest content types — regular videos, animated GIFs, Idea Pins, Story Pins, and board videos.
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                'Download Pinterest videos from any public pin instantly',
                'Save Pinterest GIFs as video files (MP4 format)',
                'Download Pinterest pins in HD quality (up to 1080p)',
                'Convert Pinterest videos to MP4 for universal compatibility',
                'Save Pinterest videos on any device — iPhone, Android, PC, or Mac',
                'Download videos from Pinterest without app installation',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '14px 16px', background: '#f9fafb', borderRadius: '10px', border: '1px solid #f3f4f6' }}>
                  <span style={{ width: '22px', height: '22px', minWidth: '22px', background: `linear-gradient(135deg, ${PINTEREST_RED} 0%, #ff8fa3 100%)`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', color: '#fff', fontWeight: 800, marginTop: '1px' }}>✓</span>
                  <span style={{ color: '#374151', fontSize: '0.875rem', lineHeight: '1.6' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW TO */}
      <section style={{ padding: '88px 0', background: '#0a0a0a' }}>
        <div className="container mx-auto px-4" style={{ maxWidth: '960px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontFamily: FONT, fontWeight: 800, fontSize: 'clamp(1.7rem, 3.2vw, 2.5rem)', color: '#fff', marginBottom: '12px', letterSpacing: '-0.02em' }}>
              How to Download Pinterest Videos in 3 Easy Steps
            </h2>
            <p style={{ color: '#9ca3af' }}>Done in seconds — no account, no app, no fuss.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
            {steps.map((step) => (
              <div key={step.num} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '18px', padding: '32px 24px', textAlign: 'center' }}>
                <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: '2.5rem', background: `linear-gradient(135deg, ${PINTEREST_RED} 0%, #ff8fa3 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '14px' }}>{step.num}</div>
                <h3 style={{ fontFamily: FONT, fontWeight: 700, color: '#fff', marginBottom: '10px', fontSize: '1.05rem' }}>{step.title}</h3>
                <p style={{ color: '#9ca3af', fontSize: '0.875rem', lineHeight: '1.65' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: '88px 0', background: '#f9fafb' }}>
        <div className="container mx-auto px-4" style={{ maxWidth: '1100px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontFamily: FONT, fontWeight: 800, fontSize: 'clamp(1.7rem, 3.2vw, 2.5rem)', color: '#0a0a0a', marginBottom: '12px', letterSpacing: '-0.02em' }}>
              Key Features of Our Pinterest Video Downloader
            </h2>
            <p style={{ color: '#6b7280', maxWidth: '520px', margin: '0 auto', lineHeight: '1.7' }}>
              Here&apos;s what makes our Pinterest video downloader free tool the best choice for saving videos from Pinterest.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(255px, 1fr))', gap: '20px' }}>
            {features.map((f, i) => (
              <div key={i} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '28px 24px' }} className="card-hover">
                <div style={{ fontSize: '2rem', marginBottom: '14px', lineHeight: 1 }}>{f.icon}</div>
                <h3 style={{ fontFamily: FONT, fontWeight: 700, color: '#0a0a0a', marginBottom: '10px', fontSize: '1.05rem', letterSpacing: '-0.01em' }}>{f.title}</h3>
                <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: '1.7' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '88px 0', background: '#f9fafb' }}>
        <div className="container mx-auto px-4" style={{ maxWidth: '780px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontFamily: FONT, fontWeight: 800, fontSize: 'clamp(1.7rem, 3.2vw, 2.5rem)', color: '#0a0a0a', marginBottom: '12px', letterSpacing: '-0.02em' }}>
              Frequently Asked Questions
            </h2>
            <p style={{ color: '#6b7280' }}>Everything you need to know about downloading Pinterest videos.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, i) => (
              <details key={i} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '14px', overflow: 'hidden' }}>
                <summary style={{ padding: '18px 24px', cursor: 'pointer', fontFamily: FONT, fontWeight: 600, color: '#0a0a0a', fontSize: '0.95rem', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', userSelect: 'none', letterSpacing: '-0.01em' }}>
                  {faq.question}
                  <span style={{ color: PINTEREST_RED, fontWeight: 800, flexShrink: 0, marginLeft: '12px', fontSize: '1.1rem' }}>+</span>
                </summary>
                <div style={{ padding: '0 24px 18px', color: '#6b7280', fontSize: '0.9rem', lineHeight: '1.75', borderTop: '1px solid #f3f4f6' }}>
                  <div style={{ paddingTop: '14px' }}>{faq.answer}</div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: `linear-gradient(135deg, ${PINTEREST_RED} 0%, #0a0a0a 100%)`, padding: '88px 0', textAlign: 'center' }}>
        <div className="container mx-auto px-4">
          <h2 style={{ fontFamily: FONT, fontWeight: 900, fontSize: 'clamp(1.9rem, 4.5vw, 3rem)', color: '#fff', marginBottom: '16px', letterSpacing: '-0.02em' }}>
            Ready to Save Your Pinterest Video?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: '36px', fontSize: '1.05rem' }}>
            Free, fast, HD quality. Works with all Pinterest content. No account needed.
          </p>
          <ScrollToTopButton style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#fff', color: PINTEREST_RED, padding: '16px 38px', borderRadius: '14px', fontFamily: FONT, fontWeight: 800, fontSize: '1.05rem', boxShadow: '0 8px 30px rgba(0,0,0,0.25)', border: 'none', cursor: 'pointer' }}>
            ⬇️ Download Pinterest Video Now
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
            <a href="/youtube-video-downloader" style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '9px 18px', borderRadius: '10px', background: '#fff', border: '1px solid #e5e7eb', color: '#374151', fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', whiteSpace: 'nowrap' }}>
              <span style={{ display: 'flex', alignItems: 'center' }}><YouTubeIcon size={18} /></span> YouTube Download
            </a>
            <a href="/twitter-video-downloader" style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '9px 18px', borderRadius: '10px', background: '#fff', border: '1px solid #e5e7eb', color: '#374151', fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', whiteSpace: 'nowrap' }}>
              <span style={{ display: 'flex', alignItems: 'center' }}><XTwitterIcon size={18} /></span> Twitter Download
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
