"use client";

import Image from "next/image";
import { useIsMobile } from "./useViewport";

type TeamCardProps = {
  name: string;
  role: string;
  linkedin: string;
  photo: string;
};

function TeamCard({ name, role, linkedin, photo }: TeamCardProps) {
  return (
    <div className="team-card">
      <div className="team-card-photo">
        <Image
          src={photo}
          alt={name}
          width={72}
          height={72}
          className="team-card-photo-img"
        />
      </div>
      <div className="team-card-name">{name}</div>
      <div className="team-card-role">{role}</div>
      <a href={linkedin} target="_blank" rel="noopener" className="team-card-link" aria-label={`${name} on LinkedIn`}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z" />
        </svg>
        LinkedIn
      </a>
    </div>
  );
}

export function TeamSection() {
  const isMobile = useIsMobile();
  return (
    <section
      id="about"
      className="section"
      style={{
        paddingTop: isMobile ? 72 : 160,
        paddingBottom: isMobile ? 88 : 200,
      }}
    >
      <div className="container">
        <div style={{ textAlign: "center", maxWidth: 780, margin: "0 auto" }}>
          <h2 className="h-xl">
            Meet the <span style={{ color: "#14b8a6" }}>founding team</span>.
          </h2>
        </div>
        <div className="team-grid">
          <TeamCard
            name="Arnav Shah"
            role="Co-founder & CEO"
            linkedin="https://linkedin.com/in/arnav-ashah"
            photo="/arnav_pic.jpeg"
          />
          <TeamCard
            name="Ethan Palosh"
            role="Co-founder & CTO"
            linkedin="https://linkedin.com/in/ethanpalosh"
            photo="/ethan_pic.jpeg"
          />
        </div>
      </div>
    </section>
  );
}

export function InvestorsSection() {
  const isMobile = useIsMobile();
  return (
    <section
      id="investors"
      className="investors-slim"
      style={{
        paddingTop: isMobile ? 64 : 160,
        paddingBottom: isMobile ? 64 : 160,
      }}
    >
      <div className="container">
        <div className="investors-slim-inner">
          <span className="investors-slim-tag">INVESTORS</span>
          <p className="investors-slim-copy">
            For partnership inquiries — <a href="mailto:invest@satori-inference.com">invest@satori-inference.com</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
