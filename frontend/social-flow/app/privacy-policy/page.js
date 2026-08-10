import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | SocialPully',
  description: 'Read the SocialPully Privacy Policy. Learn how we protect your privacy and handle your data when you use our free social media video downloader tools.',
  alternates: {
    canonical: 'https://socialpully.com/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy | SocialPully',
    description: 'Read the SocialPully Privacy Policy. Learn how we protect your privacy and handle your data when you use our free social media video downloader tools.',
    url: 'https://socialpully.com/privacy-policy',
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

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen" style={{ background: '#f9fafb' }}>
      <section style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', padding: '50px 0 40px' }}>
        <div className="container mx-auto px-4" style={{ maxWidth: '800px' }}>
          <nav style={{ marginBottom: '16px' }} aria-label="Breadcrumb">
            <ol style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>
              <li><Link href="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Home</Link></li>
              <li>›</li>
              <li style={{ color: '#fff' }}>Privacy Policy</li>
            </ol>
          </nav>
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: '#fff', marginBottom: '10px' }}>
            Privacy Policy
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem' }}>Last updated: April 2025</p>
        </div>
      </section>

      <section style={{ padding: '52px 0 80px' }}>
        <div className="container mx-auto px-4" style={{ maxWidth: '800px' }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '40px', border: '1px solid #e5e7eb' }}>

            <p style={{ color: '#4b5563', lineHeight: '1.85', marginBottom: '32px', fontSize: '0.925rem' }}>
              At SocialPully, your privacy is something we take seriously. This page explains exactly what information we collect when you use our site, how it is used, and what choices you have. We have written it in plain language — no legal jargon.
            </p>

            <SECTION title="1. What we collect">
              <p style={{ marginBottom: '12px' }}>We do not require you to create an account or give us any personal information to use SocialPully. When you visit the site, certain data is collected automatically:</p>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li><strong>Log data</strong> — your browser type, device type, the page you visited, and the time of your visit. This is standard for any website and is handled by our hosting provider.</li>
                <li><strong>Cookies</strong> — we use minimal cookies to keep the site working smoothly. We also use Google Analytics to understand how visitors use the site in aggregate. No personally identifiable information is tied to this data.</li>
                <li><strong>Video URLs</strong> — when you paste a link to download a video, that URL is sent to our servers to process the download. We do not log or store these URLs after processing is complete.</li>
              </ul>
            </SECTION>

            <SECTION title="2. How we use this information">
              <p>The data we collect is used to:</p>
              <ul style={{ paddingLeft: '20px', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>Keep the site running and fix bugs when they appear</li>
                <li>Understand which tools people use most so we can improve them</li>
                <li>Protect the service from abuse</li>
              </ul>
              <p style={{ marginTop: '12px' }}>We do not sell your data. We do not share it with advertisers or third-party marketing companies.</p>
            </SECTION>

            <SECTION title="3. Third-party services">
              <p>We use a small number of third-party services to run SocialPully:</p>
              <ul style={{ paddingLeft: '20px', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li><strong>Google Analytics</strong> — helps us understand traffic patterns. You can opt out by using the Google Analytics opt-out browser add-on.</li>
                <li><strong>Hosting providers</strong> — our servers are hosted with reputable cloud providers who maintain their own security and privacy standards.</li>
              </ul>
            </SECTION>

            <SECTION title="4. Data retention">
              <p>We do not store downloaded videos on our servers. Files are processed on the fly and discarded immediately after your download begins. Access logs may be retained for up to 30 days for security purposes, after which they are deleted.</p>
            </SECTION>

            <SECTION title="5. Your rights">
              <p>You have the right to know what data we hold about you and to request its deletion. Since we do not collect personally identifiable information, there is typically nothing to delete. If you have a specific concern, email us at <a href="mailto:admin@socialpully.com" style={{ color: '#6366f1' }}>admin@socialpully.com</a> and we will sort it out.</p>
            </SECTION>

            <SECTION title="6. Children">
              <p>SocialPully is not intended for children under the age of 13. We do not knowingly collect any data from children.</p>
            </SECTION>

            <SECTION title="7. Changes to this policy">
              <p>If we make meaningful changes to this policy, we will update the date at the top of this page. Continued use of SocialPully after changes are posted means you accept the updated policy.</p>
            </SECTION>

            <SECTION title="8. Contact">
              <p>Questions about this policy? Reach us at <a href="mailto:admin@socialpully.com" style={{ color: '#6366f1' }}>admin@socialpully.com</a> or by phone at <a href="tel:+923193809601" style={{ color: '#6366f1' }}>03193809601</a>.</p>
            </SECTION>

          </div>
        </div>
      </section>
    </div>
  );
}
