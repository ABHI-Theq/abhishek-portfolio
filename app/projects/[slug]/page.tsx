import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/data/projects";
import { buildMetadata } from "@/lib/metadata";
import { Tag } from "@/components/ui/Tag";

// ── Static params (SSG) ────────────────────────────────────────
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

// ── Per-page metadata ──────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};

  return buildMetadata({
    title: project.title,
    description: project.description,
    path: `/projects/${project.slug}`,
  });
}

// ── Page component ─────────────────────────────────────────────
export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const {
    title,
    tagline,
    description,
    problem,
    highlights,
    features,
    architecture,
    tech,
    domains,
    githubUrl,
    liveUrl,
  } = project;

  return (
    <main className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)]">
      <div className="mx-auto max-w-[1280px] px-6 pb-32 pt-28 lg:px-8">

        {/* ── Back link ──────────────────────────────────────── */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-200 mb-14"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to portfolio
        </Link>

        <article>
          {/* ── Hero block ───────────────────────────────────── */}
          <header className="mb-16 border-b border-[var(--border)] pb-16">
            {/* Domain badges */}
            <div className="mb-5 flex flex-wrap gap-2">
              {domains.map((d) => (
                <span
                  key={d}
                  className="inline-block rounded-tag border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--accent)]"
                >
                  {d}
                </span>
              ))}
            </div>

            {/* Title + tagline */}
            <h1 className="font-display text-5xl sm:text-6xl text-[var(--text-primary)] mb-4 leading-[1.05]">
              {title}
            </h1>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-6">
              {tagline}
            </p>

            {/* Description */}
            <p className="max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)]">
              {description}
            </p>

            {/* External links */}
            {(githubUrl || liveUrl) && (
              <div className="mt-8 flex flex-wrap gap-4">
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-2.5 text-sm text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-200"
                  >
                    <GithubIcon />
                    Source code
                  </a>
                )}
                {liveUrl && (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-[var(--bg-main)] hover:bg-[var(--accent-hover)] transition-colors duration-200"
                  >
                    Live demo
                    <ExternalIcon />
                  </a>
                )}
              </div>
            )}
          </header>

          {/* ── Two-column body ─────────────────────────────── */}
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-3 lg:gap-12">
            {/* Left: main content */}
            <div className="lg:col-span-2 flex flex-col gap-14">

              {/* The Problem */}
              <section aria-labelledby="problem-heading">
                <SectionLabel index="01" />
                <h2
                  id="problem-heading"
                  className="font-display text-2xl text-[var(--text-primary)] mb-4"
                >
                  The Problem
                </h2>
                <p className="text-base leading-relaxed text-[var(--text-secondary)]">
                  {problem}
                </p>
              </section>

              {/* What I Built (resume highlights) */}
              {highlights && highlights.length > 0 && (
                <section aria-labelledby="built-heading">
                  <SectionLabel index="02" />
                  <h2
                    id="built-heading"
                    className="font-display text-2xl text-[var(--text-primary)] mb-4"
                  >
                    What I Built
                  </h2>
                  <ul className="flex flex-col gap-3">
                    {highlights.map((h, i) => (
                      <li key={i} className="flex gap-3 text-[var(--text-secondary)] leading-relaxed">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)] opacity-70"
                        />
                        {h}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Features */}
              {features.length > 0 && (
                <section aria-labelledby="features-heading">
                  <SectionLabel index="03" />
                  <h2
                    id="features-heading"
                    className="font-display text-2xl text-[var(--text-primary)] mb-6"
                  >
                    Features
                  </h2>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {features.map((f) => (
                      <div
                        key={f.name}
                        className="rounded-card border border-[var(--border)] bg-[var(--card-surface)] p-5"
                      >
                        <h3 className="mb-2 font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--accent)]">
                          {f.name}
                        </h3>
                        <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                          {f.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Architecture */}
              {architecture && (
                <section aria-labelledby="arch-heading">
                  <SectionLabel index="04" />
                  <h2
                    id="arch-heading"
                    className="font-display text-2xl text-[var(--text-primary)] mb-4"
                  >
                    Architecture
                  </h2>
                  <div className="rounded-card border border-[var(--border)] bg-[var(--card-surface)] p-6">
                    <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                      {architecture}
                    </p>
                  </div>
                </section>
              )}
            </div>

            {/* Right: sidebar */}
            <aside className="flex flex-col gap-8 lg:pt-0">
              {/* Tech stack */}
              <div className="rounded-card border border-[var(--border)] bg-[var(--card-surface)] p-6">
                <h2 className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  Tech Stack
                </h2>
                <div className="flex flex-wrap gap-2">
                  {tech.map((t) => (
                    <Tag key={t} label={t} />
                  ))}
                </div>
              </div>

              {/* Domain tags */}
              <div className="rounded-card border border-[var(--border)] bg-[var(--card-surface)] p-6">
                <h2 className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  Domains
                </h2>
                <div className="flex flex-wrap gap-2">
                  {domains.map((d) => (
                    <span
                      key={d}
                      className="inline-block rounded-tag border border-[var(--accent)]/30 bg-[var(--accent)]/8 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--accent)]"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links card */}
              {(githubUrl || liveUrl) && (
                <div className="rounded-card border border-[var(--border)] bg-[var(--card-surface)] p-6">
                  <h2 className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    Links
                  </h2>
                  <div className="flex flex-col gap-3">
                    {githubUrl && (
                      <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-200 group"
                      >
                        <span>Source code</span>
                        <ExternalIcon className="opacity-40 group-hover:opacity-100" />
                      </a>
                    )}
                    {liveUrl && (
                      <a
                        href={liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-200 group"
                      >
                        <span>Live demo / npm</span>
                        <ExternalIcon className="opacity-40 group-hover:opacity-100" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </article>
      </div>
    </main>
  );
}

// ── Small helpers ──────────────────────────────────────────────

function SectionLabel({ index }: { index: string }) {
  return (
    <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
      {index}
    </span>
  );
}

function GithubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function ExternalIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}
