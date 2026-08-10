import JsonLd from '@/components/JsonLd';
import { generateFAQSchema } from '@/lib/schema';

export const metadata = {
  title: 'FAQ - Frequently Asked Questions | SocialPully Video Downloader',
  description: 'Get answers to common questions about downloading videos from Instagram, TikTok, Facebook, YouTube. Free support and guides.',
  keywords: ['video downloader faq', 'how to download videos', 'instagram downloader help', 'tiktok downloader questions'],
  alternates: {
    canonical: 'https://socialpully.com/faq',
  },
  openGraph: {
    title: 'FAQ - Frequently Asked Questions | SocialPully',
    description: 'Get answers to common questions about downloading videos from Instagram, TikTok, Facebook, YouTube. Free support and guides.',
    url: 'https://socialpully.com/faq',
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

const faqs = [
  {
    question: 'Is SocialPully free to use?',
    answer: 'Yes, SocialPully is 100% free. There are no hidden charges, premium plans, or registration requirements. You can download unlimited videos from Instagram, TikTok, Facebook, YouTube, and other platforms at no cost.'
  },
  {
    question: 'Do I need to install any software?',
    answer: 'No installation required. SocialPully works directly in your web browser on any device including phones, tablets, and computers. Simply paste the video URL and download.'
  },
  {
    question: 'Will downloaded videos have watermarks?',
    answer: 'Most videos downloaded through SocialPully are watermark-free. For platforms like TikTok, we automatically remove the watermark while maintaining original quality.'
  },
  {
    question: 'What video quality can I download?',
    answer: 'You can download videos in multiple qualities: 360p, 480p, 720p HD, 1080p Full HD, and 4K Ultra HD (when available from the source). Higher quality means better viewing but larger file sizes.'
  },
  {
    question: 'How many videos can I download?',
    answer: 'There is no limit. You can download as many videos as you want, whenever you want, completely free.'
  },
  {
    question: 'Can I download private videos?',
    answer: 'No, SocialPully can only download public videos. Private content from locked accounts cannot be accessed or downloaded without proper authorization.'
  },
  {
    question: 'Which platforms are supported?',
    answer: 'SocialPully supports 15+ platforms including Instagram (Reels, Stories, IGTV), TikTok, Facebook (Videos, Reels, Watch), YouTube (Videos, Shorts), Twitter/X, Pinterest, LinkedIn, Reddit, Snapchat, Vimeo, Dailymotion, and more.'
  },
  {
    question: 'Is it legal to download videos?',
    answer: 'Downloading videos for personal use is generally acceptable. However, always respect copyright laws and the original creator\'s rights. Do not redistribute or use downloaded content commercially without permission.'
  },
  {
    question: 'How fast are downloads?',
    answer: 'Downloads are typically very fast, usually completing within seconds. Speed depends on your internet connection and the video size/quality.'
  },
  {
    question: 'Does it work on mobile devices?',
    answer: 'Yes! SocialPully works perfectly on iPhone, Android, tablets, and all mobile browsers. The interface is fully responsive and optimized for mobile use.'
  },
  {
    question: 'Why should I use SocialPully instead of other downloaders?',
    answer: 'SocialPully offers free unlimited downloads, no watermarks, HD quality, no registration required, support for 15+ platforms, mobile-friendly interface, fast downloads, and regular updates to stay compatible with platform changes.'
  },
  {
    question: 'Do I need to create an account?',
    answer: 'No account needed. SocialPully works without any registration or login. Just paste the video URL and download.'
  }
];

export default function FAQPage() {
  const schemaData = generateFAQSchema(faqs);

  return (
    <>
      <JsonLd data={schemaData} />
      
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold text-center mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-center text-gray-600">
              Everything you need to know about SocialPully Video Downloader
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                <h2 className="text-xl font-bold mb-3 text-gray-900">{faq.question}</h2>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-gray-600 mb-6">
              Can't find the answer you're looking for? Contact our support team.
            </p>
            <a 
              href="/contact"
              className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </>
  );
}