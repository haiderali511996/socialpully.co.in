import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | SocialPully',
  description: 'Read the SocialPully Terms of Service. Understand the rules and guidelines for using our free social media video downloader tools responsibly.',
  alternates: {
    canonical: 'https://socialpully.com/terms-of-service',
  },
  openGraph: {
    title: 'Terms of Service | SocialPully',
    description: 'Read the SocialPully Terms of Service. Understand the rules and guidelines for using our free social media video downloader tools responsibly.',
    url: 'https://socialpully.com/terms-of-service',
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

const SECTION = ({ title, children }) => (
  <div style={{ marginBottom: '36px' }}>
    <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '1.25rem', color: '#0a0a0a', marginBottom: '12px', paddingBottom: '8px', borderBottom: '2px solid #f3f4f6' }}>{title}</h2>
    <div style={{ color: '#4b5563', lineHeight: '1.85', fontSize: '0.925rem' }}>{children}</div>
  </div>
);

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen" style={{ background: '#f9fafb' }}>
      <section style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', padding: '50px 0 40px' }}>
        <div className="container mx-auto px-4" style={{ maxWidth: '800px' }}>
          <nav style={{ marginBottom: '16px' }} aria-label="Breadcrumb">
            <ol style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>
              <li><Link href="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Home</Link></li>
              <li>›</li>
              <li style={{ color: '#fff' }}>Terms of Service</li>
            </ol>
          </nav>
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: '#fff', marginBottom: '10px' }}>
            Terms of Service
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem' }}>Last updated: April 2025</p>
        </div>
      </section>

      <section style={{ padding: '52px 0 80px' }}>
        <div className="container mx-auto px-4" style={{ maxWidth: '800px' }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '40px', border: '1px solid #e5e7eb' }}>

            <p style={{ color: '#4b5563', lineHeight: '1.85', marginBottom: '32px', fontSize: '0.925rem' }}>
              These Terms of Service govern your use of SocialPully and the video downloading tools available on this website. By using SocialPully, you agree to these terms. If you do not agree, please do not use the service.
            </p>

            <SECTION title="1. What SocialPully does">
              <p>SocialPully is a free online tool that helps users download publicly available videos from social media platforms including Instagram, TikTok, Facebook, YouTube, Twitter, and Pinterest. The service is provided as-is, free of charge.</p>
            </SECTION>

            <SECTION title="2. Acceptable use">
              <p style={{ marginBottom: '12px' }}>You agree to use SocialPully only for lawful purposes. Specifically, you must not use this service to:</p>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>Download content that you do not have the right to download</li>
                <li>Distribute, sell, or commercially exploit downloaded content without the rights holder's permission</li>
                <li>Attempt to reverse-engineer, scrape, or automate requests to our service in ways that place unreasonable load on our servers</li>
                <li>Use the service for any purpose that violates applicable laws or third-party platform terms</li>
              </ul>
            </SECTION>

            <SECTION title="3. Copyright and intellectual property">
              <p>SocialPully does not host, store, or re-distribute any videos. We only facilitate access to content that is already publicly available on third-party platforms. The copyright in any downloaded content remains with the original creator or rights holder.</p>
              <p style={{ marginTop: '12px' }}>You are responsible for ensuring that your use of downloaded content complies with applicable copyright laws and the terms of the original platform where the content was published.</p>
            </SECTION>

            <SECTION title="4. No warranties">
              <p>SocialPully is provided on an &quot;as is&quot; basis. We make no guarantees that the service will be available at all times, error-free, or that it will work with every video URL. Social media platforms frequently change their technology and we cannot always keep up in real time.</p>
            </SECTION>

            <SECTION title="5. Limitation of liability">
              <p>To the maximum extent permitted by law, SocialPully and its operators are not liable for any indirect, incidental, or consequential damages arising from your use of the service. Our total liability for any claim is limited to zero, as the service is provided free of charge.</p>
            </SECTION>

            <SECTION title="6. Third-party platforms">
              <p>SocialPully is an independent tool and has no affiliation with Instagram, TikTok, Facebook, YouTube, Twitter, Pinterest, or any other social media platform. Use of those platforms is subject to their own terms of service.</p>
            </SECTION>

            <SECTION title="7. Changes to these terms">
              <p>We may update these terms from time to time. We will update the date at the top of this page when we do. Continued use of SocialPully after changes are posted constitutes acceptance of the updated terms.</p>
            </SECTION>

            <SECTION title="8. Contact">
              <p>If you have questions about these terms, reach us at <a href="mailto:admin@socialpully.com" style={{ color: '#6366f1' }}>admin@socialpully.com</a> or call <a href="tel:+923193809601" style={{ color: '#6366f1' }}>03193809601</a>.</p>
            </SECTION>

          </div>
        </div>
      </section>
    </div>
  );
}
