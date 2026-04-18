import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://satori-inference.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Satori Inference — Build operational apps from every data source",
    template: "%s | Satori Inference",
  },
  description:
    "Satori Inference unifies data across your ERP, MES, spreadsheets, and databases — then builds custom analytics software on-demand.",
  keywords: [
    "Satori", "Satori Inference", "agentic data platform",
    "manufacturing data", "natural language data query", "business intelligence",
    "no SQL analytics", "AI data analytics", "conversational BI",
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Satori Inference",
    title: "Satori Inference — Build operational apps from every data source",
    description: "Satori Inference unifies data across your ERP, MES, spreadsheets, and databases — then builds custom analytics software on-demand.",
    images: [{ url: "/satori-og.png", width: 1200, height: 630, alt: "Satori Inference" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Satori Inference — Build operational apps from every data source",
    description: "Satori Inference unifies data across your ERP, MES, spreadsheets, and databases — then builds custom analytics software on-demand.",
    images: ["/satori-og.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* suppressHydrationWarning silences the harmless mismatch caused by
          browser extensions (Grammarly, LanguageTool, etc.) that inject
          data-* attributes onto <body> before React hydrates. */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
