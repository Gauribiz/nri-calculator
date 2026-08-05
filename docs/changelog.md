# Changelog

All notable changes to NRI Calculator, in reverse chronological order.

## 2026-08-05 — Real estate capital gains calculators (nric-004)

Orientation confirmed `nri-calculator.phase` implied an active queue and
identified `nric-004` (real estate capital gains calculators) as the
single highest-priority queued task — `nric-001` through `nric-001e` and
`nric-005` were done, `nric-002` had an open PR (#9), and `nric-003`'s PR
#11 had just been merged to `main` by Ajinkya's wife (confirmed via the
GitHub API: `merged: true`, `merged_by: gauribiz08-cell`, same day as this
pass). Cross-checked `project-docs-index/nri-calculator/changelog.md`
against `orchestrator-state/state.json`'s `task_queue` before starting
implementation, per the process-gap lesson from the `nric-002` duplicate
incident — no existing work found for `nric-004`, so this pass is not a
duplicate. Confirmed the PreToolUse guard is live via a read-only clone
(`pretooluse-guard.sh` git mode `100755`, `.claude/settings.json` wires it
to `Bash|Write|Edit`).

Built three tools on `/real-estate-capital-gains`, replacing the "coming
soon" placeholder:

- **LTCG/STCG classifier for a property sale**
  (`src/lib/calculators/realEstateCapitalGains.ts` +
  `src/components/calculators/RealEstateCapitalGainsCalculator.tsx`) —
  classifies a sale as long-term (>24 months held) or short-term, computes
  the unindexed capital gain, and for LTCG estimates tax at the flat
  12.5% rate introduced by the Finance (No. 2) Act, 2024. Does not offer
  the Act's 20%-with-indexation grandfathering option, since that option
  is restricted to resident individuals/HUFs and does not apply to NRIs.
  Does not assert a rupee STCG tax figure (slab-rate dependent), and does
  not model Section 50C/43CA stamp-duty-value substitution, Section
  54/54EC/54F exemptions, surcharge/cess on the LTCG figure, or
  foreign-currency acquisition-cost rules.
- **Section 195 TDS-on-NRI-property-sale estimator**
  (`src/lib/calculators/nriPropertySaleTds.ts` +
  `src/components/calculators/NriPropertySaleTdsCalculator.tsx`) —
  estimates TDS withheld on the *full sale consideration* (12.5% LTCG /
  30% STCG default + 4% cess, or a user-entered certified rate). Does not
  model surcharge, since neither a buyer nor this tool can know the
  seller's total income.
