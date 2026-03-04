import Navbar from "@/components/Navbar";
import ProductDemo from "@/components/ProductDemo";
import FeaturesSection from "@/components/FeaturesSection";
import DemoSection from "@/components/DemoSection";
import ParallaxDots from "@/components/ParallaxDots";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* ── Section 1: Hero ── */}
        <section className="relative overflow-hidden min-h-[95vh] px-6 md:px-10 pt-20 flex items-center">
          <ParallaxDots />
          <div className="relative z-10 max-w-6xl mx-auto w-full py-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-center">
              {/* Left: copy */}
              <div className="flex flex-col">
                <p className="text-xs font-medium tracking-widest text-gray-400 uppercase mb-6">
                  Business intelligence, reimagined
                </p>
                <h1 className="text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-black mb-6">
                  Talk to
                  <br />
                  your data.
                </h1>
                <p className="text-lg text-gray-500 leading-relaxed mb-10 max-w-md">
                  Satori lets teams instantly extract decision-critical business insights from data without the friction of a software engineer.
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <a
                    href="#demo"
                    className="inline-flex items-center gap-2 h-11 px-6 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-900 transition-colors"
                  >
                    Book a Demo
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
                      <path d="M2 7h10M8 3l4 4-4 4" />
                    </svg>
                  </a>
                  <a
                    href="#features"
                    className="inline-flex items-center gap-1.5 h-11 px-4 text-sm font-medium text-gray-600 hover:text-black transition-colors"
                  >
                    See how it works
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
                      <path d="M7 2v10M3 8l4 4 4-4" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Right: animated product demo */}
              <div className="w-full lg:max-w-[480px] lg:ml-auto">
                <ProductDemo />
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 2: Features ── */}
        <div id="features" className="h-10 bg-white" />
        <FeaturesSection />

        {/* ── Section 3: Demo booking ── */}
        <DemoSection />
      </main>

      {/* Footer */}
      <footer className="relative overflow-hidden border-t border-gray-200 bg-white px-6 md:px-10 py-8">
        <ParallaxDots />
        <div className="relative z-10 max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="text-sm font-semibold text-black">
            Satori Inference
          </span>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Satori Inference. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
