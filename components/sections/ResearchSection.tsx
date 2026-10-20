import { FadeIn } from "@/components/ui/FadeIn";

/**
 * RAGPipelineDiagram — purely decorative CSS-only pipeline diagram.
 * aria-hidden="true" — the surrounding prose provides equivalent information.
 * Requirements: 6.1, 6.2, 6.3, 6.4
 */
function RAGPipelineDiagram() {
  return (
    <div
      aria-hidden="true"
      className="rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] p-4 lg:p-6 overflow-hidden"
      data-testid="rag-pipeline-diagram"
    >
      {/* Desktop: horizontal flexbox row — hidden below md */}
      <div className="hidden md:flex items-center gap-1 font-mono text-[11px] flex-wrap justify-center">
        {/* Query */}
        <span className="border border-[var(--border)] rounded px-2 py-1 text-[var(--text-secondary)] whitespace-nowrap">
          Query
        </span>
        <span className="text-[var(--text-muted)]">→</span>
        {/* Uncertainty Estimator */}
        <span className="border border-[var(--border)] rounded px-2 py-1 text-[var(--text-secondary)] whitespace-nowrap">
          Uncertainty Estimator
        </span>
        <span className="text-[var(--text-muted)]">→</span>
        {/* Decision Gate */}
        <span className="border border-[var(--border)] rounded px-2 py-1 text-[var(--text-secondary)] whitespace-nowrap">
          Decision Gate
        </span>
        <span className="text-[var(--text-muted)]">→</span>
        {/* Fork: Retrieve + Skip stacked */}
        <div className="flex flex-col gap-1">
          <span className="border border-[var(--accent)] rounded px-2 py-1 text-[var(--accent)] whitespace-nowrap">
            Retrieve
          </span>
          <span className="border border-[var(--text-muted)] rounded px-2 py-1 text-[var(--text-muted)] opacity-60 whitespace-nowrap">
            Skip
          </span>
        </div>
        <span className="text-[var(--text-muted)]">→</span>
        {/* Generator */}
        <span className="border border-[var(--border)] rounded px-2 py-1 text-[var(--text-secondary)] whitespace-nowrap">
          Generator
        </span>
        <span className="text-[var(--text-muted)]">→</span>
        {/* Response */}
        <span className="border border-[var(--border)] rounded px-2 py-1 text-[var(--text-secondary)] whitespace-nowrap">
          Response
        </span>
      </div>

      {/* Mobile: vertical list — shown below md */}
      <ul className="flex flex-col gap-2 font-mono text-[11px] md:hidden">
        <li className="border border-[var(--border)] rounded px-2 py-1 text-[var(--text-secondary)]">Query</li>
        <li className="border border-[var(--border)] rounded px-2 py-1 text-[var(--text-secondary)]">Uncertainty Estimator</li>
        <li className="border border-[var(--border)] rounded px-2 py-1 text-[var(--text-secondary)]">Decision Gate</li>
        <li className="border border-[var(--accent)] rounded px-2 py-1 text-[var(--accent)]">Retrieve</li>
        <li className="border border-[var(--text-muted)] rounded px-2 py-1 text-[var(--text-muted)] opacity-60">Skip</li>
        <li className="border border-[var(--border)] rounded px-2 py-1 text-[var(--text-secondary)]">Generator</li>
        <li className="border border-[var(--border)] rounded px-2 py-1 text-[var(--text-secondary)]">Response</li>
      </ul>
    </div>
  );
}

/**
 * ResearchSection — server component
 * Renders the SmartRAG research card.
 * Clearly separates verified completed work from hypotheses/future experiments.
 * Requirements: 7.1, 7.2, 7.3, 5.4
 */
