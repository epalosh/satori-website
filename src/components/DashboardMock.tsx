"use client";

import { CSSProperties } from "react";
import SatoriMark from "./SatoriMark";

const dashStyles: Record<string, CSSProperties> = {
  root: {
    width: "100%", height: "100%",
    background: "#0A0A0A",
    color: "#EDEDED",
    fontFamily: "system-ui, -apple-system, sans-serif",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    position: "relative",
  },
  topbar: {
    display: "flex", alignItems: "center",
    height: 40,
    padding: "0 14px",
    gap: 10,
    borderBottom: "1px solid #1F1F1F",
    background: "#050505",
  },
  brandCluster: { display: "flex", alignItems: "center", gap: 8 },
  sidebar: {
    width: 54,
    borderRight: "1px solid #1F1F1F",
    background: "#050505",
    display: "flex", flexDirection: "column",
    padding: "10px 0",
    gap: 4,
    alignItems: "center",
  },
  sideItem: {
    width: 34, height: 34,
    display: "grid", placeItems: "center",
    borderRadius: 4,
    color: "#555",
    position: "relative",
  },
  sideItemActive: { color: "#14b8a6", background: "#0E1B1A" },
  body: { display: "flex", flex: 1, minHeight: 0 },
  main: {
    flex: 1,
    padding: "14px 18px",
    display: "flex", flexDirection: "column",
    gap: 12,
    overflow: "hidden",
  },
  crumbs: {
    fontSize: 10, fontWeight: 500,
    letterSpacing: "0.08em", textTransform: "uppercase",
    color: "#666",
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
  },
  title: {
    fontSize: 18, fontWeight: 600, color: "#EDEDED",
    letterSpacing: "-0.01em",
  },
  promptPanel: {
    border: "1px solid #222",
    borderRadius: 4,
    background: "#0D0D0D",
    padding: "10px 12px",
    display: "flex", alignItems: "center", gap: 10,
    fontSize: 12, color: "#A1A1A1",
  },
  promptCursor: {
    display: "inline-block",
    width: 6, height: 12,
    background: "#14b8a6",
    marginLeft: 2,
    animation: "blink 1.1s step-end infinite",
  },
  kpiGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 },
  kpi: {
    border: "1px solid #1F1F1F",
    background: "#0D0D0D",
    padding: 10,
    borderRadius: 3,
    display: "flex", flexDirection: "column", gap: 4,
  },
  kpiLabel: {
    fontSize: 9, fontWeight: 500, color: "#666",
    letterSpacing: "0.08em", textTransform: "uppercase",
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
  },
  kpiValue: {
    fontSize: 22, fontWeight: 600, color: "#EDEDED",
    fontVariantNumeric: "tabular-nums",
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    letterSpacing: "-0.01em",
  },
  kpiDelta: {
    fontSize: 10,
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    display: "flex", alignItems: "center", gap: 4,
  },
  panelsRow: {
    display: "grid", gridTemplateColumns: "1.5fr 1fr",
    gap: 10, flex: 1, minHeight: 0,
  },
  panel: {
    border: "1px solid #1F1F1F",
    background: "#0A0A0A",
    borderRadius: 3,
    padding: 12,
    display: "flex", flexDirection: "column",
    gap: 10,
    minHeight: 0,
  },
  panelHead: { display: "flex", alignItems: "center", justifyContent: "space-between" },
  panelTitle: { fontSize: 12, fontWeight: 600, color: "#EDEDED" },
  chartHost: { flex: 1, position: "relative", minHeight: 0 },
  tableRow: {
    display: "grid", gridTemplateColumns: "1.3fr 0.8fr 0.8fr 24px",
    gap: 8,
    padding: "6px 2px",
    fontSize: 11,
    borderBottom: "1px solid #1A1A1A",
    alignItems: "center",
  },
  tableHead: {
    fontSize: 9,
    letterSpacing: "0.08em", textTransform: "uppercase",
    color: "#666",
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    fontWeight: 600,
  },
};

type Props = { reveal?: number; tick?: number };

