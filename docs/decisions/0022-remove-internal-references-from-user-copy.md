# ADR 0022: Remove internal ADR/repository references from user-facing copy; new CLAUDE.md rules on acronyms and internal references

## Status
Accepted, 2026-08-14.

## Context
`nric-015`, queued 2026-08-12 by Ajinkya via live-site review: the
DTAA/tax-residency page's verification disclosure read "...see ADR 0006
in this repository for the full verification record" — an internal
engineering artifact (an Architecture Decision Record number, plus "this
repository") exposed directly in user-facing copy on a YMYL financial
site. A site visitor has no account on GitHub, no access to this repo,
and no way to know what "ADR 0006" means.

The task as queued assumed three sibling category pages
(`nre-nro-tds`, `investments-repatriation`, `real-estate-capital-gains`,
i.e. `nric-002`/`003`/`004`) carried their own version of the same
"cross-checked... ADR NNNN in this repository" paragraph, citing ADR
0008/0009/0010 respectively, per those tasks' `result_notes` in
`state.json`.

**That assumption did not match the current repo.** Reading all three
pages in full: none of them contains that disclosure paragraph today.
`nre-nro-tds/page.tsx` has a different disclosure (the Income-tax Act,
2025 transition notice) with no ADR reference at all;
`investments-repatriation/page.tsx` and `real-estate-capital-gains/page.tsx`
have no page-level verification disclosure paragraph at all. Likely
explanation: `nric-014`'s 2026-08-13 "page layout pass" (accordion
rollout, nav restructure) restructured these pages and the paragraph
either moved or was dropped along the way — not confirmed from the
history available this session, and not worth reverse-engineering
further since the underlying instruction (no internal references in
user copy) is unaffected either way.

The task text itself anticipated this kind of gap ("audit every page
using this same disclosure pattern... **and any others found during the
audit**"), so rather than stopping on the mismatch, the audit was
widened to the actual instances of the same defect class found in the
live repo.

## Audit — what was actually found
A full-repo grep for `ADR`, `this repository`, and `verification record`
across `src/` (JSX text, not code comments) turned up 9 instances total,
all in `<HowCalculated>` "Not modeled" notes or the one page-level
disclosure — every one an internal ADR reference appended to an
otherwise-fine plain-language sentence:

- `src/app/dtaa-tax-residency/page.tsx` — the originally-reported one
  (ADR 0006, "in this repository for the full verification record").
- `src/components/calculators/DtaaReliefEstimator.tsx` (ADR 0002)
- `src/components/calculators/SubstantialPresenceCalculator.tsx` (ADR 0002)
- `src/components/calculators/IndiaResidencyCalculator.tsx` (ADR 0002, ADR 0003)
- `src/components/calculators/RepatriationLimitCalculator.tsx` (ADR 0009)
- `src/components/calculators/PficFilingChecker.tsx` (ADR 0009)
- `src/components/calculators/NriPropertySaleTdsCalculator.tsx` ("the ADR for this tool")
- `src/components/calculators/RealEstateCapitalGainsCalculator.tsx` ("the ADR for this tool")
- `src/components/calculators/Form13Explainer.tsx` ("the ADR for this tool")

Code comments referencing ADRs (`DownloadResultsButton.tsx`,
`PriceBanner.tsx`, `fx.ts`, `fxhistory/route.ts`, and similar) are not
user-facing and were left untouched — those are exactly where an ADR
reference belongs.

## Decision — surgical removal, substance kept
Per the task's own instruction for the originally-reported case ("do not
do a full rewrite -- surgical removal only"), applied identically to
every instance found: cut the trailing "— see ADR NNNN[...]" /
"-- see ADR NNNN in this repository for the full verification record"
clause, keep the substantive claim (what the tool does/doesn't model, or
that a figure was cross-checked and against what) exactly as written.
No rewording of the substantive sentences themselves.

One case needed judgment rather than a pure trim:
`PficFilingChecker.tsx` read "...eligibility — see ADR 0009 for why this
tool deliberately stops at the filing question." The clause after "see
ADR 0009" carries a little explanatory value (why the tool stops where
it does), but it's still gated behind a reference a reader can't follow
up on, and the preceding "Not modeled: ..." list already makes the
tool's boundary clear without it. Cut entirely, consistent with the
other 7.

## Decision — CLAUDE.md changes
Two new numbered rules added to "Operating rules," both non-negotiable
going forward, same weight as the existing four:

- **Rule 5**: every calculator/tool page's title/heading must include
  the acronym's full form in brackets (e.g. "DTAA (Double Taxation
  Avoidance Agreement)"), even where the short form is already explained
  in that calculator's own body text. Per Ajinkya's 2026-08-12 direction,
  this is scoped to new/changed titles only — explicitly not a
  retroactive pass on existing page titles, and this task did not touch
  any existing titles/headings on that basis.
- **Rule 6**: no internal engineering references (ADR numbers, "this
  repository," PR/task IDs) in any user-facing copy, generalizing the
  fix above into a standing guardrail so this doesn't recur the next
  time a calculator's "not modeled" note or a disclosure paragraph is
  written or edited.

## Consequences
- 9 files changed, all text-only trims inside existing JSX strings — no
  component logic, props, or route touched. `next build` still shows 85
  routes, identical shape to before (only `dtaa-tax-residency` and the
  8 calculator components changed).
- `npm run lint` and `npm run build` both pass clean.
- No figures, thresholds, or "Not modeled" claims changed in substance —
  this is copy-only.
- The nric-002/003/004 page-level assumption in the original task
  description was inaccurate as of 2026-08-14; flagged here rather than
  silently ignored, and no further action taken on it since there is
  nothing left matching that description to fix on those three pages.
