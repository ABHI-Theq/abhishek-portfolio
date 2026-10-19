import { cn } from "@/lib/utils";

interface TagProps {
  label: string;
  className?: string;
}

/**
 * A small pill <span> rendering a single tech label in JetBrains Mono style.
 * Used by ProjectCard to display technology tags.
 * Requirements: 4.4
 */
export function Tag({ label, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-tag border border-[var(--border)] px-2 py-0.5",
        "font-mono text-[10px] uppercase tracking-wider",
        "text-[var(--text-muted)] bg-[var(--card-surface)]",
        className
      )}
    >
      {label}
    </span>
  );
}
