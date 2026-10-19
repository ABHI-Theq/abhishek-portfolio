import { skillGroups } from "@/data/skills";

/**
 * SkillsSection — compact inline layout.
 * Group label on the left, skills as comma-separated inline text on the right.
 * No progress bars, no fake proficiency scores.
 * Requirements: 6.1, 6.2, 6.3
 */
export function SkillsSection() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-bento">
        {/* Section header */}
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

        {/* Compact skill rows */}
        <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {skillGroups.map((group) => (
            <div
              key={group.label}
              className="grid grid-cols-1 gap-2 py-4 sm:grid-cols-[200px_1fr] sm:gap-6 sm:items-start"
            >
              {/* Group label */}
              <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)] pt-0.5">
                {group.label}
              </h3>

              {/* Skills — inline with dot separators */}
              <ul className="flex flex-wrap gap-x-3 gap-y-1.5" role="list">
                {group.skills.map((skill, i) => (
                  <li
                    key={skill}
                    className="flex items-center gap-3 text-sm text-[var(--text-secondary)]"
                  >
                    {skill}
                    {i < group.skills.length - 1 && (
                      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[var(--border)]" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
