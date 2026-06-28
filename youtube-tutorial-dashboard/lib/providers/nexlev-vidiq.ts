// Live provider stub: Nexlev (economics) + VidIQ (keywords/packaging).
//
// This is intentionally a stub. The data shape and the wiring points are
// here so flipping from mock → live is a small, obvious change. To activate:
//
//   1. Add credentials to .env.local:
//        VIDIQ_API_KEY=...
//        NEXLEV_API_KEY=...
//   2. Implement the two fetch helpers below against each platform's REST API
//      (or proxy them through your MCP gateway).
//   3. In ./index.ts: export const DATA_PROVIDER = nexlevVidiqProvider;
//
// Mapping reference (provider field -> TopicSignal field):
//   VidIQ keyword research  -> searchVolume, competition
//   Nexlev niche overview   -> nicheRpm
//   Nexlev outlier signal   -> outlierScore

import type { TopicSignal } from "../types";
import type { OpportunityProvider } from "./index";

interface VidiqKeyword {
  keyword: string;
  searchVolume: number;
  competition: number; // 0–100
}

interface NexlevNiche {
  rpm: number;
  outlierScore: number; // 0–3+
}

async function fetchVidiqKeywords(_query: string): Promise<VidiqKeyword[]> {
  // TODO: call VidIQ keyword research (vidiq_keyword_research) and map.
  throw new Error("VidIQ provider not yet implemented — set VIDIQ_API_KEY and wire this call.");
}

async function fetchNexlevNiche(_niche: string): Promise<NexlevNiche> {
  // TODO: call Nexlev niche overview + outliers (get_niche_overview /
  // youtube_channel_outliers) and map.
  throw new Error("Nexlev provider not yet implemented — set NEXLEV_API_KEY and wire this call.");
}

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export const nexlevVidiqProvider: OpportunityProvider = {
  name: "nexlev+vidiq",
  async fetchTopics(query = ""): Promise<TopicSignal[]> {
    const keywords = await fetchVidiqKeywords(query);
    const out: TopicSignal[] = [];
    for (const kw of keywords) {
      // In a real build, batch the niche lookups and cache by niche.
      const niche = await fetchNexlevNiche(kw.keyword);
      out.push({
        id: slugify(kw.keyword),
        keyword: kw.keyword,
        niche: query || "Discovered",
        searchVolume: kw.searchVolume,
        competition: kw.competition,
        nicheRpm: niche.rpm,
        outlierScore: niche.outlierScore,
        sources: {
          searchVolume: "vidiq",
          competition: "vidiq",
          nicheRpm: "nexlev",
          outlierScore: "nexlev",
        },
      });
    }
    return out;
  },
};
