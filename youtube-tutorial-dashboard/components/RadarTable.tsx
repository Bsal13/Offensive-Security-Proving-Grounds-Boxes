"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ScoredTopic } from "@/lib/types";
import { DEFAULT_WEIGHTS, scoreAndRank } from "@/lib/scoring";
import { DATA_PROVIDER } from "@/lib/providers";

type Weights = typeof DEFAULT_WEIGHTS;

const WEIGHT_FIELDS: { key: keyof Weights; label: string }[] = [
  { key: "volume", label: "Volume" },
  { key: "competition", label: "Low comp." },
  { key: "rpm", label: "RPM" },
  { key: "outlier", label: "Outlier" },
];

function scoreClass(score: number): string {
  if (score >= 66) return "good";
  if (score >= 40) return "mid";
  return "bad";
}

function fmtNum(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k`;
  return String(n);
}

export default function RadarTable() {
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [weights, setWeights] = useState<Weights>(DEFAULT_WEIGHTS);
  const [topics, setTopics] = useState<ScoredTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Debounce the search box so we don't refetch on every keystroke.
  useEffect(() => {
    const t = setTimeout(() => setDebounced(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  // Data + scoring run entirely client-side, so the app is a static site with
  // no backend. The provider seam (lib/providers) still decides where rows come
  // from — swap in the live Nexlev/VidIQ provider when keys are available.
  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const signals = await DATA_PROVIDER.fetchTopics(debounced);
      setTopics(scoreAndRank(signals, weights));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
      setTopics([]);
    } finally {
      setLoading(false);
    }
  }, [debounced, weights]);

  useEffect(() => {
    load();
  }, [load]);

  const summary = useMemo(() => {
    if (!topics.length) return null;
    const top = topics[0];
    return `${topics.length} topics · top pick "${top.keyword}" (${top.opportunityScore})`;
  }, [topics]);

  return (
    <>
      <div className="toolbar">
        <input
          className="search-input"
          placeholder="Filter by keyword or niche (e.g. productivity, vpn)…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="weights">
          {WEIGHT_FIELDS.map((f) => (
            <label className="weight" key={f.key}>
              <span>
                {f.label} <span className="wval">{weights[f.key].toFixed(2)}</span>
              </span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={weights[f.key]}
                onChange={(e) =>
                  setWeights((w) => ({ ...w, [f.key]: Number(e.target.value) }))
                }
              />
            </label>
          ))}
        </div>
        <button className="btn ghost" onClick={() => setWeights(DEFAULT_WEIGHTS)}>
          Reset weights
        </button>
      </div>

      {summary && <p className="muted" style={{ margin: "0 0 10px" }}>{summary}</p>}

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th style={{ width: 60 }}>Score</th>
              <th>Topic</th>
              <th className="num">Volume</th>
              <th className="num">Competition</th>
              <th className="num">RPM</th>
              <th className="num">Outlier</th>
              <th style={{ width: 110 }} />
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={7} className="state">Loading opportunities…</td></tr>
            )}
            {!loading && error && (
              <tr><td colSpan={7} className="state error">{error}</td></tr>
            )}
            {!loading && !error && topics.length === 0 && (
              <tr><td colSpan={7} className="state">No topics match “{debounced}”.</td></tr>
            )}
            {!loading && !error && topics.map((t) => (
              <tr key={t.id}>
                <td>
                  <span className={`score ${scoreClass(t.opportunityScore)}`}>
                    {t.opportunityScore}
                  </span>
                </td>
                <td>
                  <div className="kw">{t.keyword}</div>
                  <span className="niche-pill">{t.niche}</span>
                  <div className="bar" title="Score contribution by factor">
                    <span style={{ width: `${t.opportunityScore}%` }} />
                  </div>
                </td>
                <td className="num">{fmtNum(t.searchVolume)}</td>
                <td className="num">{t.competition}</td>
                <td className="num">${t.nicheRpm.toFixed(1)}</td>
                <td className="num">{t.outlierScore.toFixed(1)}</td>
                <td>
                  <button
                    className="btn"
                    title="Promote to production pipeline (coming next)"
                    onClick={() => alert(`Queued "${t.keyword}" for the pipeline (stub).`)}
                  >
                    + Pipeline
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
