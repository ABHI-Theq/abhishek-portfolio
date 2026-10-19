import { Project } from "@/data/projects";
import { Tag } from "@/components/ui/Tag";

interface ProjectCardProps {
  project: Project;
}

/**
 * Project card — lean layout with a fixed 3-slot link bar at the bottom.
 * Slots are always rendered in the same order (Details · GitHub · Live)
 * so every card has identical structure regardless of which URLs exist.
 * Requirements: 4.4, 4.5, 4.6
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const { slug, title, description, tech, domains, githubUrl, liveUrl } =
    project;

  return (
    <article
      className={[
        "group flex flex-col",
        "rounded-card border border-[var(--border)] bg-[var(--card-surface)]",
        "p-5 h-full",
        "transition-all duration-200",
        "hover:border-[var(--accent)]/50 hover:scale-[1.01]",
        "motion-reduce:transition-none motion-reduce:hover:scale-100",
      ].join(" ")}
    >
      {/* ── Content ───────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 flex-1">
        {/* Domain labels */}
        <div className="flex flex-wrap gap-1.5">
          {domains.map((d) => (
            <span
              key={d}
              className="inline-block rounded-tag border border-[var(--border)] bg-[var(--bg-secondary)] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--text-muted)]"
            >
              {d}
            </span>
          ))}
        </div>

        <h3 className="font-display text-lg text-[var(--text-primary)] leading-snug">
          {title}
        </h3>

        <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* Tech tags — max 4 */}
        <div className="flex flex-wrap gap-1.5">
          {tech.slice(0, 4).map((t) => (
            <Tag key={t} label={t} />
          ))}
          {tech.length > 4 && (
            <span className="inline-block rounded-tag border border-[var(--border)] px-2 py-0.5 font-mono text-[10px] text-[var(--text-muted)]">
              +{tech.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* ── Link bar — only render slots that have a URL ──────── */}
      {(() => {
        const links: { href: string; label: string; external?: boolean }[] = [];
        if (slug) links.push({ href: `/projects/${slug}`, label: "Details" });
        if (githubUrl) links.push({ href: githubUrl, label: "GitHub", external: true });
        if (liveUrl) links.push({ href: liveUrl, label: "Live", external: true });
        if (links.length === 0) return null;
        const cols = links.length === 1 ? "grid-cols-1" : links.length === 2 ? "grid-cols-2" : "grid-cols-3";
        return (
          <div className={`mt-4 grid ${cols} divide-x divide-[var(--border)] border-t border-[var(--border)]`}>
            {links.map((l) => (
              <LinkSlot key={l.label} href={l.href} label={l.label} external={l.external} />
            ))}
          </div>
        );
      })()}
    </article>
  );
}

/** A single slot in the link bar. Renders a link or a dimmed dash when unavailable. */
function LinkSlot({
  href,
  label,
  external,
}: {
  href?: string;
  label: string;
  external?: boolean;
}) {
  const base =
    "flex items-center justify-center py-2.5 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors duration-150";

  if (!href) {
    return (
      <span className={`${base} text-[var(--border)] cursor-default select-none`}>
        —
      </span>
    );
  }

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${base} text-[var(--text-muted)] hover:text-[var(--accent)] hover:bg-[var(--card-elevated)]`}
    >
      {label}
    </a>
  );
}
