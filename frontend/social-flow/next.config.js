const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better error handling
  reactStrictMode: true,
  
  // Optimize images
  images: {
    domains: ['SocialPully.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ];
  },
  
  // Compress responses
  compress: true,
  
  // Remove X-Powered-By header
  poweredByHeader: false,
  
  // Enable SWC minification
  swcMinify: true,
  
  // Optimize production build
  productionBrowserSourceMaps: false,

  // Shared hosting (cPanel/CloudLinux) caps the number of processes an
  // account may run at once. Next's default build workers are forked as
  // separate OS processes and can exceed that cap, failing with
  // "spawn ... EAGAIN". Threads don't count against that limit the same way,
  // and capping to 1 avoids spawning a worker pool at all.
  experimental: {
    cpus: 1,
    workerThreads: true,
  },
};

module.exports = withBundleAnalyzer(nextConfig);