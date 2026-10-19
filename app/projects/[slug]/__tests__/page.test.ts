import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { generateStaticParams, generateMetadata } from "../page";
import { projects } from "@/data/projects";

// ── Property 6: generateStaticParams returns a slug for every project ──────
// Feature: cinematic-bento-portfolio, Property 6: generateStaticParams returns a slug for every project
// Validates: Requirements 5.1
// --------------------------------------------------------------------------
describe("Property 6: generateStaticParams slug coverage", () => {
  it("returns exactly one entry per project with matching slug values", () => {
    const params = generateStaticParams();

    // 1-to-1 cardinality
    expect(params.length).toBe(projects.length);

    // Every project slug is represented
    const paramSlugs = params.map((p) => p.slug);
    for (const project of projects) {
      expect(paramSlugs).toContain(project.slug);
    }

    // No duplicates
    const unique = new Set(paramSlugs);
    expect(unique.size).toBe(params.length);
  });
});

// ── Property 7: generateMetadata returns distinct title per page ───────────
// Feature: cinematic-bento-portfolio, Property 7: generateMetadata returns distinct title per page
// Validates: Requirements 5.3, 12.3
// --------------------------------------------------------------------------
describe("Property 7: distinct metadata title per page", () => {
  it("titles for any two distinct slugs are different from each other and from the homepage title", async () => {
    const HOMEPAGE_TITLE = "Abhishek Sharma — Software Developer & AI Enthusiast";

    // Use fast-check to pick pairs of distinct indices from the projects array
    await fc.assert(
      fc.asyncProperty(
        fc
          .tuple(
            fc.integer({ min: 0, max: projects.length - 1 }),
            fc.integer({ min: 0, max: projects.length - 1 })
          )
          .filter(([a, b]) => a !== b),
        async ([idxA, idxB]) => {
          const slugA = projects[idxA].slug;
          const slugB = projects[idxB].slug;

          const metaA = await generateMetadata({ params: { slug: slugA } });
          const metaB = await generateMetadata({ params: { slug: slugB } });

          const titleA = metaA.title as string;
          const titleB = metaB.title as string;

          // Both must be non-empty strings
          expect(typeof titleA).toBe("string");
          expect(titleA.length).toBeGreaterThan(0);

          // Titles must differ from each other
          expect(titleA).not.toBe(titleB);

          // Neither must equal the homepage title
          expect(titleA).not.toBe(HOMEPAGE_TITLE);
          expect(titleB).not.toBe(HOMEPAGE_TITLE);
        }
      ),
      { numRuns: 100 }
    );
  });
});

// ── Property 8: generateMetadata returns all required Open Graph fields ────
// Feature: cinematic-bento-portfolio, Property 8: generateMetadata returns all required Open Graph fields
// Validates: Requirements 12.4
// --------------------------------------------------------------------------
describe("Property 8: generateMetadata OG fields completeness", () => {
  it("every project slug produces metadata with non-empty og:title, og:description, og:url, and og:images", async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.integer({ min: 0, max: projects.length - 1 }),
        async (idx) => {
          const slug = projects[idx].slug;
          const meta = await generateMetadata({ params: { slug } });

          const og = meta.openGraph as Record<string, unknown>;

          expect(og).toBeDefined();
          expect(typeof og.title).toBe("string");
          expect((og.title as string).length).toBeGreaterThan(0);

          expect(typeof og.description).toBe("string");
          expect((og.description as string).length).toBeGreaterThan(0);

          expect(typeof og.url).toBe("string");
          expect((og.url as string).length).toBeGreaterThan(0);

          expect(Array.isArray(og.images)).toBe(true);
          expect((og.images as unknown[]).length).toBeGreaterThan(0);
        }
      ),
      { numRuns: 100 }
    );
  });
});
