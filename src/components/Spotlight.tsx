"use client";

import { useEffect } from "react";

/** Soft light that trails the cursor. Writes CSS vars, never React state. */
export default function Spotlight() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    let raf = 0;
    let x = 50;
    let y = 28;

    const onMove = (event: PointerEvent) => {
      x = (event.clientX / window.innerWidth) * 100;
      y = (event.clientY / window.innerHeight) * 100;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0;
          root.style.setProperty("--px", `${x}%`);
          root.style.setProperty("--py", `${y}%`);
        });
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div aria-hidden="true" className="spotlight" />;
}
