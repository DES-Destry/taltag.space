import type { MetadataRoute } from "next";
import { appBaseUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = appBaseUrl();
  const now = new Date();
  const routes = ["", "/claim", "/skills", "/gallery", "/learn"];

  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
