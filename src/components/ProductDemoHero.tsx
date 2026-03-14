"use client";

import { useEffect, useRef, useState } from "react";

const QUESTION = "Build me a dashboard for tracking and comparing supplier error rates";

const SUPPLIERS = [
  { name: "Meridian Precision", rate: 0.8, color: "#22c55e" },
  { name: "Atlas CNC Solutions", rate: 1.2, color: "#86efac" },
  { name: "TechForge Mfg.", rate: 2.1, color: "#fbbf24" },
  { name: "Apex Metal Works", rate: 3.4, color: "#f97316" },
  { name: "Summit Parts Co.", rate: 4.7, color: "#ef4444" },
];
const MAX_RATE = Math.max(...SUPPLIERS.map((s) => s.rate));

const SERIES = [
  { label: "Meridian", color: "#22c55e", values: [1.4, 1.2, 1.0, 0.9, 0.8, 0.8] },
  { label: "Atlas", color: "#86efac", values: [1.8, 1.6, 1.4, 1.3, 1.2, 1.2] },
  { label: "TechForge", color: "#fbbf24", values: [2.8, 2.5, 2.3, 2.2, 2.1, 2.1] },
];
const MONTHS = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];

const ANALYZE_STEPS = [
  { label: "Query understanding", detail: "Parsing intent & entities" },
  { label: "SQL generation", detail: "Writing optimized queries" },
  { label: "Data retrieval", detail: "Scanning 12,847 records" },
  { label: "Synthesizing answer", detail: "Generating insights" },
];

