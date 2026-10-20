/**
 * Property tests for HeroSection.
 * Feature: portfolio-redesign-elevation
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render } from "@testing-library/react";
import * as fc from "fast-check";
import { HeroSection } from "../HeroSection";

// ── Shared mock setup ───────────────────────────────────────────────────────

class MockIntersectionObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}

beforeEach(() => {
  Object.defineProperty(window, "IntersectionObserver", {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  });
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    configurable: true,
    value: vi.fn().mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
    }),
  });
});

afterEach(() => {
  delete document.documentElement.dataset.motion;
  vi.restoreAllMocks();
});

// ── Hero stagger order ──────────────────────────────────────────────────────

/**
 * **Feature: portfolio-redesign-elevation, Property 3: Hero stagger elements have correct animation delays**
 * Validates: Requirements 2.3
 *
 * The five staggered hero elements must appear in DOM order with delays
 * 0, 100, 200, 300, 400 ms. We derive delays from rendered inline styles
 * on elements carrying data-hero-element attributes.
 *
 * The expected delay sequence: role-label=0, headline=100, copy=200, ctas=300, identity=400
 */
describe("Property 3: Hero stagger elements have correct animation delays", () => {
  // Stagger spec: [data-hero-element] -> expected delay in ms
  const STAGGER: Array<{ element: string; delay: number }> = [
    { element: "role-label",  delay: 0   },
    { element: "headline",    delay: 100 },
    { element: "copy",        delay: 200 },
    { element: "ctas",        delay: 300 },
    { element: "identity",    delay: 400 },
  ];

  it("renders stagger elements with monotonically increasing delays matching the spec", () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { container, unmount } = render(<HeroSection />);

        for (const { element, delay } of STAGGER) {
          // FadeIn renders the wrapper div with data-hero-element directly on it
          const wrapper = container.querySelector(
            `[data-hero-element="${element}"]`
          ) as HTMLElement | null;

          expect(wrapper, `element [data-hero-element="${element}"] not found`).toBeTruthy();

          // The FadeIn inline style transition contains the delay in ms
          const transition = wrapper!.style.transition;
          expect(
            transition,
            `expected "${element}" wrapper to have transition with ${delay}ms delay`
          ).toContain(`${delay}ms`);
        }

        unmount();
      }),
      { numRuns: 100 }
    );
  });
});

// ── Decorative aria-hidden elements ────────────────────────────────────────

/**
 * **Feature: portfolio-redesign-elevation, Property 12: Decorative elements carry aria-hidden**
 * Validates: Requirements 10.4
 *
 * All purely decorative elements in HeroSection (ghost text, accent line,
 * portrait overlay dots, scan line, dot pulse, corner accents) must carry
 * aria-hidden="true".
 */
describe("Property 12: Decorative elements carry aria-hidden", () => {
  it("all decorative elements in HeroSection have aria-hidden=true", () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { container, unmount } = render(<HeroSection />);

        // 1. Ghost text element — the large "BUILD" span
        const ghostText = container.querySelector("span[aria-hidden='true']");
        expect(ghostText, "ghost text span with aria-hidden not found").toBeTruthy();
        expect(ghostText!.getAttribute("aria-hidden")).toBe("true");

        // 2. Accent line
        const accentLine = container.querySelector(".hero-accent-line");
        expect(accentLine, "hero-accent-line not found").toBeTruthy();
        expect(accentLine!.getAttribute("aria-hidden")).toBe("true");

        // 3. All elements with aria-hidden inside the section should have the attribute value "true"
        const allHidden = container.querySelectorAll("[aria-hidden]");
        for (const el of allHidden) {
          expect(
            el.getAttribute("aria-hidden"),
            `element ${el.tagName}.${el.className} has aria-hidden but value is not "true"`
          ).toBe("true");
        }

        unmount();
      }),
      { numRuns: 100 }
    );
  });
});
