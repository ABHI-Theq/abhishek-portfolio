import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

const SITE_URL = "https://abhisheksharma.dev";

/**
 * Generates sitemap.xml listing homepage + all project detail pages.
 * Returns N+1 entries for N projects.
 * Requirements: 12.1
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    ...projectEntries,
  ];
}
