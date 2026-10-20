"use client";

import { useRef, useState, useEffect, RefObject } from "react";

/**
 * Returns [ref, inView] — triggers only once per element.
 * Degrades gracefully in SSR (IntersectionObserver unavailable) by returning inView: true.
 * Also returns inView: true immediately when reduced-motion is preferred.
 * Requirement 1.2
 */
export function useInView<T extends Element>(): [RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    // SSR guard
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    // Respect reduced-motion preference immediately
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dataReduced = document.documentElement.dataset.motion === "reduced";
    if (prefersReduced || dataReduced) {
      setInView(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "-40px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}
