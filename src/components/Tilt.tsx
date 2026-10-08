"use client";

import { useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import { usePrefersReducedMotion } from "./motion";

/** Pointer-tracked 3D tilt with a moving warm glare. */
export default function Tilt({
  children,
  strength = 7,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<CSSProperties>({});
  const reduced = usePrefersReducedMotion();

  const move = (event: PointerEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node || reduced) return;
    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    setStyle({
      transform: `perspective(900px) rotateX(${(-py * strength).toFixed(2)}deg) rotateY(${(
        px * strength
      ).toFixed(2)}deg) translateZ(6px)`,
      // glare follows the pointer
      ["--glare-x" as string]: `${((px + 0.5) * 100).toFixed(1)}%`,
      ["--glare-y" as string]: `${((py + 0.5) * 100).toFixed(1)}%`,
    });
  };

  const reset = () => setStyle({});

  return (
    <div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={reset}
      style={{ ...style, transition: "transform 260ms cubic-bezier(0.22, 1, 0.36, 1)" }}
      className={`tilt relative ${className}`}
    >
      {children}
      <span aria-hidden="true" className="tilt-glare" />
    </div>
  );
}