- **Form 13 (lower/nil TDS certificate) explainer**
  (`src/lib/calculators/form13LowerTds.ts` +
  `src/components/calculators/Form13Explainer.tsx`) — compares default
  Section 195 TDS against the user's own estimate of actual tax owed to
  gauge whether applying for a lower-deduction certificate is likely
  worth it. **Flags a significant finding**: under the Income-tax Act,
  2025 (in force from FY 2026-27 onward — this pass's own run date),
  Form 13 is renumbered **Form 128** and Section 197 is renumbered
  **Section 395**, extending the renumbering gap `nric-002`'s PR #9 first
  flagged and called "worth a dedicated follow-up." See ADR 0010 for the
  full reasoning, including why no extra page-level "high complexity"
  callout was added (unlike `nric-003` — that task explicitly requested
  one; this one didn't, per CLAUDE.md rule 4) and why PDF export wasn't
  added (consistent with `nric-002`/`nric-003`'s same call).

**All figures need Ajinkya's fact-verification pass**: the 12.5% LTCG
rate and its NRI scoping, the 24-month LTCG/STCG threshold, the Section
195 TDS mechanics and 4% cess simplification, the 15% surcharge cap on
capital-gains-type income, and the Form 13 → Form 128 / Section 197 →
Section 395 renumbering were cross-checked via live web search this pass
against multiple independent secondary sources with no discrepancies
found, but no direct incometaxindia.gov.in fetch was attempted — see
[deployment.md](../../project-docs-index/nri-calculator/deployment.md)
for the standing verification posture.

Verified with `npm run lint` (clean), `npm run build` (all 7 routes still
prerender statically), and a headless Playwright smoke test against the
built production server confirming disclaimer position, correct outputs
across LTCG/STCG/loss/certificate/comparison branches for all three tools
(see ADR 0010 for exact test vectors), and no console errors. Opened
[PR #12](https://github.com/Gauribiz/nri-calculator/pull/12) — unmerged,
awaiting Ajinkya's review AND his own fact-verification pass.

- Added `docs/decisions/0010-real-estate-capital-gains-scope-and-form13.md`.
- No `data-model.md` change — no schema exists or was added.

## 2026-08-04 — Investment/repatriation calculators (nric-003)

Orientation confirmed `nri-calculator.phase` implied an active queue and
identified `nric-003` (investment/repatriation calculators) as the single
highest-priority queued task — `nric-001` through `nric-001e`, `nric-002`,
and `nric-005` were already done or (for `nric-002`) already had an open
PR. Cross-checked `project-docs-index/nri-calculator/changelog.md` against
`orchestrator-state/state.json`'s `task_queue` before starting
implementation, per the process-gap lesson from the `nric-002` duplicate
incident (see `architecture_notes.state_json_staleness_incident_2026_08_04`
in `orchestrator-state`) — no existing work found for `nric-003`, so this
is not a duplicate. Confirmed the PreToolUse guard is live via a read-only
clone (`pretooluse-guard.sh` git mode `100755`, `.claude/settings.json`
wires it to `Bash|Write|Edit`).

Built two tools on `/investments-repatriation`, replacing the "coming
soon" placeholder:

- **Repatriation headroom estimator**
  (`src/lib/calculators/repatriationLimit.ts` +
  `src/components/calculators/RepatriationLimitCalculator.tsx`) — tracks
  remaining headroom under RBI's USD 1 million per financial year
  facility for remittance of assets (NRO accounts and most movable/
  financial asset sale proceeds), and confirms NRE/FCNR balances are not
  subject to that ceiling. Does not model the RBI-permission route for
  amounts above the ceiling, the separate two-property cap on
  repatriating residential real estate sale proceeds, or Form 15CA/15CB
  mechanics.
- **US tax treatment of Indian mutual funds: PFIC explainer**
  (`src/lib/calculators/pficFilingCheck.ts` +
  `src/components/calculators/PficFilingChecker.tsx`) — explains the
  Section 1291 default "excess distribution" regime and why QEF/
  mark-to-market elections are usually unavailable for Indian mutual
  funds, plus a narrow Form 8621 de minimis filing-exception check
  ($25,000 / $50,000 married filing jointly / $5,000 if held through
  another PFIC). Deliberately does **not** compute any Section 1291 tax
  or interest — see ADR 0009 for why a fuller tax-liability calculator
  was judged too high-liability for a general-information YMYL page.

Per the task's explicit "extra disclaimer emphasis" requirement (this
category is flagged high-complexity/high-liability), added an additional
amber callout on the page directly below the standard `Disclaimer`
component — never replacing or moving it, still first per CLAUDE.md rule
3 — plus a second, PFIC-specific amber callout inside
`PficFilingChecker` itself. Also fixed the page wrapper's leftover
`zinc-*` heading class to the `stone`/`primary` design-system tokens
while rewriting this file (small, no new dependency, matches every other
launched page).

Did not add a "Download result as PDF" affordance — `nric-001e` scoped
that specifically to the DTAA/tax-residency calculators as a follow-up,
not a standing requirement for every future calculator (same call
`nric-002` made).

**Both new figures need Ajinkya's fact-verification pass** before
publishing: the USD 1,000,000/FY repatriation ceiling (RBI Master
Direction No. 13 — Remittance of Assets) and the $25,000/$50,000/$5,000
Form 8621 de minimis filing thresholds were cross-checked via live web
search this pass against multiple independent secondary sources with no
discrepancies found, but direct fetches of rbi.org.in and irs.gov were
not attempted this pass — verify against those sources directly, and
with a qualified US tax preparer for the PFIC content specifically,
before treating either tool as publish-ready.

Verified with `npm run lint` (clean), `npm run build` (all 7 routes
still prerender statically), and a headless Playwright smoke test
against the built production server confirming: the disclaimer and
extra-caution callout both render above the calculators; the repatriation
tool correctly flags an $800,000-already-repatriated + $300,000-requested
combination as $100,000 over the limit, and correctly reports NRE/FCNR as
not subject to the ceiling; and the PFIC checker correctly reports "likely
not required" at $0 aggregate value, "likely required" once value exceeds
$25,000, and "likely required" regardless of value once a distribution/
disposition is marked — with no console errors. Added ADR 0009.

## 2026-08-04 — Download result as PDF for the DTAA/tax-residency calculators (nric-001e)

No changes to calculation logic in `src/lib/calculators/` — this is a new
UI affordance only, calculator outputs are unchanged.

- Added a "Download result as PDF" button under each of the three
  DTAA/tax-residency calculators' result sections (SPT day-counter, India
  residency/RNOR tool, DTAA relief estimator), via a new shared
  `DownloadPdfButton` component (`src/components/calculators/`).
- Added `jspdf` (^4.2.1) as a new dependency, dynamically imported
  (`await import("jspdf")`) inside the click handler so it's code-split
  into its own chunk and adds nothing to the initial page bundle — the
  production build's first-load JS for every route is unchanged from
  before this pass. See ADR 0007 for the library evaluation (why jsPDF's
  own text API over `html2canvas`-style DOM rasterization, and why a
  dependency was chosen over a browser-native print-to-PDF flow).
- Each generated PDF includes the calculator's title, the exact inputs
  and results shown on screen at click time, the same "not professional
  advice" disclaimer text as the on-page `Disclaimer` component (new
  shared `pdfDisclaimer.ts` constant), and the calculator's source links
  — so the downloaded file is self-contained and carries the same
  compliance notice as the page it came from.
- Verified with `npm run lint` (clean), `npm run build` (all 7 routes
  still prerender statically, first-load JS sizes unchanged), and a
  headless Playwright smoke test against the built production server
  confirming all three buttons trigger a real file download producing a
  valid, non-empty single-page PDF, with no console errors.

## 2026-08-04 — Apply design system to the DTAA/tax-residency page (nric-001d)

No changes to calculation logic in `src/lib/calculators/` — verified with
a live smoke test that all three calculators' numeric outputs are
unchanged (245/0/0 test-vector days still yields a 245.0-day weighted
total and the "meets the test" badge).

- `src/app/dtaa-tax-residency/page.tsx`: replaced leftover `zinc-*`
  classes with the `stone`/`primary` design-system tokens (ADR 0004 left
  this page's wrapper out of scope; this pass finishes it). Disclaimer
  position unchanged — still renders first, above the intro text, per
  CLAUDE.md rule 3.
- Wired the existing `HowCalculated` component into all three calculators
  (SPT day-counter, India residency/RNOR tool, DTAA relief estimator),
  restating each tool's already-coded formula and not-modeled list from
  ADR 0002/0003 — no new claims, just surfacing what was already decided.
- Wired `SourceCitation` into all three calculators, linking to the real
  IRS/incometaxindia.gov.in pages found via this session's live web
  search cross-check (see ADR 0005) — irs.gov's Substantial Presence Test
  and Foreign Tax Credit pages, incometaxindia.gov.in's residential-status
  and double-taxation-relief pages.
- Did **not** wire `VerifiedStamp`'s "Verified against X, date" claim as
  the task described. The task assumed a fact-verification pass had
  already completed this session; ADR 0002 shows that never happened
  (figures were asserted from general knowledge, not fetched live). This
  run did do a real live cross-check via web search — every coded
  threshold matched independent tax-reference sources with no
  discrepancies — but a direct `irs.gov` fetch was blocked (HTTP 403) and
  this is still a secondary-source cross-check, not a professional
  review. An unqualified "Verified" badge on public YMYL tax content would
  overclaim, so added a plain-text note instead, stating exactly what was
  cross-checked, when, and that it still needs Ajinkya's own
  fact-verification pass. Full reasoning in ADR 0005.
- Did not add a "download result as PDF" affordance — it needs a new npm
  dependency, a real scope expansion beyond a styling/apply pass per the
  task's own framing. Filed as follow-up task `nric-001e` in
  `orchestrator-state` instead of building it now.
- Verified with `npm run lint` (clean), `npm run build` (all 7 routes
  still prerender statically), and a live `npm run start` + Playwright
  smoke test confirming the disclaimer's position, all three
  `HowCalculated`/`SourceCitation` blocks render and expand correctly,
  no `zinc-*` classes remain on the page, and calculator outputs are
  unchanged from before this pass.

## 2026-08-03 — Design system foundation: color, typography, shared components (nric-001c)

Purely visual/component-layer pass — no changes to any calculation logic
in `src/lib/calculators/`.

- Added Tailwind theme tokens (`src/app/globals.css`): a `primary`
  navy/indigo scale and a single muted `gold` accent, plus warm
  off-white/near-black `--background`/`--foreground` values in place of
  pure white/black. Body/neutral surfaces elsewhere use Tailwind's
  built-in `stone` scale instead of `zinc`.
- `CalculatorShell` is now an elevated card (shadow, rounded corners,
  more padding) instead of a plain bordered box.
- `ResultRow` gained an optional `status: "favorable" | "warning" |
  "neutral"` prop rendering a colored pill (soft green / amber / warm
  gray — no red, per the site's YMYL nature) instead of plain bold text.
  Wired into the three live calculators' headline results; the DTAA
  estimator's dollar-amount result keeps plain `emphasis` styling since a
  badge doesn't fit a currency figure. See ADR 0004 for the specific
  favorable/warning/neutral judgment calls per calculator.
- `NumberField`/`CheckboxField` gained an optional `hint` prop wired to a
  new `InfoTooltip` component (CSS-only hover/focus tooltip, accessible
  fallback via `aria-label`) — not yet used by any existing field.
- Added `HowCalculated` (a zero-JS `<details>` disclosure for
  methodology text) and `SourceCitation`/`VerifiedStamp` (citation links
  and a "Verified against [source], [date]" stamp) — built and exported,
  not yet wired into any calculator's content. `nric-001d` is the task
  scoped to apply these to the DTAA/tax-residency page specifically.
- Restyled `Disclaimer` into a trust-badge/callout treatment (icon,
  shadow, tighter hierarchy) using the new `gold` tokens. Content and
  `role="note"`/`aria-label` are unchanged; position is unchanged — still
  renders near the top of the page, above the calculators, per CLAUDE.md
  rule 3.
- Updated `src/app/layout.tsx`'s header/footer to the new navy/gold
  identity.
- Left `zinc-*` classes as-is on the home page, `/disclaimer` page, and
  the three still-placeholder category pages — out of scope for this
  component-layer pass; see ADR 0004's consequences.
- Verified with `npm run lint` (clean), `npm run build` (all 7 routes
  still prerender statically), and a live `npm run start` + Playwright
  smoke test in both light and dark color schemes confirming the
  disclaimer's position, badge colors/logic, and that all three
  calculators' numeric outputs are unchanged from before this pass
  (including the ADR 0003 FA2020 income-threshold callout).
- No content/figures were added or changed in this pass — nothing new to
  flag for Ajinkya's fact-verification queue beyond what ADR 0002/0003
  already flagged.

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
