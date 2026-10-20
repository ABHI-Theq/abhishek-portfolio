import { Project } from "@/data/projects";
import { ProjectPreview } from "@/components/projects/ProjectPreview";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  /** Stable archive index (e.g. "04") shown as metadata. */
  displayNumber?: string;
}

/** Human label for a project's single category field. */
const CATEGORY_LABEL: Record<Project["category"], string> = {
  fullstack: "Full-stack",
  ai: "AI / GenAI",
  research: "Research",
  tool: "Developer Tool",
  ml: "Machine Learning",
  dl: "Deep Learning",
};

/**
 * ProjectCard — three-layer archive tile for the "More Projects" grid.
 *
 * Layers: visual preview (ProjectPreview SVG) → metadata + title + description
 * → action links. The card itself is not a link; each action is a distinct,
 * keyboard-accessible anchor so several links never compete inside one
 * clickable wrapper.
 *
 * Preserves the existing test contract: the project title renders in a single
 * <h3>, a case-study link targets /projects/<slug>, and GitHub/Live anchors
 * only appear when their URLs exist (no placeholder links).
 *
 * Requirements: 4.A–4.E, 5, 6, 11
 */
export function ProjectCard({ project, displayNumber }: ProjectCardProps) {
  const { slug, title, description, githubUrl, liveUrl, category } = project;

  return (
    <article
      className={cn(
        "archive-card group relative flex h-full flex-col overflow-hidden",
        "rounded-card border border-[var(--border)] bg-[var(--card-surface)]"
      )}
    >
      {/* left accent bar — revealed on hover (CSS, transform-only) */}
      <span
        aria-hidden="true"
        className="archive-accent-bar absolute left-0 top-0 h-full w-[2px] rounded-l-card bg-[var(--accent)]"
      />

      {/* ── Visual layer ─────────────────────────────────────── */}
      <div className="archive-preview h-28 w-full shrink-0 border-b border-[var(--border)] sm:h-32">
        <ProjectPreview project={project} />
      </div>

      {/* ── Information + action layers ──────────────────────── */}
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        {/* metadata: index + category */}
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em]">
          {displayNumber && (
            <span className="archive-number text-[var(--text-muted)]">
              {displayNumber}
            </span>
          )}
          {displayNumber && (
            <span aria-hidden="true" className="text-[var(--text-muted)] opacity-50">
              /
            </span>
          )}
          <span className="text-[var(--text-muted)]">
            {CATEGORY_LABEL[category]}
          </span>
        </div>

        {/* title — single h3 to satisfy the card's heading contract */}
        <h3 className="font-display text-lg leading-snug text-[var(--text-primary)] text-balance">
          {title}
        </h3>

        {/* description — clamped to keep cards compact; full story on case study */}
        <p className="text-sm leading-relaxed text-[var(--text-secondary)] line-clamp-2">
          {description}
        </p>

        {/* action links — distinct anchors, never a competing card wrapper */}
        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-1.5">
          {slug && <ArchiveLink href={`/projects/${slug}`} label="Case Study" />}
          {githubUrl && <ArchiveLink href={githubUrl} label="GitHub" external />}
          {liveUrl && <ArchiveLink href={liveUrl} label="Live" external />}
        </div>
      </div>
    </article>
  );
}

// ── ArchiveLink ──────────────────────────────────────────────────
interface ArchiveLinkProps {
  href: string;
  label: string;
  external?: boolean;
}

/**
 * A single action link with an animated underline + nudging arrow. Renders only
 * when an href is present, so absent destinations never produce dead links.
 * The underline and arrow respond to both the card hover (coordinated) and the
 * link's own hover/focus.
 */
function ArchiveLink({ href, label, external = false }: ArchiveLinkProps) {
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <a
      href={href}
      aria-label={label}
      className={cn(
        "archive-link relative inline-flex items-center gap-1 py-1",
        "text-sm text-[var(--text-secondary)] transition-colors duration-200",
        "hover:text-[var(--accent)]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
      )}
      {...externalProps}
    >
      <span>{label}</span>
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
        className="archive-arrow"
      >
        <line x1="7" y1="17" x2="17" y2="7" />
        <polyline points="7 7 17 7 17 17" />
      </svg>
      <span
        aria-hidden="true"
        className="archive-link-underline absolute -bottom-0.5 left-0 right-0 h-px bg-[var(--accent)]"
      />
    </a>
  );
}
