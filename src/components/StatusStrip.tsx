import Reveal from "./Reveal";

const LINES = [
  { key: "status", value: "open to ML & backend internships", tone: "gold" },
  { key: "now", value: "final year · CGPA 4.00 / 4.00", tone: "muted" },
  { key: "strengths", value: "quick learner · multi-tasker · leadership", tone: "muted" },
  { key: "next", value: "a role where I can use my abilities and grow", tone: "clay" },
];

const valueClass: Record<string, string> = {
  gold: "text-gold",
  muted: "text-fg/85",
  clay: "text-clay",
};

const dotClass: Record<string, string> = {
  gold: "bg-gold",
  muted: "bg-teal",
  clay: "bg-clay",
};

/** The little "system panel" inside a bento tile — same joke, warmer paint. */
export default function StatusStrip({ span }: { span?: string }) {
  return (
    <Reveal delay={150} className={span}>
      <div className="tile tile-lit tile-bar sheen accent-gold flex h-full flex-col overflow-hidden">
        <div className="mono flex items-center gap-2 border-b border-line px-5 py-3 text-[0.6rem] uppercase tracking-[0.28em] text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-clay" />
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          <span className="h-1.5 w-1.5 rounded-full bg-teal" />
          <span className="ml-2">current state</span>
        </div>
        <ul className="mt-auto space-y-4 px-5 py-5 text-[0.85rem]">
          {LINES.map((line) => (
            <li key={line.key} className="flex items-start gap-2.5">
              <span
                className={`pulse-dot mt-1.5 h-2 w-2 shrink-0 rounded-full ${dotClass[line.tone]}`}
              />
              <div className="flex min-w-0 flex-1 flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <span className="mono text-[0.64rem] uppercase tracking-[0.2em] text-muted">
                  {line.key}
                </span>
                <span className={`text-right ${valueClass[line.tone]}`}>{line.value}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
