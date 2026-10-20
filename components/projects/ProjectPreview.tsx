import { Project } from "@/data/projects";

interface ProjectPreviewProps {
  project: Project;
}

/**
 * ProjectPreview — a compact, decorative SVG "project signature" rendered at
 * the top of each archive card. No real screenshots exist for the secondary
 * projects, so each card gets a purposeful abstract visualization keyed by its
 * documented category, with deterministic per-project variation driven by the
 * slug (stable across renders).
 *
 * The graphic is purely decorative (aria-hidden on the host element), so it
 * never hides or replaces content. Motif families share the same frame, palette
 * and stroke language so the grid reads as one cohesive archive.
 *
 * Requirements: 4.B (visual preview), 12.2 (no layout shift — pure CSS/SVG)
 */
export function ProjectPreview({ project }: ProjectPreviewProps) {
  const seed = hashSlug(project.slug);

  return (
    <svg
      viewBox="0 0 320 128"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      {/* faint dot texture */}
      <defs>
        <pattern
          id={`pv-dots-${project.slug}`}
          width="14"
          height="14"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r="1" fill="var(--text-muted)" opacity="0.16" />
        </pattern>
      </defs>
      <rect width="320" height="128" fill={`url(#pv-dots-${project.slug})`} />

      {renderMotif(project.category, seed)}

      <CornerMarks />
    </svg>
  );
}

// ── Motif dispatch ──────────────────────────────────────────────
function renderMotif(category: Project["category"], seed: number) {
  switch (category) {
    case "tool":
      return <EditorMotif seed={seed} />;
    case "fullstack":
      return <StackMotif seed={seed} />;
    case "ml":
      return <TrendMotif seed={seed} />;
    case "dl":
    case "ai":
    case "research":
    default:
      return <NetworkMotif seed={seed} />;
  }
}

// ── Shared corner frame ─────────────────────────────────────────
function CornerMarks() {
  const stroke = "var(--border)";
  return (
    <g stroke={stroke} strokeWidth="1" fill="none" opacity="0.55">
      <path d="M6 14 L6 6 L14 6" />
      <path d="M306 6 L314 6 L314 14" />
      <path d="M6 114 L6 122 L14 122" />
      <path d="M306 122 L314 122 L314 114" />
    </g>
  );
}

