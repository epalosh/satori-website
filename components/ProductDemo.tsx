"use client";

import { useEffect, useRef, useState } from "react";

const QUESTION =
  "Which of my suppliers have the lowest error rate for machined parts?";

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

// SVG line chart
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
        return (
          <line key={v} x1={PX} y1={y} x2={CW - PX} y2={y} stroke="#f3f4f6" strokeWidth="1" />
        );
      })}
      {MONTHS.map((m, i) => {
        const [x] = pt(i, 0);
        return (
          <text key={m} x={x} y={CH} textAnchor="middle" fontSize="6" fill="#9ca3af">
            {m}
          </text>
        );
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
          style={{
            transition: `stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1) ${si * 180}ms`,
          }}
        />
      ))}
      {SERIES.map((s) => {
        const last = s.values[s.values.length - 1];
        const [x, y] = pt(s.values.length - 1, last);
        return (
          <circle
            key={s.label}
            cx={x}
            cy={y}
            r="2"
            fill="white"
            stroke={s.color}
            strokeWidth="1.5"
            style={{ opacity: visible ? 1 : 0, transition: "opacity 0.4s ease 1.2s" }}
          />
        );
      })}
    </svg>
  );
}

// Fixed dimensions — window never resizes
const CHROME_H = 44;   // px — browser chrome bar
const CONTENT_H = 318; // px — scrollable viewport

