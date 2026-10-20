import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import * as fc from "fast-check";
import { ProjectCard } from "../ProjectCard";
import type { Project } from "@/data/projects";

// ---------------------------------------------------------------------------
// Arbitraries
// ---------------------------------------------------------------------------

const nonEmptyString = fc
  .string({ minLength: 1, maxLength: 60 })
  .filter((s) => s.trim().length > 0);

const slugArb = fc.stringMatching(/^[a-z][a-z0-9-]{0,20}$/);

const urlArb = fc.webUrl().filter((u) => u.startsWith("http"));

const techArrayArb = fc.array(nonEmptyString, { minLength: 1, maxLength: 4 });

const categoryArb = fc.constantFrom(
  "fullstack" as const,
  "ai" as const,
  "research" as const,
  "tool" as const,
  "ml" as const,
  "dl" as const
);

const domainsArb = fc.array(nonEmptyString, { minLength: 1, maxLength: 3 });

/** Fully-populated project (all optional fields present). */
const fullProjectArb: fc.Arbitrary<Project> = fc.record({
  slug: slugArb,
  title: nonEmptyString,
  tagline: nonEmptyString,
  description: nonEmptyString,
  problem: nonEmptyString,
  features: fc.array(
    fc.record({ name: nonEmptyString, detail: nonEmptyString }),
    { minLength: 0, maxLength: 3 }
  ),
  highlights: fc.option(
    fc.array(nonEmptyString, { minLength: 0, maxLength: 3 }),
    { nil: undefined }
  ),
  architecture: fc.option(nonEmptyString, { nil: undefined }),
  tech: techArrayArb,
  domains: domainsArb,
  githubUrl: fc.option(urlArb, { nil: undefined }),
  liveUrl: fc.option(urlArb, { nil: undefined }),
  featured: fc.option(fc.boolean(), { nil: undefined }),
  category: categoryArb,
});

/** Project with no external URLs. */
const noUrlProjectArb: fc.Arbitrary<Project> = fc.record({
  slug: slugArb,
  title: nonEmptyString,
  tagline: nonEmptyString,
  description: nonEmptyString,
  problem: nonEmptyString,
  features: fc.constant([]),
  tech: techArrayArb,
  domains: domainsArb,
  category: categoryArb,
});

// ---------------------------------------------------------------------------
// Property 2: ProjectCard renders the project name and its links
// Feature: cinematic-bento-portfolio, Property 2: ProjectCard renders the project name and its links
// Validates: Requirements 4.4
// ---------------------------------------------------------------------------
describe("Property 2: ProjectCard renders the project name and its links", () => {
  it("the title appears in an h3 and each available link is rendered for any valid project", () => {
    fc.assert(
      fc.property(fullProjectArb, (project) => {
        const { container, unmount } = render(<ProjectCard project={project} />);

        // Name
        const heading = container.querySelector("h3");
        expect(heading?.textContent).toBe(project.title);

        // Links: a GitHub / Live anchor exists only when its URL is present
        const anchors = Array.from(container.querySelectorAll("a"));
        if (project.githubUrl) {
          expect(
            anchors.some((a) => a.getAttribute("href") === project.githubUrl)
          ).toBe(true);
        }
        if (project.liveUrl) {
          expect(
            anchors.some((a) => a.getAttribute("href") === project.liveUrl)
          ).toBe(true);
        }

        unmount();
      }),
      { numRuns: 50 }
    );
  });
});

// ---------------------------------------------------------------------------
// Property 3: ProjectCard with optional URLs omitted renders without error
// Feature: cinematic-bento-portfolio, Property 3: ProjectCard with optional URLs omitted renders without error
// Validates: Requirements 4.6
// ---------------------------------------------------------------------------
describe("Property 3: optional URLs omitted renders without error", () => {
  it("renders without throwing when githubUrl and liveUrl are absent", () => {
    fc.assert(
      fc.property(noUrlProjectArb, (project) => {
        expect(() => {
          const { unmount } = render(<ProjectCard project={project} />);
          unmount();
        }).not.toThrow();
      }),
      { numRuns: 50 }
    );
  });

  it("renders no external (http) anchor tags when githubUrl and liveUrl are absent", () => {
    fc.assert(
      fc.property(noUrlProjectArb, (project) => {
        const { container, unmount } = render(<ProjectCard project={project} />);

        const anchors = Array.from(container.querySelectorAll("a"));
        for (const anchor of anchors) {
          const href = anchor.getAttribute("href") ?? "";
          expect(href.startsWith("http")).toBe(false);
        }

        unmount();
      }),
      { numRuns: 50 }
    );
  });
});

// ---------------------------------------------------------------------------
// Property 4: ProjectCard with slug renders case-study link
// Feature: cinematic-bento-portfolio, Property 4: ProjectCard with slug renders case-study link
// Validates: Requirements 4.5
// ---------------------------------------------------------------------------
describe("Property 4: slug renders case-study link href", () => {
  it("an anchor with href=/projects/<slug> is present for any project that has a slug", () => {
    fc.assert(
      fc.property(fullProjectArb, (project) => {
        const { container, unmount } = render(<ProjectCard project={project} />);

        const expectedHref = `/projects/${project.slug}`;
        const link = container.querySelector(`a[href="${expectedHref}"]`);
        expect(link).not.toBeNull();

        unmount();
      }),
      { numRuns: 50 }
    );
  });
});
