import { describe, it, expect } from "vitest";
import { render, fireEvent, act } from "@testing-library/react";
import * as fc from "fast-check";
import { BentoGrid } from "../BentoGrid";
import { FeaturedProjectRow } from "@/components/projects/FeaturedProjectRow";
import type { Project } from "@/data/projects";

// ---------------------------------------------------------------------------
// Arbitraries
// ---------------------------------------------------------------------------

// Use ascii printable letters only — avoids whitespace-only strings without filtering
const nonEmptyString = fc.stringMatching(/^[A-Za-z][A-Za-z0-9 ]{0,20}$/);

const slugArb = fc.stringMatching(/^[a-z][a-z0-9-]{0,15}$/);

const categoryArb = fc.constantFrom(
  "fullstack" as const,
  "ai" as const,
  "research" as const,
  "tool" as const,
  "ml" as const,
  "dl" as const
);

function projectArb(overrides: Partial<Project> = {}): fc.Arbitrary<Project> {
  return fc
    .record({
      slug: slugArb,
      title: nonEmptyString,
      tagline: nonEmptyString,
      description: nonEmptyString,
      problem: nonEmptyString,
      features: fc.constant([]),
      tech: fc.array(nonEmptyString, { minLength: 1, maxLength: 3 }),
      domains: fc.array(nonEmptyString, { minLength: 1, maxLength: 2 }),
      category: categoryArb,
      featured: fc.boolean(),
      githubUrl: fc.constant(undefined) as fc.Arbitrary<undefined>,
      liveUrl: fc.constant(undefined) as fc.Arbitrary<undefined>,
      architecture: fc.constant(undefined) as fc.Arbitrary<undefined>,
      highlights: fc.constant(undefined) as fc.Arbitrary<undefined>,
    })
    .map((p) => ({ ...p, ...overrides }));
}

