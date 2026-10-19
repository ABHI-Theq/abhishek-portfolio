import type { MetadataRoute } from "next";

const SITE_URL = "https://abhisheksharma.dev";

/**
 * Generates robots.txt permitting all crawlers on all routes.
 * Requirements: 12.2
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
