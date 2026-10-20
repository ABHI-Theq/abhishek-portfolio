import { experience, education } from "@/data/experience";
import { FadeIn } from "@/components/ui/FadeIn";

/**
 * ExperienceSection — server component
 * Renders work experience and education cards from data/experience.ts.
 * All content is sourced strictly from the resume data — no invented entries.
 * Requirements: 8.1, 8.2, 8.3, 5.5
 */
export function ExperienceSection() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-bento">
        {/* Section header */}
        <FadeIn>
          <div className="mb-12 flex items-baseline gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
              04
            </span>
            <h2
              id="experience-heading"
              className="font-display text-3xl text-[var(--text-primary)]"
            >
              Experience &amp; Education
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Work Experience */}
          <div>
            <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
              Work Experience
            </h3>
            <div className="flex flex-col gap-4">
              {experience.map((entry, index) => (
                <FadeIn key={`${entry.company}-${entry.period}`} delay={index * 80}>
                <article
                  className="rounded-card border border-[var(--border)] bg-[var(--card-surface)] p-6"
                  aria-label={`${entry.role} at ${entry.company}`}
                >
                  {/* Role */}
                  <h4 className="font-display text-lg text-[var(--text-primary)] leading-snug">
                    {entry.role}
                  </h4>

                  {/* Company + meta */}
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="text-sm font-medium text-[var(--accent)]">
                      {entry.company}
                    </span>
                    <span aria-hidden="true" className="text-[var(--border)]">·</span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                      {entry.period}
                    </span>
                    <span aria-hidden="true" className="text-[var(--border)]">·</span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                      {entry.location}
                    </span>
                  </div>

                  {/* Responsibility bullets */}
                  <ul className="mt-4 space-y-2" role="list">
                    {entry.bullets.map((bullet, i) => (
                      <li key={i} className="flex gap-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                        <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)] opacity-60" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </article>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
              Education
            </h3>
            <div className="flex flex-col gap-4">
              {education.map((entry, index) => (
                <FadeIn key={`${entry.institution}-${entry.period}`} delay={index * 80}>
                <article
                  className="rounded-card border border-[var(--border)] bg-[var(--card-surface)] p-6"
                  aria-label={`${entry.degree} at ${entry.institution}`}
                >
                  {/* Degree */}
                  <h4 className="font-display text-lg text-[var(--text-primary)] leading-snug">
                    {entry.degree}
                  </h4>

                  {/* Institution + meta */}
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="text-sm font-medium text-[var(--accent)]">
                      {entry.institution}
                    </span>
                    <span aria-hidden="true" className="text-[var(--border)]">·</span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                      {entry.period}
                    </span>
                    <span aria-hidden="true" className="text-[var(--border)]">·</span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                      {entry.location}
                    </span>
                  </div>

                  {/* GPA stats */}
                  <div className="mt-4 flex flex-wrap gap-4">
                    <div className="flex flex-col">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                        CGPA
                      </span>
                      <span className="mt-0.5 text-xl font-display text-[var(--text-primary)]">
                        {entry.gpa}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                        Peak
                      </span>
                      <span className="mt-0.5 text-xl font-display text-[var(--text-primary)]">
                        {entry.peak}
                      </span>
                    </div>
                  </div>
                </article>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
