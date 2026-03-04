import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata = {
  title: "About — Satori Inference",
};

export default function About() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center pt-16 px-6">
        <div className="max-w-md w-full text-center">
          <p className="text-xs font-medium tracking-widest text-gray-400 uppercase mb-4">
            Coming soon
          </p>
          <h1 className="text-4xl font-bold text-black mb-4">
            About us
          </h1>
          <p className="text-base text-gray-500 leading-relaxed mb-10">
            We&apos;re building Satori Inference to empower every team member
            to understand their data without engineering overhead.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-black hover:text-gray-600 transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 7H2M6 3L2 7l4 4" />
            </svg>
            Back to home
          </Link>
        </div>
      </main>
    </>
  );
}
