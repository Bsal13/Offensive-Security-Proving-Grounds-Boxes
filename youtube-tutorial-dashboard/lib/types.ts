// Core domain types for the Opportunity Radar.
//
// A "TopicSignal" is the normalized, provider-agnostic shape that both the
// scoring engine and the UI consume. Each data provider (mock today,
// Nexlev + VidIQ tomorrow) is responsible for mapping its raw API response
// into this shape.

export interface TopicSignal {
  /** Stable id — slug of the keyword, used as a React key and pipeline ref. */
  id: string;
  /** The searchable tutorial query, e.g. "how to set up a home vpn". */
  keyword: string;
  /** Broad niche/cluster this keyword belongs to. */
  niche: string;

  // --- VidIQ-sourced (search & packaging) ---
  /** Estimated monthly search volume for the keyword. */
  searchVolume: number;
  /** Competition score 0–100 (lower = easier to rank). */
  competition: number;

  // --- Nexlev-sourced (economics & demand proof) ---
  /** Estimated niche RPM in USD (revenue per 1,000 views). */
  nicheRpm: number;
  /** Outlier score 0–3+ — how hard top videos over-perform in this niche. */
  outlierScore: number;

  /** Where each metric came from — surfaced in the UI for trust/debugging. */
  sources: {
    searchVolume: ProviderName;
    competition: ProviderName;
    nicheRpm: ProviderName;
    outlierScore: ProviderName;
  };
}

export type ProviderName = "nexlev" | "vidiq" | "mock";

export interface ScoredTopic extends TopicSignal {
  /** Blended Opportunity Score, 0–100. */
  opportunityScore: number;
  /** Per-factor normalized contributions (0–1), for the breakdown popover. */
  breakdown: {
    volume: number;
    competition: number;
    rpm: number;
    outlier: number;
  };
}
