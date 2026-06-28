// Data-provider seam.
//
// The Radar consumes one thing: a list of TopicSignal rows. Where those rows
// come from is swappable. Today it's `mockProvider` (deterministic sample
// data so the app runs with zero credentials). Tomorrow, wire `nexlevVidiq`
// (see ./nexlev-vidiq.ts) and flip DATA_PROVIDER.
//
// Keeping this behind a single interface means the UI and scoring engine
// never change when the real integrations land.

import type { TopicSignal } from "../types";
import { mockProvider } from "./mock";

export interface OpportunityProvider {
  name: string;
  /**
   * Fetch candidate topics. `query` optionally narrows by niche/keyword seed;
   * an empty query should return the provider's default discovery set.
   */
  fetchTopics(query?: string): Promise<TopicSignal[]>;
}

// Flip this to the real provider once Nexlev + VidIQ credentials are wired.
// e.g. import { nexlevVidiqProvider } from "./nexlev-vidiq";
//      export const DATA_PROVIDER = nexlevVidiqProvider;
export const DATA_PROVIDER: OpportunityProvider = mockProvider;
