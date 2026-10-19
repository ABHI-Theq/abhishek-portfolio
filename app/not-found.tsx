import Link from "next/link";

/**
 * Custom 404 page — shown when notFound() is called or a route doesn't exist.
 * Requirements: 5.4
 */
export default function NotFound() {
  return (
    <main className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] flex flex-col items-center justify-center px-6">
      <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-4">
        404
      </p>
      <h1 className="font-display text-4xl sm:text-5xl text-[var(--text-primary)] mb-4 text-center">
        Page not found
      </h1>
      <p className="text-[var(--text-secondary)] mb-10 text-center max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
      >
        ← Back to homepage
      </Link>
    </main>
  );
}
