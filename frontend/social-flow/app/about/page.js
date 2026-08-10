export const metadata = {
  title: 'About SocialPully - Free Video Downloader for All Social Media',
  description: 'Learn about SocialPully, the best free video downloader for Instagram, TikTok, Facebook, YouTube and 15+ platforms. Free, fast, and private.',
  alternates: {
    canonical: 'https://socialpully.com/about',
  },
  openGraph: {
    title: 'About SocialPully - Free Social Media Video Downloader',
    description: 'Learn about SocialPully, the best free video downloader for Instagram, TikTok, Facebook, YouTube and 15+ platforms. Free, fast, and private.',
    url: 'https://socialpully.com/about',
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

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-6">
            About <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">SocialPully</span>
          </h1>
          <p className="text-xl text-center text-gray-600 mb-12">
            Your trusted partner for downloading videos from any social media platform
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-bold mb-8 text-center">Our Mission</h2>
          <p className="text-lg text-gray-700 mb-6">
            At SocialPully, we believe that great content should be accessible to everyone. Our mission is to provide a fast, free, and reliable way to download videos from Instagram, TikTok, Facebook, YouTube, Twitter, and 15+ other social media platforms.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            We understand that sometimes you want to save memorable moments, share content offline, or create compilations from your favorite creators. That's why we built SocialPully - to make video downloading simple, fast, and completely free.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold mb-12 text-center">Why Choose SocialPully?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Lightning Fast</h3>
              <p className="text-gray-600">
                Download videos in seconds with our optimized infrastructure. No waiting, no delays - just instant downloads.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">100% Safe & Secure</h3>
              <p className="text-gray-600">
                Your privacy matters. We don't store your data, require registration, or track your downloads. Completely anonymous.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Premium Quality</h3>
              <p className="text-gray-600">
                Download in HD, Full HD, and even 4K quality. We preserve the original video quality without compression.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Platforms */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-bold mb-8 text-center">15+ Supported Platforms</h2>
          <p className="text-lg text-gray-700 mb-8 text-center">
            SocialPully works seamlessly with all major social media platforms
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Instagram', 'TikTok', 'Facebook', 'YouTube', 'Twitter', 'Pinterest', 'LinkedIn', 'Reddit', 'Snapchat', 'Vimeo', 'Dailymotion', 'Twitch'].map((platform) => (
              <div key={platform} className="bg-gray-50 p-4 rounded-lg text-center font-semibold text-gray-700">
                {platform}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Values</h2>
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-indigo-600">Free Forever</h3>
              <p className="text-gray-700">
                We believe in providing value without barriers. SocialPully will always be free to use, with no hidden charges, premium tiers, or subscription fees.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-purple-600">User Privacy</h3>
              <p className="text-gray-700">
                Your privacy is non-negotiable. We don't collect personal information, track your activity, or sell your data. What you download is your business.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-pink-600">Quality & Speed</h3>
              <p className="text-gray-700">
                We're committed to providing the fastest download speeds and highest quality videos. Our infrastructure is constantly optimized for performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Downloading?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join millions of users who trust SocialPully for their video downloads
          </p>
          <a 
            href="/"
            className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all text-lg"
          >
            Try SocialPully Now
          </a>
        </div>
      </section>
    </div>
  );
}