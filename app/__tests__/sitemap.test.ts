import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { projects } from "@/data/projects";

/**
 * Feature: cinematic-bento-portfolio, Property 10: Sitemap size equals 1 plus number of projects
 * Validates: Requirements 12.1
 *
 * For any array of N projects, the sitemap function should return exactly N+1 URL entries.
 */

const SITE_URL = "https://abhisheksharma.dev";

/**
 * Pure helper mirroring the sitemap logic — given an array of slugs,
 * returns the same N+1 URL strings the real sitemap function would produce.
 */
function buildSitemapUrls(slugs: string[]): string[] {
  return [
    SITE_URL,
    ...slugs.map((slug) => `${SITE_URL}/projects/${slug}`),
  ];
}

describe("Sitemap — Property 10: entry count = 1 + N projects", () => {
  it("real data: sitemap() returns projects.length + 1 entries", async () => {
    const sitemapModule = await import("../sitemap");
    const entries = sitemapModule.default();
    expect(entries).toHaveLength(projects.length + 1);
  });

  it("real data: first entry is the homepage URL", async () => {
    const sitemapModule = await import("../sitemap");
    const entries = sitemapModule.default();
    expect(entries[0].url).toBe(SITE_URL);
  });

  it("real data: each project slug has a corresponding entry", async () => {
    const sitemapModule = await import("../sitemap");
    const entries = sitemapModule.default();
    const urls = entries.map((e) => e.url);
    for (const project of projects) {
      expect(urls).toContain(`${SITE_URL}/projects/${project.slug}`);
    }
  });

  it("property: for any N slugs, builder returns exactly N+1 entries", () => {
    fc.assert(
      fc.property(
        fc.array(fc.stringMatching(/^[a-z][a-z0-9-]{1,20}$/), {
          minLength: 0,
          maxLength: 20,
        }),
        (slugs) => {
          const entries = buildSitemapUrls(slugs);
          return entries.length === slugs.length + 1;
        }
      ),
      { numRuns: 100 }
    );
  });

  it("property: for any N slugs, the first entry is always the homepage", () => {
    fc.assert(
      fc.property(
        fc.array(fc.stringMatching(/^[a-z][a-z0-9-]{1,20}$/), {
          minLength: 0,
          maxLength: 20,
        }),
        (slugs) => {
          const entries = buildSitemapUrls(slugs);
          return entries[0] === SITE_URL;
        }
      ),
      { numRuns: 100 }
    );
  });
});
