import { skillGroups } from "@/data/skills";
import { FadeIn } from "@/components/ui/FadeIn";

/**
 * SkillsSection — two-panel pill layout.
 * Left column: group label (DM Serif Display) + mono sub-label.
 * Right column: skill pills with border/bg-secondary styling.
 * No progress bars, no fake proficiency scores.
 * Requirements: 7.1, 7.2, 7.3, 7.4
 */
export function SkillsSection() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-bento">
        {/* Section header */}
        <FadeIn>
          <div className="mb-12 flex items-baseline gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
              02
            </span>
            <h2
              id="skills-heading"
              className="font-display text-3xl text-[var(--text-primary)]"
            >
              Skills
            </h2>
          </div>
        </FadeIn>

        {/* Two-panel skill rows */}
        <div>
          {skillGroups.map((group, index) => (
            <FadeIn key={group.label} delay={index * 60} data-skill-group-index={String(index)}>
              <div className="border-t border-[var(--border)] py-8 grid grid-cols-1 gap-4 sm:grid-cols-[220px_1fr] sm:gap-8 sm:items-start">
                {/* Left panel: group label + mono sub-label */}
                <div>
                  <h3 className="font-display text-2xl text-[var(--text-primary)]">
                    {group.label}
                  </h3>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] mt-1">
                    {group.skills.length} skills
                  </p>
                </div>

                {/* Right panel: skill pills */}
                <ul className="flex flex-wrap gap-2" role="list">
                  {group.skills.map((skill) => (
                    <li key={skill}>
                      <span className="border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-1 text-sm rounded-tag text-[var(--text-secondary)]">
                        {skill}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
