import { profile } from "@/data/profile";

/**
 * ContactSection — server component
 * Renders mailto, GitHub, LinkedIn, and resume links.
 * All non-mailto links open in a new tab with rel="noopener noreferrer".
 * Requirements: 11.1, 11.2, 11.3
 */
export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-bento">
        {/* Section header */}
        <div className="mb-12 flex items-baseline gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
            07
          </span>
          <h2
            id="contact-heading"
            className="font-display text-3xl text-[var(--text-primary)]"
          >
            Get in Touch
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
          {/* Intro copy */}
          <div className="flex flex-col gap-4">
            <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
              Have a project in mind, a role to discuss, or just want to say hello? My inbox
              is always open.
            </p>
            <p className="text-[var(--text-muted)]">
              The best way to reach me is via email — I typically respond within 24 hours.
            </p>

            {/* Primary mailto CTA */}
            <a
              href={`mailto:${profile.email}`}
              className="mt-4 inline-flex w-fit items-center gap-2 rounded-md border border-[var(--accent)] bg-transparent px-6 py-3 font-mono text-sm uppercase tracking-[0.12em] text-[var(--accent)] transition-colors duration-200 hover:bg-[var(--accent)] hover:text-[var(--bg-main)]"
            >
              {profile.email}
            </a>
          </div>

          {/* Link grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* GitHub */}
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="group flex flex-col gap-3 rounded-card border border-[var(--border)] bg-[var(--card-surface)] p-5 transition-colors duration-200 hover:border-[var(--accent)]"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                GitHub
              </span>
              <span className="font-display text-base text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-200">
                ABHI-Theq
              </span>
              <span className="font-mono text-xs text-[var(--text-muted)]">
                github.com/ABHI-Theq ↗
              </span>
            </a>

            {/* LinkedIn */}
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="group flex flex-col gap-3 rounded-card border border-[var(--border)] bg-[var(--card-surface)] p-5 transition-colors duration-200 hover:border-[var(--accent)]"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                LinkedIn
              </span>
              <span className="font-display text-base text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-200">
                Abhishek Sharma
              </span>
              <span className="font-mono text-xs text-[var(--text-muted)]">
                linkedin.com/in/abhishek ↗
              </span>
            </a>

            {/* Resume */}
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View resume"
              className="group flex flex-col gap-3 rounded-card border border-[var(--border)] bg-[var(--card-surface)] p-5 transition-colors duration-200 hover:border-[var(--accent)] sm:col-span-2"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                Resume
              </span>
              <span className="font-display text-base text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-200">
                View Full Resume
              </span>
              <span className="font-mono text-xs text-[var(--text-muted)]">
                Google Drive · PDF ↗
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