const CW = 140, CH = 72, PX = 6, PY = 4, MAXV = 3.2;
function pt(i: number, v: number): [number, number] {
  return [
    PX + (i / (MONTHS.length - 1)) * (CW - PX * 2),
    PY + (1 - v / MAXV) * (CH - PY * 2),
  ];
}
function pts(vals: number[]) {
  return vals.map((v, i) => pt(i, v).join(",")).join(" ");
}
function LineChart({ visible }: { visible: boolean }) {
  return (
    <svg viewBox={`0 0 ${CW} ${CH}`} className="w-full" style={{ height: CH }}>
      {[1, 2, 3].map((v) => {
        const [, y] = pt(0, v);
        return <line key={v} x1={PX} y1={y} x2={CW - PX} y2={y} stroke="#333333" strokeWidth="1" />;
      })}
      {MONTHS.map((m, i) => {
        const [x] = pt(i, 0);
        return <text key={m} x={x} y={CH} textAnchor="middle" fontSize="6" fill="#666666">{m}</text>;
      })}
      {SERIES.map((s, si) => (
        <polyline
          key={s.label}
          points={pts(s.values)}
          fill="none"
          stroke={s.color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={visible ? 0 : 1}
          style={{ transition: `stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1) ${si * 180}ms` }}
        />
      ))}
      {SERIES.map((s) => {
        const last = s.values[s.values.length - 1];
        const [x, y] = pt(s.values.length - 1, last);
        return (
          <circle key={s.label} cx={x} cy={y} r="2" fill="#1a1a1a" stroke={s.color} strokeWidth="1.5"
            style={{ opacity: visible ? 1 : 0, transition: "opacity 0.4s ease 1.2s" }} />
        );
      })}
    </svg>
  );
}

const CHROME_H = 44;
const CONTENT_H = 430;

export default function ProductDemoHero() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [typedChars, setTypedChars] = useState(0);
  const [showSpinner, setShowSpinner] = useState(false);
  const [phase, setPhase] = useState<"query" | "analyzing" | "results">("query");
  const [analyzeStep, setAnalyzeStep] = useState(0);
  const [windowOpacity, setWindowOpacity] = useState(1);
  const [resultsIn, setResultsIn] = useState(false);
  const [barsReady, setBarsReady] = useState(false);
  const [cycleKey, setCycleKey] = useState(0);

  useEffect(() => {
    setTypedChars(0);
    setShowSpinner(false);
    setPhase("query");
    setAnalyzeStep(0);
    setWindowOpacity(1);
    setResultsIn(false);
    setBarsReady(false);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;

    const timers: ReturnType<typeof setTimeout>[] = [];
    const TYPE_START = 800;
    const TYPE_SPEED = 44;
    const questionEnd = TYPE_START + QUESTION.length * TYPE_SPEED;

    for (let i = 1; i <= QUESTION.length; i++) {
      timers.push(setTimeout(() => setTypedChars(i), TYPE_START + i * TYPE_SPEED));
    }

    timers.push(setTimeout(() => setShowSpinner(true), questionEnd + 480));
    timers.push(setTimeout(() => setWindowOpacity(0), questionEnd + 1280));
    timers.push(setTimeout(() => {
      setPhase("analyzing");
      setWindowOpacity(0);
      setAnalyzeStep(0);
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    }, questionEnd + 1780));
    timers.push(setTimeout(() => setWindowOpacity(1), questionEnd + 1880));
    timers.push(setTimeout(() => setAnalyzeStep(1), questionEnd + 2100));
    timers.push(setTimeout(() => setAnalyzeStep(2), questionEnd + 2800));
    timers.push(setTimeout(() => setAnalyzeStep(3), questionEnd + 3600));
    timers.push(setTimeout(() => setAnalyzeStep(4), questionEnd + 4500));
    timers.push(setTimeout(() => setAnalyzeStep(5), questionEnd + 5300));
    timers.push(setTimeout(() => setWindowOpacity(0), questionEnd + 5700));
    timers.push(setTimeout(() => {
      setPhase("results");
      setWindowOpacity(0);
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    }, questionEnd + 6200));
    timers.push(setTimeout(() => setWindowOpacity(1), questionEnd + 6300));
    timers.push(setTimeout(() => setResultsIn(true), questionEnd + 6450));
    timers.push(setTimeout(() => setBarsReady(true), questionEnd + 6850));
    timers.push(setTimeout(() => {
      const el = scrollRef.current;
      if (!el) return;
      const start = el.scrollTop;
      const end = 168;
      const duration = 1800;
      const startTime = performance.now();
      function easeOutQuart(t: number) { return 1 - Math.pow(1 - t, 4); }
      function step(now: number) {
        if (!el) return;
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        el.scrollTop = start + (end - start) * easeOutQuart(progress);
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }, questionEnd + 8650));
    timers.push(setTimeout(() => setCycleKey((k) => k + 1), questionEnd + 15450));

    return () => timers.forEach(clearTimeout);
  }, [cycleKey]);

  return (
    <div className="w-full">
      <div
        className="rounded-xl overflow-hidden"
        style={{
          border: "1px solid #2a2a2a",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 8px 48px rgba(0,0,0,0.6), 0 0 80px rgba(255,255,255,0.03)",
        }}
      >
        {/* Browser chrome */}
        <div
          className="border-b flex items-center justify-between flex-shrink-0 px-4"
          style={{ height: CHROME_H, backgroundColor: "#111111", borderColor: "#2a2a2a" }}
        >
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#3a3a3a" }} />
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#3a3a3a" }} />
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#3a3a3a" }} />
            </div>
          </div>
          {phase === "results" ? (
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ animation: "pulse 2s ease-in-out infinite" }} />
              <span className="text-[10px]" style={{ color: "#666666" }}>Live · 2m ago</span>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              {[{ label: "ERP System", dot: "#60a5fa" }, { label: "Supplier DB", dot: "#fb923c" }].map((src) => (
                <span key={src.label} className="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[9px] font-medium" style={{ border: "1px solid #2a2a2a", backgroundColor: "#1a1a1a", color: "#888888" }}>
                  <span className="w-1 h-1 rounded-full" style={{ backgroundColor: src.dot }} />
                  {src.label}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Scrollable content */}
        <div
          ref={scrollRef}
          className="scrollbar-hide overflow-y-scroll"
          style={{ height: CONTENT_H, opacity: windowOpacity, transition: "opacity 0.7s ease", backgroundColor: "#0e0e0e" }}
        >
          {phase === "query" ? (
            <div className="flex flex-col items-center justify-center px-8" style={{ height: CONTENT_H }}>
              <h3 className="text-sm font-bold text-center mb-5" style={{ color: "#f2f2f2" }}>
                Ask anything about your data
              </h3>
              {/* Input row */}
              <div
                className="flex items-start gap-2 rounded-lg px-3 py-2 mx-auto"
                style={{
                  width: "60%",
                  backgroundColor: "#141414",
                  border: `1px solid ${typedChars > 0 ? "#3a3a3a" : "#222222"}`,
                  boxShadow: typedChars > 0 ? "0 0 0 3px rgba(255,255,255,0.04)" : "none",
                  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                }}
              >
                <p className="flex-1 text-xs leading-5 break-words min-w-0" style={{ color: typedChars > 0 ? "#d1d5db" : "#555555" }}>
                  {typedChars === 0 ? (
                    "Ask a question about your operations..."
                  ) : (
                    <>
                      {QUESTION.slice(0, typedChars)}
                      <span
                        className="inline-block w-[1.5px] h-[11px] ml-px align-middle"
                        style={{ backgroundColor: "#888888", animation: "pulse 1s ease-in-out infinite" }}
                      />
                    </>
                  )}
                </p>
                {typedChars > 0 && (
                  <div
                    className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-px"
                    style={{ backgroundColor: "#ffffff" }}
                  >
                    {showSpinner ? (
                      <div className="w-2.5 h-2.5 rounded-full border-[1.5px]" style={{ borderColor: "#000 transparent transparent transparent", animation: "spin 0.7s linear infinite" }} />
                    ) : (
                      <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9V3M3 6l3-3 3 3" />
                      </svg>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : phase === "analyzing" ? (
            <div className="flex flex-col items-center justify-center px-6" style={{ height: CONTENT_H }}>
              <div className="w-full max-w-[200px]">
                <div className="flex items-center gap-2 mb-5">
                  <span className="relative flex h-2 w-2">
                    {analyzeStep < 5 && <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-40" style={{ backgroundColor: "#ffffff" }} />}
                    <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: "#ffffff" }} />
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "#f2f2f2" }}>
                    Agentic Analysis
                  </span>
                </div>
                {ANALYZE_STEPS.map((step, i) => {
                  const visible = analyzeStep >= i + 1;
                  const active = analyzeStep === i + 1;
                  const done = analyzeStep > i + 1;
                  const isLast = i === ANALYZE_STEPS.length - 1;
                  return (
                    <div key={step.label} className="flex gap-3 relative" style={{ paddingBottom: isLast ? 0 : 18 }}>
                      {!isLast && <div className="absolute left-[10px] top-[21px] bottom-0 w-px" style={{ backgroundColor: "#2a2a2a", opacity: analyzeStep >= i + 2 ? 1 : 0, transition: "opacity 0.3s ease" }} />}
                      <div className="relative z-10 flex-shrink-0 w-[21px] h-[21px]">
                        {done ? (
                          <div className="w-full h-full rounded-full flex items-center justify-center" style={{ backgroundColor: "#f2f2f2", opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}>
                            <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6l3 3 5-5" /></svg>
                          </div>
                        ) : active ? (
                          <div className="w-full h-full rounded-full border-[2px]" style={{ borderColor: "#3a3a3a", borderTopColor: "#f2f2f2", opacity: visible ? 1 : 0, transition: "opacity 0.3s ease", animation: "spin 0.75s linear infinite" }} />
                        ) : (
                          <div className="w-full h-full rounded-full border-[2px]" style={{ borderColor: "#2a2a2a", opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }} />
                        )}
                      </div>
                      <div className="pt-0.5" style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(4px)", transition: "opacity 0.4s ease, transform 0.4s ease" }}>
                        <p className="text-[11px] leading-tight" style={{ fontWeight: active ? 600 : 400, color: done ? "#555555" : active ? "#f2f2f2" : "#333333" }}>
                          {step.label}
                        </p>
                        {active && <p className="text-[9px] mt-0.5" style={{ color: "#666666" }}>{step.detail}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="px-4 pt-4 pb-5 space-y-3">
              <div className="flex items-start gap-2" style={{ opacity: resultsIn ? 1 : 0, transform: resultsIn ? "translateY(0)" : "translateY(6px)", transition: "opacity 0.4s ease, transform 0.4s ease" }}>
                <div className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: "#1a1a1a", border: "1px solid #2a2a2a" }}>
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                  </svg>
                </div>
                <p className="text-[10px] italic leading-snug" style={{ color: "#666666" }}>
                  &ldquo;{QUESTION}&rdquo;
                </p>
              </div>

              <div className="rounded-lg px-3 py-2.5" style={{ border: "1px solid #2a2a2a", backgroundColor: "#141414", opacity: resultsIn ? 1 : 0, transform: resultsIn ? "translateY(0)" : "translateY(6px)", transition: "opacity 0.4s ease 80ms, transform 0.4s ease 80ms" }}>
                <p className="text-[11px] leading-relaxed" style={{ color: "#aaaaaa" }}>
                  <span className="font-semibold" style={{ color: "#f2f2f2" }}>Meridian Precision</span>{" "}
                  and <span className="font-semibold" style={{ color: "#f2f2f2" }}>Atlas CNC</span>{" "}
                  lead at <span className="font-semibold" style={{ color: "#f2f2f2" }}>0.8%</span>{" "}
                  and <span className="font-semibold" style={{ color: "#f2f2f2" }}>1.2%</span>,
                  both well below your 2.4% fleet average. Shifting volume from{" "}
                  <span className="font-semibold" style={{ color: "#f2f2f2" }}>Summit Parts Co.</span>{" "}
                  (4.7%) to top performers could cut defect exposure by ~40%.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2" style={{ opacity: resultsIn ? 1 : 0, transform: resultsIn ? "translateY(0)" : "translateY(6px)", transition: "opacity 0.4s ease 160ms, transform 0.4s ease 160ms" }}>
                {[
                  { label: "Best rate", value: "0.8%", sub: "Meridian", color: "#22c55e" },
                  { label: "Fleet avg", value: "2.4%", sub: "All suppliers", color: "#888888" },
                  { label: "Worst rate", value: "4.7%", sub: "Summit Parts", color: "#ef4444" },
                ].map((m) => (
                  <div key={m.label} className="rounded-lg px-2 py-2 text-center" style={{ border: "1px solid #2a2a2a", backgroundColor: "#141414" }}>
                    <p className="text-sm font-bold tabular-nums" style={{ color: m.color }}>{m.value}</p>
                    <p className="text-[9px] font-medium leading-tight mt-0.5" style={{ color: "#aaaaaa" }}>{m.label}</p>
                    <p className="text-[8px] leading-tight" style={{ color: "#666666" }}>{m.sub}</p>
                  </div>
                ))}
              </div>

              <div style={{ opacity: barsReady ? 1 : 0, transform: barsReady ? "translateY(0)" : "translateY(8px)", transition: "opacity 0.5s ease 200ms, transform 0.5s ease 200ms" }}>
                <div className="flex items-center gap-2 mb-2.5">
                  <div className="flex-1 h-px" style={{ backgroundColor: "#2a2a2a" }} />
                  <span className="text-[9px] uppercase tracking-widest font-medium" style={{ color: "#555555" }}>Performance breakdown</span>
                  <div className="flex-1 h-px" style={{ backgroundColor: "#2a2a2a" }} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg p-2.5" style={{ border: "1px solid #2a2a2a", backgroundColor: "#141414" }}>
                    <p className="text-[10px] font-semibold mb-0.5" style={{ color: "#f2f2f2" }}>Error Rate</p>
                    <p className="text-[9px] mb-2" style={{ color: "#666666" }}>YTD · % defective</p>
                    <div className="flex flex-col gap-1.5">
                      {SUPPLIERS.map((s, i) => (
                        <div key={s.name}>
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-[9px] truncate pr-1" style={{ color: "#888888" }}>{s.name.split(" ")[0]}</span>
                            <span className="text-[9px] font-semibold tabular-nums flex-shrink-0" style={{ color: "#f2f2f2" }}>{s.rate}%</span>
                          </div>
                          <div className="h-1 w-full rounded-full overflow-hidden" style={{ backgroundColor: "#1a1a1a" }}>
                            <div className="h-full rounded-full" style={{ width: barsReady ? `${(s.rate / MAX_RATE) * 100}%` : "0%", backgroundColor: s.color, transition: `width 0.7s cubic-bezier(0.4,0,0.2,1) ${i * 100}ms` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-lg p-2.5" style={{ border: "1px solid #2a2a2a", backgroundColor: "#141414" }}>
                    <p className="text-[10px] font-semibold mb-0.5" style={{ color: "#f2f2f2" }}>6-Month Trend</p>
                    <p className="text-[9px] mb-1.5" style={{ color: "#666666" }}>Top 3 · Oct – Mar</p>
                    <LineChart visible={barsReady} />
                    <div className="flex items-center flex-wrap gap-x-2 gap-y-0.5 mt-1.5">
                      {SERIES.map((s) => (
                        <div key={s.label} className="flex items-center gap-0.5">
                          <div className="w-2.5 h-0.5 rounded" style={{ backgroundColor: s.color }} />
                          <span className="text-[8px]" style={{ color: "#666666" }}>{s.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
