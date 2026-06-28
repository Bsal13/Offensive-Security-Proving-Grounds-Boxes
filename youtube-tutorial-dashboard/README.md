# Tutorial Command Center

A workflow dashboard for a **search-based YouTube tutorial business**. It unifies
the scattered research/production tooling into one pipeline:

```
Opportunity Radar  →  Production Pipeline  →  Performance Ledger
   (what to make)        (make & package)        (what worked)
```

This repo is the **MVP: Opportunity Radar** — a scored, rankable table of
searchable tutorial topics.

## The Opportunity Score

Every topic gets a blended 0–100 score so you spend production time on the
queries most likely to pay off:

```
Opportunity = volume + low-competition + RPM + outlier-demand   (weighted, normalized 0–1 each)
```

| Factor | Question it answers | Source |
|---|---|---|
| **Volume** | Will anyone search for it? | VidIQ keyword research |
| **Competition** | Can I rank for it? | VidIQ |
| **RPM** | Does the niche pay? | Nexlev |
| **Outlier** | Do top videos prove outsized demand? | Nexlev |

Weights are adjustable live in the UI (and via `?w_volume=` etc. on the API),
so you can tune the model to your channel without touching code. Defaults live
in `lib/scoring.ts`.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

Ships with **sample data** (`lib/providers/mock.ts`) so it runs with zero
credentials.

## Wiring live data (Nexlev + VidIQ)

1. `cp .env.local.example .env.local` and add `VIDIQ_API_KEY` / `NEXLEV_API_KEY`.
2. Implement the two `fetch*` helpers in `lib/providers/nexlev-vidiq.ts`.
3. In `lib/providers/index.ts`, set `DATA_PROVIDER = nexlevVidiqProvider`.

The UI and scoring engine consume a single `TopicSignal` shape
(`lib/types.ts`), so nothing else changes when live data lands.

## Architecture

```
app/
  page.tsx                     Opportunity Radar page
  layout.tsx                   Shell + nav (Pipeline / Ledger stubbed)
  api/opportunities/route.ts   Scored + ranked topics endpoint
components/
  RadarTable.tsx               Table, search, live weight sliders
lib/
  types.ts                     TopicSignal / ScoredTopic
  scoring.ts                   Blended Opportunity Score
  providers/
    index.ts                   Provider seam (flip mock → live here)
    mock.ts                    Sample data
    nexlev-vidiq.ts            Live provider stub
```

## Roadmap

- [x] **Opportunity Radar** — score & rank topics
- [ ] **Production Pipeline** — Kanban (Idea→Scripted→Voiced→Edited→Packaged→Published), VidIQ generation + Drive scripts + Slack
- [ ] **Performance Ledger** — per-video P&L: views/RPM/revenue ↔ Bitly description-link clicks, rolled up by topic cluster
