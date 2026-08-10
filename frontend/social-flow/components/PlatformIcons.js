// Shared platform SVG icons used across nav, footer, and all pages

export const InstagramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="ig-grad-shared" cx="30%" cy="107%" r="150%">
        <stop offset="0%" stopColor="#fdf497"/>
        <stop offset="5%" stopColor="#fdf497"/>
        <stop offset="45%" stopColor="#fd5949"/>
        <stop offset="60%" stopColor="#d6249f"/>
        <stop offset="90%" stopColor="#285AEB"/>
      </radialGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="5.5" fill="url(#ig-grad-shared)"/>
    <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.8" fill="none"/>
    <circle cx="17.2" cy="6.8" r="1.1" fill="white"/>
  </svg>
);

export const TikTokIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="6" fill="#010101"/>
    <path d="M16.5 5.5c.3 1.8 1.4 2.8 3 3v2.2c-1 .1-2-.2-3-1v4.8c0 2.4-1.8 4.3-4.2 4.3-2.3 0-4.3-2-4.3-4.3 0-2.4 2-4.3 4.3-4.3.2 0 .5 0 .7.1v2.3c-.2-.1-.5-.1-.7-.1-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2V5.5h2.2z" fill="white"/>
    <path d="M16.5 5.5c.3 1.8 1.4 2.8 3 3v2.2c-1 .1-2-.2-3-1v4.8c0 2.4-1.8 4.3-4.2 4.3-2.3 0-4.3-2-4.3-4.3 0-2.4 2-4.3 4.3-4.3.2 0 .5 0 .7.1v2.3c-.2-.1-.5-.1-.7-.1-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2V5.5h2.2z" fill="#69C9D0" fillOpacity="0.5"/>
  </svg>
);

export const FacebookIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="6" fill="#1877F2"/>
    <path d="M13.2 19.5v-6.8h2.2l.3-2.6h-2.5V8.5c0-.7.2-1.2 1.2-1.2h1.3V5c-.2 0-1-.1-1.9-.1-1.9 0-3.2 1.2-3.2 3.3v1.9H8.2v2.6h2.4v6.8h2.6z" fill="white"/>
  </svg>
);

export const YouTubeIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="6" fill="#FF0000"/>
    <path d="M19.8 8.2a2 2 0 0 0-1.4-1.4C17 6.5 12 6.5 12 6.5s-5 0-6.4.3A2 2 0 0 0 4.2 8.2C3.9 9.6 3.9 12 3.9 12s0 2.4.3 3.8a2 2 0 0 0 1.4 1.4c1.4.3 6.4.3 6.4.3s5 0 6.4-.3a2 2 0 0 0 1.4-1.4c.3-1.4.3-3.8.3-3.8s0-2.4-.3-3.8z" fill="white"/>
    <path d="M10.2 14.5V9.5l4.3 2.5-4.3 2.5z" fill="#FF0000"/>
  </svg>
);

export const XTwitterIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="6" fill="#000000"/>
    <path d="M13.1 11.1L17.5 6h-1.1l-3.8 4.3L9.5 6H6l4.6 6.6L6 18.2h1.1l4-4.5 3.2 4.5H18l-4.9-7.1zm-1.4 1.6l-.5-.6-3.8-5.4h1.6l3 4.3.5.6 3.9 5.6h-1.6l-3.1-4.5z" fill="white"/>
  </svg>
);

export const PinterestIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="6" fill="#E60023"/>
    <path d="M12 4C7.6 4 4 7.6 4 12c0 3.4 2.1 6.4 5.1 7.7-.1-.6-.1-1.6.1-2.3l.9-3.8s-.2-.5-.2-1.2c0-1.1.7-2 1.5-2 .7 0 1 .5 1 1.2 0 .7-.5 1.8-.7 2.8-.2.8.4 1.5 1.2 1.5 1.5 0 2.5-1.9 2.5-4.2 0-1.7-1.2-3-3-3-2 0-3.2 1.5-3.2 3.1 0 .6.2 1.2.5 1.6.1.1.1.2 0 .3l-.4 1.5c-.1.1-.2.2-.3.1C8 15.8 7.3 14 7.3 12.4c0-2.7 2-5.3 5.9-5.3 3.1 0 5.5 2.2 5.5 5.1 0 3-1.9 5.5-4.6 5.5-.9 0-1.7-.5-2-1l-.5 2c-.2.7-.7 1.6-1 2.1.8.2 1.6.3 2.4.3 4.4 0 8-3.6 8-8s-3.6-8-8-8z" fill="white"/>
  </svg>
);
