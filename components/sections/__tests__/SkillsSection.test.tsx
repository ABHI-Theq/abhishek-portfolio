import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import * as fc from "fast-check";
import { SkillsSection } from "../SkillsSection";
import { skillGroups } from "@/data/skills";

/**
 * Feature: portfolio-redesign-elevation, Property 11: Skills section renders no progress bars
 * Validates: Requirements 7.4
 *
 * For any render of SkillsSection, the DOM should contain no elements with role="progressbar"
 * and no text nodes matching the pattern /\d+%/.
 */
describe("Property 11: Skills section renders no progress bars", () => {
  it("renders no progressbar roles and no percentage text across all skill groups", () => {
    fc.assert(
      fc.property(
        // We use constant to run the same component multiple times — fast-check verifies
        // this property holds on every run
        fc.constant(null),
        () => {
          const { container, unmount } = render(<SkillsSection />);

          // No element should have role="progressbar"
          const progressBars = container.querySelectorAll('[role="progressbar"]');
          expect(progressBars.length).toBe(0);

          // No text node should contain a percentage like "80%" or "100%"
          const percentPattern = /\d+%/;
          expect(percentPattern.test(container.textContent ?? "")).toBe(false);

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });

  it("renders no <progress> elements", () => {
    const { container } = render(<SkillsSection />);
    const progressElements = container.querySelectorAll("progress");
    expect(progressElements.length).toBe(0);
  });
});

/**
 * Feature: portfolio-redesign-elevation, Property 7: Skill group rows have correct stagger delays
 * Validates: Requirements 5.2
 *
 * For any array of skill groups rendered by SkillsSection, the element for group at index i
 * should have an animationDelay / transition delay equal to i × 60ms.
 */
describe("Property 7: Skill group rows have correct stagger delays", () => {
  it("each skill group FadeIn wrapper has a transition delay of index × 60ms", () => {
    // SkillsSection uses the real skillGroups data — we verify the delay on each wrapper.
    // FadeIn sets inline style `transition: ... ${delay}ms` on its rendered element.
    // We look for elements with data-skill-group-index attributes and check their style.
    fc.assert(
      fc.property(
        // Generate indices within the valid range of skillGroups
        fc.integer({ min: 0, max: skillGroups.length - 1 }),
        (targetIndex) => {
          const { container, unmount } = render(<SkillsSection />);

          // FadeIn renders a div with data-skill-group-index for each group row
          const groupWrapper = container.querySelector(
            `[data-skill-group-index="${targetIndex}"]`
          );

          expect(groupWrapper).not.toBeNull();

          const style = (groupWrapper as HTMLElement)?.style?.transition ?? "";
          const expectedDelayMs = targetIndex * 60;

          // The transition string from FadeIn includes `${delay}ms` as the delay part
          expect(style).toContain(`${expectedDelayMs}ms`);

          unmount();
        }
      ),
      { numRuns: skillGroups.length * 5 }
    );
  });

  it("skill group at index 0 has 0ms delay", () => {
    const { container } = render(<SkillsSection />);
    const firstGroup = container.querySelector(`[data-skill-group-index="0"]`);
    expect(firstGroup).not.toBeNull();
    const style = (firstGroup as HTMLElement)?.style?.transition ?? "";
    expect(style).toContain("0ms");
  });

  it("each group's delay strictly increases by 60ms", () => {
    const { container } = render(<SkillsSection />);

    for (let i = 0; i < skillGroups.length; i++) {
      const wrapper = container.querySelector(`[data-skill-group-index="${i}"]`);
      expect(wrapper).not.toBeNull();
      const style = (wrapper as HTMLElement)?.style?.transition ?? "";
      expect(style).toContain(`${i * 60}ms`);
    }
  });
});
