import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://satori-inference.com";
const siteTitle = "Satori Inference: The Agentic Data Platform for Manufacturing";
const siteDescription =
  "Satori Inference unifies data across your ERP, MES, spreadsheets, and databases — then builds custom analytics software on-demand.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteTitle, template: "%s | Satori Inference" },
  description: siteDescription,
  keywords: [
    "Satori", "Satori Inference", "agentic data platform",
    "manufacturing data", "natural language data query", "business intelligence",
    "no SQL analytics", "AI data analytics", "conversational BI",
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
  // Explicit icon chain — helps Google attach the right favicon to search results.
  // Next will still auto-serve /icon.svg + /apple-icon.png from the app directory;
  // declaring them here just makes the HTML <link> tags unambiguous.
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Satori Inference",
    title: siteTitle,
    description: siteDescription,
    images: [{ url: "/satori-og.png", alt: "Satori Inference" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/satori-og.png"],
  },
};

// schema.org JSON-LD: gives Google high-confidence signals about the org,
// its logo, and the site's primary image. Improves the chance of a favicon
// + thumbnail rendering in search result cards.
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Satori Inference",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/icon.svg`,
        caption: "Satori Inference",
      },
      image: `${siteUrl}/satori-og.png`,
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteTitle,
      description: siteDescription,
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en-US",
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: siteTitle,
      description: siteDescription,
      isPartOf: { "@id": `${siteUrl}/#website` },
      primaryImageOfPage: `${siteUrl}/satori-og.png`,
      about: { "@id": `${siteUrl}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          // JSON-LD in <head> is the schema.org convention. Using
          // dangerouslySetInnerHTML avoids React escaping the quotes.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      {/* suppressHydrationWarning silences the harmless mismatch caused by
          browser extensions (Grammarly, LanguageTool, etc.) that inject
          data-* attributes onto <body> before React hydrates. */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
