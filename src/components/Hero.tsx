"use client";

import { CSSProperties, useEffect, useState } from "react";
import DashboardMock from "./DashboardMock";
import { useViewportWidth } from "./useViewport";

const heroStyles: Record<string, CSSProperties> = {
  section: { position: "relative", isolation: "isolate" },
  sectionBgClip: { position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 },
  gridBg: {
    position: "absolute", inset: 0,
    pointerEvents: "none",
    background: `
      linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px) 0 0 / 72px 72px,
      linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px) 0 0 / 72px 72px
    `,
    maskImage: "radial-gradient(ellipse 80% 60% at 60% 40%, black 10%, transparent 70%)",
    WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 60% 40%, black 10%, transparent 70%)",
    zIndex: 0,
  },
  halo: {
    position: "absolute",
    right: "-10%", top: "5%",
    width: 820, height: 820,
    background: "radial-gradient(circle, rgba(20,184,166,0.22) 0%, rgba(20,184,166,0.06) 35%, transparent 65%)",
    filter: "blur(60px)",
    pointerEvents: "none",
    zIndex: 0,
  },
  haloMobile: {
    position: "absolute",
    left: "50%", top: "40%",
    width: 720, height: 720,
    transform: "translateX(-50%)",
    background: "radial-gradient(circle, rgba(20,184,166,0.22) 0%, rgba(20,184,166,0.06) 35%, transparent 65%)",
    filter: "blur(50px)",
    pointerEvents: "none",
    zIndex: 0,
  },
  container: { position: "relative", zIndex: 2 },
  headline: {
    fontWeight: 700,
    color: "#EDEDED",
    letterSpacing: "-0.035em",
    lineHeight: 1.02,
    textWrap: "balance",
    margin: 0,
  } as CSSProperties,
  highlight: {
    background: "linear-gradient(90deg, #14b8a6 0%, #5eead4 50%, #14b8a6 100%)",
    WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
  },
  sub: {
    color: "#A1A1A1",
    lineHeight: 1.55,
    textWrap: "pretty",
    margin: 0,
  } as CSSProperties,
};

type HeroProps = { demoUrl: string };

export default function Hero({ demoUrl }: HeroProps) {
  const vw = useViewportWidth();
  const isMobile = vw < 900;

  const sidePad = vw < 480 ? 16 : vw < 760 ? 32 : 48;
  const containerMax = Math.min(vw, 1280) - sidePad * 2;
  const gap = isMobile ? 0 : 48;
  const monitorTarget = isMobile
    ? Math.min(containerMax, 620)
    : Math.max(420, (containerMax - gap) * 0.5);
  const monitorScale = Math.min(1.0, monitorTarget / 860);

  const [reveal, setReveal] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let raf = 0;
    let start: number | null = null;
    const durMs = 2800;
    const loop = (now: number) => {
      if (start === null) start = now;
      const t = Math.min(1, (now - start) / durMs);
      setReveal(t);
      setTick(Math.floor((now - start) / 90));
      if (t < 1) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (reveal < 1) return;
    const id = setInterval(() => setTick(n => n + 1), 1400);
    return () => clearInterval(id);
  }, [reveal]);

  return (
    <section id="top" style={{
      ...heroStyles.section,
      paddingTop: isMobile ? 128 : 160,
      paddingBottom: isMobile ? 56 : 80,
    }}>
      <div style={heroStyles.sectionBgClip}>
        <div style={heroStyles.gridBg} />
        <div style={isMobile ? heroStyles.haloMobile : heroStyles.halo} />
      </div>

      <div className="container" style={heroStyles.container}>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 1fr) minmax(0, 1.15fr)",
          gap: isMobile ? 40 : gap,
          alignItems: "center",
        }}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: isMobile ? "center" : "flex-start",
            textAlign: isMobile ? "center" : "left",
            gap: isMobile ? 16 : 18,
            maxWidth: isMobile ? 560 : 640,
            margin: isMobile ? "0 auto" : 0,
          }}>
            <h1 style={{
              ...heroStyles.headline,
              fontSize: isMobile ? "clamp(36px, 8.5vw, 52px)" : "clamp(40px, 4.6vw, 68px)",
            }}>
              Turn scattered enterprise data into <span style={heroStyles.highlight}>operational insight</span>.
            </h1>

            <p style={{
              ...heroStyles.sub,
              fontSize: isMobile ? 16 : 18,
              maxWidth: 540,
            }}>
              Satori Inference unifies data across your ERP, MES, spreadsheets, and databases — then builds custom analytics software on-demand.
            </p>

            <div style={{
              display: "flex", flexWrap: "wrap", gap: 10,
              marginTop: 4,
              justifyContent: isMobile ? "center" : "flex-start",
            }}>
              <a href={demoUrl} className="btn btn-primary btn-lg">
                Book a demo
                <span className="arrow-ico">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </a>
              <a href="https://app.satori-inference.com" target="_blank" rel="noopener" className="btn btn-ghost btn-lg">
                Try the live demo
              </a>
            </div>
          </div>

          <div style={{
            position: "relative",
            display: "flex",
            justifyContent: isMobile ? "center" : "flex-end",
            alignItems: "center",
          }}>
            <AppWindow scale={monitorScale} reveal={reveal} tick={tick} />
          </div>
        </div>
      </div>
    </section>
  );
}

