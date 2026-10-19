import { profile } from "@/data/profile";

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: profile.github,
  },
  {
    label: "LinkedIn",
    href: profile.linkedin,
  },
  {
    label: "LeetCode",
    href: profile.leetcode,
  },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-secondary)]">
      <div className="mx-auto flex max-w-bento flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row lg:px-8">
        {/* Wordmark */}
        <a
          href="/"
          className="font-display text-base text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
          aria-label="Abhishek Sharma — home"
        >
          Abhishek Sharma
        </a>

        {/* Social links */}
        <nav aria-label="Social links" className="flex items-center gap-6">
          {SOCIAL_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <p className="text-sm text-[var(--text-muted)]">
          &copy; {year} Abhishek Sharma
        </p>
      </div>
    </footer>
  );
}
