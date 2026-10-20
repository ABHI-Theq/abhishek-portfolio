import { profile } from "@/data/profile";
import { FadeIn } from "@/components/ui/FadeIn";

/** Hackathon results — sourced directly from resume (req 9.2) */
const hackathons = [
  { name: "AceHack 2025", result: "Finalist", detail: "Top 10 of 50+ teams" },
  { name: "Prayatna 2025", result: "National Finalist", detail: "" },
] as const;

/** Certifications — sourced directly from resume (req 9.3) */
const certifications = [
  { name: "Machine Learning Foundations", issuer: "AWS" },
  { name: "Generative AI Foundations", issuer: "AWS" },
] as const;

/**
 * AchievementsSection — server component
 * Displays LeetCode stats from data/profile.ts, hackathon results, and certifications.
 * No invented or extrapolated metrics (req 9.4).
 * Requirements: 9.1, 9.2, 9.3, 9.4
 */
export function AchievementsSection() {
  const lc = profile.leetcodeStats;

  return (
    <section id="achievements" aria-labelledby="achievements-heading" className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-bento">
        {/* Section header */}
        <FadeIn>
          <div className="mb-12 flex items-baseline gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
              05
            </span>
            <h2
              id="achievements-heading"
              className="font-display text-3xl text-[var(--text-primary)]"
            >
              Achievements
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* ── LeetCode Stats card ──────────────────────────── */}
          <article
            aria-label="LeetCode competitive programming statistics"
            className="rounded-card border border-[var(--border)] bg-[var(--card-surface)] p-6 lg:col-span-2"
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                LeetCode
              </h3>
              <a
                href={profile.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View LeetCode profile"
                className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors duration-200"
              >
                View Profile ↗
              </a>
            </div>

            {/* Level badge */}
            <div className="mb-6 flex items-center gap-3">
              <span className="rounded-tag border border-amber-500/40 bg-amber-500/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-amber-400">
                {lc.level}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                Top {lc.topPercent}
              </span>
            </div>

            {/* Stat grid */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <StatItem label="Contest Rating" value={lc.contestRating.toLocaleString()} />
              <StatItem label="Global Rank" value={lc.globalRanking} />
              <StatItem label="Problems Solved" value={lc.solved.toLocaleString()} />
              <StatItem label="Badges" value={String(lc.badges)} />
            </div>

            {/* Difficulty breakdown */}
            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-lg bg-[var(--bg-secondary)] p-3 text-center">
                <p className="font-mono text-[10px] uppercase tracking-wider text-emerald-400">Easy</p>
                <p className="mt-1 font-display text-xl text-[var(--text-primary)]">{lc.easy}</p>
              </div>
              <div className="rounded-lg bg-[var(--bg-secondary)] p-3 text-center">
                <p className="font-mono text-[10px] uppercase tracking-wider text-amber-400">Medium</p>
                <p className="mt-1 font-display text-xl text-[var(--text-primary)]">{lc.medium}</p>
              </div>
              <div className="rounded-lg bg-[var(--bg-secondary)] p-3 text-center">
                <p className="font-mono text-[10px] uppercase tracking-wider text-red-400">Hard</p>
                <p className="mt-1 font-display text-xl text-[var(--text-primary)]">{lc.hard}</p>
              </div>
            </div>

            {/* Activity stats */}
            <div className="mt-5 flex flex-wrap gap-6">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">Active Days</p>
                <p className="mt-0.5 font-display text-2xl text-[var(--text-primary)]">{lc.activeDays}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">Max Streak</p>
                <p className="mt-0.5 font-display text-2xl text-[var(--text-primary)]">{lc.maxStreak} days</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">Rank</p>
                <p className="mt-0.5 font-display text-2xl text-[var(--text-primary)]">{lc.rank.toLocaleString()}</p>
              </div>
            </div>
          </article>

          {/* ── Hackathons + Certifications ──────────────────── */}
          <div className="flex flex-col gap-6">
            {/* Hackathons */}
            <article
              aria-label="Hackathon achievements"
              className="rounded-card border border-[var(--border)] bg-[var(--card-surface)] p-6"
            >
              <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                Hackathons
              </h3>
              <ul className="space-y-4" role="list">
                {hackathons.map((h) => (
                  <li key={h.name}>
                    <p className="text-sm font-medium text-[var(--text-primary)]">{h.name}</p>
                    <div className="mt-0.5 flex flex-wrap items-center gap-2">
                      <span className="rounded-tag border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[var(--accent)]">
                        {h.result}
                      </span>
                      {h.detail && (
                        <span className="text-xs text-[var(--text-muted)]">{h.detail}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </article>

            {/* Certifications */}
            <article
              aria-label="Professional certifications"
              className="rounded-card border border-[var(--border)] bg-[var(--card-surface)] p-6"
            >
              <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                Certifications
              </h3>
              <ul className="space-y-3" role="list">
                {certifications.map((cert) => (
                  <li key={cert.name} className="flex flex-col">
                    <span className="text-sm text-[var(--text-primary)]">{cert.name}</span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)]">
                      {cert.issuer}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Small stat display used inside the LeetCode card */
function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
        {label}
      </span>
      <span className="mt-0.5 font-display text-xl text-[var(--text-primary)]">{value}</span>
    </div>
  );
}
