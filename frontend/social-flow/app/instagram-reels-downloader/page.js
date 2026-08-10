import DownloadForm from '@/components/DownloadForm';
import JsonLd from '@/components/JsonLd';
import { generateFAQSchema, generateHowToSchema, generateBreadcrumbSchema } from '@/lib/schema';
import Link from 'next/link';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { InstagramIcon, TikTokIcon, FacebookIcon, YouTubeIcon, XTwitterIcon, PinterestIcon } from '@/components/PlatformIcons';

export const metadata = {
  title: 'Instagram Reels Downloader - No Watermark, HD',
  description: 'Download Instagram reels without watermark in HD quality. Free IG reels downloader. No registration required. Works on all devices.',
  keywords: [
    'instagram reels downloader',
    'download instagram reels',
    'instagram reels video download',
    'ig reels downloader',
    'reels video downloader',
    'download reels from instagram',
    'instagram reels download online free',
    'instagram video downloader no watermark',
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
    title: 'Instagram Reels Downloader - No Watermark, HD',
    description: 'Download Instagram reels without watermark in HD quality. Free IG reels downloader. No registration required.',
    url: 'https://socialpully.com/instagram-reels-downloader',
    type: 'website',
  },
  alternates: {
    canonical: 'https://socialpully.com/instagram-reels-downloader',
  },
};

const faqs = [
  { question: 'Is this Instagram reels downloader free to use?', answer: 'Yes, completely free with no hidden charges or registration required. Download Instagram reels unlimited times without any cost.' },
  { question: 'Can I download Instagram reels without watermark?', answer: 'Yes, our IG reels downloader automatically removes Instagram watermarks from downloaded reels, giving you clean video files.' },
  { question: 'Does it work on iPhone?', answer: 'Yes, works perfectly on iPhone, iPad, and all iOS devices using Safari. You can easily download reels from Instagram on any iOS device.' },
  { question: 'What video quality is available?', answer: 'We support HD 1080p, 720p SD, and original quality downloads. Our reels video downloader preserves the original resolution uploaded by the creator.' },
  { question: 'Can I download private Instagram reels?', answer: 'No, only public Instagram reels can be downloaded due to privacy settings. You must be able to view the reel without logging in to download it.' },
  { question: 'Is there a download limit?', answer: 'No, download Instagram reels online free with unlimited downloads. No restrictions or quotas on how many reels you can save.' },
  { question: 'Do I need to install an app?', answer: 'No installation needed. Our Instagram reels downloader works directly from your web browser without any app downloads.' },
  { question: 'Is it safe to use?', answer: "Yes, completely safe. We don't store your videos or personal data. All Instagram reels video download processes are secure and private." },
  { question: 'What format are the downloaded reels?', answer: 'Downloaded reels are saved in MP4 format, which is universally compatible with all devices and video players.' },
  { question: 'Can I download Instagram reels on Android?', answer: 'Yes, our reels downloader works seamlessly on all Android devices using Chrome, Firefox, or any mobile browser.' },
  { question: 'Do I need to log into Instagram?', answer: "No, you don't need to log into Instagram or provide any credentials. Just paste the reel URL and download." },
];

const features = [
  { icon: '🚫', title: 'No Watermark Downloads', desc: 'We remove the Instagram watermark and username overlay, giving you a clean, original-quality video file. Ideal for content creators repurposing clips for YouTube Shorts, TikTok, or other platforms.' },
  { icon: '📺', title: 'HD & Full HD Quality (Up to 1080p)', desc: 'While many reels downloader tools compress video quality, our tool preserves the original resolution. If the Instagram reel was uploaded in 1080p, you get 1080p.' },
  { icon: '🌐', title: 'No App Installation Required', desc: "Everything works directly in your browser. No APK files, no Chrome extensions, no desktop software." },
  { icon: '💎', title: '100% Free — No Hidden Charges', desc: 'No premium tiers, no trial periods, no credit card required. Download Instagram reels as many times as you need. Unlimited downloads, always free.' },
  { icon: '📱', title: 'Works on All Devices & Browsers', desc: 'Android (Chrome, Samsung Internet, Firefox), iPhone/iPad (Safari, Chrome), Windows PC, Mac (Safari, Chrome, Firefox), and Linux.' },
  { icon: '⚡', title: 'Fast Processing Speed', desc: 'Our servers are optimized for high-speed processing. Average Instagram reels video download time: 2–5 seconds per reel.' },
  { icon: '👤', title: 'No Login or Registration', desc: "We don't ask for your email, Instagram credentials, or any personal information. Simply paste the link and download Instagram reels instantly. Your privacy matters." },
  { icon: '🔒', title: 'Private & Secure', desc: "We don't store your downloaded reels on our servers. All files are processed in real-time and deleted immediately. We follow privacy principles aligned with GDPR guidelines." },
];

