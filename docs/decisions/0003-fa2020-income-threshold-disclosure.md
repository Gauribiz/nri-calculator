# ADR 0003: FA2020 Rs 15L/120-day threshold — disclosure, not recalculation

## Status
Accepted, 2026-08-03.

## Context
`nric-001b` is a fact-verification follow-up on PR #2 (nric-001): the
India residential status calculator's "visiting citizen/PIO" case always
uses the 182-day relaxed threshold, but the Finance Act 2020 amendment
lowers that threshold to 120 days when the individual's India-sourced
income (excluding foreign-source income) exceeds Rs 15 lakh in the year.
The tool already noted this gap in its intro text (added in nric-001),
but the note was easy to skim past and not tied to the user's actual
numbers.

The task explicitly allowed two options: always show the caveat as
static text, or add an optional income input and make the highlight
conditional on actually crossing Rs 15 lakh. It also explicitly said not
to attempt a full recalculation of the tool's logic — the tool doesn't
otherwise collect income figures, and modeling the income-linked
threshold correctly would need to know which income counts as
"India-sourced" for this specific rule, which is exactly the kind of
statute-interpretation question CLAUDE.md's fact-verification rule says
not to assert from general knowledge.

## Decision
Added an optional income input, shown only when the visiting-citizen/PIO
checkbox is checked, and made the callout conditional on it:
- Income left at 0 (not entered) or ≤ Rs 15 lakh: a neutral note stating
  the Rs 15L/120-day rule as a general caveat.
- Income > Rs 15 lakh: the same information, but escalated to a
  highlighted (amber) warning, since at that point the rule is likely to
  actually apply to the person reading it.

Both variants say plainly that the calculator itself still applies the
182-day threshold below and does not recalculate the second test for
this case — the income field only drives the note, not
`calculateIndiaResidencyStatus`. This was the deciding factor for
choosing the income-input option over static-text-only: a number the
user already knows (their India income) makes the disclosure concrete
without requiring the tool to take a position on the income-sourcing
question it isn't verified to answer correctly.

## Consequences
- `src/lib/calculators/indiaResidency.ts` is unchanged — this is a UI/
  disclosure change only, in `IndiaResidencyCalculator.tsx`. The file's
  header comment (which already lists this exact nuance as deliberately
  not modeled) remains accurate.
- The Rs 15 lakh and 120-day figures themselves are still asserted from
  general knowledge of the FA2020 amendment, not fetched from
  incometax.gov.in this run — carries forward the same fact-verification
  flag as ADR 0002, now attached to this specific UI copy as well as the
  intro text.
- If a future task decides to actually model the income-linked threshold
  (recompute `appliedSecondTestThresholdDays` based on income), the income
  input added here can be wired into `IndiaResidencyInput` directly rather
  than being thrown away — but that's out of scope for this pass.
