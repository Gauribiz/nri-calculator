# ADR 0010: Real estate capital gains calculator scope, and the Form 13 → Form 128 renumbering

## Status
Accepted, 2026-08-05.

## Note on numbering
Filed as ADR 0010, not 0008. ADR 0008 does not exist on `main` as of this
pass, but `nric-002`'s PR #9 (still open, unmerged) already documents
itself internally as ADR 0008. ADR 0009 (`nric-003`, merged via PR #11)
already resolved this same collision by skipping ahead; this pass
continues the same numbering to avoid colliding with PR #9 whenever it
merges.

## Context
`nric-004` asked for three tools on `/real-estate-capital-gains`: an
LTCG/STCG-on-property-sale calculator, a Section 195 TDS-on-NRI-sale
calculator, and a Form 13 explainer.

Real estate capital gains for NRIs sit at the intersection of several
genuinely complex, frequently-changed rules: the Finance (No. 2) Act,
2024 removed indexation and set a flat 12.5% LTCG rate for land/buildings
(effective 23 July 2024), but grandfathered a 20%-with-indexation option
for **resident individuals and resident HUFs only** — not NRIs. Section
195 TDS applies to the *full sale consideration*, not the gain, and has
no single prescribed rate table the way Section 194-IA does for resident
sellers. And — per the finding already on record from `nric-002`'s PR #9
— India's Income-tax Act, 2025 (in force from FY 2026-27, which includes
this run's own date) renumbers provisions from the 1961 Act.

## Decision

**Scope of the three tools**, each narrowly bounded and explicit about
what it does not model (same pattern as every other calculator on this
site):

1. `realEstateCapitalGains.ts` / `RealEstateCapitalGainsCalculator.tsx` —
   classifies a sale as long-term (>24 months held) or short-term, and
   computes the unindexed capital gain. For LTCG, shows an estimated tax
   at the flat 12.5% rate (no indexation branch is offered, since the
   Finance Act 2024 grandfathering option to use 20%-with-indexation is
   restricted to resident individuals/HUFs and does not apply to NRIs —
   confirmed via a live web-search cross-check this pass). For STCG, does
   **not** assert a rupee tax figure, since short-term gains are taxed at
   the seller's ordinary slab rate, which this tool cannot know — same
   posture as `dtaaRelief.ts` not asserting a domestic tax rate.
   Deliberately does not model Section 50C/43CA stamp-duty-value
   substitution, Section 54/54EC/54F reinvestment exemptions, surcharge,
   cess on the LTCG figure, or foreign-currency acquisition-cost rules
   (Section 48 first proviso) — each is its own fact-specific area that
   would need ongoing maintenance to get right on a YMYL page.

2. `nriPropertySaleTds.ts` / `NriPropertySaleTdsCalculator.tsx` —
   estimates Section 195 withholding on the full sale consideration:
   12.5% (LTCG) or a conservative 30% (STCG, the top slab rate, since
   neither a buyer nor this tool can know the seller's actual slab) plus
   a flat 4% cess, mirroring the `base rate × 1.04` simplification
   `nric-002`'s TDS tool already used for NRO interest TDS. Deliberately
   does **not** model surcharge (10%-15%, tiered by the seller's total
   income, capped at 15% for capital-gains-type income unlike the
   25%/37% surcharge tiers on other income) — a buyer/this tool has no
   way to know the seller's total income, so any modeled figure would be
   a guess dressed up as a number. The tool says as much inline.

3. `form13LowerTds.ts` / `Form13Explainer.tsx` — rather than a bare
   explainer, gives one concrete, bounded comparison: default Section 195
   TDS (computed the same way as tool 2) vs. the user's own entered
   estimate of actual tax owed (deliberately not computed by this tool —
   sourced from tool 1 above, or a tax preparer), surfacing the likely
   excess withheld and a directional "worth applying?" read. This mirrors
   `nric-002`'s Form 15CA/15CB checker and `nric-003`'s PFIC filing
   checker: a decision-tree/comparison tool, not a liability calculator.
   Does not predict what rate a Form 13 application would actually be
   granted at (the Assessing Officer decides) or model processing time.

**The Form 13 → Form 128 renumbering finding**: a live web-search
cross-check this pass (not a direct incometaxindia.gov.in fetch, which —
consistent with every prior pass's experience — was not attempted)
surfaced that under the Income-tax Act, 2025, Form 13 is renumbered
**Form 128** and the underlying provision, Section 197, is renumbered
**Section 395**. This directly extends the renumbering gap `nric-002`'s
PR #9 first flagged and explicitly called out as "likely also affects...
worth a dedicated follow-up" — this pass addresses that follow-up for
the one form/section this category touches, rather than leaving it
unaddressed. The `Form13Explainer` component states both the old and new
form/section numbers and explicitly flags that the renumbering itself has
not been independently verified against the Act's official text (the
secondary sources found agree with each other but are still secondary
sources).

**No extra page-level "high complexity" callout** was added, unlike
`nric-003`'s `/investments-repatriation` page. `nric-003`'s task
description explicitly requested "extra disclaimer emphasis"; `nric-004`'s
task description does not make that request, so per CLAUDE.md rule 4
("never add unrequested features"), this pass did not add one. The
standard `Disclaimer` component still renders first on the page, per
CLAUDE.md rule 3, unchanged in content or position.

**No PDF export** was added, consistent with `nric-002` and `nric-003`'s
same call: `nric-001e` scoped "Download result as PDF" to the DTAA/
tax-residency calculators specifically, not as a standing requirement for
every future calculator.

**No date-picker inputs**: like every other calculator on this site
(`substantialPresenceTest.ts`, `indiaResidency.ts`), holding period is
collected as a plain "months held" number rather than two date pickers
with client-side date-diff math, avoiding timezone/date-arithmetic edge
cases for no real UX loss.

## Consequences
- New files: `src/lib/calculators/realEstateCapitalGains.ts`,
  `src/lib/calculators/nriPropertySaleTds.ts`,
  `src/lib/calculators/form13LowerTds.ts`, and their three matching
  components, wired into `src/app/real-estate-capital-gains/page.tsx` in
  place of the "coming soon" placeholder.
- **Needs Ajinkya's fact-verification pass** before this page is
  publish-ready: the 12.5% LTCG rate and its NRI-applies-unconditionally
  scoping, the 24-month LTCG/STCG holding threshold, the Section 195
  TDS mechanics and 4% cess simplification, the 15%-surcharge-cap-on-
  capital-gains claim, and the Form 13 → Form 128 / Section 197 → Section
  395 renumbering were all cross-checked via live web search this pass
  against multiple independent secondary tax-reference sources with no
  discrepancies found, but no direct incometaxindia.gov.in fetch was
  attempted and this is not a professional review — same standing flag
  as every other numeric tool on this site.
- No new dependencies added.
- Verified with `npm run lint` (clean), `npm run build` (all 7 routes
  still prerender statically), and a headless Playwright smoke test
  against the built production server confirming: the Disclaimer still
  renders before the calculators; the classifier's LTCG math (₹1,00,00,000
  sale − ₹60,00,000 acquisition − ₹5,00,000 improvement − ₹2,00,000
  transfer costs → ₹33,00,000 gain → ₹4,12,500 estimated LTCG tax at
  12.5%) and its short-term/loss branch (no crash, no tax figure
  asserted); the TDS estimator's default-rate math (₹1,00,00,000 sale,
  long-term → 13.00% effective rate → ₹13,00,000 estimated TDS) and its
  certificate-override branch; and the Form 13 tool's comparison math
  (₹13,00,000 default TDS vs. a ₹4,12,500 actual-tax estimate → ₹8,87,500
  likely excess withheld → "likely worth it", and the inverse case where
  actual tax meets or exceeds default TDS → "unlikely to help much") —
  no console errors in any case.
