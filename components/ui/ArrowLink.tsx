import { cn } from "@/lib/utils";

interface ArrowLinkProps {
  href?: string;
  label: string;
  external?: boolean;
  className?: string;
}

/**
 * An anchor with an animated ArrowUpRight icon.
 * Renders nothing when href is undefined or empty.
 * Requirements: 4.5
 */
export function ArrowLink({ href, label, external = false, className }: ArrowLinkProps) {
  if (!href) return null;

  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <a
      href={href}
      aria-label={label}
      className={cn(
        "group inline-flex items-center gap-1",
        "text-sm text-[var(--text-secondary)] hover:text-[var(--accent)]",
        "transition-colors duration-200",
        className
      )}
      {...externalProps}
    >
      <span>{label}</span>
      {/* Inline ArrowUpRight SVG — mirrors lucide-react ArrowUpRight */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      >
        <line x1="7" y1="17" x2="17" y2="7" />
        <polyline points="7 7 17 7 17 17" />
      </svg>
    </a>
  );
}
