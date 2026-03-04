"use client";

import { useState } from "react";
import ParallaxDots from "@/components/ParallaxDots";

const CAL_URL = "https://cal.com/arnav-shah-satori";

export default function DemoSection() {
  const [open, setOpen] = useState(false);

  return (
    <section
      id="demo"
      className="relative overflow-hidden bg-white py-64 px-6 md:px-10 border-t border-gray-200"
    >
      <ParallaxDots />
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <p className="text-xs font-medium tracking-widest text-gray-400 uppercase mb-3">
          Get started
        </p>
        <h2 className="text-3xl font-bold text-black mb-4">
          Interested? Book a product demo with the founding team.
        </h2>
        <p className="text-base text-gray-500 max-w-md leading-relaxed mx-auto mb-10">
          We&apos;ll walk you through Satori and answer any
          questions about your specific use case — no commitment required.
        </p>
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 h-11 px-6 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-900 transition-colors cursor-pointer"
        >
          Book a Demo
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 7h10M8 3l4 4-4 4" />
          </svg>
        </button>
      </div>

      {/* Cal.com modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-3xl" style={{ height: "80vh" }}>
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-600"
              aria-label="Close"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M1 1l12 12M13 1L1 13" />
              </svg>
            </button>
            <iframe
              src={CAL_URL}
              className="w-full h-full rounded-xl border-0"
              title="Book a Demo"
            />
          </div>
        </div>
      )}
    </section>
  );
}
