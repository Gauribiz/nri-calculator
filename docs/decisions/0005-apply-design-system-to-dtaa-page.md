# ADR 0005: Apply design system to the DTAA/tax-residency page; verification-stamp and PDF-export scope calls

## Status
Accepted, 2026-08-04.

## Context
`nric-001d` asked to apply nric-001c's design system to the live
`/dtaa-tax-residency` page and its three calculators: finish the page-level
styling (nric-001c intentionally left the page wrapper's `zinc-*` classes
as out of scope), add a "How this is calculated" section per calculator
using ADR 0002/0003's already-documented formulas, add source-citation
links and "Verified against X, date" freshness stamps reflecting this
session's fact-verification pass, and add a "download result as PDF"
affordance if it fit within a styling/apply pass.

Two parts of the task description didn't match what the repo actually
showed, and needed a judgment call rather than literal execution:

1. **The "fact-verification pass already completed this session" premise
   was false.** ADR 0002 is unambiguous: no live source was fetched that
   run: SPT/India-residency/DTAA-credit thresholds were asserted from
   general knowledge and explicitly flagged as needing Ajinkya's own
   verification pass. There is no completed verification to "reflect."
2. **PDF export** would need a new client-side dependency (e.g. a
   PDF-generation library) — a real scope expansion for what the task
   itself frames as a styling/apply pass, and the task explicitly allowed
   deferring it as a follow-up instead.

## Decision

**Page styling.** Replaced the page wrapper's leftover `zinc-*` classes
with the `stone`/`primary` tokens the rest of the design system already
uses (`src/app/dtaa-tax-residency/page.tsx`). No other page was touched —
the other three category pages are still placeholders, out of scope here
per CLAUDE.md rule 4 and nric-001c's own boundary.

**How this is calculated.** Wired the existing `HowCalculated` component
into all three calculators, restating each tool's already-coded formula
(SPT weighting, India's Test A/B and RNOR thresholds, the DTAA credit cap)
and already-documented not-modeled list from ADR 0002/0003 and each
`src/lib/calculators/*.ts` file header — no new claims, just surfacing
what was already decided and verified-as-internally-consistent.

**Source citations — did real verification this run, but scoped it
honestly.** Unlike the nric-001/001b runs, this session has live web
access. `irs.gov/individuals/international-taxpayers/substantial-presence-test`
itself returned HTTP 403 to a direct fetch (proxy/anti-bot block), but web
search cross-referenced the SPT weighting (31-day floor, 183-day
threshold, ⅓/⅙ weights), India's Section 6 Test A/B and RNOR thresholds
(182/60/365, 9-of-10 years, 729 days), the FA2020 Rs 15L/120-day rule, and
DTAA Article 25's ordinary-credit "lower of" mechanic — against multiple
independent tax-reference sources, several explicitly citing
irs.gov/incometaxindia.gov.in content, and one search result surfaced
`incometaxindia.gov.in` itself. Every figure matched the code exactly, no
discrepancies found. `SourceCitation` links were added to each calculator
pointing at the real primary-source pages found this way (IRS SPT page,
IRS Foreign Tax Credit page, incometaxindia.gov.in's residential-status
and double-taxation-relief pages).

That is real progress over "asserted from general knowledge," but it is
still a secondary-source cross-check, not a direct read of primary text
(irs.gov blocked the fetch) and not a professional/CA review. Given this
is public YMYL tax content, using the existing `VerifiedStamp` component
as-is (`"Verified against {source}, {date}"`) would overclaim — it was
built for a case where verification is actually complete, and per
CLAUDE.md/the orchestrator's own instruction not to assert tax figures as
verified from general knowledge, an unqualified "Verified" badge here
would mislead a reader. Decision: leave `VerifiedStamp` unwired (as
nric-001c already left it), and instead add one plain-text note at the
page level stating what was actually done — cross-checked against public
tax-reference sources on 2026-08-04, not a professional review, still
needs Ajinkya's fact-verification pass before this page is treated as
publish-ready.

**PDF export — deferred, not built.** Flagged as a follow-up task
(`nric-001e`, added to `orchestrator-state`'s task queue) rather than
implemented now: it needs a new npm dependency, which is a real scope
expansion beyond a styling/apply pass, and the task text explicitly
permitted deferring it for exactly that reason.

## Consequences
- `src/lib/calculators/*.ts` untouched — this is still a UI/content pass,
  no calculation-logic changes. Verified with a live smoke test that the
  three calculators' numeric outputs are unchanged (e.g. 245/0/0 days
  still yields a 245.0-day weighted total and a "meets the test" badge).
- The page's fact-verification status is now stronger than before (real
  cross-referencing happened, documented, sources linked) but still not
  "verified" in the full sense `VerifiedStamp` implies. If Ajinkya (or a
  future run with unblocked irs.gov access) completes an actual
  primary-source/professional check, wiring `VerifiedStamp` in with real
  content becomes a small follow-up, not a redesign.
- `nric-001e` (PDF export) is a new, separate queued task rather than
  silently dropped scope.
