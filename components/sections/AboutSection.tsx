import { profile } from "@/data/profile";

/**
 * AboutSection — server component
 * Short paragraph drawn from the resume summary.
 * No fabricated personal anecdotes or interests beyond supplied materials.
 * Requirements: 10.1, 10.2
 */
export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading" className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-bento">
        {/* Section header */}
        <div className="mb-12 flex items-baseline gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
            06
          </span>
          <h2
            id="about-heading"
            className="font-display text-3xl text-[var(--text-primary)]"
          >
            About
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          {/* Summary paragraph */}
          <div className="flex flex-col gap-6">
            <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
              I&apos;m {profile.name}, a software developer and AI enthusiast based in India,
              currently pursuing a B.Tech in Computer Science and Engineering at Galgotias University.
            </p>
            <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
              I build full-stack applications and explore intelligent systems — from developer
              tools and real-time collaborative environments to retrieval-augmented generation
              pipelines. My work sits at the intersection of software engineering, product
              thinking, and applied AI.
            </p>
            <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
              Outside of building, I invest time in competitive programming on LeetCode, where
              I&apos;ve reached Knight level, and I contribute to open-source tooling for the
              developer community.
            </p>
          </div>

          {/* Identity stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-card border border-[var(--border)] bg-[var(--card-surface)] p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                Based In
              </p>
              <p className="mt-2 font-display text-lg text-[var(--text-primary)]">India</p>
            </div>
            <div className="rounded-card border border-[var(--border)] bg-[var(--card-surface)] p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                Focus
              </p>
              <p className="mt-2 font-display text-lg text-[var(--text-primary)]">Full-Stack &amp; AI</p>
            </div>
            <div className="rounded-card border border-[var(--border)] bg-[var(--card-surface)] p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                Education
              </p>
              <p className="mt-2 font-display text-lg text-[var(--text-primary)]">B.Tech CSE</p>
            </div>
            <div className="rounded-card border border-[var(--border)] bg-[var(--card-surface)] p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                CGPA
              </p>
              <p className="mt-2 font-display text-lg text-[var(--text-primary)]">9.1 / 10.0</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