const windowStyles: Record<string, CSSProperties> = {
  frame: {
    position: "relative",
    width: 860,
    borderRadius: 10,
    background: "linear-gradient(180deg, #0c0c0c 0%, #070707 100%)",
    border: "1px solid #1F1F1F",
    boxShadow: `
      0 1px 0 rgba(255,255,255,0.04) inset,
      0 40px 80px -20px rgba(0,0,0,0.7),
      0 0 0 1px rgba(255,255,255,0.02),
      0 0 120px rgba(20,184,166,0.14)
    `,
    overflow: "hidden",
  },
  titleBar: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "10px 14px",
    borderBottom: "1px solid #141414",
    background: "linear-gradient(180deg, #0d0d0d 0%, #0a0a0a 100%)",
  },
  lights: { display: "flex", gap: 6 },
  url: {
    flex: 1,
    height: 24,
    display: "flex", alignItems: "center", gap: 8,
    padding: "0 10px",
    background: "#060606",
    border: "1px solid #1F1F1F",
    borderRadius: 4,
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    fontSize: 11,
    color: "#888",
    letterSpacing: "0.02em",
    maxWidth: 420,
    margin: "0 auto",
  },
  actions: {
    display: "flex", alignItems: "center", gap: 8,
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    fontSize: 10,
    color: "#14b8a6",
    letterSpacing: "0.1em",
    minWidth: 60,
    justifyContent: "flex-end",
  },
  livePulse: {
    width: 6, height: 6, borderRadius: "50%",
    background: "#14b8a6",
    boxShadow: "0 0 8px #14b8a6",
    animation: "hero-live-pulse 1.6s ease-in-out infinite",
  },
  screen: {
    position: "relative",
    aspectRatio: "16 / 10",
    background: "#050505",
    overflow: "hidden",
  },
};

function light(c: string): CSSProperties {
  return {
    width: 10, height: 10, borderRadius: "50%",
    background: c,
    boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.3)",
  };
}

function AppWindow({ scale, reveal, tick }: { scale: number; reveal: number; tick: number }) {
  const BASE_W = 860;
  const TITLE_H = 44;
  const SCREEN_H = BASE_W * (10 / 16);
  const BASE_H = SCREEN_H + TITLE_H;
  return (
    <div style={{ position: "relative", width: BASE_W * scale, height: BASE_H * scale }}>
      <style>{`
        @keyframes hero-live-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }
      `}</style>
      <div style={{
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        width: BASE_W,
        height: BASE_H,
      }}>
        <div style={windowStyles.frame}>
          <div style={windowStyles.titleBar}>
            <div style={windowStyles.lights}>
              <span style={light("#2a2a2a")} />
              <span style={light("#2a2a2a")} />
              <span style={light("#2a2a2a")} />
            </div>
            <div style={windowStyles.url}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="11" width="16" height="10" rx="2" />
                <path d="M8 11V7a4 4 0 0 1 8 0v4" />
              </svg>
              <span style={{ color: "#666" }}>app.satori-inference.com</span>
              <span style={{ color: "#333" }}>/</span>
              <span style={{ color: "#A1A1A1" }}>abc-mfg</span>
              <span style={{ color: "#333" }}>/</span>
              <span style={{ color: "#EDEDED" }}>production</span>
            </div>
            <div style={windowStyles.actions}>
              <span style={windowStyles.livePulse} />
              LIVE
            </div>
          </div>
          <div style={windowStyles.screen}>
            <DashboardMock reveal={reveal} tick={tick} />
          </div>
        </div>
      </div>
    </div>
  );
}
