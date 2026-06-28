// The Opportunity Score — the heart of the Radar.
//
// A search-based tutorial business lives or dies on *topic selection*: you
// want queries that are (a) searched a lot, (b) not already saturated,
// (c) in a niche that actually pays, and (d) where top videos prove outsized
// demand exists. The four factors map directly onto those questions.
//
//   Opportunity = w_v·volume + w_c·(low competition) + w_r·rpm + w_o·outlier
//
// Each factor is normalized to 0–1 before weighting, so no single raw scale
// (search volume in the millions, RPM in single dollars) can dominate.

import type { ScoredTopic, TopicSignal } from "./types";

export interface ScoringWeights {
  volume: number;
  competition: number;
  rpm: number;
  outlier: number;
}

// Defaults lean toward demand proof (volume + outlier) over pure economics,
// because for search content "will anyone watch it" beats "what's the RPM".
export const DEFAULT_WEIGHTS: ScoringWeights = {
  volume: 0.3,
  competition: 0.25,
  rpm: 0.2,
  outlier: 0.25,
};

/** Search volume is heavily skewed, so normalize on a log curve. */
function normalizeVolume(searchVolume: number): number {
  if (searchVolume <= 0) return 0;
  // log10(1) = 0 ... log10(1_000_000) = 6 → divide by 6 to land in 0–1.
  return clamp01(Math.log10(searchVolume) / 6);
}

/** Competition is 0–100 where lower is better; invert to a 0–1 "easiness". */
function normalizeCompetition(competition: number): number {
  return clamp01((100 - competition) / 100);
}

/** RPM: $25+/1k views is treated as premium (score 1.0). */
function normalizeRpm(nicheRpm: number): number {
  return clamp01(nicheRpm / 25);
}

/** Outlier score 0–3+; 3 is exceptional and caps the contribution. */
function normalizeOutlier(outlierScore: number): number {
  return clamp01(outlierScore / 3);
}

export function scoreTopic(
  topic: TopicSignal,
  weights: ScoringWeights = DEFAULT_WEIGHTS
): ScoredTopic {
  const breakdown = {
    volume: normalizeVolume(topic.searchVolume),
    competition: normalizeCompetition(topic.competition),
    rpm: normalizeRpm(topic.nicheRpm),
    outlier: normalizeOutlier(topic.outlierScore),
  };

  const weightTotal =
    weights.volume + weights.competition + weights.rpm + weights.outlier || 1;

  const weighted =
    breakdown.volume * weights.volume +
    breakdown.competition * weights.competition +
    breakdown.rpm * weights.rpm +
    breakdown.outlier * weights.outlier;

  const opportunityScore = Math.round((weighted / weightTotal) * 100);

  return { ...topic, opportunityScore, breakdown };
}

export function scoreAndRank(
  topics: TopicSignal[],
  weights: ScoringWeights = DEFAULT_WEIGHTS
): ScoredTopic[] {
  return topics
    .map((t) => scoreTopic(t, weights))
    .sort((a, b) => b.opportunityScore - a.opportunityScore);
}

function clamp01(n: number): number {
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(1, n));
}
