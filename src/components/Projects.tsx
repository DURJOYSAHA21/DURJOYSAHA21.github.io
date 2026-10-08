"use client";

import { useEffect, useState } from "react";
import { getRepos, type Repo } from "@/lib/github";
import { ARENAS, BUILDS, GITHUB_USER, RESEARCH_BUILDS, type Build } from "@/lib/site";
import CountUp from "./CountUp";
import CoverBand from "./CoverBand";
import Reveal from "./Reveal";
import Section from "./Section";

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
                <p className="display text-[1.9rem] font-semibold leading-none text-[var(--accent)]">
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
          <BuildCard key={build.repo} build={build} live={findRepo(repos, build.repo)} delay={i * 80} />
        ))}
      </div>

      <Band title="built for myself" aside="no module attached — these started because I needed them" />
      <div className="bento">
        {personal.map((build, i) => (
          <BuildCard key={build.repo} build={build} live={findRepo(repos, build.repo)} delay={i * 80} />
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

function findRepo(repos: Repo[] | null, name: string) {
  return repos?.find((r) => r.name === name);
}

function Band({ title, aside }: { title: string; aside: string }) {
  return (
    <h3 className="display mt-14 mb-5 flex items-baseline gap-4 text-[1.15rem] font-semibold text-fg/90">
      {title}
      <span aria-hidden="true" className="rule flex-1" />
      <span className="mono text-[0.6rem] uppercase tracking-[0.24em] text-muted">{aside}</span>
    </h3>
  );
}

function BuildCard({ build, live, delay }: { build: Build; live?: Repo; delay: number }) {
  return (
    <Reveal delay={delay} className="sm:col-span-2 lg:col-span-3">
      <a
        href={live?.html_url ?? `https://github.com/${GITHUB_USER}/${build.repo}`}
        target="_blank"
        rel="noreferrer noopener"
        className="tile tile-bar sheen group flex h-full flex-col overflow-hidden accent-gold"
      >
        <CoverBand src={build.cover} alt={`${build.title} — cover illustration`} art={build.art}>
          <span className="chip mono absolute bottom-4 left-4 border-none bg-[#1c3552]/80 text-[#f8f2e7]/90 backdrop-blur-sm">
            {build.period}
          </span>
        </CoverBand>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h4 className="display text-[1.1rem] font-semibold leading-tight text-fg transition-colors group-hover:text-[var(--accent)] sm:text-[1.25rem]">
            {build.title}
          </h4>
          <p className="mt-2.5 text-[0.87rem] leading-relaxed text-fg/70">{build.blurb}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {build.stack.map((tech) => (
              <li key={tech} className="chip mono text-muted">
                {tech}
              </li>
            ))}
          </ul>
          <div className="mono mt-auto flex items-center gap-3 border-t border-line pt-4 text-[0.68rem] text-muted">
            <span className="truncate">{build.repo}</span>
            <span className="ml-auto shrink-0 tabular-nums text-[var(--accent)]">
              {live ? (
                <>
                  {live.stargazers_count > 0 ? `★ ${live.stargazers_count} · ` : ""}
                  {relTime(live.pushed_at)}
                </>
              ) : (
                "· · ·"
              )}
            </span>
          </div>
        </div>
      </a>
    </Reveal>
  );
}
