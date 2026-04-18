"use client";

import { CSSProperties, ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useIsMobile } from "./useViewport";

const howStyles: Record<string, CSSProperties> = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 16,
    marginTop: 56,
  },
  step: {
    position: "relative",
    border: "1px solid #1F1F1F",
    borderRadius: 4,
    padding: "28px 24px 24px",
    background: "linear-gradient(180deg, rgba(20,184,166,0.02) 0%, transparent 40%), #070707",
    display: "flex", flexDirection: "column", gap: 14,
    minHeight: 340,
  },
  stepNum: {
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    fontSize: 11, color: "#14b8a6", letterSpacing: "0.1em",
    fontWeight: 500,
  },
  stepTitle: {
    fontSize: 22, fontWeight: 600, color: "#EDEDED",
    letterSpacing: "-0.015em",
  },
  stepBody: { fontSize: 14, color: "#A1A1A1", lineHeight: 1.55 },
  stepVisual: {
    marginTop: "auto",
    aspectRatio: "16 / 9",
    borderRadius: 4,
    border: "1px solid #1F1F1F",
    background: "#050505",
    position: "relative",
    overflow: "hidden",
  },
};

export default function HowItWorks() {
  const isMobile = useIsMobile();
  return (
    <section id="how" className="section">
      <div className="container">
        <div style={{ textAlign: isMobile ? "center" : "left", maxWidth: 780, margin: isMobile ? "0 auto" : "0" }}>
          <h2 className="h-xl">
            Build powerful analytics software in <span style={{ color: "#14b8a6" }}>minutes</span>.
          </h2>
          <p className="p-lg" style={{ marginTop: 16, color: "#A1A1A1" }}>
            Connect your sources once, describe your needs, and let Satori Inference handle the technical implementation.
          </p>
        </div>
        <div style={{
          ...howStyles.grid,
          gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
          marginTop: isMobile ? 36 : 56,
        }}>
          <Step n="01" title="Connect your systems" body="Link Satori Inference to MES, ERP, CRM, Snowflake, any REST API, etc. Your data stays secure at all times." visual={<StepVisualConnect />} />
          <Step n="02" title="Build modules" body="Build custom modules with natural language. Satori Inference's agentic layer then plans, queries, and composes a compartmentalized software module." visual={<StepVisualPrompt />} />
          <Step n="03" title="Share with your team" body="Share internally, embed in workflows, and iterate as operations change — You control authentication, policy, and privacy within your organization." visual={<StepVisualShip />} />
        </div>
      </div>
    </section>
  );
}

function Step({ n, title, body, visual }: { n: string; title: string; body: string; visual: ReactNode }) {
  return (
    <div style={howStyles.step}>
      <div style={howStyles.stepNum}>STEP {n}</div>
      <div style={howStyles.stepTitle}>{title}</div>
      <div style={howStyles.stepBody}>{body}</div>
      <div style={howStyles.stepVisual}>
        <VisualScaler>{visual}</VisualScaler>
      </div>
    </div>
  );
}

const VISUAL_REF_W = 320;
const VISUAL_REF_H = 180;

