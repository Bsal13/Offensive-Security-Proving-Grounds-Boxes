/** @type {import('next').NextConfig} */

// When building for GitHub Pages the site is served from
// https://<user>.github.io/<repo>/ , so assets need the repo name as a base
// path. Locally (npm run dev) and on hosts that serve from root (e.g. Vercel)
// we leave basePath empty. The workflow sets GITHUB_PAGES=true.
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repo = "Offensive-Security-Proving-Grounds-Boxes";

const nextConfig = {
  reactStrictMode: true,
  // Static HTML export — no server needed, hostable on GitHub Pages.
  output: "export",
  images: { unoptimized: true },
  basePath: isGithubPages ? `/${repo}` : "",
  assetPrefix: isGithubPages ? `/${repo}/` : "",
  trailingSlash: true,
};

export default nextConfig;
