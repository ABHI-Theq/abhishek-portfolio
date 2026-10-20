"use client";

import { useInView } from "@/hooks/useInView";
import { CSSProperties, ElementType, ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
  [key: `data-${string}`]: string | undefined;
}

/**
 * Wraps children in a fade-up entrance animation driven by IntersectionObserver.
 * Respects prefers-reduced-motion and data-motion="reduced" on <html>.
 * Forwards any data-* attributes to the rendered element.
 * Requirements: 1.3, 1.4
 */
export function FadeIn({ children, delay = 0, className, as: Tag = "div", ...rest }: FadeInProps) {
  const [ref, inView] = useInView<HTMLElement>();

  const style: CSSProperties = {
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(var(--translate-reveal))",
    transition: `opacity var(--dur-reveal) var(--ease-out) ${delay}ms, transform var(--dur-reveal) var(--ease-out) ${delay}ms`,
  };

  return (
    <Tag ref={ref} className={className} style={style} data-visible={inView ? "true" : "false"} {...rest}>
      {children}
    </Tag>
  );
}
