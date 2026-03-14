"use client";

import { motion } from "framer-motion";
import ProductDemoHero from "./ProductDemoHero";

export default function Hero({ onBookDemo }: { onBookDemo?: () => void }) {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-24"
      style={{ backgroundColor: "transparent" }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 30%, rgba(255,255,255,0.04) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-label font-medium uppercase mb-6"
          style={{ color: "#555555" }}
        >
          Manufacturing Intelligence Reimagined
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-bold leading-none tracking-tight mb-6"
          style={{
            fontSize: "clamp(3rem, 8vw, 7rem)",
            letterSpacing: "-0.03em",
            color: "#f2f2f2",
          }}
        >
          Talk to your data.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="max-w-xl mb-10 leading-relaxed"
          style={{ fontSize: "1.1rem", color: "#888888" }}
        >
          Satori levels-up manufacturers with Agentic AI, delivering direct insight from their operations data — no SQL, no analysts, no delays.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-3 mb-16"
        >
          <button
            onClick={onBookDemo}
            className="h-11 px-7 bg-white text-black text-sm font-semibold rounded cursor-pointer hover:bg-gray-100 transition-colors"
          >
            Book a Demo
          </button>
          <a
            href="#features"
            className="h-11 px-6 text-sm font-medium border rounded flex items-center gap-1.5 transition-colors hover:border-gray-400"
            style={{ borderColor: "#333333", color: "#888888" }}
          >
            See how it works ↓
          </a>
        </motion.div>

        {/* Product Demo — glassy browser chrome */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="w-full max-w-5xl mx-auto"
          style={{
            filter: "drop-shadow(0 0 60px rgba(255,255,255,0.07))",
            borderRadius: "12px",
            outline: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <ProductDemoHero />
        </motion.div>
      </div>
    </section>
  );
}
