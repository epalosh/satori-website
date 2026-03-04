import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ProductDemo from "@/components/ProductDemo";
import FeaturesSection from "@/components/FeaturesSection";
import DemoSection from "@/components/DemoSection";
import ParallaxDots from "@/components/ParallaxDots";

export const metadata: Metadata = {
  title: "Satori Inference — Talk to Your Data",
  description:
    "Satori Inference connects to your data systems and lets your team extract business insights through natural language — no SQL required. The future of Satori data analytics.",
  alternates: {
    canonical: "https://satori-inference.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://satori-inference.com/#organization",
      name: "Satori Inference",
      alternateName: ["Satori", "Satori Data"],
      url: "https://satori-inference.com",
      logo: {
        "@type": "ImageObject",
        url: "https://satori-inference.com/favicon.ico",
      },
      description:
        "Satori Inference is a business intelligence platform that lets teams query their data using natural language — no SQL or engineering overhead required.",
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": "https://satori-inference.com/#website",
      url: "https://satori-inference.com",
      name: "Satori Inference",
      description:
        "Talk to your data. Satori Inference connects to your existing data systems — Snowflake, Databricks, SQL databases, APIs, and more — and lets your team extract decision-critical business insights through a natural language chat interface.",
      publisher: {
        "@id": "https://satori-inference.com/#organization",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://satori-inference.com/?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://satori-inference.com/#product",
      name: "Satori Inference",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: "Book a demo to get started",
      },
      description:
        "Satori Inference is an AI-powered business intelligence platform that connects to Snowflake, Databricks, SQL databases, APIs, and documents. Teams ask questions in plain English and get instant data-driven insights — no SQL required.",
      featureList: [
        "Natural language data queries",
        "No SQL required",
        "Snowflake integration",
        "Databricks integration",
        "SQL database connectivity",
        "API data sources",
        "Document intelligence",
        "Agentic AI engine",
        "Business insight extraction",
      ],
      publisher: {
        "@id": "https://satori-inference.com/#organization",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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

        {/* ── Section 3: Founding Team + Demo booking ── */}
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
