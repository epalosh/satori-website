"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import SatoriMark from "./SatoriMark";
import { useViewportWidth } from "./useViewport";

const flowStyles: Record<string, CSSProperties> = {
  section: { position: "relative" },
  stage: {
    position: "relative",
    marginTop: 48,
    padding: 24,
    border: "1px solid #1F1F1F",
    borderRadius: 6,
    background: "linear-gradient(180deg, #080808 0%, #050505 100%)",
    minHeight: 560,
    overflow: "hidden",
  },
  gridBg: {
    position: "absolute", inset: 0, pointerEvents: "none",
    background: `
      linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px) 0 0 / 40px 40px,
      linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px) 0 0 / 40px 40px
    `,
    maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)",
  },
};

type Source = { id: string; label: string; sub: string; color: string };

const SOURCES_FLOW: Source[] = [
  { id: "mes",       label: "MES",           sub: "Manufacturing · OPC-UA", color: "#f59e0b" },
  { id: "erp",       label: "ERP",           sub: "SAP · Oracle",           color: "#3b82f6" },
  { id: "crm",       label: "CRM",           sub: "Salesforce",             color: "#14b8a6" },
  { id: "contracts", label: "Contracts",     sub: "Drive · DocuSign",       color: "#22c55e" },
  { id: "email",     label: "Email Records", sub: "Outlook · Slack",        color: "#ec4899" },
  { id: "sql",       label: "SQL Database",  sub: "Postgres · Snowflake",   color: "#8b5cf6" },
  { id: "api",       label: "Custom APIs",   sub: "REST · Webhooks",        color: "#06b6d4" },
];

