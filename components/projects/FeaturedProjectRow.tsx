import Image from "next/image";
import { Project } from "@/data/projects";
import { Tag } from "@/components/ui/Tag";
import { ArrowLink } from "@/components/ui/ArrowLink";

interface FeaturedProjectRowProps {
  project: Project;
  index: number;
}

/**
 * Editorial full-width row for a featured project.
 * Alternates layout direction on odd indices (text left/visual right vs visual left/text right).
 * When project.image is set, shows the screenshot; otherwise falls back to the architecture text panel.
 * Requirements: 4.2, 4.3
 */
export function FeaturedProjectRow({ project, index }: FeaturedProjectRowProps) {
  const { title, tagline, description, tech, architecture, githubUrl, liveUrl, slug, image } = project;
  const isReversed = index % 2 !== 0;
  const editorialNum = String(index + 1).padStart(2, "0");
  const visualText = architecture ?? tagline;

  return (
    <article
      data-layout={isReversed ? "reversed" : "normal"}
      className={[
        "group relative flex flex-col md:flex-row gap-6 lg:gap-10 w-full",
        "border border-[var(--border)] rounded-card p-6 lg:p-8",
        "bg-[var(--card-surface)] transition-colors duration-300",
        "hover:border-[var(--accent)]/40",
        isReversed ? "md:flex-row-reverse" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Left-edge accent bar on hover — uses scaleY to avoid layout-affecting height animation (req 10.6) */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 w-[2px] h-full bg-[var(--accent)] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300 rounded-l-card"
      />

      {/* ── Text column ──────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 flex-1 min-w-0">
        {/* Editorial number */}
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
          {editorialNum}
        </span>

        {/* Title */}
        <h3 className="font-display text-4xl text-[var(--text-primary)] leading-tight">
          {title}
        </h3>

        {/* Tagline */}
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
          {tagline}
        </p>

        {/* Description */}
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          {description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {tech.slice(0, 5).map((t) => (
            <Tag key={t} label={t} />
          ))}
          {tech.length > 5 && (
            <span className="inline-block rounded-tag border border-[var(--border)] px-2 py-0.5 font-mono text-[10px] text-[var(--text-muted)]">
              +{tech.length - 5}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-4 mt-auto pt-2">
          {slug && (
            <ArrowLink href={`/projects/${slug}`} label="Details" />
          )}
          {githubUrl && (
            <ArrowLink href={githubUrl} label="GitHub" external />
          )}
          {liveUrl && (
            <ArrowLink href={liveUrl} label="Live" external />
          )}
        </div>
      </div>

      {/* ── Visual column ─────────────────────────────────────────── */}
      <div
        className={[
          "relative flex-shrink-0 w-full md:w-[42%]",
          "rounded-card border border-[var(--border)]",
          "overflow-hidden min-h-[200px] md:min-h-[260px]",
          image ? "bg-black" : "bg-[var(--bg-secondary)] p-5 flex flex-col justify-between",
        ].join(" ")}
      >
        {image ? (
          /* Screenshot image */
          <Image
            src={image}
            alt={`${title} screenshot`}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 42vw"
          />
        ) : (
          /* Fallback: architecture text panel */
          <>
            {/* Accent corner marks */}
            <span aria-hidden="true" className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[var(--accent)] opacity-60" />
            <span aria-hidden="true" className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[var(--accent)] opacity-60" />
            <span aria-hidden="true" className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[var(--accent)] opacity-60" />
            <span aria-hidden="true" className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[var(--accent)] opacity-60" />
            <p
              aria-hidden="true"
              className="font-mono text-[10px] leading-relaxed text-[var(--text-primary)] opacity-20 line-clamp-[10] select-none"
            >
              {visualText}
            </p>
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[var(--bg-secondary)] to-transparent"
            />
          </>
        )}

        {/* Subtle gradient overlay at bottom for images */}
        {image && (
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"
          />
        )}
      </div>
    </article>
  );
}
