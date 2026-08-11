# Changelog

All notable changes to NRI Calculator, in reverse chronological order.

## 2026-08-10 -- Blog/FAQ content pass, batch 6 (nric-0086)

Continued the nric-006 series with a sixth batch, per the user's selection to keep advancing content toward the charter's 25-30/cluster target after batch 5 (nric-006e) shipped -- see ADR 0016 for full topic-selection reasoning.

12 new articles (3 per cluster, src/lib/blog/articles.ts) and 12 new FAQ entries (src/lib/blog/faqs.ts): US state "sticky residency" rules, Form 8802/6166, and IRS Streamlined Filing Compliance Procedures for DTAA & Tax Residency; mandatory FEMA account redesignation on becoming NRI, Section 195 vs 194J/192 TDS on NRI salary/professional income, and Section 64 clubbing of gifts to a spouse or minor child for NRE/NRO & TDS; RSU/ESPP cross-border taxation, the Section 10(10D) FA2023 high-premium carve-out, and Section 115BBH crypto/VDA taxation for Investments & Repatriation; the Capital Gains Account Scheme, Section 56(2)(x) gift taxation, and Section 24(b)/80C joint home loan deductions for Real Estate Capital Gains.

Every claim was checked via live web search before drafting, per the lesson learned from the ADR 0015 fact-check pass earlier in this session. One item is flagged rather than resolved: whether DTAA relief can offset Section 115BBH's flat-rate crypto/VDA regime is unclear from public secondary sources and needs a professional's confirmation before publish.

Site now has 72 articles / 72 FAQ entries (18/cluster), up from 60/60 (15/cluster) after batch 5.

