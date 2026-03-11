"use client";

import { useEffect, useState } from "react";

const SLACK_MSG = "I've identified key supplier metrics on Satori";

// ── Dashboard data ─────────────────────────────────────────────────────────
const METRICS = [
  { label: "Avg Error Rate", value: "1.8%", delta: "↓ 0.3%", good: true },
  { label: "On-Time Delivery", value: "94.2%", delta: "↑ 1.1%", good: true },
  { label: "Active Suppliers", value: "12", delta: "2 flagged", good: false },
];
const BARS = [
  { name: "Meridian", value: 0.8, color: "#22c55e" },
  { name: "Atlas",    value: 1.2, color: "#86efac" },
  { name: "TechForge",value: 2.1, color: "#fbbf24" },
  { name: "Apex",     value: 3.4, color: "#f97316" },
  { name: "Summit",   value: 4.7, color: "#ef4444" },
];
const MAX_BAR = 4.7;

// ── Saved tools hub data ───────────────────────────────────────────────────
const SAVED_TOOLS_LIST = [
  { name: "Supplier Metrics",  desc: "Error rates & on-time delivery", icon: "◈", age: "2m ago" },
  { name: "Production OEE",    desc: "Overall equipment effectiveness", icon: "◉", age: "1h ago" },
  { name: "Quality Report",    desc: "Defect trends by product line",   icon: "◎", age: "3h ago" },
  { name: "Defect Tracker",    desc: "Root cause & corrective actions", icon: "◆", age: "Yesterday" },
  { name: "Yield by Line",     desc: "Output efficiency per station",   icon: "◐", age: "Yesterday" },
  { name: "Inventory Status",  desc: "WIP & raw material levels",       icon: "◑", age: "2d ago" },
];

// ── Sidebar preview items ──────────────────────────────────────────────────
const SIDEBAR_ITEMS = [
  { name: "Supplier Metrics", icon: "◈" },
  { name: "Production OEE",   icon: "◉" },
  { name: "Quality Report",   icon: "◎" },
];

// ── Slack prior messages ───────────────────────────────────────────────────
const PRIOR_MSGS = [
  { user: "Tom H.",   time: "2h ago",  text: "Has anyone looked at our supplier error rates recently?" },
  { user: "Sarah K.", time: "1h ago",  text: "We should set up a dashboard for that, I'll ping the data team" },
];

const CHROME_H   = 38;
const CONTENT_H  = 356;
const APP_BAR_H  = 36;
const BODY_H     = CONTENT_H - APP_BAR_H;

