"use client";

import { CSSProperties, ReactNode } from "react";
import { useIsMobile } from "./useViewport";

const featStyles: Record<string, CSSProperties> = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gap: 16,
    marginTop: 48,
  },
  card: {
    border: "1px solid #1F1F1F",
    borderRadius: 4,
    padding: 28,
    background: "#070707",
    display: "flex", flexDirection: "column", gap: 16,
    transition: "border-color 120ms, background 120ms",
    cursor: "default",
    overflow: "hidden",
    position: "relative",
  },
  cardTitle: { fontSize: 20, fontWeight: 600, color: "#EDEDED", letterSpacing: "-0.015em" },
  cardBody: { fontSize: 14, color: "#A1A1A1", lineHeight: 1.55, maxWidth: 520 },
  tag: {
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    fontSize: 10, letterSpacing: "0.1em",
    color: "#14b8a6",
  },
};

export default function Features() {
  const isMobile = useIsMobile();
  return (
    <section className="section">
      <div className="container">
        <div style={{ textAlign: isMobile ? "center" : "left", maxWidth: 820, marginLeft: isMobile ? "auto" : 0, marginRight: isMobile ? "auto" : 0, marginBottom: isMobile ? 32 : 48 }}>
          <h2 className="h-xl">
            Seamlessly integrates into <span style={{ color: "#14b8a6" }}>your existing workflows</span>.
          </h2>
          <p className="p-lg" style={{ marginTop: 16, color: "#A1A1A1" }}>
            Satori Inference delivers value from day one, without changing to your existing software stack.
          </p>
        </div>
        <div style={{
          ...featStyles.grid,
          gridTemplateColumns: isMobile ? "1fr" : "repeat(12, 1fr)",
          marginTop: 0,
        }}>
          <FeatureCard span={5} mobile={isMobile} tag="MODERNIZE" title="Replace aging systems — without ripping them out" body="Extend or replace inflexible legacy interfaces with clean modern UIs, AI automation, and custom logic.">
            <FeatureModernVisual />
          </FeatureCard>
          <FeatureCard span={7} mobile={isMobile} tag="SECURITY" title="Enterprise-grade security, from day one" body="Every customer runs in an isolated tenant with encrypted data and audited access. SOC 2 Type II certification is on the roadmap; we have every underlying control already in place." id="security">
            <FeatureSecurityVisual />
          </FeatureCard>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ span, tag, title, body, children, mobile, id }:
  { span: number; tag: string; title: string; body: string; children: ReactNode; mobile: boolean; id?: string }) {
  return (
    <div
      id={id}
      style={{
        ...featStyles.card,
        padding: mobile ? 22 : 28,
        gridColumn: mobile ? "auto" : `span ${span}`,
        scrollMarginTop: 80,
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#2a2a2a"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#1F1F1F"; }}
    >
      <div style={featStyles.tag}>{tag}</div>
      <div style={{ ...featStyles.cardTitle, fontSize: mobile ? 18 : 20 }}>{title}</div>
      <div style={featStyles.cardBody}>{body}</div>
      <div style={{ flex: 1, minHeight: mobile ? 140 : 160, marginTop: 12 }}>{children}</div>
    </div>
  );
}

function FeatureModernVisual() {
  return (
    <div style={{ display: "flex", gap: 10, height: "100%" }}>
      <div style={{
        flex: 1, border: "1px solid #1F1F1F", borderRadius: 3, padding: 10,
        background: "#0A0A0A", position: "relative", overflow: "hidden",
      }}>
        <div style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 9, color: "#555", letterSpacing: "0.08em" }}>LEGACY</div>
        <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 4 }}>
          {[...Array(8)].map((_, i) => (
            <div key={i} style={{ height: 6, width: `${40 + (i * 7) % 50}%`, background: "#1F1F1F" }} />
          ))}
        </div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.6))" }} />
      </div>
      <div style={{ display: "flex", alignItems: "center", color: "#14b8a6" }}>→</div>
      <div style={{
        flex: 1, border: "1px solid #14b8a6", borderRadius: 3, padding: 10,
        background: "linear-gradient(180deg, rgba(20,184,166,0.05), #0A0A0A)",
      }}>
        <div style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 9, color: "#14b8a6", letterSpacing: "0.08em" }}>SATORI</div>
        <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ height: 12, background: "#14b8a6", opacity: 0.3, borderRadius: 1 }} />
          <div style={{ height: 6, width: "60%", background: "#2a2a2a", borderRadius: 1 }} />
          <div style={{ height: 6, width: "80%", background: "#2a2a2a", borderRadius: 1 }} />
          <div style={{ height: 6, width: "70%", background: "#2a2a2a", borderRadius: 1 }} />
        </div>
      </div>
    </div>
  );
}

