"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ onBookDemo }: { onBookDemo?: () => void }) {
  const [bannerVisible, setBannerVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setBannerVisible(true), 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <nav
        className="flex items-center justify-between px-6 md:px-10 h-14"
        style={{
          backgroundColor: "#000000",
          borderBottom: "1px solid #222222",
        }}
      >
        <span className="text-sm font-bold text-white tracking-tight">
          Satori Inference
        </span>
        <button
          onClick={onBookDemo}
          className="h-8 px-4 bg-white text-black text-xs font-semibold rounded cursor-pointer hover:bg-gray-100 transition-colors"
        >
          Book a Demo
        </button>
      </nav>
      <AnimatePresence>
        {bannerVisible && (
          <motion.a
            key="promo-banner"
            href="https://app.satori-inference.com"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center gap-2.5 h-12 px-6 text-sm font-medium text-white tracking-tight transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#0d9488" }}
          >
            <span>Try our live product demo at app.satori-inference.com</span>
            <span aria-hidden="true">→</span>
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
}
