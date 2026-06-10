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
    "/resources",
    "/news-events",
    "/careers",
    "/contact",
    "/feedback",
    "/whistleblower",
  ];
  const urls: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  return urls;
}
