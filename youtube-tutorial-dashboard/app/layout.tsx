import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tutorial Command Center — Opportunity Radar",
  description: "Rank searchable YouTube tutorial topics by blended opportunity.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="topbar">
          <div className="brand">
            <span className="logo">▶</span>
            <span>Tutorial Command Center</span>
          </div>
          <nav className="nav">
            <a className="nav-link active" href="/">Opportunity Radar</a>
            <span className="nav-link disabled" title="Coming next">Pipeline</span>
            <span className="nav-link disabled" title="Coming next">Ledger</span>
          </nav>
        </header>
        <main className="page">{children}</main>
      </body>
    </html>
  );
}