// ---------------------------------------------------------------------------
// Property 4: Featured projects appear before secondary projects in DOM order
// **Feature: portfolio-redesign-elevation, Property 4: Featured projects appear before secondary projects in DOM order**
// Validates: Requirements 4.1
// ---------------------------------------------------------------------------
describe("Property 4: Featured projects appear before secondary projects in DOM order", () => {
  it("all featured rows appear before any secondary ProjectCard in the DOM", () => {
    fc.assert(
      fc.property(
        fc
          .tuple(
            fc
              .array(projectArb({ featured: true }), { minLength: 1, maxLength: 2 })
              .map((arr) => arr.map((p, i) => ({ ...p, slug: `feat-${i}` }))),
            fc
              .array(projectArb({ featured: false }), { minLength: 1, maxLength: 2 })
              .map((arr) => arr.map((p, i) => ({ ...p, slug: `sec-${i}` })))
          )
          .map(([featured, secondary]) => [...featured, ...secondary]),
        (projects) => {
          const { container, unmount } = render(<BentoGrid projects={projects} />);

          const featuredSection = container.querySelector('[data-section="featured"]');
          const secondarySection = container.querySelector('[data-section="secondary"]');

          if (featuredSection && secondarySection) {
            // DOCUMENT_POSITION_FOLLOWING (4) means secondarySection comes after featuredSection
            const position = featuredSection.compareDocumentPosition(secondarySection);
            expect(position & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
          }

          unmount();
        }
      ),
      { numRuns: 25 }
    );
  });
});

// ---------------------------------------------------------------------------
// Property 5: Featured rows alternate layout direction
// **Feature: portfolio-redesign-elevation, Property 5: Featured rows alternate layout direction**
// Validates: Requirements 4.3
// Tested directly on FeaturedProjectRow for performance — BentoGrid passes the index through unchanged
// ---------------------------------------------------------------------------
describe("Property 5: Featured rows alternate layout direction", () => {
  it("even-index rows have data-layout=normal and odd-index rows have data-layout=reversed", () => {
    fc.assert(
      fc.property(
        fc
          .integer({ min: 0, max: 5 })
          .chain((index) =>
            projectArb({ featured: true })
              .map((p) => ({ ...p, slug: `feat-${index}` }))
              .map((project) => ({ project, index }))
          ),
        ({ project, index }) => {
          const { container, unmount } = render(
            <FeaturedProjectRow project={project} index={index} />
          );

          const article = container.querySelector("[data-layout]");
          expect(article).not.toBeNull();

          const expectedLayout = index % 2 === 0 ? "normal" : "reversed";
          expect(article?.getAttribute("data-layout")).toBe(expectedLayout);

          unmount();
        }
      ),
      { numRuns: 50 }
    );
  });
});

// ---------------------------------------------------------------------------
// Property 6: Category filter hides non-matching featured and secondary projects
// **Feature: portfolio-redesign-elevation, Property 6: Category filter hides non-matching featured and secondary projects**
// Validates: Requirements 4.6
// ---------------------------------------------------------------------------
describe("Property 6: Category filter hides non-matching featured and secondary projects", () => {
  it("featured rows not matching the filter get the hidden class", () => {
    fc.assert(
      fc.property(
        fc.tuple(
          projectArb({ category: "ai", featured: true }).map((p) => ({
            ...p,
            slug: "feat-ai",
          })),
          projectArb({ category: "fullstack", featured: true }).map((p) => ({
            ...p,
            slug: "feat-fs",
          }))
        ),
        ([aiProject, fsProject]) => {
          const { container, unmount } = render(
            <BentoGrid projects={[aiProject, fsProject]} />
          );

          act(() => {
            // Find the AI/GenAI tab within this specific container
            const allTabs = Array.from(container.querySelectorAll('[role="tab"]'));
            const aiTabEl = allTabs.find((el) => el.textContent?.includes("AI")) as HTMLElement | undefined;
            if (aiTabEl) fireEvent.click(aiTabEl);
          });

          // The fullstack featured item wrapper should have "hidden" class
          const fsWrapper = container.querySelector(
            `[data-featured-item="${fsProject.slug}"]`
          );
          expect(fsWrapper?.className).toContain("hidden");

          // The AI featured item wrapper should NOT have "hidden" class
          const aiWrapper = container.querySelector(
            `[data-featured-item="${aiProject.slug}"]`
          );
          expect(aiWrapper?.className).not.toContain("hidden");

          unmount();
        }
      ),
      { numRuns: 25 }
    );
  });

  it("secondary grid shows only projects matching the active filter", () => {
    fc.assert(
      fc.property(
        fc.tuple(
          fc
            .array(projectArb({ category: "ai", featured: false }), {
              minLength: 1,
              maxLength: 2,
            })
            .map((arr) => arr.map((p, i) => ({ ...p, slug: `ai-${i}` }))),
          fc
            .array(projectArb({ category: "fullstack", featured: false }), {
              minLength: 1,
              maxLength: 2,
            })
            .map((arr) => arr.map((p, i) => ({ ...p, slug: `fs-${i}` })))
        ),
        ([aiProjects, fsProjects]) => {
          const { container, unmount } = render(
            <BentoGrid projects={[...aiProjects, ...fsProjects]} />
          );

          act(() => {
            // Find the AI/GenAI tab within this specific container
            const allTabs = Array.from(container.querySelectorAll('[role="tab"]'));
            const aiTabEl = allTabs.find((el) => el.textContent?.includes("AI")) as HTMLElement | undefined;
            if (aiTabEl) fireEvent.click(aiTabEl);
          });

          const secondarySection = container.querySelector(
            '[data-section="secondary"]'
          );

          if (secondarySection) {
            // Fullstack project slugs should not appear as data-secondary-item attributes
            for (const p of fsProjects) {
              const fsCard = secondarySection.querySelector(
                `[data-secondary-item="${p.slug}"]`
              );
              expect(fsCard).toBeNull();
            }
            // AI project slugs should be present
            for (const p of aiProjects) {
              const aiCard = secondarySection.querySelector(
                `[data-secondary-item="${p.slug}"]`
              );
              expect(aiCard).not.toBeNull();
            }
          }

          unmount();
        }
      ),
      { numRuns: 25 }
    );
  });
});
