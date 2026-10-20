"use client";

import Image from "next/image";
import { profile } from "@/data/profile";
import { FadeIn } from "@/components/ui/FadeIn";

/**
 * HeroSection — client component (needed for HeroAnimate stagger on mount).
 *
 * Stagger sequence (Requirements 2.3):
 *   role label   →  0 ms
 *   headline     → 100 ms
 *   copy         → 200 ms
 *   CTAs         → 300 ms
 *   identity     → 400 ms
 *   accent line  → 500 ms (CSS animation, not FadeIn)
 *   portrait     → 150 ms
 *
 * Ghost text: <span aria-hidden="true"> absolutely positioned behind content (Req 2.2)
 * Accent line: <div aria-hidden="true"> width 0→100% via @keyframes (Req 2.4)
 * Portrait:    wrapped in FadeIn delay={150} (Req 2.5)
 *
 * Requirements: 2.1–2.6, 10.4
 */
export function HeroSection() {
  return (
    <section
      aria-label="Hero"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24 pb-16 lg:px-8"
    >
      {/* Ghost typographic text — purely decorative, behind all content */}
      <span
        aria-hidden="true"
        className="font-display pointer-events-none absolute select-none"
        style={{
          fontSize: "clamp(160px, 20vw, 280px)",
          opacity: 0.04,
          left: "-0.05em",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 0,
          lineHeight: 1,
          fontWeight: 400,
          whiteSpace: "nowrap",
          color: "var(--text-primary)",
        }}
      >
        BUILD
      </span>

      <div className="relative z-10 mx-auto flex w-full max-w-bento flex-col gap-16 lg:flex-row lg:items-center lg:gap-8">

        {/* ── Left: staggered text content ──────────────────── */}
        <div className="flex flex-1 flex-col gap-8 lg:pr-8">

          {/* Role + location labels — delay 0 ms */}
          <FadeIn delay={0} as="div" className="flex flex-col gap-2" data-hero-element="role-label">
            <span
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]"
            >
              SOFTWARE DEVELOPER · AI ENTHUSIAST · BUILDER
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)]">
              BASED IN INDIA
            </span>
          </FadeIn>

          {/* Headline — delay 100 ms */}
          <FadeIn delay={100} as="div" data-hero-element="headline">
            <h1
              className="hero-headline font-display text-[var(--text-primary)] text-balance"
              style={{ fontWeight: 400 }}
            >
              Building products.{" "}
              <span className="text-[var(--text-secondary)]">
                Engineering intelligence.
              </span>
            </h1>
          </FadeIn>

          {/* Supporting copy — delay 200 ms */}
          <FadeIn delay={200} as="div" data-hero-element="copy">
            <p className="max-w-xl text-lg leading-relaxed text-[var(--text-secondary)]">
              I build full-stack applications and explore intelligent systems —
              from developer tools to retrieval-augmented generation.
            </p>
          </FadeIn>

          {/* CTAs — delay 300 ms */}
          <FadeIn delay={300} as="div" className="flex flex-wrap items-center gap-4" data-hero-element="ctas">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium text-[var(--bg-main)] transition-all duration-200 hover:bg-[var(--accent-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            >
              Explore my work
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-6 py-3 text-sm font-medium text-[var(--text-secondary)] transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            >
              View resume
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </FadeIn>

          {/* Accent line — CSS @keyframes, delay 500 ms (Req 2.4) */}
          <div
            aria-hidden="true"
            className="hero-accent-line"
            style={{
              height: 1,
              background: "var(--accent)",
              opacity: 0.3,
            }}
          />

          {/* Technical identity line — delay 400 ms */}
          <FadeIn delay={400} as="div" data-hero-element="identity">
            <p
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]"
              aria-label="Technical focus areas"
            >
              FULL-STACK ENGINEERING / AI SYSTEMS / PRODUCT BUILDING
            </p>
          </FadeIn>
        </div>

        {/* ── Right: portrait wrapped in FadeIn delay={150} (Req 2.5) ── */}
        <FadeIn
          delay={150}
          as="div"
          className="relative hidden select-none lg:block lg:w-[420px] lg:shrink-0"
        >
          <PortraitVisual />
        </FadeIn>
      </div>
    </section>
  );
}

/**
 * Cinematic portrait component.
 * Requirements: 2.1, 2.5
 */
function PortraitVisual() {
  return (
    <div className="relative" style={{ width: 400 }}>

      {/* ── Photo wrapper ─────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{ width: 400, height: 480 }}
      >
        <Image
          src="/avatar.png"
          alt="Abhishek Sharma"
          fill
          className="hero-portrait object-cover object-top"
          sizes="400px"
          priority
        />

        {/* Halftone dot-matrix overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(241,233,223,0.07) 1px, transparent 1px)",
            backgroundSize: "3px 3px",
            mixBlendMode: "screen",
          }}
        />

        {/* Finer secondary dot layer */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(240,120,62,0.04) 1px, transparent 1px)",
            backgroundSize: "6px 6px",
            mixBlendMode: "screen",
          }}
        />

        {/* Bottom fade */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: "35%",
            background:
              "linear-gradient(to top, var(--bg-main) 0%, transparent 100%)",
          }}
        />

        {/* Scanning line sweep */}
        <div
          aria-hidden="true"
          className="hero-scan-line pointer-events-none absolute left-0 right-0 h-[1px]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(240,120,62,0.25) 50%, transparent 100%)",
            top: 0,
          }}
        />

        {/* Accent dot — top right */}
        <div
          aria-hidden="true"
          className="hero-dot-pulse absolute"
          style={{
            top: 16,
            right: 16,
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "var(--accent)",
          }}
        />

        {/* Corner accent */}
        <div
          aria-hidden="true"
          className="absolute top-4 right-4 h-7 w-7 border-t border-r border-[var(--accent)] opacity-40"
          style={{ borderTopRightRadius: 3 }}
        />
      </div>

      {/* ── Name text ────────────────────────────────────────── */}
      <div className="relative z-10 px-1" style={{ marginTop: -48 }}>
        <p
          className="font-display leading-[0.9] text-[var(--text-primary)]"
          style={{ fontSize: "clamp(2.4rem, 5vw, 3.2rem)", fontWeight: 400 }}
        >
          Abhishek{" "}
          <span className="italic" style={{ color: "var(--text-secondary)" }}>
            Sharma
          </span>
        </p>
        <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--accent)]">
          Full-Stack · AI · Builder
        </p>
      </div>
    </div>
  );
}
