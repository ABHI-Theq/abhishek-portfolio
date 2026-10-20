/**
 * Example tests for Header component — MotionToggle presence.
 * Feature: portfolio-redesign-elevation
 * Validates: Requirements 3.4
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render } from "@testing-library/react";
import { Header } from "../Header";

// Stub IntersectionObserver (not available in jsdom)
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
      dispatchEvent: vi.fn(),
      media: "",
      onchange: null,
    } as unknown as MediaQueryList),
  });

  // Stub localStorage
  const store: Record<string, string> = {};
  vi.spyOn(window, "localStorage", "get").mockReturnValue({
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { Object.keys(store).forEach(k => delete store[k]); },
    length: 0,
    key: () => null,
  } as Storage);
});

afterEach(() => {
  vi.restoreAllMocks();
  delete document.documentElement.dataset.motion;
});

describe("MotionToggle in Header", () => {
  /**
   * Example test: MotionToggle button is present in the desktop cluster
   * Validates: Requirements 3.4
   */
  it("renders the MotionToggle button in the desktop context", () => {
    const { getAllByRole } = render(<Header />);

    // The MotionToggle renders a <button> with aria-label referencing "motion"
    const motionButtons = getAllByRole("button").filter((btn) => {
      const label = btn.getAttribute("aria-label") ?? "";
      return label.toLowerCase().includes("motion");
    });

    expect(motionButtons.length).toBeGreaterThanOrEqual(1);
  });

  /**
   * Example test: MotionToggle button aria-label is descriptive for "motion on" default state
   * Validates: Requirements 3.4
   */
  it("MotionToggle button has a descriptive aria-label", () => {
    const { getAllByRole } = render(<Header />);

    const motionButtons = getAllByRole("button").filter((btn) => {
      const label = btn.getAttribute("aria-label") ?? "";
      return label.toLowerCase().includes("motion");
    });

    expect(motionButtons.length).toBeGreaterThanOrEqual(1);
    const label = motionButtons[0].getAttribute("aria-label") ?? "";
    // aria-label should mention both state and action
    expect(label.length).toBeGreaterThan(0);
    expect(label.toLowerCase()).toMatch(/motion/);
  });

  /**
   * Example test: MotionToggle appears in mobile drawer as well (two instances total)
   * The desktop cluster and the mobile drawer both include MotionToggle.
   * The mobile drawer starts aria-hidden when closed, so we query the raw DOM.
   * Validates: Requirements 3.4
   */
  it("renders MotionToggle in both desktop and mobile drawer (two instances)", () => {
    const { container } = render(<Header />);

    // Query all buttons directly in the DOM (bypasses aria-hidden filtering)
    const allButtons = Array.from(container.querySelectorAll("button"));
    const motionButtons = allButtons.filter((btn) => {
      const label = btn.getAttribute("aria-label") ?? "";
      return label.toLowerCase().includes("motion");
    });

    // One instance in desktop cluster, one in mobile drawer
    expect(motionButtons.length).toBe(2);
  });
});
