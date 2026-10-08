import { CO_CURRICULAR, HONORS } from "@/lib/site";
import Section, { type Accent } from "./Section";
import Tile from "./Tile";

const ACCENTS: Accent[] = ["gold", "teal", "clay", "brass"];
const SPANS = [
  "sm:col-span-2 lg:col-span-3",
  "sm:col-span-2 lg:col-span-3",
  "sm:col-span-2 lg:col-span-2",
  "lg:col-span-2",
];

const MARKERS = ["◆", "◆", "▲", "▲"];

export default function Awards() {
  return (
    <Section
      id="honors"
      index="07"
      title="honors & certs"
      accent="brass"
      kicker="what the institution noticed"
    >
      <div className="bento">
        {HONORS.map((item, i) => (
          <Tile
            key={item.title + item.issuer}
            accent={ACCENTS[i]}
            span={SPANS[i]}
            delay={i * 70}
            className="flex items-start gap-4 p-6 sm:p-7"
          >
            <span aria-hidden="true" className="mt-1 shrink-0 text-[0.8rem] text-[var(--accent)]">
              {MARKERS[i]}
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="text-[1.02rem] font-bold leading-tight text-fg sm:text-[1.16rem]">
                {item.title}
              </h3>
              <p className="mono mt-2 text-[0.72rem] leading-snug text-muted">{item.issuer}</p>
              <p className="mono mt-3 text-[0.58rem] uppercase tracking-[0.24em] text-[var(--accent)]">
                {item.kind === "certification" ? "certification" : "honor"}
              </p>
            </div>
            <p className="mono shrink-0 text-right text-[1rem] font-bold tabular-nums text-[var(--accent)]">
              {item.year}
            </p>
          </Tile>
        ))}

        <Tile
          accent="gold"
          lead
          span="sm:col-span-2 lg:col-span-6"
          delay={360}
          className="p-6 sm:p-7"
        >
          <h3 className="mono mb-5 flex items-center gap-2.5 text-[0.62rem] uppercase tracking-[0.26em] text-[var(--accent)]">
            <span className="pulse-dot h-2 w-2 rounded-full bg-[var(--accent)]" />
            beyond the syllabus
            <span aria-hidden="true" className="rule ml-3 hidden flex-1 sm:block" />
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CO_CURRICULAR.map((row) => (
              <div
                key={row.title}
                className="rounded-[3px] border border-line bg-[rgba(3,11,20,0.6)] p-4 transition-colors hover:border-brass/50"
              >
                <p className="text-[0.9rem] font-semibold leading-snug text-fg/90">{row.title}</p>
                <p className="mt-1.5 text-[0.8rem] leading-relaxed text-muted">{row.note}</p>
              </div>
            ))}
          </div>
        </Tile>
      </div>
    </Section>
  );
}
