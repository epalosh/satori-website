"use client";

import SatoriMark from "./SatoriMark";
import { useIsMobile } from "./useViewport";

type FooterLink = { label: string; href: string; external?: boolean };

const PRODUCT_LINKS: FooterLink[] = [
  { label: "How it works", href: "#how" },
  { label: "Live demo", href: "https://app.satori-inference.com", external: true },
  { label: "Security", href: "#security" },
];

const COMPANY_LINKS: FooterLink[] = [
  { label: "About", href: "#about" },
  { label: "Investors", href: "#investors" },
];

export default function Footer() {
  const isMobile = useIsMobile();
  return (
    <footer style={{ borderTop: "1px solid #1F1F1F", padding: isMobile ? "36px 0 28px" : "48px 0 32px", background: "#030303" }}>
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : "1.6fr 1fr 1fr 1.1fr",
          gap: isMobile ? 28 : 32,
        }}>
          <div style={{ gridColumn: isMobile ? "span 2" : "auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <SatoriMark size={22} />
              <span style={{ fontSize: 15, fontWeight: 600, color: "#EDEDED" }}>Satori Inference</span>
            </div>
            <p style={{ fontSize: 13, color: "#666", marginTop: 14, maxWidth: 320, lineHeight: 1.55 }}>
              The agentic data platform for manufacturing.
            </p>
          </div>

          <FooterColumn title="PRODUCT" links={PRODUCT_LINKS} />
          <FooterColumn title="COMPANY" links={COMPANY_LINKS} />

          <div style={{ gridColumn: isMobile ? "span 2" : "auto" }}>
            <div style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 10, color: "#666", letterSpacing: "0.12em", marginBottom: 14 }}>SPECIAL THANKS</div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
              <li>
                <a href="https://www.linkedin.com/in/tongfeiz" target="_blank" rel="noopener"
                   style={{ fontSize: 13, color: "#A1A1A1", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
                  Tongfei Zhu
                  <span style={{ color: "#555", fontSize: 11 }}>↗</span>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/maya-parthasarathy" target="_blank" rel="noopener"
                   style={{ fontSize: 13, color: "#A1A1A1", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
                  Maya Parthasarathy
                  <span style={{ color: "#555", fontSize: 11 }}>↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div style={{
          marginTop: isMobile ? 32 : 48,
          paddingTop: 20,
          borderTop: "1px solid #1F1F1F",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          gap: isMobile ? 8 : 0,
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: 10, color: "#555", letterSpacing: "0.06em",
        }}>
          <span>© 2026 SATORI INFERENCE · ALL RIGHTS RESERVED</span>
          <span>BUILD 2026.04.17 · STATUS <span style={{ color: "#22c55e" }}>● OPERATIONAL</span></span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <div style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 10, color: "#666", letterSpacing: "0.12em", marginBottom: 14 }}>{title}</div>
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
        {links.map(l => (
          <li key={l.label}>
            <a
              href={l.href}
              {...(l.external ? { target: "_blank", rel: "noopener" } : {})}
              style={{
                fontSize: 13,
                color: "#A1A1A1",
                textDecoration: "none",
                transition: "color 140ms",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#EDEDED"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#A1A1A1"; }}
            >
              {l.label}
              {l.external && <span style={{ color: "#555", fontSize: 11 }}>↗</span>}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
