import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/content/site";
import { getAllNewsFromStore } from "@/lib/repositories/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["", "/academics", "/student-life", "/admissions", "/community", "/contact"];
  const newsPosts = await getAllNewsFromStore();

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.siteUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...newsPosts.map((post) => ({
      url: `${siteConfig.siteUrl}/news/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
