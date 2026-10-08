"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { id: "about", label: "about" },
  { id: "education", label: "education" },
  { id: "skills", label: "skills" },
  { id: "projects", label: "projects" },
  { id: "competitions", label: "arenas" },
  { id: "research", label: "research" },
  { id: "honors", label: "honors" },
  { id: "contact", label: "contact" },
];

export default function Nav() {
  const [active, setActive] = useState("about");
  const [lifted, setLifted] = useState(false);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 40);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.2, 0.5, 1] }
    );

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    LINKS.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-30 pt-3 sm:pt-4">
      <div className="shell">
      <nav
        className={`flex w-full items-center gap-3 rounded-[3px] border border-[color-mix(in_srgb,var(--gold)_26%,rgba(245,201,106,0.16))] bg-[rgba(4,14,25,0.86)] px-4 py-2.5 text-xs backdrop-blur-md transition-shadow duration-300 ${
          lifted ? "shadow-[6px_6px_0_rgba(3,11,20,0.6)]" : ""
        }`}
      >
        <a href="#top" className="mono shrink-0 text-[0.78rem] font-bold tracking-[0.06em] text-gold">
          durjoy:~$
        </a>
        <ul className="scrollbar-none -mx-1 flex flex-1 items-center gap-1 overflow-x-auto px-1 sm:justify-end sm:gap-1.5">
          {LINKS.map(({ id, label }) => (
            <li key={id} className="shrink-0">
              <a
                href={`#${id}`}
                className={`mono block whitespace-nowrap rounded-[2px] px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.14em] transition-colors ${
                  active === id
                    ? "bg-[color-mix(in_srgb,var(--gold)_18%,transparent)] text-gold shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--gold)_68%,transparent)]"
                    : "text-muted hover:bg-white/5 hover:text-fg"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      </div>
    </header>
  );
}
