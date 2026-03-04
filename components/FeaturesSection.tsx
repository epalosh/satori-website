type IconType = "sql" | "databricks" | "snowflake" | "docs" | "shield" | "api";

const dataSources: { label: string; color: string; icon: IconType }[] = [
  { label: "SQL Database", color: "#6b7280", icon: "sql"        },
  { label: "Custom APIs",  color: "#6b7280", icon: "api"        },
  { label: "Databricks",   color: "#E87040", icon: "databricks" },
  { label: "Snowflake",    color: "#29B5E8", icon: "snowflake"  },
  { label: "Documents",    color: "#6b7280", icon: "docs"       },
  { label: "Internal Data",color: "#6b7280", icon: "shield"     },
];

// ── Layout constants ───────────────────────────────────────────────────────────
const CARD_X   = 8;
const CARD_W   = 118;
const CARD_H   = 56;
const CARD_GAP = 8;
const CARD_CX  = CARD_X + CARD_W / 2;  // 67
const CARD_R   = CARD_X + CARD_W;      // 126

const SI_X  = 280;
const SI_W  = 110;
const SI_H  = 155;
const SI_CY = 200;                      // vertical center
const SI_Y  = SI_CY - SI_H / 2;        // 122.5
const SI_CX = SI_X + SI_W / 2;         // 335
const SI_R  = SI_X + SI_W;             // 390

// Dashboard — sized to image aspect ratio (974×740 = 1.316:1)
const DASH_X = 470;
const DASH_W = 375;
const DASH_H = Math.round(DASH_W * (740 / 974)); // ≈ 285
const DASH_Y = SI_CY - Math.round(DASH_H / 2);   // ≈ 57

// 6 cards × 56px + 5 gaps × 8px = 376px total → start at 200-188=12
function cardTop(i: number)    { return 12 + i * (CARD_H + CARD_GAP); }
function cardCenter(i: number) { return cardTop(i) + CARD_H / 2; }

function DataIcon({ type, color }: { type: IconType; color: string }) {
  switch (type) {
    case "sql":
      return (
        <>
          <ellipse cx="0" cy="-7" rx="9" ry="3" fill="none" stroke={color} strokeWidth="1.5" />
          <path d="M-9,-7 L-9,7"  fill="none" stroke={color} strokeWidth="1.5" />
          <path d="M9,-7 L9,7"    fill="none" stroke={color} strokeWidth="1.5" />
          <ellipse cx="0" cy="7" rx="9" ry="3" fill="none" stroke={color} strokeWidth="1.5" />
          <path d="M-9,0 A9,3 0 0,0 9,0" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
        </>
      );
    case "databricks":
      return <image href="/databricks-logo.svg" x="-11" y="-11" width="22" height="22" />;
    case "snowflake":
      return <image href="/snowflake-logo.svg" x="-11" y="-11" width="22" height="22" />;
    case "docs":
      return (
        <>
          <path d="M-7,-10 L4,-10 L9,-5 L9,10 L-7,10 Z"
            fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M4,-10 L4,-5 L9,-5"
            fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
          <line x1="-3.5" y1="-1" x2="5.5" y2="-1" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
          <line x1="-3.5" y1="3"  x2="5.5" y2="3"  stroke={color} strokeWidth="1.2" strokeLinecap="round" />
          <line x1="-3.5" y1="7"  x2="1.5" y2="7"  stroke={color} strokeWidth="1.2" strokeLinecap="round" />
        </>
      );
    case "shield":
      return (
        <>
          <path d="M0,-11 L9,-6.5 L9,1 C9,6.5 5,10 0,12 C-5,10 -9,6.5 -9,1 L-9,-6.5 Z"
            fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="0" cy="-1.5" r="1.8" fill="none" stroke={color} strokeWidth="1.2" />
          <line x1="0" y1="0.3" x2="0" y2="3.8" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
        </>
      );
    case "api":
    default:
      return (
        <>
          <path d="M-9,-5 L-4,0 L-9,5" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9,-5 L4,0 L9,5"    fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="-1.5" y1="7" x2="1.5" y2="-7" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
        </>
      );
  }
}

