"use client";

import type { ReactNode } from "react";
import type { Accent } from "./Section";
import Reveal from "./Reveal";

/**
 * One bento tile. `lead` lights the board's single lead card; every other tile
 * keeps the same obsidian panel. Variety comes from span and hierarchy, not finish.
 */
export default function Tile({
  children,
  accent,
  lead = false,
  span,
  delay = 0,
  className = "",
  as: Tag = "article",
}: {
  children: ReactNode;
  accent?: Accent;
  lead?: boolean;
  /** Grid footprint, e.g. "sm:col-span-2 lg:col-span-4". */
  span?: string;
  delay?: number;
  className?: string;
  as?: "article" | "div";
}) {
  return (
    <Reveal delay={delay} className={span}>
      <Tag
        className={`tile tile-bar sheen h-full ${lead ? "tile-lit" : ""} ${
          accent ? `accent-${accent}` : ""
        } ${className}`}
      >
        {children}
      </Tag>
    </Reveal>
  );
}
