"use client";

import { motion } from "framer-motion";

const capabilities = [
  {
    title: "Live Data Connections",
    description: "Seamlessly connect to your ERP, MES, and shop databases in minutes. Satori runs on real-time data grounded in your production systems.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    title: "Natural Language Queries",
    description: "Ask questions in plain English. No engineering technical barrier for detailed analysis of production, quality, and supplier data.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    title: "Agentic Analysis",
    description: "Our secure AI agents plan, query, and synthesize insights automatically. Satori delivers frontier agentic technology to business operations.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
  },
  
];

export default function CapabilitiesSection() {
  return (
    <section className="py-24 px-6 md:px-10" style={{ backgroundColor: "#f5f5f5", backgroundImage: "repeating-linear-gradient(45deg, rgba(0,0,0,0.055) 0px, rgba(0,0,0,0.055) 1px, transparent 1px, transparent 44px), repeating-linear-gradient(-45deg, rgba(0,0,0,0.055) 0px, rgba(0,0,0,0.055) 1px, transparent 1px, transparent 44px)" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-label font-medium uppercase mb-3" style={{ color: "#999999" }}>
            From day one
          </p>
          <h2 className="font-bold" style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", color: "#111111", letterSpacing: "-0.02em" }}>
            Built to enable data-driven operations, at scale
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-xl p-8"
              style={{ backgroundColor: "#ffffff", border: "1px solid #e5e5e5" }}
            >
              <div className="mb-5" style={{ color: "#111111" }}>
                {cap.icon}
              </div>
              <h3 className="font-semibold mb-3 text-base" style={{ color: "#111111" }}>
                {cap.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#666666" }}>
                {cap.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
