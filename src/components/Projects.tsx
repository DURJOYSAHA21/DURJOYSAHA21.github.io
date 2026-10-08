"use client";

import { useEffect, useState } from "react";
import { getRepos, type Repo } from "@/lib/github";
import { ARENAS, BUILDS, GITHUB_USER, RESEARCH_BUILDS, type Build } from "@/lib/site";
import CountUp from "./CountUp";
import Reveal from "./Reveal";
import Section from "./Section";
import Tile from "./Tile";

function relTime(iso: string) {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return null;
  const days = Math.round((Date.now() - then) / 86_400_000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.round(days / 30)}mo ago`;
  return `${(days / 365).toFixed(1)}y ago`;
}

/** Counts for the opener card, read off the same lists the boards render. */
const TALLY = [
  { value: BUILDS.length, label: "builds listed", note: "course work + personal tools" },
  { value: BUILDS.filter((b) => b.track === "course").length, label: "course projects", note: "defended for the degree" },
  { value: BUILDS.filter((b) => b.track === "personal").length, label: "built for myself", note: "no module attached" },
  {
    value: ARENAS.filter((a) => a.kind === "hackathon").length,
    label: "hackathons",
    note: "BUP CSE Fest 2026",
  },
  { value: ARENAS.filter((a) => a.kind === "datathon").length, label: "datathons", note: "model under time rules" },
  { value: RESEARCH_BUILDS.length, label: "research code", note: "kept with the papers" },
];

export default function Projects() {
  const [repos, setRepos] = useState<Repo[] | null>(null);

  useEffect(() => {
    let alive = true;
    getRepos().then((data) => {
      if (alive) setRepos(data);
    });
    return () => {
      alive = false;
    };
  }, []);

  const course = BUILDS.filter((b) => b.track === "course");
  const personal = BUILDS.filter((b) => b.track === "personal");

  return (
    <Section
      id="projects"
      index="04"
      title="projects"
      accent="gold"
      kicker="only the things I wrote — the rest of the count is below"
    >
      <div className="bento">
        <Reveal className="sm:col-span-2 lg:col-span-6">
          <div className="tile tile-lit tile-bar sheen accent-gold grid grid-cols-2 gap-y-6 p-6 sm:grid-cols-3 sm:p-7 lg:grid-cols-6">
            {TALLY.map((item) => (
              <div key={item.label}>
                <p className="mono text-[1.7rem] font-bold leading-none tabular-nums text-[var(--accent)]">
                  <CountUp value={item.value} format={(n) => String(Math.round(n))} />
                </p>
                <p className="mono mt-2 text-[0.62rem] uppercase tracking-[0.2em] text-fg/85">
                  {item.label}
                </p>
                <p className="mt-1 text-[0.74rem] leading-snug text-muted">{item.note}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <Band title="course projects" aside="built for the degree, then defended" />
      <div className="bento">
        {course.map((build, i) => (
          <BuildCard
            key={build.title}
            build={build}
            index={i + 1}
            live={findRepo(repos, build.repo)}
            delay={i * 80}
          />
        ))}
      </div>

      <Band title="built for myself" aside="no module attached — these started because I needed them" />
      <div className="bento">
        {personal.map((build, i) => (
          <BuildCard
            key={build.title}
            build={build}
            index={i + 1}
            live={findRepo(repos, build.repo)}
            delay={i * 80}
          />
        ))}
      </div>

      <Reveal delay={60}>
        <p className="mt-10 text-[0.85rem] text-muted">
          Hackathon and datathon builds are in{" "}
          <a href="#competitions" className="text-gold underline decoration-[rgba(196,164,108,0.4)] underline-offset-4 hover:decoration-gold">
            competitions
          </a>
          , and the code written for a paper sits with its{" "}
          <a href="#research" className="text-gold underline decoration-[rgba(196,164,108,0.4)] underline-offset-4 hover:decoration-gold">
            research
          </a>
          . Experiments and classwork live at{" "}
          <a
            href={`https://github.com/${GITHUB_USER}?tab=repositories`}
            target="_blank"
            rel="noreferrer noopener"
            className="text-gold underline decoration-[rgba(196,164,108,0.4)] underline-offset-4 hover:decoration-gold"
          >
            github.com/{GITHUB_USER}
          </a>
          .
        </p>
      </Reveal>
    </Section>
  );
}

function findRepo(repos: Repo[] | null, name?: string) {
  return name ? repos?.find((r) => r.name === name) : undefined;
}

function Band({ title, aside }: { title: string; aside: string }) {
  return (
    <h3 className="mono mt-14 mb-5 flex items-baseline gap-4 text-[0.92rem] font-bold uppercase tracking-[0.18em] text-fg/90">
      {title}
      <span aria-hidden="true" className="rule flex-1" />
      <span className="mono text-[0.6rem] uppercase tracking-[0.24em] text-muted">{aside}</span>
    </h3>
  );
}

function BuildCard({
  build,
  index,
  live,
  delay,
}: {
  build: Build;
  index: number;
  live?: Repo;
  delay: number;
}) {
  const href =
    live?.html_url ?? (build.repo ? `https://github.com/${GITHUB_USER}/${build.repo}` : null);
  const when = live ? relTime(live.pushed_at) : null;

  return (
    <Tile
      accent={build.track === "course" ? "gold" : "teal"}
      span="sm:col-span-2 lg:col-span-3"
      delay={delay}
      className="p-6 sm:p-7"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="mono text-[0.6rem] uppercase tracking-[0.24em] text-muted">
            {build.track === "course" ? "course project" : "personal build"}{" "}
            {String(index).padStart(2, "0")}
          </p>
          {build.period && (
            <p className="mono mt-1.5 text-[0.95rem] font-bold leading-snug text-[var(--accent)]">
              {build.period}
            </p>
          )}
        </div>
        {when && (
          <p className="mono shrink-0 text-right text-[0.66rem] uppercase tracking-[0.2em] tabular-nums text-fg/70">
            {live && live.stargazers_count > 0 && <>★ {live.stargazers_count}</>}
            <br />
            {when}
          </p>
        )}
      </div>

      <h4 className="mt-4 text-[1rem] font-bold leading-snug text-fg">{build.title}</h4>
      <p className="mt-3 text-[0.86rem] leading-relaxed text-fg/70">{build.blurb}</p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {build.stack.map((tech) => (
          <span key={tech} className="chip mono text-muted">
            {tech}
          </span>
        ))}
        {href && (
          <a
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            className="chip mono text-fg/80 hover:text-[var(--accent)]"
          >
            {build.repo ?? "repository"} ↗
          </a>
        )}
      </div>
    </Tile>
  );
}
