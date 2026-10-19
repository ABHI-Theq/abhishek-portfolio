"use client";

import { useState } from "react";
import { Project } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";

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

/**
 * Project grid with category filter tabs.
 * Requirements: 4.1, 4.2, 4.3
 */
export function BentoGrid({ projects }: BentoGridProps) {
  const [active, setActive] = useState<FilterValue>("all");

  const visible =
    active === "all"
      ? projects
      : projects.filter(
          (p) => p.category === active || (active === "ml" && p.category === "dl")
        );

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
            {visible.length} / {projects.length}
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

        {/* Grid */}
        {visible.length === 0 ? (
          <p className="font-mono text-sm text-[var(--text-muted)]">
            No projects in this category.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
