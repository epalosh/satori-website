"use client";

const CAL_URL = "https://cal.com/arnav-shah-satori";

export default function DemoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative rounded-xl shadow-2xl w-full max-w-3xl" style={{ height: "80vh", backgroundColor: "#141414", border: "1px solid #2a2a2a" }}>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 flex items-center justify-center w-8 h-8 rounded-full transition-colors cursor-pointer"
          style={{ backgroundColor: "#1a1a1a", color: "#888888" }}
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M1 1l12 12M13 1L1 13" />
          </svg>
        </button>
        <iframe src={CAL_URL} className="w-full h-full rounded-xl border-0" title="Book a Demo" />
      </div>
    </div>
  );
}
