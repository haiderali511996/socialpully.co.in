import { getBlogPost, getAllBlogPosts } from '@/lib/blog-posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const post = getBlogPost(params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: {
      canonical: `https://socialpully.com/blog/${params.slug}`,
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
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `https://socialpully.com/blog/${params.slug}`,
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default function BlogPost({ params }) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      <article className="container mx-auto px-4 py-16 max-w-4xl">
        <Link href="/blog" className="text-indigo-600 hover:underline mb-8 inline-block">
          ← Back to Blog
        </Link>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="h-96 bg-gradient-to-br from-indigo-100 to-purple-100"></div>
          
          <div className="p-8 md:p-12">
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full font-semibold">
                {post.category}
              </span>
              <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span>By {post.author}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
            <p className="text-xl text-gray-600 mb-8">{post.excerpt}</p>

            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

            {/* Ad Space */}
            <div className="my-8 bg-gray-100 h-64 flex items-center justify-center text-gray-400">
              Google AdSense Rectangle
            </div>

            <div className="mt-12 pt-8 border-t">
              <h3 className="text-2xl font-bold mb-4">Try SocialPully Video Downloader</h3>
              <p className="text-gray-600 mb-4">
                Download videos from Instagram, TikTok, Facebook, YouTube and more for free!
              </p>
              <Link 
                href="/"
                className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition"
              >
                Start Downloading Now
              </Link>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold mb-8">Related Articles</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {getAllBlogPosts().slice(0, 3).map((relatedPost) => (
              <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                  <div className="h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg mb-4"></div>
                  <h4 className="font-bold text-lg mb-2 hover:text-indigo-600">{relatedPost.title}</h4>
                  <p className="text-gray-600 text-sm">{relatedPost.excerpt.slice(0, 100)}...</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}