export default function ProductDemo() {
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

    // Typing
    for (let i = 1; i <= QUESTION.length; i++) {
      timers.push(
        setTimeout(() => setTypedChars(i), TYPE_START + i * TYPE_SPEED)
      );
    }

    // Spinner → fade out → analyzing → results
    timers.push(setTimeout(() => setShowSpinner(true), questionEnd + 480));
    timers.push(setTimeout(() => setWindowOpacity(0), questionEnd + 1280));
    timers.push(
      setTimeout(() => {
        setPhase("analyzing");
        setWindowOpacity(0);
        setAnalyzeStep(0);
        if (scrollRef.current) scrollRef.current.scrollTop = 0;
      }, questionEnd + 1780)
    );
    timers.push(setTimeout(() => setWindowOpacity(1), questionEnd + 1880));
    timers.push(setTimeout(() => setAnalyzeStep(1), questionEnd + 2100));
    timers.push(setTimeout(() => setAnalyzeStep(2), questionEnd + 2800));
    timers.push(setTimeout(() => setAnalyzeStep(3), questionEnd + 3600));
    timers.push(setTimeout(() => setAnalyzeStep(4), questionEnd + 4500));
    timers.push(setTimeout(() => setAnalyzeStep(5), questionEnd + 5300));
    timers.push(setTimeout(() => setWindowOpacity(0), questionEnd + 5700));
    timers.push(
      setTimeout(() => {
        setPhase("results");
        setWindowOpacity(0);
        if (scrollRef.current) scrollRef.current.scrollTop = 0;
      }, questionEnd + 6200)
    );
    timers.push(setTimeout(() => setWindowOpacity(1), questionEnd + 6300));
    timers.push(setTimeout(() => setResultsIn(true), questionEnd + 6450));
    timers.push(setTimeout(() => setBarsReady(true), questionEnd + 6850));

    // Scroll to reveal charts
    timers.push(
      setTimeout(() => {
        const el = scrollRef.current;
        if (!el) return;
        const start = el.scrollTop;
        const end = 168;
        const duration = 1800;
        const startTime = performance.now();
        function easeOutQuart(t: number) {
          return 1 - Math.pow(1 - t, 4);
        }
        function step(now: number) {
          if (!el) return;
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          el.scrollTop = start + (end - start) * easeOutQuart(progress);
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      }, questionEnd + 8650)
    );

    timers.push(setTimeout(() => setCycleKey((k) => k + 1), questionEnd + 15450));

    return () => timers.forEach(clearTimeout);
  }, [cycleKey]);

  return (
    <div className="w-full">
      <div
        className="rounded-xl border border-gray-200 bg-white overflow-hidden"
        style={{
          boxShadow: "0 0 0 1px rgba(0,0,0,0.04), 0 8px 48px rgba(0,0,0,0.08)",
        }}
      >
        {/* ── Browser chrome ── fixed CHROME_H */}
        <div
          className="bg-gray-50 border-b border-gray-100 px-4 flex items-center justify-between flex-shrink-0"
          style={{ height: CHROME_H }}
        >
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-gray-200" />
              <div className="w-3 h-3 rounded-full bg-gray-200" />
              <div className="w-3 h-3 rounded-full bg-gray-200" />
            </div>
            <span className="text-[11px] font-medium text-gray-400 tracking-wide">
              satori.ai
            </span>
          </div>
          {phase === "results" ? (
            <div className="flex items-center gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full bg-green-400"
                style={{ animation: "pulse 2s ease-in-out infinite" }}
              />
              <span className="text-[10px] text-gray-400">Live · 2m ago</span>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              {[
                { label: "ERP System", dot: "bg-blue-400" },
                { label: "Supplier DB", dot: "bg-orange-400" },
                { label: "QC Reports", dot: "bg-green-400" },
              ].map((src) => (
                <span
                  key={src.label}
                  className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-1.5 py-0.5 text-[9px] font-medium text-gray-600"
                >
                  <span className={`w-1 h-1 rounded-full ${src.dot}`} />
                  {src.label}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ── Scrollable content viewport ── fixed CONTENT_H */}
        <div
          ref={scrollRef}
          className="scrollbar-hide overflow-y-scroll"
          style={{
            height: CONTENT_H,
            opacity: windowOpacity,
            transition: "opacity 0.7s ease",
          }}
        >
          {phase === "query" ? (
            /* ── Phase 1: Query ── */

            <div
              className="flex flex-col items-center justify-center px-5"
              style={{ height: CONTENT_H }}
            >
              <div className="w-full">
                <h3 className="text-sm font-bold text-black text-center mb-4">
                  Ask anything about your data
                </h3>

                {/* Fixed-height open textarea */}
                <div
                  className="w-full rounded-xl border bg-white"
                  style={{
                    height: 104,
                    borderColor: typedChars > 0 ? "#d1d5db" : "#e5e7eb",
                    boxShadow:
                      typedChars > 0
                        ? "0 0 0 3px rgba(0,0,0,0.06)"
                        : undefined,
                    transition:
                      "box-shadow 0.3s ease, border-color 0.3s ease",
                  }}
                >
                  <div className="flex flex-col h-full px-3.5 pt-3 pb-2.5">
                    {/* Text fills from top, clipped — box never grows */}
                    <div className="flex-1 overflow-hidden">
                      <p className="text-xs leading-relaxed">
                        {typedChars === 0 ? (
                          <span className="text-gray-400">
                            Ask a question about your operations...
                          </span>
                        ) : (
                          <span className="text-gray-800">
                            {QUESTION.slice(0, typedChars)}
                            <span className="inline-block w-0.5 h-3.5 bg-gray-700 ml-px align-middle animate-pulse" />
                          </span>
                        )}
                      </p>
                    </div>
                    {/* Bottom row */}
                    <div className="flex items-center justify-end">
                      <div
                        className="w-6 h-6 rounded-lg flex items-center justify-center"
                        style={{
                          backgroundColor:
                            typedChars > 0 ? "#000" : "#e5e7eb",
                          transition: "background-color 0.3s ease",
                        }}
                      >
                        {showSpinner ? (
                          <div
                            className="w-3 h-3 rounded-full border-[1.5px] border-white border-t-transparent"
                            style={{
                              animation: "spin 0.7s linear infinite",
                            }}
                          />
                        ) : (
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 12 12"
                            fill="none"
                            stroke={typedChars > 0 ? "white" : "#9ca3af"}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9V3M3 6l3-3 3 3" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : phase === "analyzing" ? (
            /* ── Phase 2: Analyzing ── */
            <div
              className="flex flex-col items-center justify-center px-6"
              style={{ height: CONTENT_H }}
            >
              <div className="w-full max-w-[200px]">
                {/* Header */}
                <div className="flex items-center gap-2 mb-5">
                  <span className="relative flex h-2 w-2">
                    {analyzeStep < 5 && (
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-40" />
                    )}
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-black" />
                  </span>
                  <span className="text-[10px] font-semibold text-gray-900 uppercase tracking-widest">
                    Agentic Analysis
                  </span>
                </div>

                {/* Steps */}
                {ANALYZE_STEPS.map((step, i) => {
                  const visible = analyzeStep >= i + 1;
                  const active = analyzeStep === i + 1;
                  const done = analyzeStep > i + 1;
                  const isLast = i === ANALYZE_STEPS.length - 1;
                  return (
                    <div
                      key={step.label}
                      className="flex gap-3 relative"
                      style={{ paddingBottom: isLast ? 0 : 18 }}
                    >
                      {/* Connector line */}
                      {!isLast && (
                        <div className="absolute left-[10px] top-[21px] bottom-0 w-px bg-gray-100" />
                      )}
                      {/* Indicator */}
                      <div className="relative z-10 flex-shrink-0 w-[21px] h-[21px]">
                        {done ? (
                          <div
                            className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center"
                            style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}
                          >
                            <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M2 6l3 3 5-5" />
                            </svg>
                          </div>
                        ) : active ? (
                          <div
                            className="w-full h-full rounded-full border-[2px] border-gray-200 border-t-gray-800"
                            style={{
                              opacity: visible ? 1 : 0,
                              transition: "opacity 0.3s ease",
                              animation: "spin 0.75s linear infinite",
                            }}
                          />
                        ) : (
                          <div
                            className="w-full h-full rounded-full border-[2px] border-gray-200"
                            style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}
                          />
                        )}
                      </div>
                      {/* Text */}
                      <div
                        className="pt-0.5"
                        style={{
                          opacity: visible ? 1 : 0,
                          transform: visible ? "none" : "translateY(4px)",
                          transition: "opacity 0.4s ease, transform 0.4s ease",
                        }}
                      >
                        <p
                          className="text-[11px] leading-tight"
                          style={{
                            fontWeight: active ? 600 : 400,
                            color: done ? "#9ca3af" : active ? "#111827" : "#d1d5db",
                          }}
                        >
                          {step.label}
                        </p>
                        {active && (
                          <p className="text-[9px] text-gray-400 mt-0.5">{step.detail}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* ── Phase 3: Results (taller than CONTENT_H → scrollable) ── */
            <div className="px-4 pt-4 pb-5 space-y-3">

              {/* Query echo */}
              <div
                className="flex items-start gap-2"
                style={{
                  opacity: resultsIn ? 1 : 0,
                  transform: resultsIn ? "translateY(0)" : "translateY(6px)",
                  transition: "opacity 0.4s ease, transform 0.4s ease",
                }}
              >
                <div className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
                  <svg
                    width="8"
                    height="8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#9ca3af"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                </div>
                <p className="text-[10px] text-gray-400 italic leading-snug">
                  &ldquo;{QUESTION}&rdquo;
                </p>
              </div>

              {/* AI text summary */}
              <div
                className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2.5"
                style={{
                  opacity: resultsIn ? 1 : 0,
                  transform: resultsIn ? "translateY(0)" : "translateY(6px)",
                  transition:
                    "opacity 0.4s ease 80ms, transform 0.4s ease 80ms",
                }}
              >
                <p className="text-[11px] text-gray-700 leading-relaxed">
                  <span className="font-semibold text-gray-900">
                    Meridian Precision
                  </span>{" "}
                  and{" "}
                  <span className="font-semibold text-gray-900">
                    Atlas CNC
                  </span>{" "}
                  lead at{" "}
                  <span className="font-semibold text-gray-900">0.8%</span>{" "}
                  and{" "}
                  <span className="font-semibold text-gray-900">1.2%</span>
                  , both well below your 2.4% fleet average. Shifting volume
                  from{" "}
                  <span className="font-semibold text-gray-900">
                    Summit Parts Co.
                  </span>{" "}
                  (4.7%) to top performers could cut defect exposure by ~40%.
                </p>
              </div>

              {/* Key metric stat cards */}
              <div
                className="grid grid-cols-3 gap-2"
                style={{
                  opacity: resultsIn ? 1 : 0,
                  transform: resultsIn ? "translateY(0)" : "translateY(6px)",
                  transition:
                    "opacity 0.4s ease 160ms, transform 0.4s ease 160ms",
                }}
              >
                {[
                  {
                    label: "Best rate",
                    value: "0.8%",
                    sub: "Meridian",
                    color: "#22c55e",
                  },
                  {
                    label: "Fleet avg",
                    value: "2.4%",
                    sub: "All suppliers",
                    color: "#9ca3af",
                  },
                  {
                    label: "Worst rate",
                    value: "4.7%",
                    sub: "Summit Parts",
                    color: "#ef4444",
                  },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="rounded-lg border border-gray-200 bg-white px-2 py-2 text-center"
                  >
                    <p
                      className="text-sm font-bold tabular-nums"
                      style={{ color: m.color }}
                    >
                      {m.value}
                    </p>
                    <p className="text-[9px] font-medium text-gray-700 leading-tight mt-0.5">
                      {m.label}
                    </p>
                    <p className="text-[8px] text-gray-400 leading-tight">
                      {m.sub}
                    </p>
                  </div>
                ))}
              </div>

              {/* ── Charts section (revealed by scroll) ── */}
              <div
                style={{
                  opacity: barsReady ? 1 : 0,
                  transform: barsReady ? "translateY(0)" : "translateY(8px)",
                  transition:
                    "opacity 0.5s ease 200ms, transform 0.5s ease 200ms",
                }}
              >
                {/* Divider label */}
                <div className="flex items-center gap-2 mb-2.5">
                  <div className="flex-1 h-px bg-gray-100" />
                  <span className="text-[9px] text-gray-400 uppercase tracking-widest font-medium">
                    Performance breakdown
                  </span>
                  <div className="flex-1 h-px bg-gray-100" />
                </div>

                {/* Two charts side by side */}
                <div className="grid grid-cols-2 gap-3">

                  {/* Bar chart */}
                  <div className="rounded-lg border border-gray-200 bg-white p-2.5">
                    <p className="text-[10px] font-semibold text-gray-900 mb-0.5">
                      Error Rate
                    </p>
                    <p className="text-[9px] text-gray-400 mb-2">
                      YTD · % defective
                    </p>
                    <div className="flex flex-col gap-1.5">
                      {SUPPLIERS.map((s, i) => (
                        <div key={s.name}>
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-[9px] text-gray-600 truncate pr-1">
                              {s.name.split(" ")[0]}
                            </span>
                            <span className="text-[9px] font-semibold text-gray-900 tabular-nums flex-shrink-0">
                              {s.rate}%
                            </span>
                          </div>
                          <div className="h-1 w-full rounded-full bg-gray-100 overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: barsReady
                                  ? `${(s.rate / MAX_RATE) * 100}%`
                                  : "0%",
                                backgroundColor: s.color,
                                transition: `width 0.7s cubic-bezier(0.4,0,0.2,1) ${i * 100}ms`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Line chart */}
                  <div className="rounded-lg border border-gray-200 bg-white p-2.5">
                    <p className="text-[10px] font-semibold text-gray-900 mb-0.5">
                      6-Month Trend
                    </p>
                    <p className="text-[9px] text-gray-400 mb-1.5">
                      Top 3 · Oct – Mar
                    </p>
                    <LineChart visible={barsReady} />
                    <div className="flex items-center flex-wrap gap-x-2 gap-y-0.5 mt-1.5">
                      {SERIES.map((s) => (
                        <div
                          key={s.label}
                          className="flex items-center gap-0.5"
                        >
                          <div
                            className="w-2.5 h-0.5 rounded"
                            style={{ backgroundColor: s.color }}
                          />
                          <span className="text-[8px] text-gray-500">
                            {s.label}
                          </span>
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
