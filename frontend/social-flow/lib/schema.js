export const generateWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'SocialPully',
  url: 'https://socialpully.com',
  description: 'Free video downloader for Instagram, TikTok, Facebook, YouTube',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://socialpully.com/?q={search_term_string}',
    'query-input': 'required name=search_term_string'
  }
});

export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SocialPully',
  url: 'https://socialpully.com',
  logo: 'https://socialpully.com/logo.png',
  sameAs: [
    'https://twitter.com/SocialPully',
    'https://facebook.com/SocialPully',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    email: 'support@SocialPully.com'
  }
});

export const generateSoftwareApplicationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'SocialPully Video Downloader',
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'Web Browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '15420',
    bestRating: '5',
    worstRating: '1'
  },
  description: 'Free online video downloader for Instagram Reels, TikTok, Facebook, YouTube',
  screenshot: 'https://socialpully.com/screenshot.jpg'
});

export const generateHowToSchema = (platform) => {
  const steps = {
    instagram: [
      { text: 'Open Instagram and find the Reel you want to download' },
      { text: 'Tap the three dots menu and select "Copy Link"' },
      { text: 'Visit SocialPully.com/instagram-reels-downloader' },
      { text: 'Paste the Instagram Reel link into the downloader' },
      { text: 'Select your preferred quality and click Download' }
    ],
    tiktok: [
      { text: 'Open TikTok and find the video you want' },
      { text: 'Tap the Share button and select "Copy Link"' },
      { text: 'Go to SocialPully.com/tiktok-video-downloader' },
      { text: 'Paste the TikTok link and choose "No Watermark"' },
      { text: 'Click Download to save the video' }
    ],
    twitter: [
      { text: 'Open Twitter/X and find the video you want to download' },
      { text: 'Click the Share button and select "Copy Link"' },
      { text: 'Visit SocialPully.com/twitter-video-downloader' },
      { text: 'Paste the Twitter video link into the downloader' },
      { text: 'Select your preferred quality and click Download' }
    ],
    pinterest: [
      { text: 'Open Pinterest and find the video Pin you want to download' },
      { text: 'Tap the Share button and select "Copy Link"' },
      { text: 'Visit SocialPully.com/pinterest-video-downloader' },
      { text: 'Paste the Pinterest video link into the downloader' },
      { text: 'Click Download to save the video to your device' }
    ],
    youtube: [
      { text: 'Open YouTube and find the video you want to download' },
      { text: 'Click the Share button and select "Copy Link"' },
      { text: 'Visit SocialPully.com/youtube-video-downloader' },
      { text: 'Paste the YouTube video link into the downloader' },
      { text: 'Select your preferred quality and click Download' }
    ],
    facebook: [
      { text: 'Open Facebook and find the video you want to download' },
      { text: 'Click the three dots menu and select "Copy Link"' },
      { text: 'Visit SocialPully.com/facebook-video-downloader' },
      { text: 'Paste the Facebook video link into the downloader' },
      { text: 'Choose your preferred quality and click Download' }
    ]
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Download ${platform === 'instagram' ? 'Instagram Reels' : 'TikTok Videos'}`,
    description: `Step by step guide to download ${platform === 'instagram' ? 'Instagram Reels' : 'TikTok videos'} without watermark`,
    step: steps[platform].map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      text: step.text
    }))
  };
};

export const generateFAQSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
});

export const generateBreadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url
  }))
});

export const generateArticleSchema = (article) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: article.title,
  description: article.excerpt,
  image: article.image,
  datePublished: article.date,
  dateModified: article.date,
  author: {
    '@type': 'Person',
    name: article.author
  },
  publisher: {
    '@type': 'Organization',
    name: 'SocialPully',
    logo: {
      '@type': 'ImageObject',
      url: 'https://socialpully.com/logo.png'
    }
  }
});