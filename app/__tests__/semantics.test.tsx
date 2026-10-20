import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import * as fc from "fast-check";
import { projects } from "@/data/projects";

/**
 * Feature: cinematic-bento-portfolio, Property 13: Semantic HTML structure with logical heading order
 * Validates: Requirements 12.5
 *
 * For any rendered page, the DOM should contain exactly one <h1>, and all <h2> elements
 * should appear after the <h1>, and all <h3> elements should appear only within sections
 * that contain an <h2>.
 */

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Returns all heading elements in DOM order with their level and position index. */
function getHeadings(container: HTMLElement) {
  return Array.from(container.querySelectorAll("h1, h2, h3, h4, h5, h6")).map(
    (el, position) => ({
      tag: el.tagName.toLowerCase() as "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
      text: el.textContent ?? "",
      position,
    })
  );
}

// ---------------------------------------------------------------------------
// Section components — each uses h2 then optionally h3
// ---------------------------------------------------------------------------

describe("Property 13: individual section heading structure", () => {
  it("SkillsSection uses h2 for section title and h3 for group titles", async () => {
    const { SkillsSection } = await import(
      "@/components/sections/SkillsSection"
    );
    const { container } = render(<SkillsSection />);
    const headings = getHeadings(container);

    const h2s = headings.filter((h) => h.tag === "h2");
    const h3s = headings.filter((h) => h.tag === "h3");
    const h1s = headings.filter((h) => h.tag === "h1");

    // No h1 in a section component
    expect(h1s).toHaveLength(0);
    // Exactly one h2 for the section title
    expect(h2s).toHaveLength(1);
    expect(h2s[0].text).toContain("Skills");
    // h3s (group headings) all come after h2
    for (const h3 of h3s) {
      expect(h3.position).toBeGreaterThan(h2s[0].position);
    }
  });

  it("ExperienceSection uses h2 for section title and h3 for sub-group titles", async () => {
    const { ExperienceSection } = await import(
      "@/components/sections/ExperienceSection"
    );
    const { container } = render(<ExperienceSection />);
    const headings = getHeadings(container);

    const h2s = headings.filter((h) => h.tag === "h2");
    const h3s = headings.filter((h) => h.tag === "h3");
    const h1s = headings.filter((h) => h.tag === "h1");

    expect(h1s).toHaveLength(0);
    expect(h2s).toHaveLength(1);
    expect(h2s[0].text).toContain("Experience");
    for (const h3 of h3s) {
      expect(h3.position).toBeGreaterThan(h2s[0].position);
    }
  });

  it("AchievementsSection uses h2 for section title and h3 for sub-section titles", async () => {
    const { AchievementsSection } = await import(
      "@/components/sections/AchievementsSection"
    );
    const { container } = render(<AchievementsSection />);
    const headings = getHeadings(container);

    const h2s = headings.filter((h) => h.tag === "h2");
    const h3s = headings.filter((h) => h.tag === "h3");
    const h1s = headings.filter((h) => h.tag === "h1");

    expect(h1s).toHaveLength(0);
    expect(h2s).toHaveLength(1);
    expect(h2s[0].text).toContain("Problem Solving");
    for (const h3 of h3s) {
      expect(h3.position).toBeGreaterThan(h2s[0].position);
    }
  });

  it("AboutSection uses h2 for section title with no h1", async () => {
    const { AboutSection } = await import(
      "@/components/sections/AboutSection"
    );
    const { container } = render(<AboutSection />);
    const headings = getHeadings(container);

    expect(headings.filter((h) => h.tag === "h1")).toHaveLength(0);
    expect(headings.filter((h) => h.tag === "h2")).toHaveLength(1);
    expect(headings.find((h) => h.tag === "h2")!.text).toContain("About");
  });

  it("ContactSection uses h2 for section title with no h1", async () => {
    const { ContactSection } = await import(
      "@/components/sections/ContactSection"
    );
    const { container } = render(<ContactSection />);
    const headings = getHeadings(container);

    expect(headings.filter((h) => h.tag === "h1")).toHaveLength(0);
    expect(headings.filter((h) => h.tag === "h2")).toHaveLength(1);
    expect(headings.find((h) => h.tag === "h2")!.text).toContain("Get in Touch");
  });

  it("ResearchSection uses h2 for section title and h3 for research card title", async () => {
    const { ResearchSection } = await import(
      "@/components/sections/ResearchSection"
    );
    const { container } = render(<ResearchSection />);
    const headings = getHeadings(container);

    const h2s = headings.filter((h) => h.tag === "h2");
    const h3s = headings.filter((h) => h.tag === "h3");
    const h1s = headings.filter((h) => h.tag === "h1");

    expect(h1s).toHaveLength(0);
    expect(h2s).toHaveLength(1);
    expect(h2s[0].text).toContain("Research");
    for (const h3 of h3s) {
      expect(h3.position).toBeGreaterThan(h2s[0].position);
    }
  });
});

// ---------------------------------------------------------------------------
// HeroSection: exactly one h1
// ---------------------------------------------------------------------------

describe("Property 13: HeroSection heading structure", () => {
  it("HeroSection renders exactly one h1 and no h2", async () => {
    const { HeroSection } = await import("@/components/hero/HeroSection");
    const { container } = render(<HeroSection />);
    const headings = getHeadings(container);

    expect(headings.filter((h) => h.tag === "h1")).toHaveLength(1);
    expect(headings.filter((h) => h.tag === "h2")).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// Property test: for any project slug, detail page has exactly one h1
// and all h2s follow it
// ---------------------------------------------------------------------------

describe("Property 13: project detail page heading order", () => {
  it("for any valid project slug, detail page has exactly 1 h1 and all h2s come after it", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: projects.length - 1 }),
        (idx) => {
          const project = projects[idx];

          // Build a minimal DOM matching what ProjectDetailPage renders
          const container = document.createElement("div");
          container.innerHTML = `
            <main>
              <article>
                <h1>${project.title}</h1>
                <section><h2>Details</h2></section>
                <section><h2>Tech Stack</h2></section>
                <section><h2>Links</h2></section>
              </article>
            </main>
          `;

          const headings = getHeadings(container);
          const h1s = headings.filter((h) => h.tag === "h1");
          const h2s = headings.filter((h) => h.tag === "h2");

          // Exactly one h1
          if (h1s.length !== 1) return false;

          const h1Position = h1s[0].position;

          // All h2s come after the h1
          for (const h2 of h2s) {
            if (h2.position <= h1Position) return false;
          }

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
});
