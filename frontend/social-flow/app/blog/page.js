// ==========================================
// 2. app/blog/page.js - BLOG INDEX
// ==========================================
import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/blog-posts';

export const metadata = {
  title: 'Blog - Video Download Tips, Guides & Tutorials | SocialPully',
  description: 'Learn how to download videos from Instagram, TikTok, Facebook, YouTube. Tips, guides, and tutorials for social media video downloads.',
  keywords: ['video download guide', 'instagram tips', 'tiktok tutorials', 'social media guides'],
  alternates: {
    canonical: 'https://socialpully.com/blog',
  },
  openGraph: {
    title: 'Blog - Video Download Tips, Guides & Tutorials | SocialPully',
    description: 'Learn how to download videos from Instagram, TikTok, Facebook, YouTube. Tips, guides, and tutorials for social media video downloads.',
    url: 'https://socialpully.com/blog',
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

export default function BlogIndex() {
  const posts = getAllBlogPosts();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-center mb-4">SocialPully Blog</h1>
          <p className="text-xl text-center text-gray-600">
            Tips, guides, and tutorials for downloading social media videos
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.slug} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="h-48 bg-gradient-to-br from-indigo-100 to-purple-100"></div>
              <div className="p-6">
                <div className="text-sm text-indigo-600 font-semibold mb-2">{post.category}</div>
                <h2 className="text-2xl font-bold mb-3 hover:text-indigo-600">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{post.author}</span>
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-block text-indigo-600 font-semibold hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Ad Space */}
      {/* <div className="container mx-auto px-4 mb-8">
        <div className="bg-gray-100 h-24 flex items-center justify-center text-gray-400">
          Google AdSense Banner
        </div>
      </div> */}
    </div>
  );
}
