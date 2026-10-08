"use client";

import { SKILLS, type SkillAccent } from "@/lib/site";
import Reveal from "./Reveal";
import Section from "./Section";
import { useInView } from "./motion";

/** The wide tiles are the ones with the most ground covered. */
const SPANS = [
  "lg:col-span-2",
  "lg:col-span-1",
  "lg:col-span-2",
  "lg:col-span-1",
  "lg:col-span-1",
  "lg:col-span-2",
];

/** Six groups, one material. The board's lead card is the language stack. */
const LEAD = 0;

function SkillGroup({
  label,
  accent,
  items,
  lead,
}: {
  label: string;
  accent: SkillAccent;
  items: string[];
  lead: boolean;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`tile tile-bar sheen accent-${accent} h-full p-5 sm:p-6 ${lead ? "tile-lit" : ""}`}
    >
      <div className="mb-4 flex items-center gap-2.5">
        <span className="pulse-dot h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
        <h3 className={`mono uppercase tracking-[0.26em] text-[var(--accent)] ${lead ? "text-[0.7rem]" : "text-[0.64rem]"}`}>
          {label}
        </h3>
        <span className="mono ml-auto text-[0.66rem] tabular-nums text-muted">
          {String(items.length).padStart(2, "0")}
        </span>
      </div>
      <ul className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <li
            key={item}
            style={{ transitionDelay: `${i * 45}ms` }}
            className={`chip cursor-default text-fg/85 transition-all duration-500 hover:text-[var(--accent)] ${
              inView ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Skills() {
  return (
    <Section id="skills" index="03" title="skills" accent="brass" kicker="tools, not a logo wall">
      <Reveal>
        <p className="mb-9 max-w-2xl text-[0.95rem] leading-relaxed text-muted">
          Straight off the CV: the languages I write, the front and back end I build with, the
          databases behind them, the AI/ML side, and the tools plus working habits that actually get
          a build out the door.
        </p>
      </Reveal>
      <div className="bento lg:grid-cols-3">
        {SKILLS.map((group, i) => (
          <Reveal key={group.label} delay={i * 70} className={SPANS[i]}>
            <SkillGroup {...group} lead={i === LEAD} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
