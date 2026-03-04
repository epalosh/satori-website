"use client";

import { useState } from "react";
import Image from "next/image";
import ParallaxDots from "@/components/ParallaxDots";

const CAL_URL = "https://cal.com/arnav-shah-satori";

const founders = [
  {
    name: "Ethan Palosh",
    title: "Co-founder & CTO",
    image: "/ethan_pic.jpeg",
    linkedin: "https://linkedin.com/in/ethanpalosh",
  },
  {
    name: "Arnav Shah",
    title: "Co-founder & CEO",
    image: "/arnav_pic.jpeg",
    linkedin: "https://linkedin.com/in/arnav-ashah",
  },
];

export default function DemoSection() {
  const [open, setOpen] = useState(false);

  return (
    <section
      id="demo"
      className="relative overflow-hidden bg-white min-h-[140vh] py-48 px-6 md:px-10 border-t border-gray-200"
    >
      <ParallaxDots />
      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ── Founding Team ── */}
        <div className="text-center mb-14">
          <p className="text-xs font-medium tracking-widest text-gray-400 uppercase mb-3">
            Meet the
          </p>
          <h2 className="text-3xl font-bold text-black">Founding Team</h2>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-36">
          {founders.map((founder) => (
            <div
              key={founder.title}
              className="flex flex-col items-center text-center bg-white border border-gray-200 rounded-lg px-10 py-14 w-full sm:w-64 shadow-sm"
            >
              {/* Avatar */}
              <div className="w-28 h-28 rounded-full overflow-hidden border border-gray-200 mb-7 bg-gray-100 flex-shrink-0">
                <Image
                  src={founder.image}
                  alt={founder.name}
                  width={112}
                  height={112}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Name */}
              <p className="text-base font-bold text-black leading-snug">{founder.name}</p>

              {/* Title */}
              <p className="text-xs font-medium text-gray-400 mt-1.5 mb-8">
                {founder.title}
              </p>

              {/* Spacer pushes LinkedIn to bottom */}
              <div className="flex-1" />

              {/* LinkedIn */}
              <a
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 border border-gray-200 rounded-md px-4 py-2 hover:border-gray-400 hover:text-black transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452H16.89v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a1.982 1.982 0 1 1 0-3.964 1.982 1.982 0 0 1 0 3.964zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </div>
          ))}
        </div>

        {/* ── Book a Demo ── */}
        <div className="text-center">
          <p className="text-xs font-medium tracking-widest text-gray-400 uppercase mb-3">
            Get started
          </p>
          <h2 className="text-3xl font-bold text-black mb-4">
            Interested? Book a product demo.
          </h2>
          <p className="text-base text-gray-500 max-w-md leading-relaxed mx-auto mb-10">
            We&apos;ll walk you through Satori and answer any questions about
            your specific use case — no commitment required.
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
