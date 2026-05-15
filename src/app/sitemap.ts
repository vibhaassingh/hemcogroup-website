import type { MetadataRoute } from "next";
import { ventures } from "@/content/ventures";
import { sectorOrder } from "@/content/sectors";
import { journal } from "@/content/journal";

const SITE_URL = "https://hemcogroup.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/sectors`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/world`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/world/story`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/world/journal`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/careers`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/investors`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
  ];

  const sectorRoutes: MetadataRoute.Sitemap = sectorOrder
    // /sectors/foundation redirects to /ventures/mvv-foundation, so skip it.
    .filter((s) => s !== "foundation")
    .map((s) => ({
      url: `${SITE_URL}/sectors/${s}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  const ventureRoutes: MetadataRoute.Sitemap = ventures.map((v) => ({
    url: `${SITE_URL}/ventures/${v.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: v.featured ? 0.9 : 0.7,
  }));

  const journalRoutes: MetadataRoute.Sitemap = journal.map((j) => ({
    url: `${SITE_URL}/world/journal/${j.slug}`,
    lastModified: parseJournalDate(j.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...sectorRoutes, ...ventureRoutes, ...journalRoutes];
}

// Journal dates ship as "YYYY.MM" — turn them into a Date for lastModified.
function parseJournalDate(raw: string): Date {
  const [y, m] = raw.split(".").map(Number);
  if (!y || !m) return new Date();
  return new Date(Date.UTC(y, m - 1, 1));
}
