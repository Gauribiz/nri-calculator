# ADR 0009: Investment/repatriation calculator scope and PFIC liability posture

## Status
Accepted, 2026-08-04.

## Note on numbering
This is filed as ADR 0009, not 0008, even though 0008 does not exist on
`main` as of this pass. `nric-002`'s PR #9 (open, unmerged as of this
pass) already documents itself internally as ADR 0008 — see
`orchestrator-state` run_history and `project-docs-index/nri-calculator/
changelog.md`'s 2026-08-04 `nric-002` entry, which references "ADR 0008"
for the Income-tax Act, 2025 finding. Taking 0008 here would collide with
that PR once it merges. Skipping to 0009 avoids the collision regardless
of merge order.

## Context
`nric-003` asked for two tools: a repatriation-limit calculator and a
"US tax treatment of Indian mutual funds/PFIC explainer," and flagged the
category itself as high-complexity/high-liability, requiring extra
disclaimer emphasis beyond the standard `Disclaimer` component.

Repatriation limits (the RBI's USD 1 million per financial year facility
for remittance of assets) are a comparatively well-defined ceiling with a
simple arithmetic model: total repatriated this FY vs. the ceiling.

PFIC treatment of Indian mutual funds is a different order of complexity.
Whether a specific fund is a PFIC in a given year depends on that fund's
own income/asset composition; whether QEF or mark-to-market elections are
even available depends on whether the fund issues a PFIC Annual
Information Statement (most Indian mutual funds do not); and the default
Section 1291 "excess distribution" method requires allocating gain across
every year in the holding period and applying that year's highest US
marginal tax rate plus an IRS underpayment-interest charge — data this
tool would have to hardcode per year, indefinitely, and get exactly right
on a YMYL public page.

## Decision
Build the repatriation-limit tool as a full calculator (headroom
arithmetic against the USD 1M/FY ceiling), consistent with every other
tool on this site.

For the PFIC piece, deliberately scope it down to an "explainer" per the
task's own wording, plus one narrow, well-defined numeric check: the Form
8621 de minimis filing-exception thresholds ($25,000 / $50,000 married
filing jointly / $5,000 if held through another PFIC), which is a
bright-line value/event test, not a tax-liability computation. Do NOT
build a Section 1291 excess-distribution tax estimator — the accuracy of
such a tool would depend on hardcoded historical top marginal rates and
IRS interest rates per year, indefinitely maintained, and a wrong number
on a "how much do I owe" tool carries materially more downstream harm
than a wrong number on a "do I need to file a form" tool. This judgment
call directly implements the task's own "high-complexity/high-liability,
extra disclaimer emphasis" framing rather than building the most literal
reading of "explainer."

Implement "extra disclaimer emphasis" as an additional page-level amber
callout on `/investments-repatriation`, positioned directly below the
standard `Disclaimer` component (never replacing or displacing it — its
content and position stay exactly as CLAUDE.md rule 3 requires), plus a
second, PFIC-specific amber callout inside `PficFilingChecker` itself
calling out that component as the single highest-liability tool on the
site.

## Consequences
- `src/lib/calculators/repatriationLimit.ts` /
  `RepatriationLimitCalculator.tsx`: does not model the RBI-permission
  route for amounts above the ceiling, the separate two-property cap on
  repatriating residential real estate sale proceeds (that overlaps with
  the not-yet-built `nric-004` real estate category — deliberately left
  there, not duplicated here), or Form 15CA/15CB mechanics (covered by
  `nric-002`'s tools once that PR merges).
- `src/lib/calculators/pficFilingCheck.ts` / `PficFilingChecker.tsx`:
  answers "is Form 8621 filing likely required," not "what do I owe" or
  "is my fund a PFIC." If Ajinkya wants a fuller PFIC tax-liability
  estimator later, that is a substantially larger follow-up task (would
  need a maintained table of historical top marginal rates and IRS
  underpayment interest rates) — not something to grow this tool into
  incrementally.
- Both new figures (the USD 1M/FY ceiling, the $25,000/$50,000/$5,000
  Form 8621 thresholds) were cross-checked via live web search this pass
  against multiple independent secondary sources with no discrepancies
  found; direct fetches of rbi.org.in and irs.gov were not attempted this
  pass. **Needs Ajinkya's fact-verification pass** against rbi.org.in and
  irs.gov directly before treating either figure as publish-ready — same
  standing flag as every other numeric tool on this site.
- No new dependencies added.
