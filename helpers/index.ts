import { isDevelopmentEnv } from "@/constants/device";
import { Metadata } from "next";

// Converts seconds to hours and minutes
export function convertSecondsToHoursAndMinutes(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds % 3600 / 60);
  // const s = Math.floor(seconds % 3600 % 60);

  return {
    hours,
    minutes,
  };
}

// Generates the metadata used on a page
export function generateMetaData(meta?: {
  description?: string;
  image?: string;
  title?: string;
}): Metadata {
  const domain = !isDevelopmentEnv
    ? "https://timothy-caish.vercel.app"
    : "http://localhost:3000";

  const description = meta?.description ||
    "Discover the work of a passionate full stack mobile & web developer with expertise in React, React Native, Next.js, Expo, Supabase, and more 🚀✨";
  const imageUrl = `${domain}/assets/seo.png`;
  const title = meta?.title
    ? `${meta.title} | Timothy Caish`
    : "Timothy Caish - Full Stack Mobile & Web Developer";

  return {
    metadataBase: new URL(domain),

    title,
    description,
    keywords: [
      "Timothy",
      "Caish",
      "Cloud",
      "LLC",
      "Full",
      "Stack",
      "Mobile",
      "Web",
      "Developer",
      "React",
      "React Native",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Expo",
      "Python",
      "Django",
      "Chakra",
      "UI",
    ],

    authors: [
      {
        name: "Timothy Caish",
      },
    ],
    icons: "/favicon/favicon.ico",
    manifest: "/site.webmanifest",
    robots: { index: true, follow: true },

    openGraph: {
      description,
      determiner: "",
      images: [
        {
          alt: "Timothy Caish",
          height: 630,
          url: imageUrl,
          width: 1200,
        },
      ],
      siteName: title,
      title,
      type: "website",
      url: domain,
    },
  };
}

/**
 * Opens a URL in a new tab.
 * @param url The URL to open in a new tab.
 */
export function openUrlInNewTab(url: string): void {
  window.open(url, "_blank")?.focus();
}
