"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useInView, usePrefersReducedMotion } from "./motion";

function TypedTitle({ text }: { text: string }) {
  const { ref, inView } = useInView<HTMLHeadingElement>("0px 0px -20% 0px");
  const reduced = usePrefersReducedMotion();
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (!inView || reduced) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 55);
    return () => clearInterval(id);
  }, [inView, reduced, text]);

  const shown = reduced ? text : typed;

  return (
    <h2
      ref={ref}
      className="display shrink-0 text-[1.9rem] font-semibold leading-none sm:text-[2.35rem]"
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className={inView ? "shimmer" : "text-fg"}>
        {shown}
        {inView && !reduced && shown.length < text.length && (
          <span className="ml-1 inline-block h-[0.8em] w-[0.35em] translate-y-[0.06em] bg-[var(--accent)]" />
        )}
      </span>
    </h2>
  );
}

export type Accent = "gold" | "brass" | "teal" | "clay";

export default function Section({
  id,
  index,
  title,
  kicker,
  accent = "gold",
  children,
}: {
  id: string;
  index: string;
  title: string;
  kicker?: string;
  accent?: Accent;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`accent-${accent} shell relative scroll-mt-28 overflow-x-clip py-24`}
    >
      <span aria-hidden="true" className="ghost-num">
        {index}
      </span>

      <div className="relative z-10">
        <header className="mb-10">
          <div className="flex items-center gap-3">
            <span className="mono rounded-md border border-[var(--line)] bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] px-2 py-1 text-[0.62rem] text-[var(--accent)]">
              {index}
            </span>
            <TypedTitle text={title} />
            <span aria-hidden="true" className="rule ml-2 flex-1" />
          </div>
          {kicker && (
            <p className="mono mt-3 max-w-2xl text-[0.7rem] uppercase tracking-[0.22em] text-muted">
              {kicker}
            </p>
          )}
        </header>
        {children}
      </div>
    </section>
  );
}
