import Image from "next/image";
import { profile } from "@/data/profile";

/**
 * HeroSection — server component
 * Inspired by the Sarthak Sharma layout:
 * - Left text column with headline + CTAs
 * - Right: photo sits directly on the dark background (no card frame),
 *   desaturated + high-contrast via CSS filter, halftone dot texture overlay,
 *   large name text bleeds below the photo.
 *
 * Requirements: 3.1–3.6, 1.3, 13.4
 */
export function HeroSection() {
  return (
    <section
      aria-label="Hero"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24 pb-16 lg:px-8"
    >
      <div className="relative mx-auto flex w-full max-w-bento flex-col gap-16 lg:flex-row lg:items-center lg:gap-8">

        {/* ── Left: text content ──────────────────────────────── */}
        <div className="flex flex-1 flex-col gap-8 lg:pr-8">
          {/* Role + location labels */}
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
              SOFTWARE DEVELOPER · AI ENTHUSIAST · BUILDER
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)]">
              BASED IN INDIA
            </span>
          </div>

          {/* Headline */}
          <h1
            className="hero-headline font-display text-[var(--text-primary)] text-balance"
            style={{ fontWeight: 400 }}
          >
            Building products.{" "}
            <span className="text-[var(--text-secondary)]">
              Engineering intelligence.
            </span>
          </h1>

          {/* Supporting copy */}
          <p className="max-w-xl text-lg leading-relaxed text-[var(--text-secondary)]">
            I build full-stack applications and explore intelligent systems —
            from developer tools to retrieval-augmented generation.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="hero-animate inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium text-[var(--bg-main)] transition-all duration-200 hover:bg-[var(--accent-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
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
              className="hero-animate inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-6 py-3 text-sm font-medium text-[var(--text-secondary)] transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            >
              View resume
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </div>

          {/* Technical identity line */}
          <p
            className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]"
            aria-label="Technical focus areas"
          >
            FULL-STACK ENGINEERING / AI SYSTEMS / PRODUCT BUILDING
          </p>
        </div>

        {/* ── Right: cinematic portrait (Sarthak Sharma style) ── */}
        <div className="relative hidden select-none lg:block lg:w-[420px] lg:shrink-0">
          <PortraitVisual />
        </div>
      </div>
    </section>
  );
}

/**
 * Cinematic portrait — no card frame, photo sits on the dark background.
 *
 * CSS effects applied:
 * - grayscale(100%) contrast(1.25) brightness(0.9)  → desaturated, punchy
 * - mix-blend-mode: luminosity                       → bleeds into dark bg
 * - Halftone dot-matrix overlay (CSS radial-gradient) → texture on the photo
 * - Horizontal scan line sweep animation
 * - Large name text below the photo (bleeds upward via negative margin)
 * - Orange accent dot pulse (top-right)
 *
 * Place photo at /public/avatar.png (PNG with transparent background for best result)
 * or /public/avatar.jpg (JPEG — background will show but CSS dims it).
 */
function PortraitVisual() {
  return (
    <div className="relative" style={{ width: 400 }}>

      {/* ── Photo wrapper ─────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{
          width: 400,
          height: 480,
          /* No border, no background — photo sits on the page */
        }}
      >
        {/* The portrait image — CSS-filtered to look cinematic */}
        <Image
          src="/avatar.png"
          alt="Abhishek Sharma"
          fill
          className="hero-portrait object-cover object-top"
          sizes="400px"
          priority
        />

        {/* Halftone dot-matrix overlay — the signature texture from the reference */}
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

        {/* Finer secondary dot layer for depth */}
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

        {/* Bottom fade — so name text bleeds upward naturally */}
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

        {/* Corner accent — top right */}
        <div
          aria-hidden="true"
          className="absolute top-4 right-4 h-7 w-7 border-t border-r border-[var(--accent)] opacity-40"
          style={{ borderTopRightRadius: 3 }}
        />
      </div>

      {/* ── Name text — bleeds up into the photo bottom ────────── */}
      <div
        className="relative z-10 px-1"
        style={{ marginTop: -48 }}
      >
        <p
          className="font-display leading-[0.9] text-[var(--text-primary)]"
          style={{ fontSize: "clamp(2.4rem, 5vw, 3.2rem)", fontWeight: 400 }}
        >
          Abhishek{" "}
          <span
            className="italic"
            style={{ color: "var(--text-secondary)" }}
          >
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
