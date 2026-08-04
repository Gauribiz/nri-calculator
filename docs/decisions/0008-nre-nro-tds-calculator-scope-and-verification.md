# ADR 0008: NRE/NRO & TDS calculator scope and verification posture

## Status
Accepted, 2026-08-04.

## Context
`nric-002` asked for three tools on the NRE/NRO & TDS page: an NRE-vs-NRO
chooser, a TDS-on-NRO-interest calculator, and a Form 15CA/15CB checker —
each required to have thresholds/rules verified against IRS.gov and
incometax.gov.in before publishing any figures, per the queue description
and the routine's own instruction not to assert unverified tax figures as
checked.

This run had live web search access and used it: every headline figure
below (30% domestic NRO interest TDS rate, 4% health & education cess,
15% India-US DTAA Article 11 general interest rate, the Form 15CA ₹5 lakh
Part A/B/C/D threshold structure, Rule 37BB's 33-item specified exempt
list, and section 206AA's 20% no-PAN floor) was cross-checked against
multiple independent secondary tax-reference sources. A direct fetch of
`incometaxindia.gov.in`'s Form 15CA FAQ page was attempted and blocked
(HTTP 403), the same failure mode the `nric-001d` pass hit against
`irs.gov` — see ADR 0005. This remains a secondary-source cross-check, not
a professional tax review or a direct read of the primary statute/rule
text, and needs Ajinkya's own fact-verification pass before publishing —
same posture as every prior calculator on this site.

One search surfaced a genuine, unsettled legal question: whether section
206AA's no-PAN floor rate can override a lower DTAA-entitled rate. Case
law (cited in secondary sources, e.g. reasoning attributed to Delhi HC in
cases like Danisco India) holds a DTAA rate should still apply even
without PAN, but bank/deductor practice in the field varies and this
isn't a settled, bright-line rule a calculator can safely encode as a
single number.

## Decision
Build each tool around its core, well-established rule only, mirroring
the pattern set by `nric-001`/ADR 0002:

- **NRE vs NRO chooser** — a pure fund-sourcing rule (foreign-source funds
  → NRE, India-source income → NRO, both → both accounts). Does not
  compare the two account types' interest-taxability or repatriation-limit
  differences (those belong to the NRO TDS calculator and the future
  `nric-003` repatriation-limit calculator respectively), joint-account
  rules, or FCNR(B)/RFC alternatives.
- **TDS on NRO interest calculator** — applies the 30%+4%-cess domestic
  rate by default, or 15%+cess under the India-US DTAA's Article 11
  general rate if the user attests to holding a DTAA claim (TRC + Form
  10F) *and* has a PAN on file. Does not model surcharge (income-slab/
  aggregate-income dependent, set by each year's Finance Act) or the
  DTAA's 10%/0% rates for approved institutions/government loans. For the
  disputed no-PAN/DTAA-override question, the tool deliberately does
  **not** pick a side: it applies the conservative domestic rate and
  surfaces an inline note naming the dispute, rather than asserting
  either "DTAA still applies" or "DTAA is lost" as settled fact — an
  unqualified answer here would overclaim on a genuinely contested legal
  point, which matters more on a YMYL tax site than picking *a* number.
- **Form 15CA/15CB checker** — a decision tree over Rule 37BB's Part
  A/B/C/D structure and the ₹5 lakh threshold. Takes "is this remittance
  on the exempt list" and "is this remittance chargeable to tax" as user-
  supplied facts rather than attempting to reproduce Rule 37BB's 33-item
  list or make the chargeability determination itself — both are
  substantive tax questions the tool isn't positioned to answer generally.

Every tool states what it does not model directly in its own UI copy (not
just in this doc or the changelog), matching the site's established
pattern. The page-level cross-check note above the three tools states
plainly what was and wasn't verified this run and that Ajinkya's own pass
is still needed, matching the wording pattern `nric-001d`/ADR 0005
established for the DTAA page.

## Consequences
- These three tools are usable and internally consistent — verified with
  hand-picked test vectors (₹100,000 gross NRO interest → ₹31,200 TDS at
  the 30%+cess domestic rate, ₹15,600 at the 15%+cess DTAA rate; a ₹3 lakh
  chargeable remittance with no AO certificate → Form 15CA Part A only; a
  ₹8 lakh chargeable remittance with no AO certificate → Form 15CA Part C
  plus Form 15CB) — but are not yet fact-checked against a live
  authoritative source directly and should not be treated as publish-
  ready until that pass happens.
- If Ajinkya's verification pass finds a rate has changed (e.g. a future
  Finance Act amendment to the cess or surcharge structure, or an update
  to Rule 37BB's specified list) or wants surcharge/the DTAA institution
  rate/the no-PAN dispute resolved into the calculator, those are natural
  follow-up tasks on the existing structure (one pure function per tool in
  `src/lib/calculators/`, one client component per tool) — additive, not a
  rewrite.
- No new dependencies added; all three tools reuse the existing
  `CalculatorShell`/`NumberField`/`CheckboxField`/`ResultRow`,
  `HowCalculated`, `SourceCitation`, and `DownloadPdfButton` components
  from `nric-001c`/`nric-001e` — no new form-field types or shared
  components were needed at this scope.
