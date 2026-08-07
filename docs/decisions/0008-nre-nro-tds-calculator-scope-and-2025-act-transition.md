# ADR 0008: NRE/NRO & TDS calculator scope, and the Income-tax Act, 2025 transition

## Status
Accepted, 2026-08-04.

## Context
`nric-002` asked for three tools on the `nre-nro-tds` category page: an
NRE-vs-NRO chooser, a TDS-on-NRO-interest calculator, and a Form 15CA/15CB
checker, with the same verification requirement as `nric-001` (don't
assert tax figures as verified unless actually checked live this run).

A live web-search cross-check this run surfaced something that changes
this task's verification posture from prior passes: **India's Income-tax
Act, 2025 came into force on 1 April 2026**, repealing the Income Tax
Act, 1961, for tax years from FY 2026-27 onward (confirmed via
incometaxindia.gov.in's own announcement and PIB press release). The new
Act reduces the statute from 800+ sections to 536 and renumbers
extensively. Today's date for this run is 2026-08-04 — i.e. FY 2026-27,
governed by the new Act, is the *current* tax year, not a future one.

The substantive rules this task needed (NRO interest TDS at a flat 30%
plus 4% cess, absent a lower certified/treaty rate; NRE interest's
tax-exempt status; the ₹5 lakh aggregate-per-year threshold separating
Form 15CA Part A from Part C + Form 15CB) are corroborated by multiple
2026-dated tax-reference sources and appear to carry over substantively.
But this run could not independently verify how each old section number
(most commonly cited: Section 195 for non-resident TDS, Section
10(4)(ii) for the NRE exemption, Rule 37BB for Form 15CA/15CB) maps onto
the new Act's renumbered sections — one secondary source suggested
Section 195 may now be "Section 393," and another placed the NRE
exemption under "Section 11 read with Schedule IV, Serial Number 1," but
neither is an authoritative source this run fetched directly (a direct
incometax.gov.in FAQ fetch returned HTTP 403, consistent with ADR
0005/0006's prior experience with direct government-site fetches).

## Decision
Build all three tools around the same well-corroborated substantive
rates/thresholds used historically, but:
- Keep old-Act section numbers as secondary, hedged references in
  explanatory copy (e.g. "historically Section 195") rather than as the
  primary way anything is identified, since asserting an unverified new
  section number would be worse than citing the familiar old one with a
  caveat.
- Add a visible, top-of-page callout (not just changelog/ADR text) on
  `nre-nro-tds/page.tsx`, giving the Act transition equal prominence to
  the FA2020 callout pattern from `nric-001b` — stating the transition
  happened, that the rates/thresholds are believed to carry over, and
  that section-number correspondence specifically has not been verified.
- Did not build a Download-PDF affordance for these three tools.
  `nric-001e` scoped that feature to the DTAA/tax-residency calculators
  specifically as a follow-up task, not as a standing design-system
  requirement for every future calculator — adding it here without a
  task asking for it would violate CLAUDE.md rule 4 ("never add
  unrequested features"). Filing it as a follow-up is a decision for
  Ajinkya/a future task, not something to preempt.
- Did use the existing `CalculatorShell`/`NumberField`/`CheckboxField`/
  `ResultRow` (with status badges)/`HowCalculated`/`SourceCitation` set
  from `nric-001c`, since those are the site's established shared
  components, not calculator-specific additions.

Per-tool scope:
- **NRE vs. NRO chooser** (`src/lib/calculators/nreNroChooser.ts` +
  `NreNroChooser.tsx`) — a rules-based decision aid over FEMA-eligibility,
  funds-source, and repatriability inputs. Does not check actual FEMA
  residency status or account-opening KYC eligibility itself.
- **TDS on NRO interest** (`src/lib/calculators/nroInterestTds.ts` +
  `NroInterestTdsCalculator.tsx`) — statutory 30% + 4% cess by default
  (31.2% effective), with an optional user-supplied lower rate for
  certified/treaty cases (mirrors `dtaaRelief.ts`'s pattern of taking a
  rate as input rather than asserting a specific treaty percentage).
  Does not model surcharge (income-slab-dependent) or ITR-filed refunds
  of excess TDS.
- **Form 15CA/15CB checker**
  (`src/lib/calculators/form15caChecker.ts` + `Form15caChecker.tsx`) — ₹5
  lakh aggregate threshold splitting Part A from Part C + 15CB, plus
  Part B for remittances with an existing AO certificate/order, and a
  user-supplied "exempt list" checkbox rather than checking Rule 37BB's
  list itself. Does not aggregate multiple remittances across the year
  or model Form 15CA Part D (bank-facing, not remitter-facing).

## Consequences
- These three tools are internally consistent (verified with hand-picked
  test vectors: ₹1,00,000 NRO interest at the default rate withholds
  exactly ₹31,200; a ₹3,00,000 remittance needs only Form 15CA Part A,
  an ₹8,00,000 one needs Part C + 15CB) but are not yet fact-checked
  against a live authoritative source and should not be treated as
  publish-ready.
- **New, standing item for Ajinkya beyond this task's own scope**: the
  Income-tax Act, 2025 transition likely also affects the *already
  published* `dtaa-tax-residency` page's own section-number references
  (e.g. its Section 6/RNOR citations), which predate this discovery and
  were not in scope to fix this run (one task per run, per this
  routine's own operating rules). Worth a dedicated follow-up task
  scoped to auditing every published page's statute citations against
  the new Act, rather than each future task patching only its own
  corner of it piecemeal.
- If Ajinkya's fact-verification pass confirms the new Act's section
  numbers, they can replace the hedged "historically Section X" phrasing
  directly — the current structure needs no rework to accept that, just
  a text update per tool.
- No new dependencies added; forms are plain `useState`, matching the
  existing three DTAA/tax-residency tools' pattern.
