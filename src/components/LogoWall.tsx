"use client";

import { CSSProperties } from "react";

const logoStyles: Record<string, CSSProperties> = {
  wrap: { paddingTop: 40, paddingBottom: 40 },
  label: {
    textAlign: "center",
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    fontSize: 11, color: "#666",
    letterSpacing: "0.12em", textTransform: "uppercase",
    marginBottom: 20,
  },
  marquee: {
    position: "relative",
    overflow: "hidden",
    maskImage: "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
    WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
  },
  row: { display: "flex", gap: 12, width: "max-content", willChange: "transform" },
  chip: {
    flexShrink: 0,
    display: "flex", alignItems: "center", gap: 12,
    padding: "14px 22px",
    border: "1px solid #1F1F1F",
    borderRadius: 6,
    background: "#080808",
    color: "#EDEDED",
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: "-0.005em",
    whiteSpace: "nowrap",
  },
  logo: {
    width: 22,
    height: 22,
    objectFit: "contain",
    flexShrink: 0,
  },
};

type Logo = { name: string; src: string };

// Split into two rows so the marquee feels denser and the animations can
// run in opposite directions. Order is intentional so no two similar
// brands (e.g., all Google products) sit back-to-back in the same row.
const ROW_A: Logo[] = [
  { name: "PostgreSQL",   src: "/logos/postgresql.svg" },
  { name: "Snowflake",    src: "/logos/snowflake.svg" },
  { name: "SAP",          src: "/logos/sap.svg" },
  { name: "Google Drive", src: "/logos/google-drive.svg" },
  { name: "BigQuery",     src: "/logos/bigquery.svg" },
  { name: "Oracle",       src: "/logos/oracle.svg" },
  { name: "QuickBooks",   src: "/logos/quickbooks.svg" },
];

const ROW_B: Logo[] = [
  { name: "MySQL",         src: "/logos/mysql.svg" },
  { name: "Databricks",    src: "/logos/databricks.svg" },
  { name: "SQL Server",    src: "/logos/sqlserver.svg" },
  { name: "Redshift",      src: "/logos/redshift.svg" },
  { name: "Google Sheets", src: "/logos/google-sheets.svg" },
  { name: "Epicor",        src: "/logos/epicor.svg" },
];

const MARQUEE_ROWS = [ROW_A, ROW_B];

export default function LogoWall() {
  return (
    <section style={logoStyles.wrap}>
      <div className="container">
        <div style={logoStyles.label}>UNITES EVERY ORGANIZATIONAL SOFTWARE</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
        {MARQUEE_ROWS.map((row, idx) => (
          <LogoMarqueeRow
            key={idx}
            items={row}
            duration={idx === 0 ? 38 : 48}
            reverse={idx === 1}
            // Offset row B by ~40% of its cycle so at page load the chips are
            // horizontally staggered, not vertically stacked, against row A.
            delay={idx === 1 ? -19 : 0}
          />
        ))}
      </div>
    </section>
  );
}

function LogoMarqueeRow({ items, duration = 60, reverse = false, delay = 0 }: { items: Logo[]; duration?: number; reverse?: boolean; delay?: number }) {
  // Duplicate so the translation can loop seamlessly.
  const doubled = [...items, ...items];
  const animName = `logo-marquee-${reverse ? "rev" : "fwd"}`;
  return (
    <div style={logoStyles.marquee}>
      <div style={{
        ...logoStyles.row,
        animation: `${animName} ${duration}s linear infinite`,
        animationDelay: `${delay}s`,
      }}>
        {doubled.map((logo, i) => (
          <div key={`${logo.name}-${i}`} style={logoStyles.chip}>
            {/* Using a plain <img> for SVG assets: Next's Image component adds
                no real value for tiny static SVGs and requires explicit width/height. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo.src}
              alt={`${logo.name} logo`}
              style={logoStyles.logo}
              loading="lazy"
              decoding="async"
            />
            <span>{logo.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
