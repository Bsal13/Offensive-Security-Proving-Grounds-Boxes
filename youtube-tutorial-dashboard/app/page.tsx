import RadarTable from "@/components/RadarTable";
import { DATA_PROVIDER } from "@/lib/providers";

export default function Page() {
  return (
    <>
      <div className="page-head">
        <h1>Opportunity Radar</h1>
        <p>
          Searchable tutorial topics ranked by a blended Opportunity Score —
          volume &amp; competition (VidIQ) × RPM &amp; outlier demand (Nexlev).
        </p>
      </div>
      <RadarTable />
      <p className="footnote">
        Data source: <code>{DATA_PROVIDER.name}</code>. Running on sample data —
        wire <code>lib/providers/nexlev-vidiq.ts</code> and flip{" "}
        <code>DATA_PROVIDER</code> in <code>lib/providers/index.ts</code> for live signals.
      </p>
    </>
  );
}
