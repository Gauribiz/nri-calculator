# ADR 0002: DTAA/tax-residency calculator scope and verification posture

## Status
Accepted, 2026-08-03.

## Context
`nric-001` asked for three tools: a US Substantial Presence Test (SPT)
day-counter, an India Residential Status/RNOR tool, and a DTAA relief
estimator — each required to have thresholds/rules verified against
IRS.gov and incometax.gov.in before publishing any figures. This run had
no live web access to those sources; it had to decide what to build and
how to flag it, not whether verification is needed.

Both the US and India residency rules have real edge cases beyond the
headline tests:
- US: exempt-individual days (certain F/J/M/Q visa holders don't count
  toward SPT), and a closer-connection-to-a-foreign-country exception
  that can override a passed SPT.
- India: the Finance Act 2020 deemed-residency rule for Indian citizens
  not liable to tax anywhere else, and a graded 120-day (if India income
  exceeds Rs 15 lakh) vs. 182-day threshold for citizens/PIOs visiting
  India — this replaced a simpler exception and has itself been amended
  more than once.
- DTAA relief: real foreign tax credit claims involve income-basket/
  resourcing rules, per-country limitations, and country-specific
  procedural requirements (India's Form 67 filing deadline under Rule
  128; the US Form 1116 category system) well beyond a single credit-cap
  formula.

## Decision
Build each tool around its core, well-established formula only (the
weighted-day SPT test; the two basic India residency tests plus RNOR; the
ordinary foreign-tax-credit cap), and explicitly do NOT attempt to model
the edge cases above. Every tool states what it does not model directly
in its own UI copy (not just in this doc or the changelog), and the DTAA
relief estimator takes the domestic tax rate as a user-supplied number
rather than asserting a rate itself, so the tool has no country/year-
specific tax rate for anyone to mistake as officially verified.

The changelog entry for this pass calls out, unprompted, that every
numeric threshold used was asserted from general knowledge of the
underlying statutes/treaty rather than fetched from a live authoritative
source this run, and needs Ajinkya's fact-verification pass — per the
routine's own instruction not to assert tax figures as verified when they
weren't checked live this run.

## Consequences
- These three tools are usable and internally consistent (verified with
  hand-picked test vectors matching known IRS/Income Tax Act examples —
  e.g. 122/122/122 days across three years lands exactly on the 183-day
  SPT threshold), but are not yet fact-checked against a live source and
  should not be treated as publish-ready until that pass happens.
- If Ajinkya's verification pass finds a threshold has changed (e.g. a
  future Finance Act amendment) or wants the modeled edge cases added
  (deemed residency, exempt-individual days, Form 67 deadlines), those
  are natural follow-up tasks — the current structure (one pure function
  per tool in `src/lib/calculators/`, one client component per tool) is
  additive, not something that needs a rewrite to extend.
- No new dependencies added; forms are plain `useState`, no calculator
  needs a schema/validation library at this scope.
