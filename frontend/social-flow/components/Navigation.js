'use client';
import Link from 'next/link';
import { Download, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { InstagramIcon, TikTokIcon, XTwitterIcon, PinterestIcon, FacebookIcon, YouTubeIcon } from './PlatformIcons';

function SocialPullyLogo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="navLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="url(#navLogoGrad)" />
      <line x1="32" y1="13" x2="32" y2="39" stroke="white" strokeWidth="5.5" strokeLinecap="round"/>
      <polyline points="20,29 32,43 44,29" fill="none" stroke="white" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="17" y1="51" x2="47" y2="51" stroke="white" strokeWidth="5.5" strokeLinecap="round"/>
    </svg>
  );
}

const FONT = "'Outfit', sans-serif";

const navLinks = [
  { href: '/instagram-reels-downloader', label: 'Instagram', icon: <InstagramIcon size={16} /> },
  { href: '/tiktok-video-downloader', label: 'TikTok', icon: <TikTokIcon size={16} /> },
  { href: '/twitter-video-downloader', label: 'Twitter', icon: <XTwitterIcon size={16} /> },
  { href: '/pinterest-video-downloader', label: 'Pinterest', icon: <PinterestIcon size={16} /> },
  { href: '/facebook-video-downloader', label: 'Facebook', icon: <FacebookIcon size={16} /> },
  { href: '/youtube-video-downloader', label: 'YouTube', icon: <YouTubeIcon size={16} /> },
];

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      style={{
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,1)',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        boxShadow: scrolled ? '0 1px 40px rgba(0,0,0,0.08)' : '0 1px 0 rgba(0,0,0,0.06)',
        transition: 'all 0.3s ease',
        position: 'sticky',
        top: 0,
        zIndex: 999,
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <SocialPullyLogo size={34} />
            <span style={{
              fontFamily: FONT,
              fontWeight: 800,
              fontSize: '1.35rem',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.02em',
            }}>
              SocialPully
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '0.845rem',
                  fontFamily: FONT,
                  fontWeight: 600,
                  color: '#374151',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
                className="hover:bg-indigo-50 hover:text-indigo-600"
              >
                {link.icon && <span style={{ display: 'flex', alignItems: 'center' }}>{link.icon}</span>}
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/tiktok-video-downloader"
              className="hidden md:flex items-center gap-2"
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                color: 'white',
                padding: '8px 18px',
                borderRadius: '10px',
                fontSize: '0.845rem',
                fontFamily: FONT,
                fontWeight: 700,
                transition: 'all 0.2s',
                boxShadow: '0 4px 15px rgba(99,102,241,0.3)',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              <Download size={15} />
              Download Free
            </Link>
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              style={{ border: 'none', cursor: 'pointer', background: 'none' }}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div style={{ borderTop: '1px solid #f3f4f6', paddingBottom: '14px', paddingTop: '8px' }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '11px 8px',
                  color: '#374151',
                  fontFamily: FONT,
                  fontWeight: 600,
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                }}
                className="hover:bg-indigo-50 hover:text-indigo-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.icon && <span style={{ display: 'flex', alignItems: 'center' }}>{link.icon}</span>}
                {link.label}
              </Link>
            ))}
            <Link
              href="/tiktok-video-downloader"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                color: 'white',
                padding: '13px',
                borderRadius: '10px',
                fontFamily: FONT,
                fontWeight: 700,
                marginTop: '10px',
                textDecoration: 'none',
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Download size={16} />
              Download Free
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
