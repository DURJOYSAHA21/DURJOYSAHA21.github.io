import { ARENAS, GITHUB_USER, type Arena } from "@/lib/site";
import Section, { type Accent } from "./Section";
import Tile from "./Tile";

const ACCENTS: Accent[] = ["gold", "clay", "teal"];

/** Arenas are competitions entered, so they get their own board — not the projects one. */
export default function Competitions() {
  return (
    <Section
      id="competitions"
      index="05"
      title="competitions"
      accent="clay"
      kicker="hackathons, datathons and contest rounds"
    >
      <div className="bento">
        {ARENAS.map((arena, i) => (
          <ArenaCard
            key={arena.title}
            arena={arena}
            index={i}
            accent={ACCENTS[i % ACCENTS.length]}
            lead={i === 0}
            delay={i * 90}
          />
        ))}
      </div>
    </Section>
  );
}

function ArenaCard({
  arena,
  index,
  accent,
  lead,
  delay,
}: {
  arena: Arena;
  index: number;
  accent: Accent;
  lead: boolean;
  delay: number;
}) {
  const link = arena.repo ? `https://github.com/${GITHUB_USER}/${arena.repo}` : null;

  return (
    <Tile
      accent={accent}
      lead={lead}
      span="sm:col-span-2 lg:col-span-2"
      delay={delay}
      className="p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="mono text-[0.6rem] uppercase tracking-[0.24em] text-muted">
            {arena.kind} {String(index + 1).padStart(2, "0")}
          </p>
          <p className="mono mt-1.5 text-[0.95rem] font-bold leading-snug text-[var(--accent)]">
            {arena.event}
          </p>
        </div>
        <p className="mono shrink-0 text-[0.66rem] uppercase tracking-[0.2em] text-fg/70">
          {arena.year}
        </p>
      </div>

      <h3 className="mt-4 text-[1rem] font-bold leading-snug text-fg">{arena.title}</h3>
      <p className="mt-3 text-[0.86rem] leading-relaxed text-fg/70">{arena.note}</p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {arena.stack.map((tech) => (
          <span key={tech} className="chip mono text-muted">
            {tech}
          </span>
        ))}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noreferrer noopener"
            className="chip mono text-fg/80 hover:text-[var(--accent)]"
          >
            {arena.repo} ↗
          </a>
        )}
      </div>
    </Tile>
  );
}
