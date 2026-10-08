import { ARENAS, GITHUB_USER, type Arena, type ArtKind } from "@/lib/site";
import CoverBand from "./CoverBand";
import Section, { type Accent } from "./Section";
import Tile from "./Tile";

const ACCENTS: Accent[] = ["gold", "clay", "teal"];
const ART: ArtKind[] = ["mesh", "spect", "rank"];

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
      className="group overflow-hidden p-0"
    >
      <CoverBand
        src={arena.cover}
        alt={`${arena.event} — cover illustration`}
        art={ART[index % ART.length]}
      />
      <div className="p-6">
        <p className="mono text-[0.6rem] uppercase tracking-[0.24em] text-muted">{arena.kind}</p>
        <p className="display mt-2 text-[1.35rem] font-semibold leading-none text-[var(--accent)]">
          {arena.event}
        </p>
        <p className="mono mt-2 text-[0.66rem] uppercase tracking-[0.2em] text-fg/70">
          {arena.title} · {arena.year}
        </p>
        <p className="mt-4 text-[0.87rem] leading-relaxed text-fg/75">{arena.note}</p>
        {arena.stack.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {arena.stack.map((tech) => (
              <li key={tech} className="chip mono text-muted">
                {tech}
              </li>
            ))}
          </ul>
        )}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noreferrer noopener"
            className="chip mono mt-5 w-fit text-fg/80 hover:text-[var(--accent)]"
          >
            {arena.repo} ↗
          </a>
        )}
      </div>
    </Tile>
  );
}
