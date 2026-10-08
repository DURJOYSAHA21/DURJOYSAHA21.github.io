"use client";

import { useEffect, useRef } from "react";

type Mote = { x: number; y: number; r: number; vx: number; vy: number; hue: number };

const TINTS = [
  "232, 183, 87", // gold
  "201, 144, 47", // brass
  "111, 211, 192", // teal
];

/** Fixed canvas of slow warm motes drifting through the navy. Purely decorative. */
export default function EmberField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let motes: Mote[] = [];
    let raf = 0;

    const seed = () => {
      const count = Math.min(90, Math.max(36, Math.floor(width / 16)));
      motes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.5 + Math.random() * 1.7,
        vx: (Math.random() - 0.5) * 0.16,
        vy: -0.05 - Math.random() * 0.16,
        hue: Math.floor(Math.random() * TINTS.length),
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const step = () => {
      ctx.clearRect(0, 0, width, height);
      for (const mote of motes) {
        mote.x += mote.vx;
        mote.y += mote.vy;
        // wrap instead of respawning, so the field never pops
        if (mote.y < -8) {
          mote.y = height + 8;
          mote.x = Math.random() * width;
        }
        if (mote.x < -8) mote.x = width + 8;
        if (mote.x > width + 8) mote.x = -8;

        const tint = TINTS[mote.hue];
        const glow = ctx.createRadialGradient(mote.x, mote.y, 0, mote.x, mote.y, mote.r * 7);
        glow.addColorStop(0, `rgba(${tint}, 0.5)`);
        glow.addColorStop(1, `rgba(${tint}, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(mote.x, mote.y, mote.r * 7, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      step();
      raf = requestAnimationFrame(loop);
    };

    resize();
    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    if (reduce) {
      step();
      return () => window.removeEventListener("resize", onResize);
    }

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) loop();
    };
    document.addEventListener("visibilitychange", onVisibility);
    loop();

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      document.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-50"
    />
  );
}