export default function DashboardMock({ reveal = 1, tick = 0 }: Props) {
  const kpiShow = (i: number) => Math.max(0, Math.min(1, (reveal - 0.15 - i * 0.04) / 0.12));
  const chartShow = Math.max(0, Math.min(1, (reveal - 0.35) / 0.25));
  const rowShow = (i: number) => Math.max(0, Math.min(1, (reveal - 0.55 - i * 0.04) / 0.12));
  const topShow = Math.max(0, Math.min(1, reveal / 0.12));

  return (
    <div style={dashStyles.root}>
      <div style={{ ...dashStyles.topbar, opacity: topShow }}>
        <div style={dashStyles.brandCluster}>
          <SatoriMark size={16} />
          <span style={{ fontSize: 12, fontWeight: 600, color: "#EDEDED" }}>Satori Inference</span>
        </div>
        <span style={{ color: "#444", fontSize: 10 }}>/</span>
        <span style={{ fontSize: 11, color: "#888" }}>ABC Manufacturing</span>
        <span style={{ color: "#444", fontSize: 10 }}>/</span>
        <span style={{ fontSize: 11, color: "#EDEDED" }}>Production Operations</span>
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 10, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", color: "#555" }}>
          <span style={{ display: "inline-block", width: 5, height: 5, background: "#22c55e", marginRight: 5, verticalAlign: "middle" }} />
          LIVE
        </span>
      </div>

      <div style={dashStyles.body}>
        <div style={{ ...dashStyles.sidebar, opacity: topShow }}>
          {(["grid", "chart", "db", "bolt", "settings"] as const).map((k, i) => (
            <div key={k} style={{ ...dashStyles.sideItem, ...(i === 1 ? dashStyles.sideItemActive : {}) }}>
              {i === 1 && (
                <span style={{ position: "absolute", left: -7, top: 6, bottom: 6, width: 2, background: "#14b8a6", borderRadius: 2 }} />
              )}
              <SideIcon kind={k} />
            </div>
          ))}
        </div>

        <div style={dashStyles.main}>
          <div style={{ opacity: topShow }}>
            <div style={dashStyles.crumbs}>MODULE · PRODUCTION OPERATIONS</div>
            <div style={{ ...dashStyles.title, marginTop: 4 }}>Plant yield & throughput</div>
          </div>

          <div style={{ ...dashStyles.promptPanel, opacity: topShow }}>
            <span style={{ color: "#14b8a6", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 11 }}>{">"}</span>
            <span style={{ flex: 1 }}>
              {reveal > 0.04 && <TypedPrompt reveal={reveal} />}
            </span>
            {reveal < 0.32 && <span style={dashStyles.promptCursor} />}
            <span style={{ fontSize: 9, letterSpacing: "0.05em", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", color: "#555" }}>⌘↵</span>
          </div>

          <div style={dashStyles.kpiGrid}>
            {[
              { label: "OEE", value: "87.4%", delta: "+2.1%", trend: "up" },
              { label: "THROUGHPUT", value: "12,480", delta: "+310", trend: "up" },
              { label: "DEFECT RATE", value: "0.42%", delta: "-0.08%", trend: "down-good" },
              { label: "OPEN WOS", value: "34", delta: "+4", trend: "neutral" },
            ].map((k, i) => {
              const s = kpiShow(i);
              const color =
                k.trend === "up" || k.trend === "down-good" ? "#22c55e" :
                k.trend === "down" ? "#ef4444" : "#888";
              return (
                <div key={k.label} style={{
                  ...dashStyles.kpi,
                  opacity: s,
                  transform: `translateY(${(1 - s) * 6}px)`,
                  transition: "none",
                }}>
                  <div style={dashStyles.kpiLabel}>{k.label}</div>
                  <div style={dashStyles.kpiValue}>{k.value}</div>
                  <div style={{ ...dashStyles.kpiDelta, color }}>
                    <span style={{ width: 5, height: 5, background: color }} />
                    {k.delta}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={dashStyles.panelsRow}>
            <div style={{ ...dashStyles.panel, opacity: Math.max(0.2, chartShow) }}>
              <div style={dashStyles.panelHead}>
                <span style={dashStyles.panelTitle}>Throughput · last 30 days</span>
                <span style={{ fontSize: 9, letterSpacing: "0.08em", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", color: "#666" }}>
                  <span style={{ display: "inline-block", width: 5, height: 5, background: "#14b8a6", marginRight: 5 }} />
                  PLANT A
                  <span style={{ display: "inline-block", width: 5, height: 5, background: "#3b82f6", margin: "0 5px 0 10px" }} />
                  PLANT B
                </span>
              </div>
              <div style={dashStyles.chartHost}>
                <LineChart reveal={chartShow} tick={tick} />
              </div>
            </div>
            <div style={dashStyles.panel}>
              <div style={dashStyles.panelHead}>
                <span style={dashStyles.panelTitle}>Top downtime causes</span>
                <span style={{ fontSize: 9, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", color: "#666" }}>7D</span>
              </div>
              <div style={{ ...dashStyles.tableRow, ...dashStyles.tableHead, borderColor: "#222" }}>
                <span>CAUSE</span><span>MIN</span><span>WOS</span><span></span>
              </div>
              {[
                { c: "Tool changeover", m: "148", w: "11" },
                { c: "Material shortage", m: "92", w: "6" },
                { c: "QC hold — lot 3391", m: "71", w: "3" },
                { c: "Sensor fault · line 4", m: "44", w: "2" },
                { c: "Scheduled maint.", m: "38", w: "5" },
              ].map((r, i) => {
                const s = rowShow(i);
                return (
                  <div key={i} style={{ ...dashStyles.tableRow, opacity: s, transform: `translateY(${(1 - s) * 4}px)` }}>
                    <span style={{ color: "#EDEDED" }}>{r.c}</span>
                    <span style={{ color: "#A1A1A1", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>{r.m}</span>
                    <span style={{ color: "#A1A1A1", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>{r.w}</span>
                    <span style={{ color: "#555" }}>›</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TypedPrompt({ reveal }: { reveal: number }) {
  const text = "Show plant yield, throughput, and top downtime causes across all sites.";
  const frac = Math.min(1, reveal / 0.3);
  const n = Math.floor(text.length * frac);
  return <span style={{ color: "#A1A1A1" }}>{text.slice(0, n)}</span>;
}

function LineChart({ reveal }: { reveal: number; tick: number }) {
  const w = 520, h = 140;
  const pts = 30;
  const rnd = (seed: number) => {
    const x = Math.sin(seed * 9301 + 49297) * 233280;
    return x - Math.floor(x);
  };
  const series: number[][] = [[], []];
  for (let s = 0; s < 2; s++) {
    let v = 60 + s * 10;
    for (let i = 0; i < pts; i++) {
      v += (rnd(s * 1000 + i + 1) - 0.5) * 14 + (s === 0 ? Math.sin(i / 4) * 2 : Math.cos(i / 5) * 2);
      v = Math.max(20, Math.min(120, v));
      series[s].push(v);
    }
  }
  const stroke = ["#14b8a6", "#3b82f6"];
  const fill = ["rgba(20,184,166,0.12)", "rgba(59,130,246,0.08)"];

  const xs = (i: number) => 2 + (i / (pts - 1)) * (w - 4);
  const ys = (v: number) => h - 4 - ((v - 10) / 120) * (h - 8);

  const visIdx = Math.ceil(reveal * pts);

  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: "100%", display: "block" }}>
      {[0.25, 0.5, 0.75].map(f => (
        <line key={f} x1="0" x2={w} y1={h * f} y2={h * f} stroke="#1A1A1A" strokeWidth="1" />
      ))}
      {series.map((arr, s) => {
        const path = arr.slice(0, visIdx).map((v, i) => `${i === 0 ? "M" : "L"}${xs(i).toFixed(1)},${ys(v).toFixed(1)}`).join(" ");
        const areaPath = path ? `${path} L${xs(Math.min(visIdx - 1, pts - 1)).toFixed(1)},${h} L${xs(0).toFixed(1)},${h} Z` : "";
        return (
          <g key={s}>
            {areaPath && <path d={areaPath} fill={fill[s]} />}
            <path d={path} fill="none" stroke={stroke[s]} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
            {visIdx > 0 && visIdx <= pts && (
              <circle cx={xs(visIdx - 1)} cy={ys(arr[visIdx - 1])} r="2.5" fill={stroke[s]}>
                {reveal >= 0.98 && <animate attributeName="r" values="2.5;4;2.5" dur="1.4s" repeatCount="indefinite" />}
              </circle>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function SideIcon({ kind }: { kind: "grid" | "chart" | "db" | "bolt" | "settings" }) {
  const p = {
    width: 14, height: 14, viewBox: "0 0 24 24", fill: "none",
    stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
  };
  if (kind === "grid") return <svg {...p}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></svg>;
  if (kind === "chart") return <svg {...p}><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg>;
  if (kind === "db") return <svg {...p}><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14a9 3 0 0 0 18 0V5" /><path d="M3 12a9 3 0 0 0 18 0" /></svg>;
  if (kind === "bolt") return <svg {...p}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>;
  return <svg {...p}><circle cx="12" cy="12" r="3" /><path d="M12 1v6M12 17v6M4.2 4.2l4.3 4.3M15.5 15.5l4.3 4.3M1 12h6M17 12h6M4.2 19.8l4.3-4.3M15.5 8.5l4.3-4.3" /></svg>;
}