export default function FeaturesSection() {
  return (
    <section
      className="py-24 px-6 md:px-10"
      style={{
        backgroundColor: "#0a0a0a",
        boxShadow: "0 -28px 60px rgba(0,0,0,0.32), 0 28px 60px rgba(0,0,0,0.32)",
        position: "relative",
        zIndex: 1,
      }}
    >
      <style>{`
        @keyframes dashFlow {
          to { stroke-dashoffset: -18; }
        }
        @keyframes fadeBlip {
          0%, 100% { opacity: 0.15; }
          50%       { opacity: 0.65; }
        }
        .flow-line {
          stroke-dasharray: 4 14;
          animation: dashFlow 2s linear infinite;
        }
        .blip-1 { animation: fadeBlip 2.4s ease-in-out infinite; }
        .blip-2 { animation: fadeBlip 2.4s ease-in-out 0.8s infinite; }
        .blip-3 { animation: fadeBlip 2.4s ease-in-out 1.6s infinite; }
      `}</style>

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-14">
          <p
            className="text-xs font-medium tracking-widest uppercase mb-3"
            style={{ color: "#6b7280" }}
          >
            With Satori...
          </p>
          <h2 className="text-3xl font-bold" style={{ color: "#ffffff" }}>
            Extract BI from latent data.
            <br className="hidden sm:block" />
            Without hiring a software engineer.
          </h2>
        </div>

        {/* ── Flow diagram — horizontal left → right ── */}
        <div style={{ width: "100%", maxWidth: "900px", margin: "0 auto" }}>
          <svg
            viewBox="0 0 865 420"
            style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <clipPath id="dashClip">
                <rect x={DASH_X} y={DASH_Y} width={DASH_W} height={DASH_H} rx={6} />
              </clipPath>
              <filter id="dashGlow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="18" result="blur" />
              </filter>
            </defs>

            {/* ══════════════════════════════════════
                BACKGROUND TRACK LINES
            ══════════════════════════════════════ */}
            {dataSources.map((_, i) => {
              const cy = cardCenter(i);
              return (
                <path
                  key={`track-${i}`}
                  d={`M ${CARD_R} ${cy} C ${(CARD_R + SI_X) / 2} ${cy} ${(CARD_R + SI_X) / 2} ${SI_CY} ${SI_X} ${SI_CY}`}
                  fill="none" stroke="#1e1e1e" strokeWidth="1.5"
                />
              );
            })}
            <line x1={SI_R} y1={SI_CY} x2={DASH_X} y2={SI_CY} stroke="#1e1e1e" strokeWidth="1.5" />

            {/* ══════════════════════════════════════
                ANIMATED FLOW LINES
            ══════════════════════════════════════ */}
            {dataSources.map((_, i) => {
              const cy = cardCenter(i);
              return (
                <path
                  key={`flow-${i}`}
                  className="flow-line"
                  d={`M ${CARD_R} ${cy} C ${(CARD_R + SI_X) / 2} ${cy} ${(CARD_R + SI_X) / 2} ${SI_CY} ${SI_X} ${SI_CY}`}
                  fill="none" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round"
                  style={{ animationDelay: `${i * 0.4}s` }}
                />
              );
            })}
            <line
              className="flow-line"
              x1={SI_R} y1={SI_CY} x2={DASH_X} y2={SI_CY}
              stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round"
            />

            {/* ══════════════════════════════════════
                CONNECTOR DOTS
            ══════════════════════════════════════ */}
            {dataSources.map((_, i) => (
              <circle key={`cdot-${i}`} cx={CARD_R} cy={cardCenter(i)} r="2.5"
                fill="#0a0a0a" stroke="#3a3a3a" strokeWidth="1.2" />
            ))}
            <circle cx={SI_X} cy={SI_CY} r="3" fill="#4b5563" />
            <circle cx={SI_R} cy={SI_CY} r="3" fill="#4b5563" />
            <polygon points={`${DASH_X},${SI_CY - 4} ${DASH_X},${SI_CY + 4} ${DASH_X + 7},${SI_CY}`} fill="#4b5563" />

            {/* ══════════════════════════════════════
                DATA SOURCE CARDS
            ══════════════════════════════════════ */}
            {dataSources.map(({ label, color, icon }, i) => {
              const yTop   = cardTop(i);
              const iconY  = yTop + 19;
              const labelY = yTop + 47;
              return (
                <g key={label}>
                  <rect x={CARD_X} y={yTop} width={CARD_W} height={CARD_H} rx={6}
                    fill="#111111" stroke="#2a2a2a" strokeWidth="1" />
                  <g transform={`translate(${CARD_CX}, ${iconY})`}>
                    <DataIcon type={icon} color={color} />
                  </g>
                  <text x={CARD_CX} y={labelY} textAnchor="middle"
                    fill="#6b7280" fontSize="10.5"
                    fontFamily="Inter, -apple-system, sans-serif" fontWeight="500">
                    {label}
                  </text>
                </g>
              );
            })}

            {/* ══════════════════════════════════════
                SATORI INFERENCE — white card
            ══════════════════════════════════════ */}
            <g>
              <rect x={SI_X} y={SI_Y} width={SI_W} height={SI_H} rx={8} fill="#0d1f42" stroke="#1d4ed8" strokeWidth="1" />
              <text x={SI_CX} y={SI_Y + 70} textAnchor="middle"
                fill="#f9f9f9" fontSize="17" letterSpacing="-0.5"
                fontFamily="Inter, -apple-system, sans-serif" fontWeight="700">
                Satori
              </text>
              <line x1={SI_CX - 20} y1={SI_Y + 80} x2={SI_CX + 20} y2={SI_Y + 80} stroke="#1d4ed8" strokeWidth="1" />
              <text x={SI_CX} y={SI_Y + 96} textAnchor="middle"
                fill="#60a5fa" fontSize="8.5"
                fontFamily="Inter, -apple-system, sans-serif" fontWeight="400">
                Agentic Engine
              </text>
              <circle cx={SI_CX - 13} cy={SI_Y + 124} r="2" fill="#3b82f6" className="blip-1" />
              <circle cx={SI_CX}      cy={SI_Y + 124} r="2" fill="#3b82f6" className="blip-2" />
              <circle cx={SI_CX + 13} cy={SI_Y + 124} r="2" fill="#3b82f6" className="blip-3" />
            </g>

            {/* ══════════════════════════════════════
                DASHBOARD — real screenshot, clipped
            ══════════════════════════════════════ */}
            <g>
              {/* White glow behind dashboard */}
              <rect
                x={DASH_X - 16} y={DASH_Y - 16}
                width={DASH_W + 32} height={DASH_H + 32}
                rx={14} fill="grey" opacity={0.2}
                filter="url(#dashGlow)"
              />
              <image
                href="/dashboard-preview.png"
                x={DASH_X - 7} y={DASH_Y - 6}
                width={DASH_W + 14} height={Math.round((DASH_W + 14) * (740 / 974))}
                clipPath="url(#dashClip)"
                preserveAspectRatio="none"
              />
              <rect x={DASH_X} y={DASH_Y} width={DASH_W} height={DASH_H} rx={6}
                fill="none" stroke="#e5e7eb" strokeWidth="1" />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
