import { isDevelopmentEnv } from "@/constants/device";
import Crypto from "crypto";
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

/**
 * Create a SHA512 hash from the given string.
 * @param str The string to hash.
 * @returns The hashed string.
 */
export function createSha512Hash(str: string): string {
  return Crypto.createHash("sha512").update(str).digest("hex");
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
 * Gets the user's IPV6 address and then hashes it. If the IPV6 address cannot
 * be determined, we try to get the IPV4 address and hash that instead. If
 * neither can be determined, null is returned.
 * @returns The user's hashed IPV4 or IPV6 address if it can be fetched;
 * otherwise, null.
 */
export async function getHashedIpAddress(): Promise<string | null> {
  let ipAddress = await getIpv6Address();

  // If we couldn't fetch the IPV6 address
  if (!ipAddress) {
    ipAddress = await getIpv4Address();
  }

  // If we couldn't fetch the IPV4 address
  if (!ipAddress) return null;

  return createSha512Hash(ipAddress);
}

/**
 * Get the user's IPV4 address.
 * @returns The user's IPV4 address; otherwise, null.
 */
export async function getIpv4Address(): Promise<string | null> {
  const ip = await fetch("https://api.ipify.org?format=json")
    .then((response) => response.json())
    .then((data) => data.ip)
    .catch(() => null);
  return ip;
}

/**
 * Get the user's IPV6 address. It is possible that the user does not have an
 * IPV6 address, and in that case, null is returned.
 * @returns The user's IPV6 address; otherwise, null.
 */
export async function getIpv6Address(): Promise<string | null> {
  const ip = await fetch("https://api6.ipify.org?format=json")
    .then((response) => response.json())
    .then((data) => data.ip)
    .catch(() => null);
  return ip;
}

/**
 * Opens a URL in a new tab.
 * @param url The URL to open in a new tab.
 */
export function openUrlInNewTab(url: string): void {
  window.open(url, "_blank")?.focus();
}
