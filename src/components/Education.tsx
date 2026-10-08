import { EDUCATION, type Edu } from "@/lib/site";
import Section, { type Accent } from "./Section";
import Tile from "./Tile";

const ACCENTS: Record<string, Accent> = { BSc: "gold", HSC: "teal", SSC: "clay" };

/** BSc gets the tall feature slot; HSC and SSC stack beside it. */
const SPANS = ["sm:col-span-2 lg:col-span-4 lg:row-span-2", "lg:col-span-2", "lg:col-span-2"];

export default function Education() {
  return (
    <Section
      id="education"
      index="02"
      title="education"
      accent="gold"
      kicker="ssc · hsc · bsc, all on record"
    >
      <div className="bento">
        {EDUCATION.map((edu, i) => (
          <EduTile
            key={edu.level}
            edu={edu}
            accent={ACCENTS[edu.level]}
            lead={edu.level === "BSc"}
            span={SPANS[i]}
            delay={i * 90}
          />
        ))}
      </div>
    </Section>
  );
}

function EduTile({
  edu,
  accent,
  lead,
  span,
  delay,
}: {
  edu: Edu;
  accent: Accent;
  lead: boolean;
  span: string;
  delay: number;
}) {
  return (
    <Tile
      accent={accent}
      lead={lead}
      span={span}
      delay={delay}
      className="flex flex-col p-6 sm:p-7"
    >
      <header className="flex items-start gap-4">
        {lead && (
          <span
            aria-hidden="true"
            className="seal mono text-[0.62rem] font-semibold tracking-[0.04em] text-[var(--accent)]"
          >
            {edu.result.split(" / ")[0]}
          </span>
        )}
        <span className="badge h-11 w-14 shrink-0 border border-[color-mix(in_srgb,var(--accent)_45%,transparent)] bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] text-[0.72rem] text-[var(--accent)]">
          {edu.level}
        </span>
        <div className="min-w-0">
          <h3 className="text-[1.02rem] font-bold leading-tight text-fg sm:text-[1.16rem]">
            {edu.degree}
          </h3>
          <p className="mt-1 text-[0.84rem] leading-snug text-muted">{edu.school}</p>
        </div>
      </header>

      <div className="mt-5 flex items-end justify-between gap-4 border-b border-line pb-5">
        <div>
          <p className="mono text-[0.6rem] uppercase tracking-[0.24em] text-muted">
            {edu.resultLabel}
          </p>
          <p className="mono mt-1 text-[1.5rem] font-bold leading-none tabular-nums text-[var(--accent)] sm:text-[1.85rem]">
            {edu.result}
          </p>
        </div>
        <p className="mono shrink-0 text-right text-[0.66rem] uppercase tracking-[0.16em] text-fg/70">
          {edu.period}
          <span className="mt-1 block text-[0.6rem] tracking-[0.2em] text-muted">{edu.board}</span>
        </p>
      </div>

      <ul className={`space-y-2.5 text-[0.86rem] leading-relaxed text-fg/75 ${lead ? "mt-5" : "mt-4"}`}>
        {edu.points.map((point) => (
          <li key={point} className="flex gap-2.5">
            <span aria-hidden="true" className="mt-1 text-[0.6rem] text-[var(--accent)]">
              ◆
            </span>
            <span className={lead ? "" : "text-[0.82rem] text-muted"}>{point}</span>
          </li>
        ))}
      </ul>

      <span
        aria-hidden="true"
        className="mt-auto block h-px bg-gradient-to-r from-[color-mix(in_srgb,var(--accent)_65%,transparent)] to-transparent"
      />
    </Tile>
  );
}