// ── Deterministic per-project variation ──────────────────────────
function hashSlug(slug: string): number {
  let h = 2166136261;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Stable pseudo-random in [0,1) from a seed + salt. */
function rand(seed: number, salt: number): number {
  const x = Math.sin((seed + salt * 127.7) * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

// ── Editor motif (developer tools) ──────────────────────────────
function EditorMotif({ seed }: { seed: number }) {
  const mono = { fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace" };
  const rows = [0, 1, 2, 3, 4];
  const accentRow = Math.floor(rand(seed, 9) * 5);
  const yFor = (i: number) => 34 + i * 14;

  return (
    <g>
      {/* gutter line numbers */}
      <g fill="var(--text-muted)" opacity="0.4" style={mono}>
        {rows.map((i) => (
          <text key={i} x="14" y={yFor(i) + 4} fontSize="7">
            {i + 1}
          </text>
        ))}
      </g>
      <line x1="30" y1="28" x2="30" y2="106" stroke="var(--border)" strokeWidth="1" opacity="0.6" />

      {/* code lines */}
      {rows.map((i) => {
        const indent = i === 1 ? 14 : i === 3 ? 28 : i % 2 === 0 ? 0 : 14;
        const width = 80 + Math.round(rand(seed, i + 1) * 150);
        const isAccent = i === accentRow;
        return (
          <rect
            key={i}
            x={34 + indent}
            y={yFor(i) - 2}
            width={width}
            height="5"
            rx="1.5"
            fill={isAccent ? "var(--accent)" : "var(--text-muted)"}
            opacity={isAccent ? 0.85 : 0.3}
          />
        );
      })}

      {/* cursor on the accent line */}
      <rect
        className="archive-preview-cursor"
        x={34 + 14 + 80 + 8}
        y={yFor(accentRow) - 3}
        width="2.5"
        height="7"
        fill="var(--accent)"
      />
    </g>
  );
}

// ── Stack motif (full-stack) ─────────────────────────────────────
function StackMotif({ seed }: { seed: number }) {
  const accentIndex = Math.floor(rand(seed, 11) * 3);
  const layers = [
    { y: 42, x: 74, w: 172 },
    { y: 62, x: 52, w: 216 },
    { y: 82, x: 84, w: 160 },
  ].map((l, i) => ({ ...l, accent: i === accentIndex }));
  const portFor = (x: number, w: number) => [x + 12, x + w - 12];

  return (
    <g>
      {layers.map((l, i) => {
        const [px1, px2] = portFor(l.x, l.w);
        return (
          <g key={i}>
            <rect
              x={l.x}
              y={l.y}
              width={l.w}
              height="12"
              rx="3"
              fill={l.accent ? "var(--accent)" : "var(--card-elevated)"}
              stroke={l.accent ? "var(--accent)" : "var(--border)"}
              strokeWidth="1"
              opacity={l.accent ? 0.9 : 0.75}
            />
            <circle cx={px1} cy={l.y + 6} r="1.5" fill={l.accent ? "var(--bg-main)" : "var(--text-muted)"} opacity="0.7" />
            <circle cx={px2} cy={l.y + 6} r="1.5" fill={l.accent ? "var(--bg-main)" : "var(--text-muted)"} opacity="0.7" />
          </g>
        );
      })}

      {/* vertical connectors between layers (the "data flow") */}
      <g className="archive-signal" stroke="var(--accent)" strokeWidth="1" opacity="0.5">
        <line x1="160" y1="54" x2="160" y2="62" />
        <line x1="160" y1="74" x2="160" y2="82" />
      </g>
    </g>
  );
}

// ── Trend / scatter motif (machine learning) ─────────────────────
function TrendMotif({ seed }: { seed: number }) {
  const pts = Array.from({ length: 9 }, (_, i) => ({
    x: 44 + i * 28 + (rand(seed, i) - 0.5) * 8,
    y: 92 - rand(seed, i + 5) * 52,
  }));
  const accentIdx = Math.floor(rand(seed, 21) * 9);

  return (
    <g>
      {/* axes */}
      <line x1="34" y1="100" x2="296" y2="100" stroke="var(--border)" strokeWidth="1" opacity="0.5" />
      <line x1="34" y1="22" x2="34" y2="100" stroke="var(--border)" strokeWidth="1" opacity="0.5" />

      {/* fitted curve */}
      <path
        d="M40 94 Q120 36 200 60 T288 48"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.5"
        opacity="0.8"
      />

      {/* scatter points */}
      {pts.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={i === accentIdx ? 3 : 2.4}
          fill={i === accentIdx ? "var(--accent)" : "var(--text-muted)"}
          opacity={i === accentIdx ? 0.95 : 0.45}
          className={i === accentIdx ? "archive-signal" : undefined}
        />
      ))}
    </g>
  );
}

// ── Network motif (deep learning) ────────────────────────────────
function NetworkMotif({ seed }: { seed: number }) {
  const layouts = [
    [3, 4, 2],
    [4, 3, 2],
    [3, 3, 3],
    [4, 4, 2],
  ];
  const layout = layouts[Math.floor(rand(seed, 3) * layouts.length)];
  const colX = [70, 160, 250];

  // y positions per column, evenly spaced
  const columnNodes: { x: number; y: number }[][] = layout.map((count, ci) => {
    const spacing = 80 / (count + 1);
    return Array.from({ length: count }, (_, j) => ({
      x: colX[ci],
      y: 24 + spacing * (j + 1),
    }));
  });

  // accent path: pick one node per column
  const accentPath = layout.map((count, ci) =>
    Math.floor(rand(seed, ci * 7 + 1) * count)
  );

  const flatIndex = (ci: number, ni: number) =>
    columnNodes.slice(0, ci).reduce((s, c) => s + c.length, 0) + ni;

  return (
    <g>
      {/* links between adjacent layers */}
      {columnNodes.slice(0, -1).map((col, ci) =>
        col.map((from, ni) =>
          columnNodes[ci + 1].map((to, nj) => {
            const isAccent =
              ni === accentPath[ci] && nj === accentPath[ci + 1];
            return (
              <line
                key={`${ci}-${ni}-${nj}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="var(--accent)"
                strokeWidth="1"
                opacity={isAccent ? 0.5 : 0.12}
                className={isAccent ? "archive-signal" : undefined}
              />
            );
          })
        )
      )}

      {/* nodes */}
      {columnNodes.map((col, ci) =>
        col.map((node, ni) => {
          const isAccent = ni === accentPath[ci];
          return (
            <circle
              key={`${ci}-${ni}`}
              cx={node.x}
              cy={node.y}
              r={isAccent ? 4 : 3}
              fill={isAccent ? "var(--accent)" : "var(--card-elevated)"}
              stroke={isAccent ? "var(--accent)" : "var(--text-muted)"}
              strokeWidth="1"
              opacity={isAccent ? 1 : 0.7}
              data-flat={flatIndex(ci, ni)}
            />
          );
        })
      )}
    </g>
  );
}