Ran local verification this pass (unlike batch 5, which noted this as a gap): `npx tsc --noEmit` and `npm run lint` both pass clean. `npm run build` fails only on a sandbox network restriction (next/font's Google Fonts fetch), unrelated to this batch's content changes.

Added docs/decisions/0016-blog-faq-content-pass-batch-6.md.


## 2026-08-10 -- Blog/FAQ content pass, batch 5 (nric-006e)

Orientation confirmed nri-calculator.phase implied an active queue and identified nric-006e (blog/FAQ content pass, batch 5) as the next queued task in the four-batch content build ADR 0011/0012/0013/0014 set in motion. Batch 4's own PR was still open awaiting Gauri's review at the start of this pass, consistent with the project's standing merge policy that unattended work never merges its own or a prior pass's branch.

Continued the nric-006/006b/006c/006d content build with a fifth batch, per nric-006e's own scope (a further 3 articles per cluster) -- see ADR 0015 for the full reasoning on volume and topic selection.

12 new articles (3 per cluster, src/lib/blog/articles.ts) and 12 new FAQ entries (src/lib/blog/faqs.ts): Form 67/Rule 128 foreign tax credit claims, the Finance Act 2020 deemed-residency rule's actual scope, and the Form 10F-plus-TRC relationship for DTAA & Tax Residency; the Section 393(2) TDS rate on mutual fund dividends, NRI advance-tax obligations, and NRE/NRO account handling on permanent return to India for NRE/NRO & TDS; REIT/InvIT distribution taxation's multi-component structure, continued PPF contributions for NRIs, and why Form 15G/15H cannot be used to avoid EPF withdrawal TDS for Investments & Repatriation; the FEMA restriction on NRIs buying agricultural land, why Section 86 (renumbered from Section 54F) requires reinvestment property to be in India, and the US Form 1116 foreign tax credit interaction for real estate capital gains.

Every new article is interlinked within its cluster (2-3 related-article links spanning batches 1-5) and inherits the existing /blog/[slug] template's Disclaimer placement and category-page "Related reading" wiring automatically -- no changes to batches 1-4's own content or to the /blog/, /blog/[slug]/, /faq route code.

Site now has 60 articles / 60 FAQ entries (15/cluster); still short of the charter's 25-30/cluster target, with a further batch remaining as follow-up work.

A citation-consistency issue was flagged during this pass rather than fixed: this batch's Form 10F article cites the Income-tax Act, 2025 renumbered successor consistently as "Form 41", but at least one earlier batch is understood to have used "Form 44" for the same form in one passage. This pass did not audit or correct earlier batches' citations -- see ADR 0015 for the full note and the recommendation that this needs a dedicated citation-consistency pass across all five batches before any of this content is treated as publish-ready.

Every figure in this batch still needs Ajinkya's own fact-verification pass before publish-ready -- see ADR 0015 for the full list, most notably: the Form 67/Rule 128 filing mechanics and the case-law claim about late-filing leniency, the exact Rs 15 lakh/residence-or-domicile conditions in the FA2020 deemed-residency rule, whether AMCs actually apply DTAA rates on file for mutual fund dividend TDS, the 2024 PPF post-maturity rule change for NRIs, the FEMA agricultural-land inheritance exception and benami-transaction characterization, and the Form 1116/Net Investment Income Tax interaction for US-resident NRIs/OCIs.

This pass did not run npm ci/tsc/lint/build locally -- all edits were made directly via the GitHub web editor against the existing branch, consistent with the tooling used for batches 1-4's own follow-on commits in this same session. Content was verified structurally (no duplicate slugs/ids, no dangling relatedSlugs/relatedArticleSlug references, array/object syntax balanced) by reading back the committed file contents after each commit, but a full local build/lint/typecheck pass and a browser smoke test of the new pages have not yet been run and are recommended before merge.

Added docs/decisions/0015-blog-faq-content-pass-batch-5.md.


## 2026-08-07 — Real estate capital gains corrections (nric-004 follow-up)

Per Ajinkya's review against the official Income-tax Act 2025 TDS rate chart, corrected three issues in the nric-004 calculators below: the STCG default TDS rate (30% -> 20%, the definite statutory rate under Section 393(2) [Table S.No. 17(e)] / Section 196, not a conservative top-slab estimate), stale "Section 195" citations (-> Section 393(2), consistent with the renumbering already confirmed on PR #9), and three broken incometaxindia.gov.in source links (`/w/tds-on-sale-of-property` -> `/w/section-393-5` and `/w/certificate-of-lower/no-deduction-of-tax-at-source`; `/w/capital-gains` -> `/w/capital-gain`). Also resolved PR #12's merge conflicts against `main` (additive changelog entries; `real-estate-capital-gains/page.tsx` now renders the real calculators followed by PR #13's "Related reading" blog-article section, replacing the stale "coming soon" placeholder). PR left unmerged for Gauri's review per Ajinkya's instruction.

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
## 2026-08-04 — NRE/NRO & TDS calculators (nric-002)

Built the three calculators scoped for the NRE/NRO & TDS category page
(`src/app/nre-nro-tds/page.tsx`), replacing its "coming soon" placeholder
text. The `Disclaimer` component continues to render near the top of the
page, unchanged, per CLAUDE.md rule 3.

- **NRE vs. NRO chooser** (`src/lib/calculators/nreNroChooser.ts` +
  `src/components/calculators/NreNroChooser.tsx`) — a decision aid over
  FEMA-eligibility, funds-source (foreign/India/both), and
  repatriability-need inputs, recommending NRE, NRO, both, or flagging
  FEMA-status uncertainty. Does not check actual FEMA residency status or
  account-opening KYC eligibility.
- **TDS on NRO account interest**
  (`src/lib/calculators/nroInterestTds.ts` +
  `src/components/calculators/NroInterestTdsCalculator.tsx`) — statutory
  flat 30% non-resident withholding rate plus 4% cess (31.2% effective)
  by default, with an optional user-supplied lower rate for certified
  DTAA/treaty cases, mirroring `dtaaRelief.ts`'s existing pattern of
  taking a rate as input rather than asserting one. Does not model
  surcharge (income-slab-dependent) or ITR-filed refunds of excess TDS.
- **Form 15CA/15CB checker** (`src/lib/calculators/form15caChecker.ts` +
  `src/components/calculators/Form15caChecker.tsx`) — the ₹5 lakh
  aggregate-per-financial-year threshold separating Form 15CA Part A
  (no CA certificate) from Part C + Form 15CB (CA-certified), plus Part
  B for remittances with an existing Assessing Officer
  certificate/order, and a user-supplied "on the Rule 37BB exempt list"
  checkbox rather than checking that list itself. Does not aggregate
  multiple remittances across the year or model Form 15CA Part D.
- Added a shared `CalculatorShell`/`NumberField`/`CheckboxField`/
  `ResultRow`/`HowCalculated`/`SourceCitation` usage consistent with the
  DTAA/tax-residency page — no new shared components needed. Did not add
  a "Download result as PDF" affordance: `nric-001e` scoped that
  specifically to the DTAA/tax-residency calculators as a follow-up
  task, not as a standing requirement for every future calculator: see
  ADR 0008.
- **Significant finding, flagged prominently on the page itself, not
  just here**: a live web-search cross-check this run surfaced that
  India's **Income-tax Act, 2025 came into force on 1 April 2026**,
  repealing the Income Tax Act, 1961, for tax years from FY 2026-27
  onward — and today (2026-08-04) falls within FY 2026-27. The
  rates/thresholds used here are corroborated by current public
  tax-reference sources and believed to carry over substantively, but
  the specific 1961-Act section numbers this page's explanatory text
  references (e.g. Section 195) have **not** been individually
  re-verified against the new Act's renumbered sections — a prominent
  callout on the page itself says so. See ADR 0008 for the full
  reasoning, including a flag that this same gap likely also affects the
  already-published `dtaa-tax-residency` page's own section citations,
  which is out of this task's scope to fix (one task per run) but worth
  a dedicated follow-up task.
- **Needs Ajinkya's fact-verification pass before publishing**: every
  rate/threshold above (30%/4% cess NRO TDS, the NRE exemption, the ₹5
  lakh Form 15CA/15CB threshold) is corroborated by a live web-search
  cross-check this run against multiple independent tax-reference
  sources (with no discrepancies found), but a direct
  incometax.gov.in fetch was blocked (HTTP 403, same as ADR 0005/0006's
  prior experience) — this remains a secondary-source cross-check, not
  a professional review. Verify against incometax.gov.in and RBI's FEMA
  master directions directly, or with a qualified advisor, before
  relying on any result — and see the note above specifically on
  section-number citations under the new Act.
- Verified with `npm run lint` (clean), `npm run build` (all 7 routes
  still prerender statically), and a live `npm run start` + Playwright
  smoke test confirming the disclaimer's position and correct outputs
  for hand-picked test vectors: ₹1,00,000 NRO interest at the default
  rate withholds exactly ₹31,200 (net ₹68,800); a ₹3,00,000 remittance
  needs only Form 15CA Part A, an ₹8,00,000 one needs Part C + 15CB; the
  chooser recommends NRE for foreign-sourced funds, NRO for India-sourced
  funds, and flags FEMA-status uncertainty when the NRI/PIO box is
  unchecked — with no console errors.
## 2026-08-06 — Blog/FAQ content pass, batch 4 (nric-006d)

Orientation confirmed `nri-calculator.phase` implied an active queue and
identified `nric-006d` (blog/FAQ content pass, batch 4) as the single
highest-priority, and only, queued task. Duplicate-run check: the most
recent `nri-calculator` entry in `orchestrator-state/state.json`'s
`run_history` (2026-08-06T17:40:00Z) described completing `nric-006c`
(batch 3), not `nric-006d`, so this pass is not a duplicate trigger.
**Correction found this pass:** PR #15 (`nric-006c`, batch 3) is
actually **merged to `main`** — confirmed via the GitHub API (`merged:
true`, `merged_by: gauribiz08-cell`, merged 2026-08-06T15:22:41Z), per
the task's own explicit instruction to re-check PR #15's status rather
than trust the state file's "open" note. Read `nri-calculator/CLAUDE.md`
in full — rule 3 (Disclaimer prominent placement) and rule 4 (no
unrequested features) checked against the plan. Confirmed the
PreToolUse guard is live via a read-only clone (`pretooluse-guard.sh`
git mode `100755`, `.claude/settings.json` wires it to
`Bash|Write|Edit`). No database involved
(`supabase_project_ref_production: null`), and this task needed no
Supabase access.

Continued the `nric-006`/`nric-006b`/`nric-006c` content build with a
fourth batch, per `nric-006d`'s own scope ("3-5 more articles per
cluster") — see ADR 0014 for the full reasoning on volume (3/cluster,
matching batches 1-3's pace) and topic selection:

- **12 new articles** (3 per cluster, `src/lib/blog/articles.ts`) and
  **12 new FAQ entries** (`src/lib/blog/faqs.ts`) — Form W-8BEN
  treaty-rate claims, the (nonexistent) India-US Social Security
  totalization agreement, and OCI/PIO status vs. tax residency for
  DTAA & Tax Residency; premature NRO fixed-deposit withdrawal and its
  TDS mechanics, joint NRE/NRO accounts with a resident relative, and
  Form 26AS reconciliation for NRE/NRO & TDS; Form 8621 PFIC-reporting
  mechanics, SIP investing (NRE vs. NRO funding), and US 401(k)/Roth IRA
  treatment on returning to India for Investments & Repatriation;
  claiming a refund of excess property-sale TDS, selling inherited
  agricultural land as an NRI, and Power of Attorney mechanics for Real
  Estate Capital Gains.
- Research was split across four independent parallel subagent passes
  (one per cluster), each cross-checking its own topics via live web
  search against convergent secondary tax-reference sources —
  irs.gov/incometax.gov.in/rbi.org.in direct fetches returned HTTP 403
  throughout, consistent with every prior pass on this site.
- Every new article is interlinked within its cluster (2-3
  related-article links spanning batches 1-4) and inherits the existing
  `/blog/[slug]` template's `Disclaimer` placement and category-page
  "Related reading" wiring — no changes to batches 1-3's own content or
  to the `/blog`/`/blog/[slug]`/`/faq` route code.
- Site now has 48 articles/48 FAQs (12/cluster); remainder split into
  new task `nric-006e` (queued in `orchestrator-state/state.json`).

**Every figure in this batch still needs Ajinkya's own
fact-verification pass before publish-ready** — see ADR 0014 for the
full list, most notably: the Roth IRA/Section 89A interaction (flagged
as genuinely unresolved among tax professionals, not just an
unconfirmed number), the DTAA Article 20 "saving clause" reading for US
citizens/green-card holders, the rural/urban agricultural-land
capital-asset thresholds under Section 2(14)(iii), state-specific
agricultural-land buyer-eligibility rules, the Power of Attorney
stamping/adjudication window, and the NRO FD premature-withdrawal
TDS-reconciliation mechanics (left as an open question in the article
itself, since research found no single consistent answer).

Verified this pass (locally, via a fresh clone) with `npm ci`, `npx tsc
--noEmit` (clean), `npm run lint` (clean), and `npm run build` (59
static routes, up from 47, including 48 `/blog/[slug]` article pages up
from 36, all prerendering statically), plus a programmatic check
confirming no duplicate article slugs/FAQ ids and no dangling
`relatedSlugs`/`relatedArticleSlug` references. Also ran a local
`npm run start` smoke test: all four new-batch sample pages return 200,
an unknown slug returns 404, the blog index and FAQ page list the new
entries, the `/dtaa-tax-residency` category page's "Related reading"
section picks up all three new DTAA articles automatically, and the
`Disclaimer` renders immediately above the article body on every new
page. No new entries appeared in `.claude/hooks/violations.log` this
pass (untracked/gitignored, no violation-triggering tool calls
occurred), so no Gmail draft was needed.

## 2026-08-06 — Blog/FAQ content pass, batch 3 (nric-006c)

Orientation confirmed `nri-calculator.phase` implied an active queue and
identified `nric-006c` (blog/FAQ content pass, batch 3) as the single
highest-priority, and only, queued task. Duplicate-run check: the most
recent `nri-calculator` entry in `orchestrator-state/state.json`'s
`run_history` (2026-08-05T15:10:00Z) described completing `nric-006b`
(batch 2), not `nric-006c`, so this pass is not a duplicate trigger.
Confirmed PR #14 (batch 2) is merged via the live GitHub API, per the
task's own instruction not to trust the state file's note on this.
Read `nri-calculator/CLAUDE.md` in full — rule 3 (Disclaimer prominent
placement) and rule 4 (no unrequested features) checked against the
plan. Confirmed the PreToolUse guard is live via a read-only clone
(`pretooluse-guard.sh` git mode `100755`, `.claude/settings.json` wires
it to `Bash|Write|Edit`). No database involved
(`supabase_project_ref_production: null`), and this task needed no
Supabase access.

Continued the `nric-006`/`nric-006b`/ADR 0011/0012 content build with a
third batch, per `nric-006c`'s own scope ("3-5 more articles per
cluster") — see ADR 0013 for the full reasoning on volume (3/cluster,
matching batches 1-2's pace) and topic selection:

- **12 new articles** (3 per cluster, `src/lib/blog/articles.ts`) and
  **12 new FAQ entries** (`src/lib/blog/faqs.ts`) — the Foreign Tax
  Credit (Form 1116), the DTAA Article 4 tie-breaker test, and the US
  exit tax for long-term green card holders for DTAA & Tax Residency;
  NRO-to-NRE transfers, TDS on NRO fixed deposits, and PAN cards for
  NRIs for NRE/NRO & TDS; PIS vs. non-PIS demat accounts, US tax on
  Indian ULIPs (PFIC exposure), and US estate tax exposure for NRAs for
  Investments & Repatriation; the Budget 2024 property LTCG indexation
  removal, repatriating property sale proceeds, and joint-property-
  ownership capital gains/TDS splitting for Real Estate Capital Gains.
- Every new article is interlinked within its cluster (2-3
  related-article links spanning batches 1-3) and inherits the existing
  `/blog/[slug]` template's `Disclaimer` placement and category-page
  "Related reading" wiring automatically — no page-level code changes,
  since those are driven by `getArticlesForCluster`/`getRelatedArticles`.
- Research this pass was split across four independent parallel passes
  (one per cluster), each cross-checking its own topics via live web
  search. IRS.gov and incometax.gov.in direct fetches were unavailable
  (HTTP 403) throughout, so figures rely on convergent reputable
  secondary sources rather than a directly-read primary source — flagged
  per-article, and summarized in ADR 0013, with a notably longer list of
  figures needing Ajinkya's direct verification than prior batches,
  since several topics (the Budget 2024 property-LTCG indexation
  change especially, plus IRC 877A's inflation-indexed exit-tax
  thresholds and the PAN-form restructuring) are recently-changed or
  annually-adjusted rules rather than stable, long-standing figures.
- Verified with `npm ci`, `npx tsc --noEmit`, `npm run lint` (clean),
  and `npm run build` — 47 static routes generated (up from 35),
  including 36 `/blog/[slug]` article pages (up from 24), all
  prerendering statically. Slug/id uniqueness and every
  `relatedSlugs`/`relatedArticleSlug` cross-reference were checked
  programmatically against the full merged file content — no dangling
  references, no duplicate slugs or FAQ ids.

## 2026-08-05 — Blog/FAQ content pass, batch 2 (nric-006b)

Orientation confirmed `nri-calculator.phase` implied an active queue and
identified `nric-006b` (blog/FAQ content pass, batch 2) as the single
highest-priority, and only, queued task — `nric-001` through `nric-006`
were all done. Duplicate-run check: the most recent `nri-calculator`
entry in `orchestrator-state/state.json`'s `run_history`
(2026-08-05T12:35:00Z) described completing `nric-006` (batch 1), not
`nric-006b`, so this pass is not a duplicate trigger. Read
`nri-calculator/CLAUDE.md` in full — rule 3 (Disclaimer prominent
placement) and rule 4 (no unrequested features) checked against the
plan. Confirmed the PreToolUse guard is live via a read-only clone
(`pretooluse-guard.sh` git mode `100755`, `.claude/settings.json` wires
it to `Bash|Write|Edit`). No database involved
(`supabase_project_ref_production: null`), and this task needed no
Supabase access.

Continued the `nric-006`/ADR 0011 content build with a second batch, per
`nric-006b`'s own scope ("3-5 more articles per cluster") — see ADR 0012
for the full reasoning on volume (3/cluster, matching batch 1's pace)
and topic selection:

- **12 new articles** (3 per cluster, `src/lib/blog/articles.ts`) and
  **12 new FAQ entries** (`src/lib/blog/faqs.ts`) — RNOR status, dual-status
  US returns, and Form 8833 for DTAA & Tax Residency; FCNR deposits, the
  NRI ITR-filing-trigger checklist, and TDS on rent to an NRI landlord
  for NRE/NRO & TDS; FBAR/FATCA, NPS eligibility, and cross-border
  gifting for Investments & Repatriation; Section 54/54EC reinvestment
  exemptions, inherited-property cost basis, and a TCS/LRS
  myth-correction (LRS does not apply to NRI repatriation) for Real
  Estate Capital Gains.
- Every new article is interlinked within its cluster (2-3 related-article
  links spanning batch 1 and batch 2) and inherits the existing
  `/blog/[slug]` template's `Disclaimer` placement and category-page
  "Related reading" wiring automatically — no page-level code changes,
  since those are driven by `getArticlesForCluster`/`getRelatedArticles`,
  not a hardcoded list. Batch 1's own articles/FAQs were left unedited.
- 24 articles / 24 FAQ entries now exist total across the site (up from
  12/12) — still short of the charter's 25-30/cluster target; a further
  batch remains queued as a follow-up task, same ongoing-build framing as
  ADR 0011.
- Verified with `npm run lint` (clean), `npm run build` (35 routes now
  generated, up from 23, all prerender statically including the 12 new
  article pages), and a headless Playwright smoke test (throwaway
  `--no-save` devDependency, reverted before this commit) confirming
  `Disclaimer` placement and an `h1` on all 12 new article pages, related
  reading links from each category page to a new batch-2 article, `/faq`
  still renders its `Disclaimer`, an unknown `/blog/` slug still 404s,
  and no unexpected console errors during the sweep.
- Every factual/numeric claim in this batch was cross-checked via live
  web search against multiple independent secondary tax-reference
  sources, with specific figures still needing Ajinkya's own
  fact-verification pass before publish-ready — see ADR 0012 for exactly
  which figures are flagged as most in need of direct confirmation
  (current NRI basic exemption limit, Form 8938's full threshold table,
  Section 54/54F and 54EC caps, and the FY2026-27 Income-tax Act, 2025
  RNOR/120-day provision).

## 2026-08-05 — Blog/FAQ content pass, batch 1 (nric-006)

Orientation confirmed `nri-calculator.phase` implied an active queue and
identified `nric-006` (blog/FAQ content pass) as the only queued task —
`nric-001` through `nric-005` were all done (`nric-002` and `nric-004`
still had open PRs #9/#12 at the time of this pass). Duplicate-run check:
the most recent `nri-calculator` entry in `orchestrator-state/state.json`'s
`run_history` (2026-08-05T02:00:00Z) described completing `nric-004`, not
`nric-006`, so this pass is not a duplicate trigger. Cross-checked
`project-docs-index/nri-calculator/changelog.md` for any existing
`nric-006` work before starting — none found. Confirmed the PreToolUse
guard is live via a read-only clone (`pretooluse-guard.sh` git mode
`100755`, `.claude/settings.json` wires it to `Bash|Write|Edit`).

`nric-006`'s own wording ("25-30 interlinked articles per topic cluster")
implies roughly 100-120 articles across the site's four clusters — not
achievable in one unattended pass without either padding with thin
content or making unverified factual claims at scale. See ADR 0011 for
the full reasoning. This pass instead built the reusable infrastructure
plus a real first batch:

- **`/blog`** — index page grouped by topic cluster, `Disclaimer` near
  the top per CLAUDE.md rule 3.
- **`/blog/[slug]`** — statically generated article pages
  (`generateStaticParams`, consistent with the rest of the site), each
  with `Disclaimer` near the top, a link back to its cluster's
  calculator page, and 2-3 related-article links.
- **`/faq`** — a 12-question FAQ page spanning all four clusters,
  `Disclaimer` near the top, each answer linking to its fuller article
  where one exists.
- **12 articles** (3 per cluster — `src/lib/blog/articles.ts`) and
  **12 FAQ entries** (`src/lib/blog/faqs.ts`), interlinked within each
  cluster and cross-cluster where genuinely relevant (e.g., the
  repatriation article links to the NRE/NRO account-choice article).
- **`/blog` and `/faq` added to the top-level nav** (`layout.tsx`).
- **"Related reading" section added to all four category pages**
  (`dtaa-tax-residency`, `nre-nro-tds`, `investments-repatriation`,
  `real-estate-capital-gains`), linking to that cluster's new articles —
  appended after existing content, without moving or displacing the
  `Disclaimer` component's required top-of-page position.

Content is structured TypeScript data rather than a CMS/MDX pipeline —
this project has no database, and adding a content-pipeline dependency
for a first batch would be scope expansion beyond what `nric-006` asked
for.

**Needs Ajinkya's fact-verification pass before publishing**: every
structural/conceptual claim in this batch (NRE interest exemption,
Substantial Presence Test weighting, PFIC default treatment, Section 195
withholding-on-full-consideration, RBI's NRO repatriation ceiling, and
others) was cross-checked via live web search against multiple
independent secondary tax-reference sources, with no discrepancies
found, but no direct irs.gov / incometaxindia.gov.in fetch was attempted
this pass — same access constraint as ADR 0005/0006/0008/0009/0010.
Where a specific number is already implemented and flagged in an
existing calculator, these articles point to that calculator rather than
restating the figure, to avoid maintaining it in two places.

Verified with `npm run lint` (clean), `npm run build` (all article/FAQ/
blog routes prerender statically, 23 total generated pages), and a
headless Playwright smoke test (installed as a throwaway devDependency,
reverted before this commit) confirming: disclaimer renders near the top
of `/blog`, every article, `/faq`, and all four category pages; nav
exposes `/blog` and `/faq`; article and FAQ interlinking resolves; an
unknown `/blog/<slug>` 404s; no console/page errors.

`nric-006` is **not** marked fully done against its own 25-30/cluster
target — see `orchestrator-state/state.json`, which records this batch
and queues `nric-006b` to continue the build in future passes.

- `docs/changelog.md` — this entry.
- `docs/decisions/0011-blog-faq-content-pass-scope.md` — new ADR.

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

 ## 2026-08-10
 
- Refreshed CLAUDE.md: "Known open items" and "Already completed" sections
  had gone stale since the initial scaffold commit and no longer reflected
  shipped work (calculators, design system, PDF export, blog/FAQ, domain).
  No functional code changed.
