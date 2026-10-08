import { TECH_WORDS } from "@/lib/site";

const WORDS = TECH_WORDS;

function Track() {
  return (
    <div className="marquee-track">
      {WORDS.map((word) => (
        <span key={word} className="mono flex items-center gap-5 text-[0.7rem] tracking-[0.24em]">
          <span className="text-muted uppercase">{word}</span>
          <span className="text-brass/70">◆</span>
        </span>
      ))}
    </div>
  );
}

/** Infinite tech ticker; pauses on hover and under reduced motion. */
export default function Ticker() {
  return (
    <div
      aria-hidden="true"
      className="marquee border-y border-line bg-[rgba(3,11,20,0.55)] py-3"
    >
      <Track />
      <Track />
    </div>
  );
}
