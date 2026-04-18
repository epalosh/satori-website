"use client";

import { useEffect, useState } from "react";
import SatoriMark from "./SatoriMark";

type NavProps = { loginUrl: string; demoUrl: string };

export default function Nav({ loginUrl, demoUrl }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = [
    { id: "home", label: "Home", href: "#top" },
    { id: "how", label: "How it works", href: "#how" },
    { id: "about", label: "About", href: "#about" },
    { id: "inv", label: "Investors", href: "#investors" },
  ];

  return (
    <>
      <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
        <defs>
          <filter id="lg-refract" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.018" numOctaves={2} seed={7} result="noise" />
            <feGaussianBlur in="noise" stdDeviation="1.5" result="softNoise" />
            <feDisplacementMap in="SourceGraphic" in2="softNoise" scale={22} xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <radialGradient id="edge-mask" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="white" stopOpacity="0" />
            <stop offset="0.65" stopColor="white" stopOpacity="0" />
            <stop offset="0.92" stopColor="white" stopOpacity="0.7" />
            <stop offset="1" stopColor="white" stopOpacity="1" />
          </radialGradient>
        </defs>
      </svg>

      <div className={`nav-wrap ${scrolled ? "is-scrolled" : ""}`}>
        <nav className="glass-bar" aria-label="Primary">
          <span className="lg-backdrop" aria-hidden="true" />
          <span className="lg-refract" aria-hidden="true" />
          <span className="lg-tint" aria-hidden="true" />
          <span className="lg-spec" aria-hidden="true" />
          <span className="lg-rim" aria-hidden="true" />

          <a href="#top" className="nav-brand">
            <span className="nav-brand-mark"><SatoriMark size={22} /></span>
            <span className="nav-brand-name">Satori Inference</span>
          </a>

          <ul className="nav-links">
            {items.map(it => (
              <li key={it.id}>
                <a
                  href={it.href}
                  className={`nav-link ${active === it.id ? "is-active" : ""}`}
                  onClick={() => setActive(it.id)}
                >
                  {it.label}
                </a>
              </li>
            ))}
          </ul>

          <span className="nav-sep" aria-hidden="true" />

          <div className="nav-actions">
            <a href={loginUrl} target="_blank" rel="noopener" className="nav-link nav-login">
              Log in
            </a>
            <a href={demoUrl} className="nav-cta">
              Book a demo
              <svg className="nav-cta-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
