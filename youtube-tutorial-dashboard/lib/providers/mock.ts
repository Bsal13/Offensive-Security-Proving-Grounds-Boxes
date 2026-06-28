// Deterministic mock provider — lets the whole app run with no API keys.
// The numbers are realistic so the scoring engine produces a believable
// ranking out of the box. Replace with the Nexlev + VidIQ provider for live
// data (see ./nexlev-vidiq.ts).

import type { TopicSignal } from "../types";
import type { OpportunityProvider } from "./index";

const SAMPLE: Omit<TopicSignal, "id" | "sources">[] = [
  { keyword: "how to set up a home vpn", niche: "Tech Tutorials", searchVolume: 74000, competition: 38, nicheRpm: 14.5, outlierScore: 2.4 },
  { keyword: "excel pivot table for beginners", niche: "Productivity", searchVolume: 165000, competition: 61, nicheRpm: 11.0, outlierScore: 1.6 },
  { keyword: "obsidian note taking workflow", niche: "Productivity", searchVolume: 27000, competition: 29, nicheRpm: 9.5, outlierScore: 2.9 },
  { keyword: "fix slow windows 11 laptop", niche: "Tech Support", searchVolume: 110000, competition: 47, nicheRpm: 8.0, outlierScore: 2.1 },
  { keyword: "blender donut tutorial 2026", niche: "3D / Creative", searchVolume: 49000, competition: 72, nicheRpm: 6.5, outlierScore: 1.2 },
  { keyword: "self hosted password manager setup", niche: "Self-Hosting", searchVolume: 18000, competition: 22, nicheRpm: 17.0, outlierScore: 3.1 },
  { keyword: "google sheets budget template", niche: "Personal Finance", searchVolume: 90000, competition: 55, nicheRpm: 22.0, outlierScore: 1.9 },
  { keyword: "raspberry pi home assistant install", niche: "Smart Home", searchVolume: 33000, competition: 34, nicheRpm: 12.5, outlierScore: 2.7 },
  { keyword: "davinci resolve color grading basics", niche: "Video Editing", searchVolume: 41000, competition: 44, nicheRpm: 10.0, outlierScore: 2.0 },
  { keyword: "python web scraping tutorial", niche: "Programming", searchVolume: 135000, competition: 68, nicheRpm: 13.0, outlierScore: 1.4 },
  { keyword: "docker compose for beginners", niche: "DevOps", searchVolume: 60000, competition: 40, nicheRpm: 16.5, outlierScore: 2.5 },
  { keyword: "notion crm template build", niche: "Productivity", searchVolume: 22000, competition: 25, nicheRpm: 18.0, outlierScore: 3.0 },
];

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export const mockProvider: OpportunityProvider = {
  name: "mock",
  async fetchTopics(query?: string): Promise<TopicSignal[]> {
    const q = (query ?? "").trim().toLowerCase();
    const rows = SAMPLE.filter(
      (r) =>
        !q ||
        r.keyword.toLowerCase().includes(q) ||
        r.niche.toLowerCase().includes(q)
    );
    return rows.map((r) => ({
      ...r,
      id: slugify(r.keyword),
      sources: {
        searchVolume: "vidiq",
        competition: "vidiq",
        nicheRpm: "nexlev",
        outlierScore: "nexlev",
      },
    }));
  },
};
