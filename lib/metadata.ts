import type { Metadata } from "next";

const SITE_URL = "https://abhisheksharma.dev";
const SITE_NAME = "Abhishek Sharma";
const DEFAULT_OG_IMAGE = "/og-image.png";

interface BuildMetadataOptions {
  title: string;
  description: string;
  /** Canonical URL path, e.g. "/projects/zerko" — defaults to "/" */
  path?: string;
  /** Override OG image URL — defaults to DEFAULT_OG_IMAGE */
  ogImage?: string;
}

/**
 * Generates a Next.js Metadata object with title, description,
 * and full Open Graph fields (og:title, og:description, og:url, og:image).
 */
export function buildMetadata({
  title,
  description,
  path = "/",
  ogImage = DEFAULT_OG_IMAGE,
}: BuildMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
}
