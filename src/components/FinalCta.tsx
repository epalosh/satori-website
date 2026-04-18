"use client";

import { useIsMobile } from "./useViewport";

export default function FinalCta({ demoUrl }: { demoUrl: string }) {
  const isMobile = useIsMobile();
  return (
    <section className="section">
      <div className="container">
        <div style={{
          position: "relative",
          border: "1px solid #14b8a6",
          borderRadius: 6,
          padding: isMobile ? "48px 20px" : "80px 48px",
          textAlign: "center",
          background: "radial-gradient(ellipse at 50% 0%, rgba(20,184,166,0.15) 0%, transparent 60%), #050505",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: `
              linear-gradient(to right, rgba(20,184,166,0.06) 1px, transparent 1px) 0 0 / 32px 32px,
              linear-gradient(to bottom, rgba(20,184,166,0.06) 1px, transparent 1px) 0 0 / 32px 32px
            `,
            maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 70%)",
          }} />
          <div style={{ position: "relative" }}>
            <h2 className="h-display" style={{ marginTop: 24, fontSize: isMobile ? "clamp(28px, 7.5vw, 40px)" : "clamp(36px, 4.4vw, 58px)" }}>
              {isMobile ? (
                <>Build powerful analytics tools your team needs today. <span style={{ color: "#14b8a6" }}>Not next month.</span></>
              ) : (
                <>Build powerful analytics tools your team needs today.<br /><span style={{ color: "#14b8a6" }}>Not next month.</span></>
              )}
            </h2>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 32, flexWrap: "wrap" }}>
              <a href={demoUrl} className="btn btn-teal btn-lg">Book a demo →</a>
              <a href="https://app.satori-inference.com" target="_blank" rel="noopener" className="btn btn-ghost btn-lg">Try the live demo</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
