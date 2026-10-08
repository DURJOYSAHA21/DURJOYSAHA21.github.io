"use client";

import Image from "next/image";
import { CONTACT, PROFILE, asset } from "@/lib/site";
import { usePrefersReducedMotion, useScrollY } from "./motion";
import Tilt from "./Tilt";

export default function Hero() {
  const scrollY = useScrollY();
  const reduced = usePrefersReducedMotion();
  const shift = reduced ? 0 : scrollY;
  const layer = (depth: number) => ({
    transform: `translate3d(0, ${(shift * depth).toFixed(1)}px, 0)`,
  });

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-24 pt-28"
    >
      <div className="shell grid w-full items-center gap-10 lg:max-w-[1340px] lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
        {/* ------------------------------------------------------- identity */}
        <div className="relative z-10">
          <p className="enter chip mono mb-7 text-[0.62rem] uppercase tracking-[0.2em] text-gold">
            <span
              aria-hidden="true"
              className="pulse-dot h-1.5 w-1.5 rounded-full bg-gold"
            />
            {PROFILE.status}
          </p>

          <h1 className="leading-none">
            <span className="sr-only">{`${PROFILE.first} ${PROFILE.last}`}</span>
            {/* the glitch layers duplicate the text via attr(), so hide the visual copy */}
            <span aria-hidden="true" className="block">
              <span style={layer(-0.06)} className="block">
                <span
                  data-text="Durjoy"
                  style={{ animationDelay: "120ms" }}
                  className="glitch enter mono block text-[clamp(2.6rem,9vw,5.6rem)] font-extrabold leading-[1.02] tracking-[-0.03em]"
                >
                  Durjoy
                </span>
              </span>
              <span style={layer(-0.02)} className="block">
                <span
                  style={{ animationDelay: "240ms" }}
                  className="enter -mt-[0.12em] block font-sans text-[clamp(1.4rem,5vw,3rem)] font-bold uppercase tracking-[0.3em] text-fg/75"
                >
                  Saha
                </span>
              </span>
            </span>
          </h1>

          <p
            style={{ animationDelay: "360ms" }}
            className="enter mono mt-7 text-[0.68rem] uppercase tracking-[0.26em] text-muted sm:text-[0.76rem]"
          >
            {PROFILE.role}
          </p>

          <p
            style={{ animationDelay: "430ms" }}
            className="enter mt-6 max-w-xl text-[1.02rem] leading-relaxed text-fg/80"
          >
            I build machine learning that can explain itself — audio deepfake detection, applied
            NLP, and the small full-stack wrappers that make a model usable by someone who never
            opens a terminal.
          </p>

          <div
            style={{ animationDelay: "500ms" }}
            className="enter mono mt-8 max-w-xl rounded-[3px] border border-[color-mix(in_srgb,var(--gold)_28%,rgba(245,201,106,0.14))] bg-[rgba(3,11,20,0.74)] px-4 py-3 text-[0.72rem] leading-[1.7] shadow-[5px_5px_0_rgba(3,11,20,0.55)]"
          >
            <p className="text-gold">
              <span className="text-fg/70">durjoy@aiub</span>
              {":~$ "}
              <span className="text-fg">whoami</span>
            </p>
            <p className="text-muted">{PROFILE.role}</p>
            <p className="text-gold">
              <span className="text-fg/70">durjoy@aiub</span>
              {":~$ "}
              <span className="text-fg">ls ~/work</span>
            </p>
            <p className="text-muted">course-builds  personal  arenas  research-code</p>
            <p className="text-gold">
              <span className="text-fg/70">durjoy@aiub</span>
              {":~$ "}
              <span className="cursor" />
            </p>
          </div>

          <div
            style={{ animationDelay: "580ms" }}
            className="enter mt-10 flex flex-wrap items-center gap-3 text-sm"
          >
            <a
              href="#projects"
              className="sheen relative rounded-[3px] bg-gradient-to-r from-gold via-brass to-gold px-7 py-3 font-semibold text-[#17293f] shadow-[5px_5px_0_rgba(3,11,20,0.62)] transition-transform hover:-translate-x-[2px] hover:-translate-y-[3px]"
            >
              view the work
            </a>
            <a
              href={asset(PROFILE.cv)}
              download
              className="mono rounded-[3px] border border-line bg-[rgba(3,11,20,0.6)] px-6 py-3 text-[0.72rem] uppercase tracking-[0.16em] text-fg/85 transition-colors hover:border-gold/60 hover:text-gold"
            >
              cv ↓
            </a>
            <a
              href={CONTACT.github}
              target="_blank"
              rel="noreferrer noopener"
              className="mono rounded-[3px] px-4 py-3 text-[0.72rem] uppercase tracking-[0.16em] text-muted transition-colors hover:text-gold"
            >
              github ↗
            </a>
          </div>
        </div>

        {/* -------------------------------------------------------- portrait */}
        <div style={layer(-0.08)} className="relative z-10 mx-auto w-full max-w-sm lg:max-w-[30rem]">
          <span
            aria-hidden="true"
            className="absolute -inset-6 rounded-[6px] bg-[radial-gradient(circle_at_50%_20%,color-mix(in_srgb,var(--gold)_20%,transparent),transparent_68%)] blur-2xl"
          />
          <Tilt strength={5} className="enter">
            <div className="relative overflow-hidden rounded-[3px] border border-[color-mix(in_srgb,var(--gold)_46%,transparent)] shadow-[12px_12px_0_rgba(3,11,20,0.6),0_40px_70px_-40px_rgba(2,9,17,0.95)]">
              <Image
                src={PROFILE.photo}
                alt="Durjoy Saha in a navy blazer"
                width={1151}
                height={1367}
                priority
                className="h-[clamp(22rem,46vh,31rem)] w-full object-cover"
                style={{ objectPosition: "58% 26%" }}
              />
              <span
                aria-hidden="true"
                className="sweep pointer-events-none absolute inset-x-0 top-0 h-24 opacity-35 mix-blend-screen"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[rgba(5,14,25,0.82)] to-transparent"
              />
              <span className="mono absolute bottom-5 left-6 text-[0.66rem] uppercase tracking-[0.28em] text-fg/90">
                durjoy saha
              </span>
            </div>
          </Tilt>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div
          style={{ animationDelay: "900ms" }}
          className="enter mono text-[0.62rem] tracking-[0.35em] text-muted"
        >
          scroll
        </div>
      </div>
    </section>
  );
}
