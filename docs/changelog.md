# Changelog

All notable changes to NRI Calculator, in reverse chronological order.

## 2026-08-03 — Initial Next.js scaffold

First build pass on the repo, which previously contained only a README.
Implements the Phase 1 structure agreed in the project charter (US-India
corridor, four advisory categories, no personalized advice).

- Scaffolded with `create-next-app` (Next.js App Router, TypeScript,
  Tailwind CSS, ESLint, `src/` directory) — server-rendered pages, not a
  client SPA, since the site's traffic depends on search ranking.
- Added four category route segments, each currently a placeholder page:
  `dtaa-tax-residency`, `nre-nro-tds`, `investments-repatriation`,
  `real-estate-capital-gains`. Real calculator logic is future work.
- Added a shared `Disclaimer` component
  (`src/components/Disclaimer.tsx`), rendered near the top of every
  category page and the homepage, plus a standalone `/disclaimer` page
  linked from the footer — a locked requirement per the charter, not
  optional polish.
- Added base layout (`src/app/layout.tsx`) with nav linking the four
  categories, footer with the disclaimer link, and SEO metadata (title
  template + description) at the root and per-category level.
- Copied the PreToolUse guard (`pretooluse-guard.sh` +
  `deny-patterns.json`) from `kathakar/orchestrator-state` into
  `.claude/hooks/`, matching Family Ledger and Kids Learning App. No
  staging/production split exists yet for this repo specifically, since
  nothing is deployed yet.
- Added `CLAUDE.md`, matching the format of the other two projects'
  guardrail docs.
- `npm run build` and `npm run lint` both pass.