export function ResearchSection() {
  return (
    <section id="research" aria-labelledby="research-heading" className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-bento">
        {/* Section header */}
        <FadeIn>
          <div className="mb-12 flex items-baseline gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
              03
            </span>
            <h2
              id="research-heading"
              className="font-display text-3xl text-[var(--text-primary)]"
            >
              Research
            </h2>
          </div>
        </FadeIn>

        {/* SmartRAG card — single FadeIn unit */}
        <FadeIn>
        <article
          aria-label="SmartRAG research project"
          className="rounded-card border border-[var(--border)] bg-[var(--card-surface)] p-8 lg:p-10"
        >
          {/* Title + status badge */}
          <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent)]">
                AI / RAG Systems
              </p>
              <h3 className="font-display text-2xl text-[var(--text-primary)]">
                SmartRAG
              </h3>
            </div>
            <span className="rounded-tag border border-[var(--accent)] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[var(--accent)]">
              In Progress
            </span>
          </header>

          {/* Problem statement */}
          <div className="mb-8">
            <h4 className="mb-2 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)]">
              Problem Statement
            </h4>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Standard RAG systems retrieve context on every query regardless of whether retrieval
              actually improves generation quality. Under distribution shift — when queries fall
              outside the distribution of indexed documents — unnecessary retrieval can degrade
              response quality and increase latency. SmartRAG explores training-free uncertainty-guided
              retrieval gating to selectively invoke the retrieval pipeline only when it is likely
              to be beneficial.
            </p>
          </div>

          {/* RAG Pipeline Diagram — placed between problem statement and completed/hypotheses grid */}
          <div className="mb-8">
            <h4 className="mb-3 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)]">
              Pipeline Architecture
            </h4>
            <RAGPipelineDiagram />
          </div>

          {/* Two-column grid: Completed ↔ Hypotheses */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Completed work */}
            <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] p-6">
              <div className="mb-4 flex items-center gap-2">
                {/* Green dot indicator for completed */}
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full bg-emerald-500"
                />
                <h4 className="font-mono text-[10px] uppercase tracking-[0.15em] text-emerald-400">
                  Completed
                </h4>
              </div>
              <ul className="space-y-3 text-sm text-[var(--text-secondary)]" role="list">
                <li className="flex gap-2">
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--text-muted)]" />
                  Designed the retrieval gating mechanism using LLM confidence signals as
                  uncertainty proxies.
                </li>
                <li className="flex gap-2">
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--text-muted)]" />
                  Implemented uncertainty signal extraction from token-level log-probabilities
                  without additional model training.
                </li>
                <li className="flex gap-2">
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--text-muted)]" />
                  Built modular pipeline integrating FAISS vector store with selective retrieval
                  bypass for high-confidence queries.
                </li>
                <li className="flex gap-2">
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--text-muted)]" />
                  Evaluated retrieval behavior using standard retrieval metrics (precision@k,
                  recall@k) on in-distribution queries.
                </li>
              </ul>
            </div>

            {/* Hypotheses / future work */}
            <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] p-6">
              <div className="mb-4 flex items-center gap-2">
                {/* Amber dot indicator for hypotheses */}
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full bg-amber-500"
                />
                <h4 className="font-mono text-[10px] uppercase tracking-[0.15em] text-amber-400">
                  Hypotheses &amp; Future Work
                </h4>
              </div>
              <ul className="space-y-3 text-sm text-[var(--text-secondary)]" role="list">
                <li className="flex gap-2">
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--text-muted)]" />
                  Hypothesis: gating on distribution-shift queries should reduce unnecessary
                  retrieval calls by a significant margin — not yet benchmarked at scale.
                </li>
                <li className="flex gap-2">
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--text-muted)]" />
                  Exploring threshold calibration strategies to balance recall and latency
                  trade-offs across different query distributions.
                </li>
                <li className="flex gap-2">
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--text-muted)]" />
                  Investigating integration with re-ranking layers to further improve
                  answer faithfulness on out-of-distribution inputs.
                </li>
              </ul>
            </div>
          </div>

          {/* Tech stack */}
          <footer className="mt-6 flex flex-wrap gap-2">
            {["LangChain", "FAISS", "RAG", "LLM Integration", "Python"].map((t) => (
              <span
                key={t}
                className="inline-block rounded-tag border border-[var(--border)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)] bg-[var(--card-surface)]"
              >
                {t}
              </span>
            ))}
          </footer>
        </article>
        </FadeIn>
      </div>
    </section>
  );
}