const steps = [
  { num: '01', title: 'Open Instagram', desc: 'Open Instagram and find the reel you want to download.' },
  { num: '02', title: 'Copy Link', desc: 'Tap the three dots (•••) and select "Copy Link" from the options.' },
  { num: '03', title: 'Paste URL', desc: 'Paste the Instagram reel link in our downloader above.' },
  { num: '04', title: 'Download!', desc: 'Click Download Instagram Reels — your reel saves instantly to your device!' },
];

const stats = [
  { value: '12M+', label: 'Downloads' },
  { value: '4.9★', label: 'Rating' },
  { value: '160+', label: 'Countries' },
  { value: '99.9%', label: 'Uptime' },
];

export default function InstagramReelsDownloader() {
  const faqSchema = generateFAQSchema(faqs);
  const howToSchema = generateHowToSchema('instagram');
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://socialpully.com' },
    { name: 'Instagram Reels Downloader', url: 'https://socialpully.com/instagram-reels-downloader' },
  ]);

  return (
    <div className="min-h-screen" style={{ background: '#fff' }}>
      <JsonLd data={faqSchema} />
      <JsonLd data={howToSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* HERO */}
      <section style={{ background: 'linear-gradient(160deg, #0a0a0a 0%, #1a0a18 50%, #0f0a1a 100%)', padding: '72px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(193,53,132,0.18) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(225,119,64,0.12) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

        <div className="container mx-auto px-4" style={{ position: 'relative', zIndex: 1 }}>
          <nav style={{ marginBottom: '24px' }} aria-label="Breadcrumb">
            <ol style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.8rem', color: '#6b7280' }}>
              <li><Link href="/" style={{ color: '#9ca3af' }}>Home</Link></li>
              <li style={{ color: '#4b5563' }}>›</li>
              <li style={{ color: '#c13584' }}>Instagram Reels Downloader</li>
            </ol>
          </nav>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
            <span style={{ background: 'linear-gradient(135deg, rgba(193,53,132,0.15), rgba(225,119,64,0.15))', border: '1px solid rgba(193,53,132,0.3)', color: '#e1306c', padding: '6px 16px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.03em' }}>
              #1 Instagram Downloader · 18M+ Downloads Since 2022
            </span>
          </div>

          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', textAlign: 'center', marginBottom: '16px', color: '#fff', lineHeight: 1.1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <InstagramIcon size={48} /> Instagram Reels Downloader
          </h1>

          <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: 'clamp(1rem, 2vw, 1.2rem)', marginBottom: '12px', fontWeight: 500 }}>
            Download Instagram Reels Without Watermark — Free &amp; HD
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginBottom: '40px' }}>
            {['✅ No Watermark', '✅ HD Quality', '✅ 100% Free', '✅ No Registration'].map(b => (
              <span key={b} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#d1fae5', padding: '6px 14px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600 }}>{b}</span>
            ))}
          </div>

          <DownloadForm platform="instagram" />
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: 'linear-gradient(135deg, #c13584 0%, #e1306c 100%)', padding: '28px 0' }}>
        <div className="container mx-auto px-4">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '48px' }}>
            {stats.map(({ value, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: '1.8rem', color: '#fff', lineHeight: 1, marginBottom: '4px' }}>{value}</div>
                <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.8rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT IS */}
      <section style={{ padding: '80px 0', background: '#fff' }}>
        <div className="container mx-auto px-4" style={{ maxWidth: '900px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #c13584 0%, #e1306c 100%)', color: '#fff', padding: '6px 16px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>About This Tool</div>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', marginBottom: '20px', color: '#0a0a0a', lineHeight: 1.2 }}>
                What Is an Instagram Reels Downloader?
              </h2>
              <p style={{ color: '#4b5563', lineHeight: '1.7', marginBottom: '16px' }}>
                An Instagram Reels Downloader is a free online tool that allows you to save Instagram reels directly to your device — whether it&apos;s a smartphone, tablet, or desktop computer — without needing to install any software or create an account.
              </p>
              <p style={{ color: '#4b5563', lineHeight: '1.7', marginBottom: '20px' }}>
                Instagram&apos;s native app allows you to save reels to collections within the app, but they remain locked inside Instagram and come with watermarks. Many creators also disable the download option entirely. Our <strong>Instagram reels video download</strong> tool solves both problems.
              </p>
              <div style={{ background: '#fef9f0', borderLeft: '3px solid #c13584', padding: '16px 20px', borderRadius: '0 8px 8px 0' }}>
                <p style={{ color: '#374151', fontSize: '0.875rem', lineHeight: '1.6', margin: 0 }}>
                  💡 <strong>Our Experience:</strong> We&apos;ve processed over 18 million Instagram reels downloads since 2022. Our <strong>reels downloader</strong> is optimized for speed, reliability, and the highest output quality available.
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                'Download Instagram reels from any public account, even when the save button is disabled',
                'Remove the Instagram watermark automatically',
                'Save reels in HD quality (up to 1080p)',
                'Convert Instagram reels to MP4 for universal compatibility',
                'Download reels from Instagram on any device — iPhone, Android, PC, or Mac',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '14px 16px', background: '#f9fafb', borderRadius: '10px', border: '1px solid #f3f4f6' }}>
                  <span style={{ width: '22px', height: '22px', minWidth: '22px', background: 'linear-gradient(135deg, #c13584 0%, #e1306c 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', color: '#fff', fontWeight: 800, marginTop: '1px' }}>✓</span>
                  <span style={{ color: '#374151', fontSize: '0.875rem', lineHeight: '1.5' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW TO */}
      <section style={{ padding: '80px 0', background: '#0a0a0a' }}>
        <div className="container mx-auto px-4" style={{ maxWidth: '900px' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#fff', marginBottom: '12px' }}>
              How to Download Instagram Reels Without Watermark
            </h2>
            <p style={{ color: '#9ca3af' }}>Four simple steps. Done in seconds.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
            {steps.map((step) => (
              <div key={step.num} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '28px 24px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: '2.2rem', background: 'linear-gradient(135deg, #c13584 0%, #f77737 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '12px' }}>{step.num}</div>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, color: '#fff', marginBottom: '8px', fontSize: '1rem' }}>{step.title}</h3>
                <p style={{ color: '#9ca3af', fontSize: '0.875rem', lineHeight: '1.6' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: '80px 0', background: '#f9fafb' }}>
        <div className="container mx-auto px-4" style={{ maxWidth: '1100px' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#0a0a0a', marginBottom: '12px' }}>
              Key Features of Our Instagram Reels Video Download Tool
            </h2>
            <p style={{ color: '#6b7280', maxWidth: '520px', margin: '0 auto' }}>
              Here&apos;s what sets our <strong>reels video downloader</strong> apart from the dozens of Instagram downloaders available online.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {features.map((f, i) => (
              <div key={i} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '28px 24px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '12px', lineHeight: 1 }}>{f.icon}</div>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, color: '#0a0a0a', marginBottom: '8px', fontSize: '1rem' }}>{f.title}</h3>
                <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: '1.6' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '80px 0', background: '#f9fafb' }}>
        <div className="container mx-auto px-4" style={{ maxWidth: '780px' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#0a0a0a', marginBottom: '12px' }}>
              Frequently Asked Questions
            </h2>
            <p style={{ color: '#6b7280' }}>Everything you need to know about downloading Instagram Reels.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, i) => (
              <details key={i} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
                <summary style={{ padding: '18px 24px', cursor: 'pointer', fontWeight: 600, color: '#0a0a0a', fontSize: '0.95rem', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', userSelect: 'none' }}>
                  {faq.question}
                  <span style={{ color: '#c13584', fontWeight: 700, flexShrink: 0, marginLeft: '12px' }}>+</span>
                </summary>
                <div style={{ padding: '0 24px 18px', color: '#6b7280', fontSize: '0.875rem', lineHeight: '1.7', borderTop: '1px solid #f3f4f6' }}>
                  <div style={{ paddingTop: '14px' }}>{faq.answer}</div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, #c13584 0%, #010101 100%)', padding: '80px 0', textAlign: 'center' }}>
        <div className="container mx-auto px-4">
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#fff', marginBottom: '16px' }}>
            Ready to Download Instagram Reels?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '32px', fontSize: '1.05rem' }}>
            Free, fast, no watermark. No account needed. Works on all devices.
          </p>
          <ScrollToTopButton style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#fff', color: '#c13584', padding: '16px 36px', borderRadius: '14px', fontWeight: 800, fontSize: '1.05rem', textDecoration: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.3)', fontFamily: "'Outfit', sans-serif" }}>
            ⬇️ Download Instagram Reels Now
          </ScrollToTopButton>
        </div>
      </section>

      {/* OTHER TOOLS */}
      <section style={{ padding: '40px 0', background: '#f9fafb', borderTop: '1px solid #e5e7eb' }}>
        <div className="container mx-auto px-4" style={{ maxWidth: '900px', textAlign: 'center' }}>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '16px' }}>Also Download From</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            {[
              { href: '/tiktok-video-downloader', icon: <TikTokIcon size={18} />, label: 'TikTok Download' },
              { href: '/facebook-video-downloader', icon: <FacebookIcon size={18} />, label: 'Facebook Download' },
              { href: '/youtube-video-downloader', icon: <YouTubeIcon size={18} />, label: 'YouTube Download' },
              { href: '/twitter-video-downloader', icon: <XTwitterIcon size={18} />, label: 'Twitter Download' },
              { href: '/pinterest-video-downloader', icon: <PinterestIcon size={18} />, label: 'Pinterest Download' },
            ].map(({ href, icon, label }) => (
              <a key={href} href={href} style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '9px 18px', borderRadius: '10px', background: '#fff', border: '1px solid #e5e7eb', color: '#374151', fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', whiteSpace: 'nowrap' }}>
                <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span> {label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
