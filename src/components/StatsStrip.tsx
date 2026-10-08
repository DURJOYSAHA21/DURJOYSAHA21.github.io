"use client";

import { PAPER_TOTALS } from "@/lib/site";
import CountUp from "./CountUp";
import type { Accent } from "./Section";

type Stat = {
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
  note: string;
  accent: Accent;
};

const STATS: Stat[] = [
  {
    value: 4,
    decimals: 2,
    label: "cgpa",
    note: "BSc in CSE, AIUB",
    accent: "gold",
  },
  {
    value: PAPER_TOTALS.submitted,
    label: "papers",
    note: `${PAPER_TOTALS.accepted} accepted · ${PAPER_TOTALS.underReview} under review`,
    accent: "teal",
  },
  {
    value: 300,
    suffix: "+",
    label: "problems solved",
    note: "Codeforces & LeetCode",
    accent: "brass",
  },
  {
    value: 7,
    label: "languages",
    note: "C, C++, Java, Python, SQL, JS, TS",
    accent: "clay",
  },
];

export default function StatsStrip() {
  return (
    <section className="shell grid grid-cols-2 gap-3 pb-4 pt-10 sm:gap-4 lg:grid-cols-4">
      {STATS.map((stat, i) => (
        <div
          key={stat.label}
          style={{ animationDelay: `${i * 90}ms` }}
          className={`enter tile tile-bar sheen accent-${stat.accent} group flex items-center gap-4 overflow-hidden p-4 sm:p-5`}
        >
          <span className="relative grid h-14 w-14 shrink-0 place-items-center">
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--accent)_22%,transparent),transparent_70%)]"
            />
            <span
              aria-hidden="true"
              className="spin-slow absolute inset-0 rounded-full border border-dashed border-[color-mix(in_srgb,var(--accent)_45%,transparent)]"
            />
            <span className="mono text-lg font-bold leading-none tabular-nums text-[var(--accent)]">
              <CountUp
                value={stat.value}
                format={(n) =>
                  stat.decimals
                    ? n.toFixed(stat.decimals)
                    : `${Math.round(n)}${stat.suffix ?? ""}`
                }
              />
            </span>
          </span>
          <div className="min-w-0">
            <p className="mono text-[0.62rem] uppercase tracking-[0.2em] text-[var(--accent)]">
              {stat.label}
            </p>
            <p className="mt-1 text-[0.76rem] leading-snug text-muted">{stat.note}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
