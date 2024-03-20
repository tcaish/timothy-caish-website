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
    'Discover the work of a passionate full-stack mobile & web developer with expertise in React and React Native.';
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
      title,
      type: 'website'
    }
  };
}
