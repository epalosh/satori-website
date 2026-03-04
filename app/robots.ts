import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [],
    },
    sitemap: "https://satori-inference.com/sitemap.xml",
    host: "https://satori-inference.com",
  };
}
