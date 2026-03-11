import type { MetadataRoute } from "next";

const SITE_URL = "https://evata.us";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = ["en", "zh", "kr"];
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  // Home pages for each language
  for (const lang of languages) {
    entries.push({
      url: `${SITE_URL}/${lang}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: Object.fromEntries(
          languages.map((l) => [l === "kr" ? "ko" : l === "zh" ? "zh-CN" : l, `${SITE_URL}/${l}`])
        ),
      },
    });
  }

  return entries;
}
