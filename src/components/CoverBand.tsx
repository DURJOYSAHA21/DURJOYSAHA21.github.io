import Image from "next/image";
import type { ReactNode } from "react";
import { asset, type ArtKind } from "@/lib/site";
import ProjectArt from "./ProjectArt";

/**
 * The 7:3 cover band every board shares: the generated image sits on the CSS art
 * (visible while it loads) with the scan sweep and a bottom scrim over it, so a
 * photo blends into the card body instead of ending on a hard line.
 */
export default function CoverBand({
  src,
  alt,
  art,
  children,
}: {
  src: string;
  alt: string;
  art: ArtKind;
  children?: ReactNode;
}) {
  return (
    <div className={`card-art art-${art} relative aspect-[7/3] shrink-0`}>
      <ProjectArt kind={art} />
      <Image
        src={asset(src)}
        alt={alt}
        width={1280}
        height={549}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
      />
      <span aria-hidden="true" className="card-art-lines opacity-25" />
      <span aria-hidden="true" className="art-scan opacity-25" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#040e19] via-[#040e19]/25 to-transparent"
      />
      {children}
    </div>
  );
}
