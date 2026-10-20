"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "motion-preference";

/**
 * Motion Toggle button — reads/writes localStorage key "motion-preference".
 * Toggles data-motion="reduced" on <html> to suppress all animations site-wide.
 * Requirements: 1.5, 1.6, 3.4
 */
export function MotionToggle() {
  const [motionOn, setMotionOn] = useState(true);

  useEffect(() => {
    // Read saved preference, then fall back to OS preference
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) {
        const enabled = saved === "on";
        setMotionOn(enabled);
        applyMotion(enabled);
        return;
      }
    } catch {
      // localStorage unavailable (e.g. private browsing) — default to motion on
    }

    // No saved preference: mirror the OS setting
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const enabled = !prefersReduced;
    setMotionOn(enabled);
    applyMotion(enabled);
  }, []);

  function applyMotion(enabled: boolean) {
    if (enabled) {
      document.documentElement.removeAttribute("data-motion");
    } else {
      document.documentElement.setAttribute("data-motion", "reduced");
    }
  }

  function toggle() {
    const next = !motionOn;
    setMotionOn(next);
    applyMotion(next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
    } catch {
      // ignore storage errors
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={
        motionOn
          ? "Disable animations (motion is currently on)"
          : "Enable animations (motion is currently off)"
      }
      className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors duration-[var(--dur-fast)] cursor-pointer select-none"
      style={{ fontFamily: "var(--font-jetbrains-mono, monospace)" }}
    >
      {motionOn ? "Motion On" : "Motion Off"}
    </button>
  );
}
