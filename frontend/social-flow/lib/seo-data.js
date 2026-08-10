export const siteConfig = {
  name: 'SocialPully',
  description: 'Free video downloader for Instagram, TikTok, Facebook, YouTube',
  url: 'https://socialpully.com',
  ogImage: 'https://socialpully.com/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/SocialPully',
    facebook: 'https://facebook.com/SocialPully',
  },
};

export const platformKeywords = {
  instagram: [
    'instagram reel downloader',
    'download instagram reels',
    'instagram video downloader',
    'ig reel download',
    'instagram story downloader',
    'save instagram reels',
    'instagram downloader online',
    'download ig videos'
  ],
  tiktok: [
    'tiktok video downloader',
    'download tiktok videos',
    'tiktok downloader no watermark',
    'save tiktok videos',
    'tiktok to mp4',
    'download tiktok without watermark',
    'tiktok saver'
  ],
  facebook: [
    'facebook video downloader',
    'download facebook videos',
    'fb video download',
    'facebook video saver',
    'download fb reels',
    'facebook watch downloader'
  ],
  youtube: [
    'youtube video downloader',
    'download youtube videos',
    'youtube to mp4',
    'youtube downloader online',
    'save youtube videos',
    'youtube video saver'
  ]
};

export function generateSchemaMarkup(type, data) {
  const schemas = {
    article: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: data.title,
      description: data.description,
      image: data.image,
      datePublished: data.date,
      author: {
        '@type': 'Person',
        name: data.author
      }
    },
    breadcrumb: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: data.items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    },
    faq: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: data.questions.map(q => ({
        '@type': 'Question',
        name: q.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: q.answer
        }
      }))
    }
  };

  return schemas[type];
}