export default function FlowDiagram() {
  const [t, setT] = useState(0);
  const rafRef = useRef(0);
  const vw = useViewportWidth();
  const isMobile = vw < 760;
  useEffect(() => {
    const start = performance.now();
    const tick = (now: number) => {
      setT((now - start) / 1000);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const W = 1180, H = 560;
  const leftX = 40, sourceWidth = 180;
  const coreX = 520, coreW = 200, coreY = H / 2 - 110, coreH = 220;
  const dashX = 820, dashW = 320, dashY = 60, dashH = H - 120;

  const packetSpeed = 0.35;
  const corePulse = 0.6 + 0.4 * (0.5 + 0.5 * Math.sin(t * 1.2));

  const stagePad = 24;
  const containerPad = vw < 640 ? 18 : vw < 900 ? 24 : 32;
  const availableWidth = Math.max(280, vw - containerPad * 2);
  const intrinsicWidth = W + stagePad * 2;
  const stageScale = Math.min(1, availableWidth / intrinsicWidth);
  const scaledHeight = (H + stagePad * 2) * stageScale;

  return (
    <section
      id="architecture"
      className="section"
      style={{
        ...flowStyles.section,
        // On mobile, bump top/bottom padding so this reads as a distinct section
        // instead of blurring into HowItWorks / Features. Desktop keeps original
        // 0/24 (tight because the stage card provides its own visual boundary).
        paddingTop: isMobile ? 96 : 0,
        paddingBottom: isMobile ? 96 : 24,
      }}
    >
      <div className="container">
        <div style={{ textAlign: isMobile ? "center" : "left", maxWidth: 820, marginLeft: isMobile ? "auto" : 0, marginRight: isMobile ? "auto" : 0, marginBottom: 32 }}>
          <h2 className="h-xl">
            Perform data analysis across <span style={{ color: "#14b8a6" }}>multiple sources</span>.
          </h2>
          <p className="p-lg" style={{ marginTop: 16, color: "#A1A1A1" }}>
            Answers live between systems. Satori Inference joins signals from MES, ERP, CRM, contracts, SQL, and custom APIs — surfacing the connections no single tool can see.
          </p>
        </div>

        <div style={{
          height: scaledHeight,
          width: "100%",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
        }}>
          <div style={{
            width: intrinsicWidth,
            height: H + stagePad * 2,
            transform: `scale(${stageScale})`,
            transformOrigin: "top center",
            flexShrink: 0,
          }}>
            <FlowStage
              W={W} H={H} t={t} corePulse={corePulse} packetSpeed={packetSpeed}
              leftX={leftX} sourceWidth={sourceWidth}
              coreX={coreX} coreW={coreW} coreY={coreY} coreH={coreH}
              dashX={dashX} dashW={dashW} dashY={dashY} dashH={dashH}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

type StageProps = {
  W: number; H: number; t: number; corePulse: number; packetSpeed: number;
  leftX: number; sourceWidth: number;
  coreX: number; coreW: number; coreY: number; coreH: number;
  dashX: number; dashW: number; dashY: number; dashH: number;
};

function FlowStage(p: StageProps) {
  const { W, H, t, corePulse, packetSpeed, leftX, sourceWidth, coreX, coreW, coreY, coreH, dashX, dashW, dashY, dashH } = p;
  return (
    <div style={flowStyles.stage}>
      <div style={flowStyles.gridBg} />

      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: 560, display: "block", position: "relative", zIndex: 1 }} preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="pipe-grad" x1="0" x2="1">
            <stop offset="0" stopColor="#14b8a6" stopOpacity="0.0" />
            <stop offset="0.15" stopColor="#14b8a6" stopOpacity="0.4" />
            <stop offset="1" stopColor="#14b8a6" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="pipe-out" x1="0" x2="1">
            <stop offset="0" stopColor="#14b8a6" stopOpacity="0.7" />
            <stop offset="1" stopColor="#14b8a6" stopOpacity="0.1" />
          </linearGradient>
          <radialGradient id="core-glow" cx="0.5" cy="0.5" r="0.6">
            <stop offset="0" stopColor="#14b8a6" stopOpacity="0.4" />
            <stop offset="0.5" stopColor="#14b8a6" stopOpacity="0.08" />
            <stop offset="1" stopColor="#14b8a6" stopOpacity="0" />
          </radialGradient>
        </defs>

        <ellipse cx={coreX + coreW / 2} cy={coreY + coreH / 2} rx={220} ry={180}
          fill="url(#core-glow)" opacity={0.35 + 0.35 * corePulse} />

        {SOURCES_FLOW.map((s, i) => {
          const y = 60 + i * ((H - 120) / (SOURCES_FLOW.length - 1));
          const sx = leftX + sourceWidth;
          const sy = y;
          const ex = coreX;
          const ey = coreY + (coreH / (SOURCES_FLOW.length + 1)) * (i + 1);
          const midX = (sx + ex) / 2;
          const path = `M${sx},${sy} C${midX},${sy} ${midX},${ey} ${ex},${ey}`;
          return (
            <g key={s.id}>
              <path d={path} stroke="#1F1F1F" strokeWidth="1" fill="none" />
              <path d={path} stroke="url(#pipe-grad)" strokeWidth="1.5" fill="none" opacity="0.9" />
              {[0, 1, 2].map(k => {
                const phase = (t * packetSpeed + i * 0.11 + k * 0.33) % 1;
                const pt = pointOnCubic(sx, sy, midX, sy, midX, ey, ex, ey, phase);
                return (
                  <circle key={k} cx={pt.x} cy={pt.y} r="2.2"
                    fill={s.color}
                    opacity={0.85 * (1 - Math.abs(0.5 - phase) * 1.2)}
                  />
                );
              })}
            </g>
          );
        })}

        {(() => {
          const sx = coreX + coreW;
          const sy = coreY + coreH / 2;
          const ex = dashX;
          const ey = dashY + dashH / 2;
          const midX = (sx + ex) / 2;
          const path = `M${sx},${sy} C${midX},${sy} ${midX},${ey} ${ex},${ey}`;
          return (
            <g>
              <path d={path} stroke="#1F1F1F" strokeWidth="2" fill="none" />
              <path d={path} stroke="url(#pipe-out)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              {[0, 1, 2, 3, 4].map(k => {
                const phase = (t * (packetSpeed + 0.1) + k * 0.2) % 1;
                const pt = pointOnCubic(sx, sy, midX, sy, midX, ey, ex, ey, phase);
                return (
                  <circle key={k} cx={pt.x} cy={pt.y} r="2.6"
                    fill="#14b8a6"
                    opacity={0.95 * (1 - Math.abs(0.5 - phase) * 1.2)}
                  />
                );
              })}
            </g>
          );
        })()}
      </svg>

      <div style={{ position: "absolute", inset: 24, pointerEvents: "none" }}>
        {SOURCES_FLOW.map((s, i) => {
          const yPct = (60 + i * ((H - 120) / (SOURCES_FLOW.length - 1))) / H * 100;
          return (
            <div key={s.id} style={{
              position: "absolute",
              left: 16, width: 180,
              top: `calc(${yPct}% - 18px)`,
              pointerEvents: "auto",
            }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "9px 12px",
                border: "1px solid #2a2a2a",
                borderRadius: 4,
                background: "#0D0D0D",
                boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
              }}>
                <span style={{ width: 8, height: 8, background: s.color, boxShadow: `0 0 8px ${s.color}` }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: "#EDEDED" }}>{s.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{
        position: "absolute",
        // Stage has 24px padding top/bottom; containing-block height is H + 48.
        // Add 24 to y so the overlay lines up with the SVG (which is inset 24px).
        left: `${coreX / W * 100}%`,
        top: `${(coreY + 24) / (H + 48) * 100}%`,
        width: `${coreW / W * 100}%`,
        height: `${coreH / (H + 48) * 100}%`,
        pointerEvents: "auto",
      }}>
        <div style={{
          width: "100%", height: "100%",
          border: "1px solid #14b8a6",
          borderRadius: 10,
          background: "radial-gradient(ellipse at 50% 50%, rgba(20,184,166,0.14) 0%, rgba(20,184,166,0.03) 60%, rgba(8,8,8,1) 100%)",
          boxShadow: `0 0 ${30 + corePulse * 40}px rgba(20,184,166,${0.18 + corePulse * 0.25}), inset 0 0 30px rgba(20,184,166,0.08)`,
          display: "grid", placeItems: "center",
          position: "relative",
          overflow: "hidden",
        }}>
          {[0, 1, 2].map(k => {
            const phase = (t * 0.6 + k * 0.33) % 1;
            const size = 40 + phase * 140;
            return (
              <div key={k} style={{
                position: "absolute",
                width: size, height: size,
                borderRadius: "50%",
                border: `1px solid rgba(20,184,166,${0.6 * (1 - phase)})`,
                pointerEvents: "none",
              }} />
            );
          })}
          <div style={{
            width: 56, height: 56,
            display: "grid", placeItems: "center",
            borderRadius: "50%",
            background: "#0A0A0A",
            border: "1px solid #14b8a6",
            boxShadow: `0 0 ${12 + corePulse * 18}px rgba(20,184,166,${0.5 + corePulse * 0.3})`,
            position: "relative", zIndex: 1,
          }}>
            <SatoriMark size={28} />
          </div>
          <div style={{
            position: "absolute",
            left: 0, right: 0, bottom: 14,
            textAlign: "center",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: 10,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#14b8a6",
            zIndex: 2,
          }}>Agentic Data Layer</div>
        </div>
      </div>

      <div style={{
        position: "absolute",
        left: `${dashX / W * 100}%`,
        top: `${(dashY + 24) / (H + 48) * 100}%`,
        width: `${dashW / W * 100}%`,
        height: `${dashH / (H + 48) * 100}%`,
        pointerEvents: "auto",
      }}>
        <div style={{
          width: "100%", height: "100%",
          border: "1px solid #2a2a2a",
          borderRadius: 4,
          background: "#0A0A0A",
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        }}>
          <FlowDashPreview t={t} />
        </div>
      </div>
    </div>
  );
}

function FlowDashPreview({ t }: { t: number }) {
  const base = [40, 65, 52, 78, 90, 72, 85];
  const bars = base.map((b, i) => Math.max(10, Math.min(100, b + Math.sin(t * 0.8 + i * 0.9) * 6)));
  return (
    <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 10, height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 11, color: "#EDEDED", fontWeight: 600 }}>Operations Module</span>
        <span style={{ marginLeft: "auto", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 9, color: "#14b8a6", letterSpacing: "0.06em" }}>
          <span style={{ display: "inline-block", width: 5, height: 5, background: "#14b8a6", marginRight: 4, verticalAlign: "middle" }} />LIVE
        </span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
        {[
          { l: "OEE", v: "87.4%" },
          { l: "THROUGHPUT", v: "12,480" },
          { l: "DEFECT", v: "0.42%" },
          { l: "WO OPEN", v: "34" },
        ].map(k => (
          <div key={k.l} style={{ border: "1px solid #1F1F1F", borderRadius: 2, padding: 6 }}>
            <div style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 8, color: "#666", letterSpacing: "0.08em" }}>{k.l}</div>
            <div style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 15, fontWeight: 600, color: "#EDEDED" }}>{k.v}</div>
          </div>
        ))}
      </div>
      <div style={{ border: "1px solid #1F1F1F", borderRadius: 2, padding: 8, flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 8, color: "#666", letterSpacing: "0.08em" }}>THROUGHPUT · 7D</div>
        <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 3 }}>
          {bars.map((h, i) => (
            <div key={i} style={{
              flex: 1,
              height: `${h}%`,
              background: i === bars.length - 1 ? "#14b8a6" : "#2a2a2a",
              minHeight: 4,
              transition: "height 240ms ease",
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function pointOnCubic(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number, t: number) {
  const mt = 1 - t;
  const x = mt * mt * mt * x1 + 3 * mt * mt * t * x2 + 3 * mt * t * t * x3 + t * t * t * x4;
  const y = mt * mt * mt * y1 + 3 * mt * mt * t * y2 + 3 * mt * t * t * y3 + t * t * t * y4;
  return { x, y };
}
