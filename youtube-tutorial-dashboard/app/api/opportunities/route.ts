import { NextResponse } from "next/server";
import { DATA_PROVIDER } from "@/lib/providers";
import { scoreAndRank, DEFAULT_WEIGHTS, type ScoringWeights } from "@/lib/scoring";

// GET /api/opportunities?q=<seed>&w_volume=&w_competition=&w_rpm=&w_outlier=
// Returns scored + ranked topics. Weights are overridable via query params so
// the UI sliders can re-rank without a code change.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";

  const weights: ScoringWeights = {
    volume: num(searchParams.get("w_volume"), DEFAULT_WEIGHTS.volume),
    competition: num(searchParams.get("w_competition"), DEFAULT_WEIGHTS.competition),
    rpm: num(searchParams.get("w_rpm"), DEFAULT_WEIGHTS.rpm),
    outlier: num(searchParams.get("w_outlier"), DEFAULT_WEIGHTS.outlier),
  };

  try {
    const topics = await DATA_PROVIDER.fetchTopics(q);
    const ranked = scoreAndRank(topics, weights);
    return NextResponse.json({ provider: DATA_PROVIDER.name, count: ranked.length, topics: ranked });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function num(raw: string | null, fallback: number): number {
  if (raw == null) return fallback;
  const n = Number(raw);
  return Number.isFinite(n) ? n : fallback;
}
