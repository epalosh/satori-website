"use client";

import { motion } from "framer-motion";
import ProductDemo from "./ProductDemo";

export default function DemoShowcase() {
  return (
    <section className="py-24 px-6 relative overflow-hidden" style={{ backgroundColor: "transparent" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 70%)" }}
      />
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-label font-medium uppercase mb-3" style={{ color: "#555555" }}>
            See it in action
          </p>
          <h2 className="font-bold mb-4" style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", color: "#f2f2f2", letterSpacing: "-0.02em" }}>
            Save, share, and collaborate on insights.
          </h2>
          <p className="text-base mb-12" style={{ color: "#888888" }}>
            Data analysis in Satori is custom and scalable, just like software. Save a tool to your library to be reused, or share it straight to your team via a link.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ filter: "drop-shadow(0 0 80px rgba(255,255,255,0.05))" }}
        >
          <ProductDemo />
        </motion.div>
      </div>
    </section>
  );
}
