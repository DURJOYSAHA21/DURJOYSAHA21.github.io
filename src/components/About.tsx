import { PROFILE } from "@/lib/site";
import Reveal from "./Reveal";
import Section from "./Section";
import StatusStrip from "./StatusStrip";
import Tile from "./Tile";

const FACTS = [
  { label: "studying", value: "BSc in CSE, final year · AIUB, Dhaka" },
  { label: "focus", value: "deepfake detection research, applied NLP" },
  { label: "stack", value: "Python, C++, Java · React, Node.js, Express" },
  { label: "looking for", value: "a role to use my abilities and grow professionally" },
];

const TAGS = ["dhaka · gmt+6", "final year cse", "open to internships"];

export default function About() {
  return (
    <Section
      id="about"
      index="01"
      title="about"
      accent="gold"
      kicker="who is writing this"
    >
      <div className="bento">
        <Tile
          accent="gold"
          span="sm:col-span-2 lg:col-span-4"
          className="p-6 sm:p-8"
        >
          <p className="display text-[1.35rem] font-semibold leading-snug text-fg sm:text-[1.6rem]">
            Final-year CSE student in Dhaka, building the kind of machine learning that can{" "}
            <span className="gold-text">explain itself</span>.
          </p>
          <div className="mt-5 space-y-4 text-[0.95rem] leading-relaxed text-fg/75">
            <p>
              The way I work is unglamorous. A question becomes a notebook, the notebook becomes a
              repo, and the repo becomes something a person can actually click. I would rather ship a
              rough version that works this week than a perfect plan that never leaves the doc.
            </p>
            <p>
              It started as web development — complex designs, critical situations, things that had
              to work in front of users. It ended up in research papers on deepfake detection and
              chatbots for mental health. Same job either way: build something that holds up when a
              person depends on it.
            </p>
          </div>
          <ul className="mt-6 flex flex-wrap gap-2">
            {TAGS.map((tag) => (
              <li key={tag} className="chip mono text-muted">
                {tag}
              </li>
            ))}
          </ul>
        </Tile>

        <Reveal delay={90} className="sm:col-span-2 lg:col-span-2">
          <dl className="tile tile-bar sheen accent-teal divide-y divide-line overflow-hidden px-6">
            {FACTS.map((fact) => (
              <div key={fact.label} className="py-4">
                <dt className="mono text-[0.6rem] uppercase tracking-[0.24em] text-[var(--accent)]">
                  {fact.label}
                </dt>
                <dd className="mt-1.5 text-[0.88rem] leading-snug text-fg/90">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Tile accent="clay" span="lg:col-span-2" className="p-6" delay={120}>
          <h3 className="mono mb-3 text-[0.62rem] uppercase tracking-[0.26em] text-[var(--accent)]">
            in the cv&apos;s own words
          </h3>
          <ul className="flex flex-wrap gap-2">
            {PROFILE.self.map((word) => (
              <li key={word} className="chip display text-[0.95rem] text-fg/90">
                {word}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[0.88rem] leading-relaxed text-muted">
            Skilled in leadership, able to implement complex designs and handle critical situations —
            and still written as someone willing to learn new skills.
          </p>
        </Tile>

        <StatusStrip span="lg:col-span-4" />
      </div>
    </Section>
  );
}
