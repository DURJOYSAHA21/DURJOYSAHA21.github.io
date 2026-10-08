import {
  GITHUB_USER,
  PAPER_TOTALS,
  RESEARCH,
  RESEARCH_BUILDS,
  type Paper,
} from "@/lib/site";
import Section, { type Accent } from "./Section";
import Tile from "./Tile";

const ACCENTS: Accent[] = ["gold", "teal", "clay"];

export default function Research() {
  return (
    <Section
      id="research"
      index="06"
      title="research"
      accent="teal"
      kicker="papers on record, and the code written for them"
    >
      <div className="bento">
        <Tile accent="teal" lead span="sm:col-span-2 lg:col-span-3" className="p-6 sm:p-7">
          <p className="mono text-[0.6rem] uppercase tracking-[0.24em] text-muted">on the record</p>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {(
              [
                { label: "submitted", value: PAPER_TOTALS.submitted },
                { label: "accepted", value: PAPER_TOTALS.accepted },
                { label: "under review", value: PAPER_TOTALS.underReview },
              ] as const
            ).map((item) => (
              <div key={item.label}>
                <p className="mono text-[1.8rem] font-bold leading-none tabular-nums text-[var(--accent)]">
                  {item.value}
                </p>
                <p className="mono mt-2 text-[0.58rem] uppercase leading-snug tracking-[0.18em] text-fg/80">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-[0.84rem] leading-relaxed text-muted">
            Three carry a decision already — one accepted and waiting on publication, two already
            presented. Four more are sitting with reviewers right now. Every entry below is one I can
            hand a question about.
          </p>
        </Tile>

        {RESEARCH.map((paper, i) => (
          <PaperTile
            key={paper.venue}
            paper={paper}
            index={i}
            accent={ACCENTS[i % ACCENTS.length]}
            delay={90 + i * 90}
          />
        ))}

        {RESEARCH_BUILDS.map((build, i) => (
          <Tile
            key={build.repo}
            accent={ACCENTS[(i + 1) % ACCENTS.length]}
            span="sm:col-span-2 lg:col-span-3"
            delay={380 + i * 90}
            className="p-6 sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="mono text-[0.6rem] uppercase tracking-[0.24em] text-muted">
                  research code {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mono mt-1.5 text-[0.95rem] font-bold leading-snug text-[var(--accent)]">
                  {build.label}
                </p>
              </div>
            </div>

            <h3 className="mt-4 text-[1rem] font-bold leading-snug text-fg">{build.title}</h3>
            <p className="mt-3 text-[0.86rem] leading-relaxed text-fg/70">{build.note}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {build.stack.map((tech) => (
                <span key={tech} className="chip mono text-muted">
                  {tech}
                </span>
              ))}
              <a
                href={`https://github.com/${GITHUB_USER}/${build.repo}`}
                target="_blank"
                rel="noreferrer noopener"
                className="chip mono text-fg/80 hover:text-[var(--accent)]"
              >
                open repository ↗
              </a>
            </div>
          </Tile>
        ))}
      </div>
    </Section>
  );
}

function PaperTile({
  paper,
  index,
  accent,
  delay,
}: {
  paper: Paper;
  index: number;
  accent: Accent;
  delay: number;
}) {
  return (
    <Tile
      accent={accent}
      span="sm:col-span-2 lg:col-span-3"
      delay={delay}
      className="p-6 sm:p-7"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="mono text-[0.6rem] uppercase tracking-[0.24em] text-muted">
            paper {String(index + 1).padStart(2, "0")}
          </p>
          <p className="mono mt-1.5 text-[0.95rem] font-bold leading-snug text-[var(--accent)]">
            {paper.venue}
          </p>
        </div>
        <p className="mono shrink-0 text-[0.66rem] uppercase tracking-[0.2em] text-fg/70">
          {paper.year}
        </p>
      </div>

      <h3 className="mt-4 text-[1rem] font-bold leading-snug text-fg">
        {paper.title}
      </h3>
      <p className="mt-3 text-[0.86rem] leading-relaxed text-fg/70">{paper.note}</p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="chip mono text-[var(--accent)]">
          {paper.status || "under review"}
        </span>
        {paper.link && (
          <a
            href={paper.link}
            target="_blank"
            rel="noreferrer noopener"
            className="chip mono text-fg/80 hover:text-[var(--accent)]"
          >
            read paper ↗
          </a>
        )}
      </div>
    </Tile>
  );
}