export default function ProductDemo() {
  const [barsVisible,      setBarsVisible]      = useState(false);
  const [saved,            setSaved]            = useState(false);
  const [toastVisible,     setToastVisible]     = useState(false);
  const [sidebarOpen,      setSidebarOpen]      = useState(false);
  const [showSavedTools,   setShowSavedTools]   = useState(false);
  const [savedToolsIn,     setSavedToolsIn]     = useState(false);
  const [shareMenuOpen,    setShareMenuOpen]    = useState(false);
  const [slackWindowOpen,  setSlackWindowOpen]  = useState(false);
  const [typedChars,       setTypedChars]       = useState(0);
  const [slackSent,        setSlackSent]        = useState(false);
  const [hlSave,           setHlSave]           = useState(false);
  const [hlNavItem,        setHlNavItem]        = useState(false);
  const [hlShareCard,      setHlShareCard]      = useState(false);
  const [hlSlackItem,      setHlSlackItem]      = useState(false);
  const [hlSend,           setHlSend]           = useState(false);
  const [cycleKey,         setCycleKey]         = useState(0);

  useEffect(() => {
    setBarsVisible(false);
    setSaved(false);
    setToastVisible(false);
    setSidebarOpen(false);
    setShowSavedTools(false);
    setSavedToolsIn(false);
    setShareMenuOpen(false);
    setSlackWindowOpen(false);
    setTypedChars(0);
    setSlackSent(false);
    setHlSave(false);
    setHlNavItem(false);
    setHlShareCard(false);
    setHlSlackItem(false);
    setHlSend(false);

    const t: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, fn: () => void) => { t.push(setTimeout(fn, ms)); };

    at(500,  () => setBarsVisible(true));
    at(1300, () => setHlSave(true));
    at(2100, () => { setSaved(true); setHlSave(false); setToastVisible(true); });
    at(2900, () => setToastVisible(false));
    at(3200, () => setSidebarOpen(true));
    at(4000, () => setHlNavItem(true));
    at(4700, () => {
      setHlNavItem(false);
      setSidebarOpen(false);
      setShowSavedTools(true);
    });
    at(4950, () => setSavedToolsIn(true));

    // hover share on Supplier Metrics card
    at(6000, () => setHlShareCard(true));
    at(6700, () => { setHlShareCard(false); setShareMenuOpen(true); });

    // hover Slack item in dropdown
    at(7350, () => setHlSlackItem(true));
    at(7900, () => { setHlSlackItem(false); setShareMenuOpen(false); setSlackWindowOpen(true); });

    // type message
    const TYPE_START = 8700;
    const TYPE_SPEED = 44;
    for (let i = 1; i <= SLACK_MSG.length; i++) {
      at(TYPE_START + i * TYPE_SPEED, () => setTypedChars(i));
    }
    const typingEnd = TYPE_START + SLACK_MSG.length * TYPE_SPEED;

    at(typingEnd + 450, () => setHlSend(true));
    at(typingEnd + 980, () => { setSlackSent(true); setHlSend(false); });
    at(typingEnd + 2000, () => setCycleKey((k) => k + 1));

    return () => t.forEach(clearTimeout);
  }, [cycleKey]);

  return (
    <div className="w-full">
      <div
        className="rounded-xl overflow-hidden"
        style={{
          border: "1px solid #2a2a2a",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.04), 0 8px 48px rgba(0,0,0,0.6), 0 0 80px rgba(255,255,255,0.03)",
        }}
      >
        {/* ── Minimal browser chrome (no URL bar) ── */}
        <div
          className="flex items-center gap-2 px-4 border-b flex-shrink-0"
          style={{ height: CHROME_H, backgroundColor: "#111111", borderColor: "#1e1e1e" }}
        >
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#3a3a3a" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#3a3a3a" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#3a3a3a" }} />
          </div>
        </div>

        {/* ── App shell ── */}
        <div
          style={{
            height: CONTENT_H,
            backgroundColor: "#0e0e0e",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* App top bar */}
          <div
            className="flex items-center px-3 border-b flex-shrink-0"
            style={{ height: APP_BAR_H, borderColor: "#181818", backgroundColor: "#0a0a0a" }}
          >
            <div className="flex items-center gap-1.5 mr-5">
              <div
                className="w-[18px] h-[18px] rounded-md flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#1e1e1e", border: "1px solid #303030" }}
              >
                <span className="text-[9px] font-black" style={{ color: "#e0e0e0" }}>S</span>
              </div>
              <span className="text-[11px] font-bold" style={{ color: "#e0e0e0", letterSpacing: "-0.01em" }}>
                Satori
              </span>
            </div>
            <div className="flex items-center gap-0.5">
              {["Dashboards", "Tools", "Reports", "Settings"].map((item) => {
                const active = item === "Tools";
                return (
                  <div
                    key={item}
                    className="px-2.5 py-1 text-[10px] rounded font-medium"
                    style={{ color: active ? "#f2f2f2" : "#444444", backgroundColor: active ? "#1c1c1c" : "transparent" }}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
            <div className="ml-auto">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold"
                style={{ backgroundColor: "#1e1e1e", border: "1px solid #2a2a2a", color: "#888888" }}
              >
                JP
              </div>
            </div>
          </div>

          {/* ── Page body ── */}
          <div className="flex" style={{ height: BODY_H }}>

            {/* Sidebar */}
            <div
              style={{
                width: sidebarOpen ? 162 : 0,
                flexShrink: 0,
                overflow: "hidden",
                transition: "width 0.32s cubic-bezier(0.4,0,0.2,1)",
                borderRight: "1px solid #161616",
                backgroundColor: "#080808",
              }}
            >
              <div style={{ width: 162, padding: "12px 10px 0" }}>
                <p className="text-[8.5px] uppercase tracking-widest font-semibold mb-2 px-1" style={{ color: "#333333" }}>
                  Saved
                </p>
                {SIDEBAR_ITEMS.map((tool, i) => (
                  <div
                    key={tool.name}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-md text-[10px] mb-0.5 cursor-pointer"
                    style={{
                      color: hlNavItem && i === 0 ? "#f2f2f2" : i === 0 ? "#aaaaaa" : "#444444",
                      backgroundColor: hlNavItem && i === 0 ? "#1c1c1c" : "transparent",
                      border: hlNavItem && i === 0 ? "1px solid #2a2a2a" : "1px solid transparent",
                      transition: "all 0.18s ease",
                    }}
                  >
                    <span className="text-[11px] flex-shrink-0" style={{ color: hlNavItem && i === 0 ? "#cccccc" : "#2e2e2e" }}>
                      {tool.icon}
                    </span>
                    <span className="truncate">{tool.name}</span>
                    {i === 0 && saved && (
                      <svg className="ml-auto flex-shrink-0" width="7" height="7" viewBox="0 0 24 24" fill="#22c55e" stroke="none">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                      </svg>
                    )}
                  </div>
                ))}
                <div className="my-2 mx-1" style={{ height: 1, backgroundColor: "#141414" }} />
                <p className="text-[8.5px] uppercase tracking-widest font-semibold mb-2 px-1" style={{ color: "#333333" }}>
                  Recent
                </p>
                {["Defect Analysis", "Yield by Line"].map((name) => (
                  <div key={name} className="flex items-center gap-2 px-2 py-1.5 rounded-md text-[10px] mb-0.5" style={{ color: "#2e2e2e" }}>
                    <span className="text-[9px]" style={{ color: "#222222" }}>◌</span>
                    <span className="truncate">{name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Main content area ── */}
            <div className="flex-1 overflow-hidden" style={{ position: "relative" }}>

              {/* ── Dashboard view ── */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  padding: "12px 14px",
                  opacity: showSavedTools ? 0 : 1,
                  transition: "opacity 0.3s ease",
                  pointerEvents: showSavedTools ? "none" : "auto",
                }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-[8.5px] mb-0.5" style={{ color: "#383838" }}>Tools / Supplier Metrics</p>
                    <h2 className="text-[13px] font-bold" style={{ color: "#f0f0f0", letterSpacing: "-0.01em" }}>Supplier Metrics</h2>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {/* Save button */}
                    <button
                      className="flex items-center justify-center w-[26px] h-[26px] rounded-md"
                      style={{
                        backgroundColor: hlSave ? "#0f1f14" : saved ? "#0f1a10" : "#151515",
                        border: `1px solid ${hlSave ? "#22c55e" : saved ? "#22c55e55" : "#222222"}`,
                        transition: "all 0.2s ease",
                        boxShadow: hlSave ? "0 0 10px rgba(34,197,94,0.35)" : "none",
                      }}
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill={saved ? "#22c55e" : "none"} stroke={saved ? "#22c55e" : hlSave ? "#22c55e" : "#555555"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                      </svg>
                    </button>
                    {/* Share button */}
                    <button
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-medium"
                      style={{ backgroundColor: "#151515", border: "1px solid #222222", color: "#555555" }}
                    >
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                      </svg>
                      Share
                    </button>
                  </div>
                </div>

                {/* KPI cards */}
                <div className="grid grid-cols-3 gap-2 mb-2.5">
                  {METRICS.map((m) => (
                    <div key={m.label} className="rounded-lg px-2.5 py-2" style={{ backgroundColor: "#121212", border: "1px solid #1c1c1c" }}>
                      <p className="text-[8px] mb-1" style={{ color: "#484848" }}>{m.label}</p>
                      <p className="text-[13px] font-bold tabular-nums leading-none" style={{ color: "#e8e8e8" }}>{m.value}</p>
                      <p className="text-[8px] mt-1 font-medium" style={{ color: m.good ? "#22c55e" : "#f97316" }}>{m.delta}</p>
                    </div>
                  ))}
                </div>

                {/* Bar chart */}
                <div className="rounded-lg p-3" style={{ backgroundColor: "#121212", border: "1px solid #1c1c1c" }}>
                  <div className="flex items-center justify-between mb-2.5">
                    <p className="text-[9px] font-semibold" style={{ color: "#888888" }}>Error Rate by Supplier</p>
                    <p className="text-[8px]" style={{ color: "#333333" }}>YTD · % defective</p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {BARS.map((bar, i) => (
                      <div key={bar.name} className="flex items-center gap-2">
                        <span className="text-[8px] flex-shrink-0 text-right" style={{ color: "#484848", width: 44 }}>{bar.name}</span>
                        <div className="flex-1 h-[6px] rounded-full overflow-hidden" style={{ backgroundColor: "#1a1a1a" }}>
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: barsVisible ? `${(bar.value / MAX_BAR) * 100}%` : "0%",
                              backgroundColor: bar.color,
                              transition: barsVisible ? `width 0.65s cubic-bezier(0.4,0,0.2,1) ${i * 75}ms` : "none",
                            }}
                          />
                        </div>
                        <span className="text-[8px] tabular-nums flex-shrink-0 text-right" style={{ color: "#555555", width: 24 }}>{bar.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Save toast */}
                <div
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 14,
                    opacity: toastVisible ? 1 : 0,
                    transform: toastVisible ? "translateY(0)" : "translateY(-6px)",
                    transition: "opacity 0.25s ease, transform 0.25s ease",
                    pointerEvents: "none",
                    zIndex: 10,
                  }}
                >
                  <div
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-medium"
                    style={{ backgroundColor: "#0f1f14", border: "1px solid #1e4028", color: "#4ade80", boxShadow: "0 4px 16px rgba(0,0,0,0.5)" }}
                  >
                    <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 6l3 3 5-5" />
                    </svg>
                    Saved
                  </div>
                </div>
              </div>

              {/* ── Saved Tools hub view ── */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  padding: "12px 14px",
                  opacity: savedToolsIn ? 1 : 0,
                  transform: savedToolsIn ? "translateX(0)" : "translateX(12px)",
                  transition: "opacity 0.3s ease, transform 0.3s ease",
                  pointerEvents: showSavedTools ? "auto" : "none",
                  overflow: "hidden",
                }}
              >
                {/* Page header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <h2 className="text-[13px] font-bold" style={{ color: "#f0f0f0", letterSpacing: "-0.01em" }}>Saved Tools</h2>
                    <span
                      className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full"
                      style={{ backgroundColor: "#1e1e1e", border: "1px solid #2a2a2a", color: "#666666" }}
                    >
                      6
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button className="px-2.5 py-1 rounded-md text-[10px]" style={{ backgroundColor: "#151515", border: "1px solid #222222", color: "#555555" }}>
                      Filter
                    </button>
                    <button className="px-2.5 py-1 rounded-md text-[10px]" style={{ backgroundColor: "#151515", border: "1px solid #222222", color: "#555555" }}>
                      Sort
                    </button>
                  </div>
                </div>

                {/* Tool cards grid */}
                <div className="grid grid-cols-2 gap-2" style={{ rowGap: 6 }}>
                  {SAVED_TOOLS_LIST.map((tool, i) => {
                    const isSupplier = i === 0;
                    return (
                      <div
                        key={tool.name}
                        className="rounded-lg px-3 py-2.5"
                        style={{
                          backgroundColor: isSupplier && hlShareCard ? "#161820" : "#111111",
                          border: `1px solid ${isSupplier && hlShareCard ? "#2a2e4a" : "#1c1c1c"}`,
                          transition: "all 0.18s ease",
                          position: "relative",
                        }}
                      >
                        <div className="flex items-start justify-between mb-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px]" style={{ color: "#333333" }}>{tool.icon}</span>
                            <p className="text-[10px] font-semibold leading-tight" style={{ color: "#d8d8d8" }}>
                              {tool.name}
                            </p>
                          </div>
                          {/* Share button — glows on Supplier Metrics */}
                          <button
                            className="flex items-center justify-center w-5 h-5 rounded flex-shrink-0"
                            style={{
                              backgroundColor: isSupplier && hlShareCard ? "#1e2238" : "transparent",
                              border: `1px solid ${isSupplier && hlShareCard ? "#3b82f6" : "transparent"}`,
                              color: isSupplier && hlShareCard ? "#93c5fd" : "#333333",
                              transition: "all 0.18s ease",
                              boxShadow: isSupplier && hlShareCard ? "0 0 8px rgba(59,130,246,0.3)" : "none",
                            }}
                          >
                            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                            </svg>
                          </button>
                        </div>
                        <p className="text-[8.5px] mb-2 leading-snug" style={{ color: "#4a4a4a" }}>{tool.desc}</p>
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#2a2a2a" }} />
                          <span className="text-[8px]" style={{ color: "#383838" }}>Viewed {tool.age}</span>
                          {i === 0 && saved && (
                            <svg className="ml-auto flex-shrink-0" width="8" height="8" viewBox="0 0 24 24" fill="#22c55e" stroke="none">
                              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                            </svg>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Share dropdown — anchored to top-right of first card */}
                <div
                  style={{
                    position: "absolute",
                    top: 76,
                    right: 14,
                    opacity: shareMenuOpen ? 1 : 0,
                    transform: shareMenuOpen ? "translateY(0) scale(1)" : "translateY(-4px) scale(0.97)",
                    transition: "opacity 0.16s ease, transform 0.16s ease",
                    pointerEvents: shareMenuOpen ? "auto" : "none",
                    zIndex: 20,
                  }}
                >
                  <div
                    className="rounded-xl py-1.5 overflow-hidden text-left"
                    style={{
                      backgroundColor: "#141414",
                      border: "1px solid #2a2a2a",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.7)",
                      minWidth: 152,
                    }}
                  >
                    {[
                      { label: "Copy link",     sub: "Copy shareable URL", slack: false },
                      { label: "Share to Slack",sub: "Post to a channel",  slack: true  },
                      { label: "Share to Teams",sub: "Post to MS Teams",   slack: false },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center gap-1.5 px-3 py-1.5 cursor-pointer"
                        style={{ backgroundColor: hlSlackItem && item.slack ? "#1a1a28" : "transparent", transition: "background-color 0.15s ease" }}
                      >
                        <div className="w-[14px] h-[14px] rounded flex items-center justify-center flex-shrink-0" style={{ backgroundColor: item.slack ? "#4A154B" : "transparent" }}>
                          {item.slack ? (
                            <span className="text-[8px] font-black" style={{ color: "#fff", lineHeight: 1 }}>#</span>
                          ) : (
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
                          )}
                        </div>
                        <div>
                          <p className="text-[10px] font-medium leading-tight" style={{ color: hlSlackItem && item.slack ? "#c4b5fd" : "#aaaaaa" }}>{item.label}</p>
                          <p className="text-[8px] leading-tight" style={{ color: "#444444" }}>{item.sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Slack app window overlay ── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 40,
              opacity: slackWindowOpen ? 1 : 0,
              transform: slackWindowOpen ? "translateY(0)" : "translateY(100%)",
              transition: "opacity 0.28s ease, transform 0.32s cubic-bezier(0.32,0,0,1)",
              pointerEvents: slackWindowOpen ? "auto" : "none",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#1a1124",
            }}
          >
            {/* Slack title bar */}
            <div
              className="flex items-center gap-3 px-4 flex-shrink-0 border-b"
              style={{ height: 32, backgroundColor: "#1a1124", borderColor: "#2d1f3d" }}
            >
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#3d2a50" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#3d2a50" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#3d2a50" }} />
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded flex items-center justify-center text-[8px] font-black flex-shrink-0" style={{ backgroundColor: "#4A154B", color: "#fff" }}>#</div>
                <span className="text-[10px] font-semibold" style={{ color: "#c9b8e8" }}></span>
                <span className="text-[10px]" style={{ color: "#6b5580" }}>—</span>
                <span className="text-[10px]" style={{ color: "#7c6a94" }}>#manufacturing-team</span>
              </div>
            </div>

            {/* Slack body */}
            <div className="flex flex-1 overflow-hidden">
              {/* Left sidebar */}
              <div
                className="flex flex-col flex-shrink-0 border-r"
                style={{ width: 148, backgroundColor: "#1a1124", borderColor: "#2d1f3d" }}
              >
                {/* Workspace */}
                <div className="flex items-center gap-2 px-3 py-2.5 border-b" style={{ borderColor: "#2d1f3d" }}>
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center text-[9px] font-black flex-shrink-0" style={{ backgroundColor: "#4A154B", color: "#fff" }}>A</div>
                  <span className="text-[10px] font-bold truncate" style={{ color: "#d4c5e8" }}>Apex Manufacturing</span>
                </div>
                {/* Channels */}
                <div className="flex-1 px-2 pt-2 overflow-hidden">
                  <p className="text-[8px] uppercase font-semibold tracking-widest px-1 mb-1" style={{ color: "#6b5580" }}>Channels</p>
                  {[
                    { name: "general",            active: false },
                    { name: "manufacturing-team", active: true  },
                    { name: "engineering",        active: false },
                    { name: "ops-alerts",         active: false },
                    { name: "supplier-mgmt",      active: false },
                  ].map((ch) => (
                    <div
                      key={ch.name}
                      className="flex items-center gap-1.5 px-1.5 py-1 rounded text-[10px] mb-0.5"
                      style={{
                        color: ch.active ? "#f0eaff" : "#7c6a94",
                        backgroundColor: ch.active ? "#4A154B55" : "transparent",
                        fontWeight: ch.active ? 600 : 400,
                      }}
                    >
                      <span style={{ color: ch.active ? "#b39dcc" : "#4a3860" }}>#</span>
                      <span className="truncate">{ch.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Main chat area */}
              <div
                className="flex flex-col flex-1 overflow-hidden"
                style={{ backgroundColor: "#1d1d1d" }}
              >
                {/* Channel header */}
                <div className="flex items-center gap-2 px-3 border-b flex-shrink-0" style={{ height: 36, borderColor: "#272727" }}>
                  <span className="text-[11px] font-bold" style={{ color: "#e0e0e0" }}># manufacturing-team</span>
                  <span className="text-[9px]" style={{ color: "#555555" }}>· 14 members</span>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-hidden px-3 py-2 flex flex-col justify-end gap-2">
                  {/* Prior messages */}
                  {PRIOR_MSGS.map((msg) => (
                    <div key={msg.user} className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 text-[8px] font-bold mt-0.5" style={{ backgroundColor: "#2a2a2a", color: "#888" }}>
                        {msg.user.split(" ").map((w) => w[0]).join("")}
                      </div>
                      <div>
                        <div className="flex items-baseline gap-1.5 mb-0.5">
                          <span className="text-[10px] font-semibold" style={{ color: "#d0d0d0" }}>{msg.user}</span>
                          <span className="text-[8px]" style={{ color: "#444444" }}>{msg.time}</span>
                        </div>
                        <p className="text-[10px] leading-relaxed" style={{ color: "#888888" }}>{msg.text}</p>
                      </div>
                    </div>
                  ))}

                  {/* New message from "You" */}
                  {slackSent && (
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 text-[8px] font-bold mt-0.5" style={{ backgroundColor: "#2a3a4a", color: "#7ab8e8" }}>
                        JP
                      </div>
                      <div>
                        <div className="flex items-baseline gap-1.5 mb-0.5">
                          <span className="text-[10px] font-semibold" style={{ color: "#d0d0d0" }}>You</span>
                          <span className="text-[8px]" style={{ color: "#444444" }}>just now</span>
                        </div>
                        <p className="text-[10px] leading-relaxed mb-1" style={{ color: "#aaaaaa" }}>{SLACK_MSG}</p>
                        {/* Satori link card */}
                        <div className="rounded-lg px-2.5 py-2" style={{ backgroundColor: "#252525", border: "1px solid #333333", maxWidth: 200 }}>
                          <div className="flex items-center gap-1.5 mb-1">
                            <div className="w-3 h-3 rounded flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#1e1e1e", border: "1px solid #303030" }}>
                              <span className="text-[7px] font-black" style={{ color: "#e0e0e0" }}>S</span>
                            </div>
                            <span className="text-[8px] font-semibold" style={{ color: "#888888" }}>Satori</span>
                          </div>
                          <p className="text-[9px] font-semibold leading-tight" style={{ color: "#d0d0d0" }}>Supplier Metrics</p>
                          <p className="text-[8px] leading-tight mt-0.5" style={{ color: "#555555" }}>app.satori.ai/tools/supplier-metrics</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Compose box */}
                <div className="flex-shrink-0 px-3 pb-3">
                  <div
                    className="rounded-lg px-3 py-2"
                    style={{
                      backgroundColor: "#272727",
                      border: "1px solid #333333",
                    }}
                  >
                    <div className="text-[10px] min-h-[20px] text-left" style={{ color: "#cccccc", lineHeight: 1.5 }}>
                      {slackSent ? (
                        <span style={{ color: "#444444" }}>Message #manufacturing-team</span>
                      ) : typedChars > 0 ? (
                        <>
                          <span>{SLACK_MSG.slice(0, typedChars)}</span>
                          <span
                            className="inline-block w-[1.5px] h-[11px] ml-px align-middle"
                            style={{ backgroundColor: "#888888", animation: "pulse 1s ease-in-out infinite" }}
                          />
                        </>
                      ) : (
                        <span style={{ color: "#444444" }}>Message #manufacturing-team</span>
                      )}
                    </div>
                    {(typedChars > 0 || slackSent) && (
                      <div className="flex items-center justify-end mt-1.5">
                        <button
                          className="flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-semibold"
                          style={{
                            backgroundColor: slackSent ? "#1a4a2a" : hlSend ? "#1a6b43" : "#007a5a",
                            color: slackSent ? "#4ade80" : "#ffffff",
                            border: "none",
                            transition: "all 0.15s ease",
                            transform: hlSend ? "scale(0.97)" : "scale(1)",
                          }}
                        >
                          {slackSent ? (
                            <>
                              <svg width="8" height="8" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6l3 3 5-5" /></svg>
                              Sent
                            </>
                          ) : (
                            <>
                              Send
                              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>{/* /app shell */}
      </div>
    </div>
  );
}
