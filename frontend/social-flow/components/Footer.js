import Link from 'next/link';
import { InstagramIcon, TikTokIcon, XTwitterIcon, PinterestIcon, FacebookIcon, YouTubeIcon } from './PlatformIcons';

function SocialPullyLogo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="footerLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="url(#footerLogoGrad)" />
      <line x1="32" y1="13" x2="32" y2="39" stroke="white" strokeWidth="5.5" strokeLinecap="round"/>
      <polyline points="20,29 32,43 44,29" fill="none" stroke="white" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="17" y1="51" x2="47" y2="51" stroke="white" strokeWidth="5.5" strokeLinecap="round"/>
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'Platforms': [
      { href: '/instagram-reels-downloader', label: 'Instagram Downloader', icon: <InstagramIcon size={15} /> },
      { href: '/tiktok-video-downloader', label: 'TikTok Downloader', icon: <TikTokIcon size={15} /> },
      { href: '/facebook-video-downloader', label: 'Facebook Downloader', icon: <FacebookIcon size={15} /> },
      { href: '/youtube-video-downloader', label: 'YouTube Downloader', icon: <YouTubeIcon size={15} /> },
      { href: '/twitter-video-downloader', label: 'Twitter Downloader', icon: <XTwitterIcon size={15} /> },
      { href: '/pinterest-video-downloader', label: 'Pinterest Downloader', icon: <PinterestIcon size={15} /> },
    ],
    'Resources': [
      { href: '/blog', label: 'Blog' },
      { href: '/about', label: 'About Us' },
      { href: '/how-it-works', label: 'How It Works' },
      { href: '/faq', label: 'FAQ' },
    ],
    'Legal': [
      { href: '/privacy-policy', label: 'Privacy Policy' },
      { href: '/terms-of-service', label: 'Terms of Service' },
      { href: '/contact', label: 'Contact Us' },
    ],
  };

  const socialLinks = [
    { icon: <XTwitterIcon size={18} />, label: 'Twitter / X', href: 'https://x.com/socialpully' },
    { icon: <FacebookIcon size={18} />, label: 'Facebook', href: 'https://www.facebook.com/socialpully' },
    { icon: <InstagramIcon size={18} />, label: 'Instagram', href: 'https://www.instagram.com/socialpully' },
    { icon: <YouTubeIcon size={18} />, label: 'YouTube', href: 'https://www.youtube.com/@socialpully' },
    { icon: <TikTokIcon size={18} />, label: 'TikTok', href: 'https://www.tiktok.com/@socialpully' },
    { icon: <PinterestIcon size={18} />, label: 'Pinterest', href: 'https://www.pinterest.com/socialpully' },
  ];

  return (
    <footer style={{ background: '#0a0a0a', color: '#fff' }}>
      {/* Top section */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-4 gap-10">

            {/* Brand */}
            <div>
              <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '16px', textDecoration: 'none' }}>
                <SocialPullyLogo size={38} />
                <span style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 800,
                  fontSize: '1.4rem',
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  letterSpacing: '-0.01em',
                }}>
                  SocialPully
                </span>
              </Link>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: '1.7', marginBottom: '20px' }}>
                The fastest free video downloader for Instagram, TikTok, Facebook, YouTube and 15+ platforms. No watermark, HD quality.
              </p>
              {/* Trust badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['25M+ Downloads', '4.9★ Rated', '180+ Countries'].map(badge => (
                  <span key={badge} style={{
                    background: 'rgba(99,102,241,0.12)',
                    border: '1px solid rgba(99,102,241,0.25)',
                    color: '#818cf8',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                  }}>
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  marginBottom: '16px',
                  fontSize: '0.8rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#9ca3af',
                }}>
                  {category}
                </h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        style={{
                          color: '#6b7280',
                          fontSize: '0.875rem',
                          transition: 'color 0.2s',
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '7px',
                        }}
                        className="hover:text-white"
                      >
                        {link.icon && <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>{link.icon}</span>}
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p style={{ color: '#4b5563', fontSize: '0.8rem' }}>
            © {currentYear} SocialPully. All rights reserved. Download videos responsibly &amp; respect copyright laws.
          </p>
          {/* Social profile icons */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {socialLinks.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow SocialPully on ${label}`}
                title={`Follow us on ${label}`}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                  border: '1px solid rgba(255,255,255,0.08)',
                  textDecoration: 'none',
                }}
                className="hover:scale-110 hover:border-indigo-500 hover:bg-indigo-600/20"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
