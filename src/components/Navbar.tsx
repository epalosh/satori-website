"use client";

import { useEffect, useState } from "react";

export default function Navbar({ onBookDemo }: { onBookDemo?: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 h-14"
      style={{
        backgroundColor: scrolled ? "rgba(6,6,8,0.95)" : "transparent",
        borderBottom: scrolled ? "1px solid #222222" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "background-color 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease",
      }}
    >
      <span className="text-sm font-bold text-white tracking-tight">
        Satori Inference
      </span>
      <button
        onClick={onBookDemo}
        className="h-8 px-4 bg-white text-black text-xs font-semibold rounded cursor-pointer hover:bg-gray-100 transition-colors"
      >
        Book a Demo
      </button>
    </nav>
  );
}
