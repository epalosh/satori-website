import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = "https://satori-inference.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Satori Inference — Talk to Your Data",
    template: "%s | Satori Inference",
  },
  description:
    "Satori Inference connects to your existing data systems and lets your team extract business insights through a natural language chat interface — no SQL required. Satori data, reimagined.",
  keywords: [
    "Satori",
    "Satori Inference",
    "Satori data",
    "talk to your data",
    "natural language data query",
    "business intelligence",
    "no SQL analytics",
    "AI data analytics",
    "conversational BI",
    "no-code business intelligence",
    "data chat interface",
    "Snowflake analytics",
    "Databricks analytics",
    "AI business insights",
    "data without engineers",
  ],
  authors: [{ name: "Satori Inference", url: siteUrl }],
  creator: "Satori Inference",
  publisher: "Satori Inference",
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Satori Inference",
    title: "Satori Inference — Talk to Your Data",
    description:
      "Satori Inference lets teams instantly extract business insights from data through a natural language chat interface — no SQL required.",
    images: [
      {
        url: "/preview-image.png",
        width: 1200,
        height: 630,
        alt: "Satori Inference — Talk to Your Data",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Satori Inference — Talk to Your Data",
    description:
      "Satori Inference lets teams instantly extract business insights from data through a natural language chat interface — no SQL required.",
    images: ["/preview-image.png"],
    creator: "@satoriinference",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
