import Link from 'next/link';

export const metadata = {
  title: 'Contact Us | SocialPully',
  description: 'Get in touch with the SocialPully team. We are here to help with any questions about our free video downloader tools and services.',
  alternates: {
    canonical: 'https://socialpully.com/contact',
  },
  openGraph: {
    title: 'Contact SocialPully - We Are Here to Help',
    description: 'Get in touch with the SocialPully team. We are here to help with any questions about our free video downloader tools and services.',
    url: 'https://socialpully.com/contact',
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

export default function ContactPage() {
  return (
    <div className="min-h-screen" style={{ background: '#f9fafb' }}>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', padding: '60px 0 50px' }}>
        <div className="container mx-auto px-4" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <nav style={{ marginBottom: '20px' }} aria-label="Breadcrumb">
            <ol style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', justifyContent: 'center' }}>
              <li><Link href="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Home</Link></li>
              <li>›</li>
              <li style={{ color: '#fff' }}>Contact</li>
            </ol>
          </nav>
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#fff', marginBottom: '14px' }}>
            Get In Touch
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', lineHeight: '1.7' }}>
            Have a question, a bug to report, or just want to say hello? We read every message and get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: '60px 0' }}>
        <div className="container mx-auto px-4" style={{ maxWidth: '900px' }}>
          <div className="grid md:grid-cols-2 gap-12 items-start">

            {/* Contact Info */}
            <div>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '1.6rem', color: '#0a0a0a', marginBottom: '20px' }}>
                How to reach us
              </h2>
              <p style={{ color: '#6b7280', lineHeight: '1.8', marginBottom: '28px' }}>
                Whether you spotted something broken, have a feature idea, or need help getting a download to work — just drop us a line. We are a small team and we take every message seriously.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '20px', background: '#fff', borderRadius: '14px', border: '1px solid #e5e7eb' }}>
                  <span style={{ fontSize: '1.5rem' }}>✉️</span>
                  <div>
                    <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, color: '#0a0a0a', marginBottom: '4px' }}>Email us</p>
                    <a href="mailto:admin@socialpully.com" style={{ color: '#6366f1', fontWeight: 600, textDecoration: 'none', fontSize: '0.95rem' }}>
                      admin@socialpully.com
                    </a>
                    <p style={{ color: '#9ca3af', fontSize: '0.8rem', marginTop: '4px' }}>We reply within 24 hours on weekdays.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '20px', background: '#fff', borderRadius: '14px', border: '1px solid #e5e7eb' }}>
                  <span style={{ fontSize: '1.5rem' }}>📞</span>
                  <div>
                    <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, color: '#0a0a0a', marginBottom: '4px' }}>Call or WhatsApp</p>
                    <a href="tel:+923193809601" style={{ color: '#6366f1', fontWeight: 600, textDecoration: 'none', fontSize: '0.95rem' }}>
                      03193809601
                    </a>
                    <p style={{ color: '#9ca3af', fontSize: '0.8rem', marginTop: '4px' }}>Available Mon–Sat, 10am–6pm PKT.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '20px', background: '#fff', borderRadius: '14px', border: '1px solid #e5e7eb' }}>
                  <span style={{ fontSize: '1.5rem' }}>🕐</span>
                  <div>
                    <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, color: '#0a0a0a', marginBottom: '4px' }}>Response time</p>
                    <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: '1.6' }}>
                      Most emails get a reply the same day. During busy periods it may take up to 48 hours, but we will get back to you.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* What we can help with */}
            <div>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '1.6rem', color: '#0a0a0a', marginBottom: '20px' }}>
                What can we help with?
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { icon: '🐛', title: 'Report a bug', desc: 'A download not working? A platform broken? Let us know and we will fix it fast.' },
                  { icon: '💡', title: 'Feature requests', desc: 'Got an idea that would make SocialPully better? We are all ears.' },
                  { icon: '📋', title: 'Copyright concerns', desc: 'If you believe your content has been misused, please reach out and we will address it promptly.' },
                  { icon: '🤝', title: 'Business inquiries', desc: 'Partnerships, collaborations, or anything business-related — email is the fastest way.' },
                  { icon: '❓', title: 'General questions', desc: "Can not find something in the FAQ? Just ask — no question is too small." },
                ].map((item) => (
                  <div key={item.title} style={{ display: 'flex', gap: '12px', padding: '16px', background: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                    <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{item.icon}</span>
                    <div>
                      <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, color: '#0a0a0a', fontSize: '0.9rem', marginBottom: '4px' }}>{item.title}</p>
                      <p style={{ color: '#6b7280', fontSize: '0.825rem', lineHeight: '1.6' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
