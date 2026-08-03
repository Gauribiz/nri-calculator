# Changelog

All notable changes to NRI Calculator, in reverse chronological order.

## 2026-08-03 — FA2020 Rs 15L/120-day disclosure on the India residency tool (nric-001b)

Follow-up to nric-001's fact-verification pass: the India residential
status calculator (`src/components/calculators/IndiaResidencyCalculator.tsx`)
already disclosed that it doesn't model the Finance Act 2020 income-linked
threshold, but that disclosure was easy to miss in the intro text. It's
now a prominent, conditional callout.

- Checking "citizen or PIO visiting India" now reveals an optional
  "India-sourced income this financial year (excluding foreign-source
  income)" input, used only to drive the note below — it is not fed into
  `calculateIndiaResidencyStatus`.
- Below that field, a callout always explains the Rs 15 lakh/120-day rule.
  It escalates from a neutral note to a highlighted warning once the
  entered income exceeds Rs 15 lakh, making clear the calculator itself
  still applies the 182-day threshold and does not recalculate the
  second test for this case.
- No change to `src/lib/calculators/indiaResidency.ts` — this is a
  disclosure improvement only, not a claim that the tool now models
  FA2020's income-linked threshold. See ADR 0003 for the reasoning.
- Verified with `npm run lint`, `npm run build`, and a Playwright smoke
  test confirming the field/callout are hidden until the checkbox is
  checked, and that the strong-warning variant only appears once income
  exceeds Rs 15 lakh.
- **Still needs Ajinkya's fact-verification pass**: the Rs 15 lakh figure
  and the 120-day figure are asserted from general knowledge of the
  Finance Act 2020 amendment, not fetched from incometax.gov.in this run.

## 2026-08-03 — DTAA & tax residency calculators (nric-001)

Built the three calculators scoped for the DTAA/tax-residency category
page (`src/app/dtaa-tax-residency/page.tsx`), replacing its "coming soon"
placeholder text. The `Disclaimer` component continues to render near the
top of the page, unchanged, per CLAUDE.md rule 3.

- **US Substantial Presence Test day-counter**
  (`src/lib/calculators/substantialPresenceTest.ts` +
  `src/components/calculators/SubstantialPresenceCalculator.tsx`) — the
  standard IRC §7701(b)(3) weighted-day formula (current year + 1/3 prior
  year + 1/6 year before that, ≥183, with a 31-day current-year floor).
  Does not model exempt-individual days or the closer-connection
  exception.
- **India residential status / RNOR tool**
  (`src/lib/calculators/indiaResidency.ts` +
  `src/components/calculators/IndiaResidencyCalculator.tsx`) — the two
  basic Income Tax Act section 6 tests (182 days, or 60+365 days with a
  182-day substitute for citizens/PIOs visiting India) plus the RNOR
  refinement (9-of-10-years or 729-days-in-7-years). Does **not** model
  the Finance Act 2020 deemed-residency rule or the income-linked
  120-day threshold for citizens/PIOs with India income over Rs 15 lakh
  — flagged inline in the tool itself.
- **DTAA relief (foreign tax credit) estimator**
  (`src/lib/calculators/dtaaRelief.ts` +
  `src/components/calculators/DtaaReliefEstimator.tsx`) — general ordinary
  credit-method mechanic (credit capped at domestic tax on the same
  income) per DTAA Article 25. Takes the domestic tax rate as user input
  rather than asserting a rate; does not model income baskets, Form
  67/Form 1116 procedural requirements, or PFIC treatment.
- Added a shared `CalculatorShell`/`NumberField`/`CheckboxField`/
  `ResultRow` set (`src/components/calculators/CalculatorShell.tsx`) used
  by all three, to avoid duplicating the same form/result layout three
  times.
- All calculation logic is pure, client-side, no persistence — consistent
  with ADR 0001's "no database yet" consequence.
- **Needs Ajinkya's fact-verification pass before publishing**: every
  figure above (183/31-day SPT thresholds, 182/60/365-day and
  9-of-10/729-day India tests, the Article 25 credit-cap mechanic) is
  asserted from general knowledge of the respective statutes/treaty, not
  fetched from a live authoritative source this run. Verify against
  irs.gov, incometax.gov.in, and the treaty text before treating any of
  these three tools as publish-ready. Each tool also has its own inline
  caveat text calling out what it deliberately does not model.
- Verified with `npm run lint`, `npm run build` (all 4 category pages +
  home + disclaimer still prerender statically), and a live
  `npm run start` + Playwright smoke test confirming the disclaimer
  renders above the calculators and that both the SPT and FTC
  calculators produce correct results for known test cases.

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
