import { isDevelopmentEnv } from '@/constants/device';
import { Metadata } from 'next';

// Generates the metadata used on a page
export function generateMetaData(meta?: {
  description?: string;
  image?: string;
  title?: string;
}): Metadata {
  const domain = !isDevelopmentEnv
    ? 'https://timothy-caish.vercel.app'
    : 'http://localhost:3000';

  const description =
    meta?.description ||
    'Discover the work of a passionate full stack mobile & web developer with expertise in React, React Native, Next.js, Expo, Chakra UI, Supabase, and more!';
  const imageUrl = `${domain}/assets/seo.png`;
  const title = `Timothy Caish - ${
    meta?.title || 'Full Stack Mobile & Web Developer'
  }`;

  return {
    metadataBase: new URL(domain),

    title,
    description,
    keywords: [
      'Timothy',
      'Caish',
      'Caish Cloud',
      'Full',
      'Stack',
      'Mobile',
      'Web',
      'Developer',
      'React',
      'React Native',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Expo',
      'Python',
      'Django'
    ],

    authors: [
      {
        name: 'Timothy Caish'
      }
    ],
    icons: '/favicon/favicon.ico',
    manifest: '/site.webmanifest',
    robots: { index: true, follow: true },

    openGraph: {
      description,
      determiner: '',
      images: [
        {
          alt: 'Timothy Caish',
          height: 630,
          url: imageUrl,
          width: 1200
        }
      ],
      siteName: title,
      title,
      type: 'website',
      url: domain
    }
  };
}

/**
 * Opens a URL in a new tab.
 * @param url The URL to open in a new tab.
 */
export function openUrlInNewTab(url: string): void {
  window.open(url, '_blank')?.focus();
}

// A variable that can take in a value within .format() and return a more
// compact version of it (e.g. 1,000 -> 1K).
// https://www.html-code-generator.com/javascript/shorten-long-numbers
export function shortenNumber(value: number): string {
  const tempValue = value.toString().replace(/[^0-9.]/g, '');

  // If the value is less than 1000, return it as is
  if (value < 1000) {
    return tempValue;
  }

  const si = [
    { v: 1e3, s: 'K' },
    { v: 1e6, s: 'M' },
    { v: 1e9, s: 'B' },
    { v: 1e12, s: 'T' },
    { v: 1e15, s: 'P' },
    { v: 1e18, s: 'E' }
  ];

  let index;
  for (index = si.length - 1; index > 0; index--) {
    if (value >= si[index].v) {
      break;
    }
  }

  const truncatedValue = `${Math.trunc((value / si[index].v) * 100) / 100}`;

  return truncatedValue.replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[index].s;
}
