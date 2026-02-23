import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const staticPages = [
    "",
    "/about",
    "/about/history",
    "/about/team",
    "/about/faqs",
    "/departments",
    "/work-areas",
    "/resources",
    "/news-events",
    "/careers",
    "/contact",
    "/feedback",
    "/whistleblower",
  ];
  const workAreas = [
    "client-service-charter",
    "social-dialogue-facilitation",
    "labour-relations",
    "policy-consultation",
    "business-environment-enhancement",
    "public-engagement",
  ];

  const urls: MetadataRoute.Sitemap = [
    ...staticPages.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...workAreas.map((slug) => ({
      url: `${baseUrl}/work-areas/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return urls;
}
