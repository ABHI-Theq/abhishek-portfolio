import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";

/**
 * Feature: cinematic-bento-portfolio, Property 12: All rendered images have alt attributes
 * Validates: Requirements 13.2
 *
 * For any component in the portfolio that renders an <img> or <Image>, the resulting
 * DOM element should have an `alt` attribute (empty string is acceptable for decorative
 * images, but the attribute must be present).
 *
 * This test renders every portfolio component and asserts that no <img> element
 * is missing its `alt` attribute — preventing future regressions if real images
 * are added.
 */

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

/**
 * Asserts that every <img> in the container has an `alt` attribute.
 * An empty string is valid (decorative image); absence is a violation.
 */
function assertAllImagesHaveAlt(container: HTMLElement, componentName: string) {
  const images = Array.from(container.querySelectorAll("img"));
  for (const img of images) {
    expect(
      img.hasAttribute("alt"),
      `<img> in ${componentName} is missing an alt attribute (src="${img.getAttribute("src")}")`
    ).toBe(true);
  }
}

// ---------------------------------------------------------------------------
// Section components
// ---------------------------------------------------------------------------

describe("Property 12: All rendered images have alt attributes", () => {
  it("HeroSection — no img without alt", async () => {
    const { HeroSection } = await import("@/components/hero/HeroSection");
    const { container } = render(<HeroSection />);
    assertAllImagesHaveAlt(container, "HeroSection");
  });

  it("BentoGrid — no img without alt", async () => {
    const { BentoGrid } = await import("@/components/bento/BentoGrid");
    const { projects } = await import("@/data/projects");
    const { container } = render(<BentoGrid projects={projects} />);
    assertAllImagesHaveAlt(container, "BentoGrid");
  });

  it("ProjectCard — no img without alt for any project", async () => {
    const { ProjectCard } = await import("@/components/projects/ProjectCard");
    const { projects } = await import("@/data/projects");
    for (const project of projects) {
      const { container, unmount } = render(<ProjectCard project={project} />);
      assertAllImagesHaveAlt(container, `ProjectCard(${project.slug})`);
      unmount();
    }
  });

  it("SkillsSection — no img without alt", async () => {
    const { SkillsSection } = await import("@/components/sections/SkillsSection");
    const { container } = render(<SkillsSection />);
    assertAllImagesHaveAlt(container, "SkillsSection");
  });

  it("ResearchSection — no img without alt", async () => {
    const { ResearchSection } = await import("@/components/sections/ResearchSection");
    const { container } = render(<ResearchSection />);
    assertAllImagesHaveAlt(container, "ResearchSection");
  });

  it("ExperienceSection — no img without alt", async () => {
    const { ExperienceSection } = await import("@/components/sections/ExperienceSection");
    const { container } = render(<ExperienceSection />);
    assertAllImagesHaveAlt(container, "ExperienceSection");
  });

  it("AchievementsSection — no img without alt", async () => {
    const { AchievementsSection } = await import("@/components/sections/AchievementsSection");
    const { container } = render(<AchievementsSection />);
    assertAllImagesHaveAlt(container, "AchievementsSection");
  });

  it("AboutSection — no img without alt", async () => {
    const { AboutSection } = await import("@/components/sections/AboutSection");
    const { container } = render(<AboutSection />);
    assertAllImagesHaveAlt(container, "AboutSection");
  });

  it("ContactSection — no img without alt", async () => {
    const { ContactSection } = await import("@/components/sections/ContactSection");
    const { container } = render(<ContactSection />);
    assertAllImagesHaveAlt(container, "ContactSection");
  });
});
