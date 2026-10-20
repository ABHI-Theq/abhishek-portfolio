/**
 * Property tests for FadeIn component.
 * Feature: portfolio-redesign-elevation
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render } from "@testing-library/react";
import * as fc from "fast-check";
import { FadeIn } from "../FadeIn";

// Arbitrary non-empty string for children text
const arbText = fc.string({ minLength: 1, maxLength: 40 });
const arbDelay = fc.integer({ min: 0, max: 1000 });

// A mock IntersectionObserver that never fires — simulates "element not yet in view"
class MockIntersectionObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}

describe("FadeIn", () => {
  beforeEach(() => {
    // Provide IntersectionObserver so the hook doesn't fall back to inView: true
    Object.defineProperty(window, "IntersectionObserver", {
      writable: true,
      configurable: true,
      value: MockIntersectionObserver,
    });
    // Provide matchMedia returning non-reduced-motion
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: vi.fn().mockReturnValue({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        media: "(prefers-reduced-motion: reduce)",
        onchange: null,
      } as unknown as MediaQueryList),
    });
  });

  afterEach(() => {
    delete document.documentElement.dataset.motion;
    vi.restoreAllMocks();
  });

  /**
   * **Feature: portfolio-redesign-elevation, Property 1: FadeIn renders children with initial hidden state**
   * Validates: Requirements 1.3
   *
   * Before IntersectionObserver fires (no reduced-motion), the wrapper should
   * have opacity: 0 and a non-zero translateY in its inline style.
   */
  it("Property 1: FadeIn renders children with initial hidden state", () => {
    fc.assert(
      fc.property(arbText, arbDelay, (text, delay) => {
        // Ensure no reduced-motion signals are active
        delete document.documentElement.dataset.motion;

        const { container, unmount } = render(
          <FadeIn delay={delay}>
            <span>{text}</span>
          </FadeIn>
        );

        const wrapper = container.firstElementChild as HTMLElement;
        expect(wrapper).toBeTruthy();
        // opacity must be 0 initially (inView is false — observer hasn't fired)
        expect(wrapper.style.opacity).toBe("0");
        // transform must contain a translateY referencing the CSS variable (not 0)
        expect(wrapper.style.transform).toContain("translateY");
        expect(wrapper.style.transform).not.toBe("translateY(0)");
        // data-visible must be false
        expect(wrapper.dataset.visible).toBe("false");

        unmount();
      }),
      { numRuns: 100 }
    );
  });

  /**
   * **Feature: portfolio-redesign-elevation, Property 2: FadeIn under reduced-motion renders children immediately visible**
   * Validates: Requirements 1.4, 5.6
   *
   * When data-motion="reduced" is set on <html>, useInView returns inView: true
   * immediately, so the wrapper should be fully visible without waiting for the observer.
   */
  it("Property 2: FadeIn under reduced-motion renders children immediately visible", () => {
    fc.assert(
      fc.property(arbText, arbDelay, (text, delay) => {
        // Set reduced-motion via data attribute on <html>
        document.documentElement.dataset.motion = "reduced";

        const { container, unmount } = render(
          <FadeIn delay={delay}>
            <span>{text}</span>
          </FadeIn>
        );

        const wrapper = container.firstElementChild as HTMLElement;
        expect(wrapper).toBeTruthy();
        // opacity must be 1 immediately
        expect(wrapper.style.opacity).toBe("1");
        // transform must be translateY(0)
        expect(wrapper.style.transform).toBe("translateY(0)");
        // data-visible must be true
        expect(wrapper.dataset.visible).toBe("true");

        unmount();
      }),
      { numRuns: 100 }
    );
  });
});
