import type { ArtKind } from "@/lib/site";

/** Deterministic bar heights so the cover does not reshuffle on every render. */
const WAVE = Array.from({ length: 22 }, (_, i) => {
  const h = 24 + Math.abs(Math.sin(i * 0.85)) * 74 + (i % 4) * 7;
  return Math.min(h, 128);
});

const SPECT = Array.from({ length: 13 * 6 }, (_, i) => {
  const col = i % 13;
  const row = Math.floor(i / 13);
  // rounded so the server and client compute byte-identical opacity
  return Number((0.12 + ((Math.sin(col * 0.9 + row * 1.3) + 1) / 2) * 0.72).toFixed(3));
});

const RANK = [1.0, 0.78, 0.61, 0.44, 0.3];

const NODES = [
  { x: 46, y: 44 },
  { x: 132, y: 96 },
  { x: 214, y: 40 },
  { x: 286, y: 108 },
  { x: 96, y: 138 },
  { x: 250, y: 148 },
];

const EDGES = [
  [0, 1],
  [1, 2],
  [2, 3],
  [1, 4],
  [4, 5],
  [3, 5],
  [0, 4],
];

/** Generated cover art for a project tile — no image files, only SVG on the palette. */
export default function ProjectArt({ kind }: { kind: ArtKind }) {
  return (
    <svg
      viewBox="0 0 320 170"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
    >
      {kind === "wave" &&
        WAVE.map((h, i) => (
          <rect
            key={i}
            className="art-bar"
            style={{ animationDelay: `${(i % 7) * 160}ms` }}
            x={8 + i * 14}
            y={156 - h}
            width={6}
            height={h}
            rx={3}
            fill={i % 5 === 0 ? "var(--teal)" : "var(--gold)"}
            opacity={0.3 + (i % 3) * 0.2}
          />
        ))}

      {kind === "wave" && (
        <rect x={0} y={155} width={320} height={1} fill="var(--brass)" opacity={0.55} />
      )}

      {kind === "spect" &&
        SPECT.map((o, i) => {
          const col = i % 13;
          const row = Math.floor(i / 13);
          return (
            <rect
              key={i}
              x={10 + col * 24}
              y={14 + row * 25}
              width={16}
              height={17}
              rx={4}
              fill={row % 2 === 0 ? "var(--gold)" : "var(--clay)"}
              opacity={o * 0.5}
            />
          );
        })}

      {kind === "rank" &&
        RANK.map((w, i) => (
          <g key={i}>
            <rect
              x={22}
              y={26 + i * 26}
              width={276 * w}
              height={12}
              rx={6}
              fill={i === 0 ? "url(#rankTop)" : "var(--brass)"}
              opacity={i === 0 ? 0.95 : 0.32 - i * 0.04}
            />
            <circle cx={12} cy={32 + i * 26} r={3} fill="var(--teal)" opacity={0.85} />
          </g>
        ))}

      {kind === "rank" && (
        <defs>
          <linearGradient id="rankTop" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--gold)" />
            <stop offset="100%" stopColor="var(--teal)" />
          </linearGradient>
        </defs>
      )}

      {kind === "mesh" && (
        <g>
          {EDGES.map(([a, b]) => (
            <line
              key={`${a}-${b}`}
              x1={NODES[a].x}
              y1={NODES[a].y}
              x2={NODES[b].x}
              y2={NODES[b].y}
              stroke="var(--gold)"
              strokeWidth={1}
              opacity={0.3}
            />
          ))}
          {NODES.map((node, i) => (
            <circle
              key={i}
              className="art-node"
              style={{ animationDelay: `${i * 380}ms` }}
              cx={node.x}
              cy={node.y}
              r={i % 3 === 0 ? 9 : 5.5}
              fill={i % 2 === 0 ? "var(--gold)" : "var(--clay)"}
            />
          ))}
        </g>
      )}
    </svg>
  );
}