function VisualScaler({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState<number>(VISUAL_REF_W);
  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(entries => {
      for (const e of entries) setW(e.contentRect.width);
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  const scale = w / VISUAL_REF_W;
  return (
    <div ref={ref} style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <div style={{
        position: "absolute", top: 0, left: 0,
        width: VISUAL_REF_W, height: VISUAL_REF_H,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
      }}>
        {children}
      </div>
    </div>
  );
}

function StepVisualConnect() {
  return (
    <svg viewBox="0 0 200 120" style={{ width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id="conn" x1="0" x2="1">
          <stop offset="0" stopColor="#14b8a6" stopOpacity="0" />
          <stop offset="0.5" stopColor="#14b8a6" stopOpacity="0.8" />
          <stop offset="1" stopColor="#14b8a6" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[20, 40, 60, 80, 100].map((y, i) => (
        <g key={i}>
          <rect x="8" y={y - 4} width="30" height="8" fill="#111" stroke="#2a2a2a" />
          <line x1="38" y1={y} x2="150" y2="60" stroke="#222" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="38" y1={y} x2="150" y2="60" stroke="url(#conn)" strokeWidth="1">
            <animate attributeName="stroke-dashoffset" values="0;-20" dur="2s" repeatCount="indefinite" />
            <animate attributeName="stroke-dasharray" values="2 18;2 18" dur="2s" repeatCount="indefinite" />
          </line>
        </g>
      ))}
      <rect x="150" y="48" width="42" height="24" rx="2" fill="#0A0A0A" stroke="#14b8a6" />
      <text x="171" y="63" fill="#14b8a6" fontSize="8" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" textAnchor="middle" fontWeight="600">SATORI</text>
    </svg>
  );
}

function StepVisualPrompt() {
  const text = "Show WO aging by plant with defect trend";
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setN(x => (x + 1) % (text.length + 24)), 80);
    return () => clearInterval(id);
  }, []);
  const shown = text.slice(0, Math.min(text.length, n));
  const filled = shown.length > 0;
  const ready = shown.length === text.length;
  const mono = "ui-monospace, SFMono-Regular, Menlo, monospace";
  return (
    <div style={{
      padding: 14, height: "100%",
      display: "flex", flexDirection: "column", justifyContent: "center", gap: 10,
    }}>
      <div style={{
        fontFamily: mono, fontSize: 8, color: "#666", letterSpacing: "0.08em",
        display: "flex", alignItems: "center", gap: 5,
      }}>
        <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#14b8a6", boxShadow: "0 0 6px #14b8a6" }} />
        ASK SATORI
      </div>

      <div style={{ display: "flex", alignItems: "stretch", gap: 6 }}>
        <div style={{
          flex: 1,
          border: "1px solid #1F1F1F", borderRadius: 6,
          background: "#0A0A0A",
          padding: "9px 12px",
          fontSize: 11, color: "#EDEDED", lineHeight: 1.3,
          minHeight: 34,
          display: "flex", alignItems: "center",
        }}>
          <span style={{ flex: 1, minWidth: 0 }}>
            {filled ? (
              <span>{shown}<span style={{
                display: "inline-block", width: 1, height: 11, background: "#14b8a6",
                marginLeft: 2, verticalAlign: "middle",
                animation: "satori-caret 1s steps(2) infinite",
              }} /></span>
            ) : (
              <span style={{ color: "#555" }}>Describe the module you need…</span>
            )}
          </span>
        </div>
        <button style={{
          width: 34, height: 34,
          alignSelf: "flex-end",
          border: "none", borderRadius: 6,
          background: ready ? "#14b8a6" : "#141414",
          color: ready ? "#070707" : "#444",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "default",
          transition: "background 150ms, color 150ms",
          boxShadow: ready ? "0 0 0 1px rgba(20,184,166,0.4), 0 0 12px rgba(20,184,166,0.25)" : "none",
        }}>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13.5 2.5 L7 9" />
            <path d="M13.5 2.5 L9 13.5 L7 9 L2.5 7 Z" />
          </svg>
        </button>
      </div>

      <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
        {["WO aging", "Defect trend", "Plant MTTR"].map((s, i) => (
          <span key={i} style={{
            fontFamily: mono, fontSize: 8,
            padding: "3px 7px", borderRadius: 999,
            border: "1px solid #1F1F1F", color: "#888",
            background: "#0A0A0A",
          }}>{s}</span>
        ))}
      </div>

      <style>{`@keyframes satori-caret { 0%,50%{opacity:1} 51%,100%{opacity:0} }`}</style>
    </div>
  );
}

function StepVisualShip() {
  const mono = "ui-monospace, SFMono-Regular, Menlo, monospace";
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf = 0;
    let start: number | null = null;
    const tick = (ts: number) => {
      if (start == null) start = ts;
      setT(((ts - start) / 1000) % 4);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const startX = 14, startY = 76;
  const endX = 86, endY = 44;
  const pressPhase = t >= 1.8 && t < 2.1;
  const copiedPhase = t >= 1.9 && t < 3.5;

  let cx: number, cy: number;
  if (t < 1.8) {
    const k = t / 1.8;
    const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
    cx = startX + (endX - startX) * e;
    cy = startY + (endY - startY) * e;
  } else if (t < 3.5) {
    cx = endX; cy = endY;
  } else {
    const k = (t - 3.5) / 0.5;
    cx = endX + (startX - endX) * k;
    cy = endY + (startY - endY) * k;
  }

  return (
    <div style={{
      padding: 14, height: "100%", position: "relative",
      display: "flex", flexDirection: "column", justifyContent: "center", gap: 10,
    }}>
      <div style={{
        display: "flex", alignItems: "stretch",
        border: "1px solid #1F1F1F", borderRadius: 3, overflow: "hidden",
        background: "#0A0A0A",
      }}>
        <div style={{
          width: 22, display: "flex", alignItems: "center", justifyContent: "center",
          borderRight: "1px solid #1F1F1F", color: "#14b8a6",
        }}>
          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6.5 9.5 L9.5 6.5" />
            <path d="M7 4.5 L8.5 3 A2.12 2.12 0 0 1 13 7.5 L11.5 9" />
            <path d="M9 11.5 L7.5 13 A2.12 2.12 0 0 1 3 8.5 L4.5 7" />
          </svg>
        </div>
        <div style={{
          flex: 1, fontFamily: mono, fontSize: 9, color: "#EDEDED",
          padding: "7px 8px", display: "flex", alignItems: "center", gap: 2,
          whiteSpace: "nowrap", overflow: "hidden",
        }}>
          <span style={{ color: "#666" }}>app.satori-inference.com/modules/</span>
          <span>xyz</span>
          <span style={{
            display: "inline-block", width: 1, height: 9, background: "#14b8a6",
            marginLeft: 2, animation: "satori-caret 1s steps(2) infinite",
          }} />
        </div>
        <div style={{
          width: 46, borderLeft: "1px solid #1F1F1F",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 3,
          fontFamily: mono, fontSize: 8, color: "#14b8a6",
          background: pressPhase ? "rgba(20,184,166,0.22)" : "rgba(20,184,166,0.08)",
          transform: pressPhase ? "translateY(0.5px)" : "none",
          transition: "background 80ms, transform 80ms",
        }}>
          {copiedPhase ? (
            <>
              <svg width="8" height="8" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8.5 L6.5 12 L13 4.5" />
              </svg>
              COPIED
            </>
          ) : (
            <>
              <svg width="8" height="8" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="5" width="8" height="8" rx="1" />
                <path d="M3 10.5 V3.5 A0.5 0.5 0 0 1 3.5 3 H10.5" />
              </svg>
              COPY
            </>
          )}
        </div>
      </div>

      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        fontFamily: mono, fontSize: 8, letterSpacing: "0.08em",
      }}>
        <span style={{ color: "#666" }}>ACCESS · ORG</span>
        <span style={{ display: "flex", alignItems: "center", gap: 4, color: "#14b8a6" }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#14b8a6", boxShadow: "0 0 6px #14b8a6" }} />
          LIVE
        </span>
      </div>

      <div style={{
        position: "absolute",
        left: `${cx}%`, top: `${cy}%`,
        transform: `translate(-2px, -2px) scale(${pressPhase ? 0.88 : 1})`,
        transition: "transform 80ms",
        pointerEvents: "none",
        filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.6))",
      }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="#EDEDED" stroke="#0A0A0A" strokeWidth="0.6" strokeLinejoin="round">
          <path d="M2 2 L2 12.5 L5.2 9.8 L7.2 13.8 L8.8 13 L6.8 9 L11 9 Z" />
        </svg>
        {pressPhase && (
          <span style={{
            position: "absolute", left: -2, top: -2,
            width: 16, height: 16, borderRadius: "50%",
            border: "1.5px solid #14b8a6",
            animation: "satori-ripple 320ms ease-out forwards",
            pointerEvents: "none",
          }} />
        )}
      </div>

      <style>{`
        @keyframes satori-caret { 0%,50%{opacity:1} 51%,100%{opacity:0} }
        @keyframes satori-ripple {
          0%   { transform: scale(0.4); opacity: 0.9; }
          100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
