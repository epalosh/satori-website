import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
  display: "swap",
});

const siteUrl = "https://satori-inference.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Satori Inference: The Agentic Data Platform for Manufacturing",
    template: "%s | Satori Inference",
  },
  description:
    "Connect to your data systems and empower teams to extract business insights through natural language.",
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
    title: "Satori Inference: The Agentic Data Platform for Manufacturing",
    description: "Connect to your data systems and empower teams to extract business insights through natural language.",
    images: [{ url: "/preview-image.png", width: 1200, height: 630, alt: "Satori Inference" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Satori Inference: The Agentic Data Platform for Manufacturing",
    description: "Connect to your data systems and empower teams to extract business insights through natural language.",
    images: ["/preview-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${spaceMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
