"use client";

import { useEffect, useRef } from "react";

export default function GridBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;

    const onScroll = () => {
      rafId = requestAnimationFrame(() => {
        if (ref.current) {
          // Shift the background-position instead of translateY so the element
          // always covers the full viewport — translateY on a fixed element
          // physically moves it, creating uncovered gaps as you scroll.
          ref.current.style.backgroundPosition = `0 ${window.scrollY * 0.15}px`;
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.9,
        backgroundImage:
          "radial-gradient(circle, rgba(255,255,255,0.35) 1.5px, transparent 1.5px)",
        backgroundSize: "52px 52px",
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    />
  );
}
