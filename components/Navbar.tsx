"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-14 flex items-center justify-between px-6 md:px-10 bg-white border-b border-gray-200">
      <Link
        href="/"
        className="text-lg font-bold tracking-tight text-black select-none hover:opacity-70 transition-opacity"
      >
        Satori Inference
      </Link>

      <a
        href="/#demo"
        className="inline-flex items-center gap-2 h-9 px-4 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-900 transition-colors"
      >
        Book a Demo
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 7h10M8 3l4 4-4 4" />
        </svg>
      </a>
    </header>
  );
}