function FeatureSecurityVisual() {
  const isMobile = useIsMobile();
  const tenants = [
    { name: "ACME CORP",        keyId: "k-7f3a", records: "4.2M", accent: "#14b8a6" },
    { name: "NORTH FOUNDRY",    keyId: "k-b19c", records: "1.8M", accent: "#3b82f6" },
    { name: "HARBOR LOGISTICS", keyId: "k-2de4", records: "9.1M", accent: "#ec4899" },
  ];

  return (
    <div style={{
      position: "relative",
      height: "100%",
      minHeight: isMobile ? 260 : 220,
      border: "1px solid #1F1F1F",
      borderRadius: 4,
      background: "radial-gradient(ellipse 80% 60% at 50% 110%, rgba(20,184,166,0.08) 0%, rgba(20,184,166,0) 70%), #070707",
      padding: isMobile ? 14 : 18,
      display: "flex",
      flexDirection: "column",
      gap: 14,
      overflow: "hidden",
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
        gap: isMobile ? 10 : 12,
        flex: 1,
      }}>
        {tenants.map((t, i) => (
          <div key={t.name} style={{
            position: "relative",
            border: "1px solid #1F1F1F",
            borderRadius: 4,
            background: "#0A0A0A",
            padding: "12px 12px 14px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 2,
              background: `linear-gradient(90deg, transparent 0%, ${t.accent} 50%, transparent 100%)`,
              opacity: 0.6,
            }} />

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{
                width: 18, height: 18,
                border: `1px solid ${t.accent}`,
                borderRadius: 3,
                background: "rgba(0,0,0,0.4)",
                display: "grid", placeItems: "center",
                color: t.accent,
                flexShrink: 0,
              }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="11" width="16" height="10" rx="2" />
                  <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                </svg>
              </span>
              <span style={{
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                fontSize: 10, letterSpacing: "0.08em", color: "#EDEDED", fontWeight: 600,
              }}>{t.name}</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {[0, 1, 2, 3].map(r => (
                <div key={r} style={{ display: "flex", gap: 3 }}>
                  {Array.from({ length: 14 }).map((_, c) => {
                    const on = ((i * 7 + r * 3 + c * 5) % 4) !== 0;
                    return (
                      <span key={c} style={{
                        width: 6, height: 4,
                        background: on ? t.accent : "#1a1a1a",
                        opacity: on ? 0.55 : 1,
                        borderRadius: 1,
                      }} />
                    );
                  })}
                </div>
              ))}
            </div>

            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              marginTop: "auto",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: 9, letterSpacing: "0.04em",
            }}>
              <span style={{ color: "#666" }}>KEY {t.keyId}</span>
              <span style={{ color: t.accent }}>{t.records} rec</span>
            </div>
          </div>
        ))}
      </div>

      {!isMobile && (
        <svg width="100%" height="22" viewBox="0 0 300 22" preserveAspectRatio="none" style={{ flexShrink: 0, overflow: "visible" }}>
          {[50, 150, 250].map((x, i) => (
            <g key={i}>
              <path d={`M${x} 0 V 14 H 150 V 22`} stroke="#1F1F1F" strokeWidth="1" fill="none" />
            </g>
          ))}
          <circle cx="150" cy="22" r="2" fill="#14b8a6" />
        </svg>
      )}

      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "10px 14px",
        border: "1px solid rgba(20,184,166,0.3)",
        borderRadius: 4,
        background: "linear-gradient(180deg, rgba(20,184,166,0.08) 0%, rgba(20,184,166,0.02) 100%)",
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        fontSize: 10, letterSpacing: "0.08em",
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3Z" />
        </svg>
        <span style={{ color: "#EDEDED" }}>SATORI PLATFORM</span>
        <span style={{ color: "#666" }}>· AES-256 · TLS 1.3 · SSO · RBAC · AUDIT LOG</span>
      </div>
    </div>
  );
}
