"use client";

import { motion } from "framer-motion";

export default function CTASection({ onBookDemo }: { onBookDemo?: () => void }) {
  return (
    <section
      id="book-demo"
      className="relative pt-32 pb-48 px-6 text-center overflow-hidden"
      style={{ backgroundColor: "transparent" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)" }}
      />
      <div className="relative z-10 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-label font-medium uppercase mb-4" style={{ color: "#555555" }}>
            Get started
          </p>
          <h2
            className="font-bold mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#f2f2f2", letterSpacing: "-0.03em", lineHeight: 1.1 }}
          >
            Interested? Book a product demo.
          </h2>
          <p className="text-base leading-relaxed mb-10 max-w-md mx-auto" style={{ color: "#888888" }}>
            No commitment required. We promise to blow your mind!
          </p>
          <button
            onClick={onBookDemo}
            className="h-12 px-8 bg-white text-black text-sm font-semibold rounded cursor-pointer hover:bg-gray-100 transition-colors"
          >
            Book a Demo →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
