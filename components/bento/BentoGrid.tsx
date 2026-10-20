"use client";

import { useState } from "react";
import { Project } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { FeaturedProjectRow } from "@/components/projects/FeaturedProjectRow";
import { FadeIn } from "@/components/ui/FadeIn";

interface BentoGridProps {
  projects: Project[];
}

// Category filter config — label shown in UI, value matches project.category
const FILTERS = [
  { label: "All", value: "all" },
  { label: "Full-Stack", value: "fullstack" },
  { label: "AI / GenAI", value: "ai" },
  { label: "Dev Tools", value: "tool" },
  { label: "ML / DL", value: "ml" },
] as const;

type FilterValue = (typeof FILTERS)[number]["value"];

/** Returns true when a project matches the active filter. */
function projectMatchesFilter(project: Project, active: FilterValue): boolean {
  if (active === "all") return true;
  return project.category === active || (active === "ml" && project.category === "dl");
}

/**
 * Project layout with category filter tabs.
 * Featured projects (featured: true) render as editorial rows above the secondary grid.
 * Requirements: 4.1, 4.2, 4.3, 4.5, 4.6, 4.7
 */
export function BentoGrid({ projects }: BentoGridProps) {
  const [active, setActive] = useState<FilterValue>("all");

  const featuredProjects = projects.filter((p) => p.featured);
  const secondaryProjects = projects.filter((p) => !p.featured);

  const visibleSecondary = secondaryProjects.filter((p) =>
    projectMatchesFilter(p, active)
  );

  // Count total visible: featured rows that match + visible secondary
  const visibleFeaturedCount = featuredProjects.filter((p) =>
    projectMatchesFilter(p, active)
  ).length;
  const totalVisible = visibleFeaturedCount + visibleSecondary.length;

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="w-full px-4 sm:px-6 lg:px-8 py-24"
    >
      <div className="max-w-bento mx-auto">
        {/* Section header */}
        <div className="mb-8 flex items-baseline gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
            01
          </span>
          <h2
            id="projects-heading"
            className="font-display text-3xl text-[var(--text-primary)]"
          >
            Projects
          </h2>
          <span className="font-mono text-[10px] text-[var(--text-muted)] tracking-wider">
            {totalVisible} / {projects.length}
          </span>
        </div>

        {/* Filter tabs */}
        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="mb-10 flex flex-wrap gap-2"
        >
          {FILTERS.map(({ label, value }) => {
            const isActive = active === value;
            return (
              <button
                key={value}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(value)}
                className={[
                  "rounded-full px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] transition-all duration-150",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
                  isActive
                    ? "bg-[var(--accent)] text-[var(--bg-main)]"
                    : "border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent)]/50 hover:text-[var(--text-secondary)]",
                ].join(" ")}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* ── Featured projects (editorial rows) ─────────────────── */}
        {featuredProjects.length > 0 && (
          <div className="flex flex-col gap-6 mb-16" data-section="featured">
            {featuredProjects.map((project, index) => {
              const matches = projectMatchesFilter(project, active);
              return (
                <div
                  key={project.slug}
                  className={matches ? "" : "hidden"}
                  data-featured-item={project.slug}
                >
                  <FeaturedProjectRow project={project} index={index} />
                </div>
              );
            })}
          </div>
        )}

        {/* ── Secondary grid ─────────────────────────────────────── */}
        {visibleSecondary.length > 0 && (
          <div data-section="secondary">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-6">
              More Projects
            </h3>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {visibleSecondary.map((project, index) => (
                <FadeIn key={project.slug} delay={index * 80} data-secondary-card-index={String(index)} data-secondary-item={project.slug}>
                  <ProjectCard project={project} />
                </FadeIn>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {totalVisible === 0 && (
          <p className="font-mono text-sm text-[var(--text-muted)]">
            No projects in this category.
          </p>
        )}
      </div>
    </section>
  );
}
