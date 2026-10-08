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
      className="mono shrink-0 text-[1.45rem] font-bold uppercase leading-none tracking-[0.04em] sm:text-[1.8rem]"
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
            <span className="mono rounded-[3px] border border-[color-mix(in_srgb,var(--accent)_55%,transparent)] bg-[rgba(3,11,20,0.72)] px-2 py-1 text-[0.62rem] text-[var(--accent)]">
              {index}
            </span>
            <TypedTitle text={title} />
            <span aria-hidden="true" className="rule ml-2 flex-1" />
          </div>
          {kicker && (
            <p className="mono mt-3 flex max-w-2xl gap-2 text-[0.7rem] uppercase tracking-[0.22em] text-muted">
              <span aria-hidden="true" className="shrink-0 text-[var(--accent)]">
                {">"}
              </span>
              {kicker}
            </p>
          )}
        </header>
        {children}
      </div>
    </section>
  );
}
