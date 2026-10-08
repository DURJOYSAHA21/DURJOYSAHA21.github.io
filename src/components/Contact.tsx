"use client";

import { useState } from "react";
import { CONTACT, GITHUB_USER, PROFILE, asset } from "@/lib/site";
import Section from "./Section";
import Tile from "./Tile";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: the mailto link still works */
    }
  };

  return (
    <Section
      id="contact"
      index="08"
      title="contact"
      accent="gold"
      kicker="open to ml & backend internships"
    >
      <div className="bento">
        <Tile accent="gold" lead span="sm:col-span-2 lg:col-span-4" className="p-6 sm:p-8">
          <p className="display text-[1.45rem] font-semibold leading-snug text-fg sm:text-[1.9rem]">
            Tell me what you actually need — <span className="gold-text">the reply is fast</span>.
          </p>
          <p className="mt-4 max-w-xl text-[0.92rem] leading-relaxed text-fg/70">
            I am looking for ML and backend internships, and I happily take a second pass on an
            audio or language problem. Research questions, half-built ideas and job posts all count.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${CONTACT.email}`}
              className="sheen relative rounded-[3px] bg-gradient-to-r from-gold via-brass to-gold px-6 py-3 text-sm font-semibold text-[#17293f] shadow-[5px_5px_0_rgba(3,11,20,0.62)] transition-transform hover:-translate-x-[2px] hover:-translate-y-[3px]"
            >
              {CONTACT.email}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="mono rounded-[3px] border border-line bg-[rgba(3,11,20,0.6)] px-4 py-3 text-[0.68rem] uppercase tracking-[0.16em] text-muted transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {copied ? "copied" : "copy"}
            </button>
          </div>
        </Tile>

        <Tile
          accent="brass"
          span="lg:col-span-2"
          delay={90}
          className="relative flex flex-col justify-between overflow-hidden p-6 pr-24"
        >
          <span
            aria-hidden="true"
            className="seal mono text-[0.55rem] uppercase tracking-[0.2em] text-[var(--accent)]"
          >
            pdf
          </span>
          <div>
            <p className="mono text-[0.6rem] uppercase tracking-[0.24em] text-muted">cv</p>
            <p className="display mt-3 text-[1.25rem] font-semibold leading-tight text-[var(--accent)]">
              one page, no fluff
            </p>
          </div>
          <a
            href={asset(PROFILE.cv)}
            download
            className="mono mt-6 inline-flex w-fit items-center gap-2 rounded-[3px] border border-[color-mix(in_srgb,var(--accent)_55%,transparent)] bg-[rgba(3,11,20,0.6)] px-4 py-2.5 text-[0.68rem] uppercase tracking-[0.16em] text-fg/85 transition-colors hover:text-[var(--accent)]"
          >
            download ↓
          </a>
        </Tile>

        <Tile accent="teal" span="lg:col-span-2" delay={150} className="p-6">
          <p className="mono text-[0.6rem] uppercase tracking-[0.24em] text-muted">github</p>
          <a
            href={CONTACT.github}
            target="_blank"
            rel="noreferrer noopener"
            className="mono mt-3 block text-[0.98rem] font-bold leading-snug text-fg transition-colors hover:text-[var(--accent)]"
          >
            {GITHUB_USER} ↗
          </a>
        </Tile>

        <Tile accent="clay" span="lg:col-span-2" delay={210} className="p-6">
          <p className="mono text-[0.6rem] uppercase tracking-[0.24em] text-muted">phone</p>
          <a
            href={CONTACT.phoneHref}
            className="mono mt-3 block text-[0.98rem] font-bold tabular-nums text-fg transition-colors hover:text-[var(--accent)]"
          >
            {CONTACT.phone}
          </a>
        </Tile>

        <Tile accent="gold" span="lg:col-span-2" delay={270} className="p-6">
          <p className="mono text-[0.6rem] uppercase tracking-[0.24em] text-muted">where</p>
          <p className="mt-3 text-[1.02rem] font-bold leading-snug text-fg">
            {CONTACT.location}
          </p>
          <p className="mono mt-2 text-[0.66rem] uppercase tracking-[0.18em] text-gold">
            gmt+6 · dhaka, bangladesh
          </p>
        </Tile>
      </div>
    </Section>
  );
}
