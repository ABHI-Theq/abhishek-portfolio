import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import * as fc from "fast-check";
import { BentoGrid } from "../BentoGrid";
import type { Project } from "@/data/projects";

// ---------------------------------------------------------------------------
// Arbitraries
// ---------------------------------------------------------------------------

const nonEmptyString = fc
  .string({ minLength: 1, maxLength: 40 })
  .filter((s) => s.trim().length > 0);

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
// Property 8: Secondary project cards have correct stagger delays
// **Feature: portfolio-redesign-elevation, Property 8: Secondary project cards have correct stagger delays**
// Validates: Requirements 5.3
//
// For any array of secondary projects rendered in the grid, the card at index i
// should have an animationDelay equal to i × 80ms in its FadeIn wrapper's inline style.
// ---------------------------------------------------------------------------
describe("Property 8: Secondary project cards have correct stagger delays", () => {
  it("each secondary card FadeIn wrapper has a transition delay of index × 80ms", () => {
    fc.assert(
      fc.property(
        fc
          .array(projectArb({ featured: false }), { minLength: 1, maxLength: 5 })
          .map((arr) => arr.map((p, i) => ({ ...p, slug: `sec-${i}` }))),
        (secondaryProjects) => {
          const { container, unmount } = render(
            <BentoGrid projects={secondaryProjects} />
          );

          // FadeIn wrappers in the secondary section carry data-secondary-card-index
          for (let i = 0; i < secondaryProjects.length; i++) {
            const wrapper = container.querySelector(
              `[data-secondary-card-index="${i}"]`
            );
            expect(wrapper).not.toBeNull();

            const style = (wrapper as HTMLElement)?.style?.transition ?? "";
            const expectedDelayMs = i * 80;
            expect(style).toContain(`${expectedDelayMs}ms`);
          }

          unmount();
        }
      ),
      { numRuns: 50 }
    );
  });

  it("first secondary card always has 0ms delay", () => {
    fc.assert(
      fc.property(
        fc
          .array(projectArb({ featured: false }), { minLength: 1, maxLength: 4 })
          .map((arr) => arr.map((p, i) => ({ ...p, slug: `sec-${i}` }))),
        (secondaryProjects) => {
          const { container, unmount } = render(
            <BentoGrid projects={secondaryProjects} />
          );

          const firstWrapper = container.querySelector(
            `[data-secondary-card-index="0"]`
          );
          expect(firstWrapper).not.toBeNull();
          const style = (firstWrapper as HTMLElement)?.style?.transition ?? "";
          expect(style).toContain("0ms");

          unmount();
        }
      ),
      { numRuns: 30 }
    );
  });
});
