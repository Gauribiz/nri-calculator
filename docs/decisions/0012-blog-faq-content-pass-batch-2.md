# ADR 0012: Blog/FAQ content pass, batch 2 — scope and topic selection

## Status
Accepted, 2026-08-05.

## Context
`nric-006b` continues the multi-pass blog/FAQ content build ADR 0011
started: `nric-006` (batch 1) shipped the `/blog` and `/faq`
infrastructure plus 3 articles and 3 FAQ entries per topic cluster (12
articles, 12 FAQs total). `nric-006b`'s own description asks for "another
3-5 per cluster" using the existing `articles.ts`/`faqs.ts` structure —
not a new content system, not a rewrite of batch 1.

## Decision
1. **Volume: 3 new articles per cluster (12 total), each with a matching
   FAQ entry (12 total)** — the low end of the suggested 3-5/cluster
   range, not the high end. Reasoning: every article on this site is a
   public financial-advisory page, and this pass's topics (RNOR status,
   dual-status US returns, Form 8833, FBAR/FATCA, NPS eligibility, gift
   reporting, Section 54/54EC, inherited-property cost basis, TCS/LRS
   scope) are all genuinely new factual ground, not restatements of
   existing content — each one needed its own live web-search
   cross-check before writing. Matching batch 1's pace (3/cluster) keeps
   that verification real rather than stretched thin across 5/cluster to
   hit a bigger number. 55 more articles across the four clusters remain
   to reach the charter's stated 25-30/cluster target — tracked as a
   further follow-up task, the same ongoing-build framing ADR 0011 set.
2. **No changes to batch 1's articles, FAQs, or the `/blog`, `/blog/[slug]`,
   `/faq` infrastructure.** This pass only appends new entries to
   `src/lib/blog/articles.ts` and `src/lib/blog/faqs.ts`, reusing the
   existing `Article`/`Faq` types, `getArticlesForCluster`, and
   `getRelatedArticles` helpers verbatim. Category pages automatically
   pick up the new articles in their "Related reading" sections with no
   page-level code changes, since that section is driven by
   `getArticlesForCluster` rather than a hardcoded list.
3. **Topic selection deliberately avoids re-covering batch 1's ground**
   and instead picks the next-most-common follow-up questions per
   cluster: a transitional-residency status (RNOR) and two US-side
   filing mechanics (dual-status returns, Form 8833) for DTAA & Tax
   Residency; a third account type (FCNR), an ITR-filing-trigger
   explainer, and a landlord-side TDS obligation for NRE/NRO & TDS; two
   US reporting regimes (FBAR/FATCA, cross-border gift reporting) and an
   investment-eligibility nuance (NPS) for Investments & Repatriation;
   and two reinvestment/cost-basis mechanics (Section 54/54EC, inherited
   property) plus one myth-correcting piece (TCS/LRS does not apply to
   NRI repatriation) for Real Estate Capital Gains.
4. **Render the standard `Disclaimer` component near the top of every
   new article** — inherited automatically from the existing
   `src/app/blog/[slug]/page.tsx` template (Disclaimer position is not
   article-specific code), verified this pass via a headless smoke test
   across all 12 new slugs, per CLAUDE.md rule 3.
5. **Interlink each new article within its cluster** (2-3 related
   article links, mixing references to batch 1 and batch 2 articles) but
   **do not retroactively edit batch 1 articles' own `relatedSlugs`** to
   link back to the new ones. Reasoning: batch 1 is already-reviewed,
   possibly-merged content; editing it as a side effect of an unrelated
   content-addition task is out of this task's stated scope (CLAUDE.md
   rule 4, no unrequested changes) and risks conflicting with Ajinkya's
   own edits if PR #13 has already been reviewed by the time this PR is
   read.

## Consequences
- 24 articles now exist total (12 from batch 1, 12 from this pass) —
  6 per cluster — plus 24 FAQ entries, still short of the charter's
  25-30/cluster target. A further batch remains queued.
- Every factual/numeric claim in this batch was cross-checked via live
  web search against multiple independent secondary tax-reference
  sources this pass (RNOR eligibility and duration, dual-status filing
  and the First-Year Choice election, Form 8833's disclosure requirement
  and $1,000 penalty, FCNR mechanics, NRI ITR filing triggers, Section
  195 TDS on rent to an NRI landlord, FBAR's $10,000 threshold and
  FATCA/Form 8938's tiered thresholds, NPS eligibility and the
  citizenship-vs-OCI distinction, Form 3520's $100,000 gift-reporting
  threshold and Section 56(2)(x)'s relative exemption, Section 54/54EC
  reinvestment mechanics, inherited-property carryover cost basis and
  the pre-2001 fair-market-value election, and LRS/TCS not applying to
  NRI repatriation). No direct irs.gov / incometaxindia.gov.in fetch was
  attempted (same access constraint noted in every prior ADR on this
  site). Several figures — the current NRI basic exemption limit, the
  exact Form 8938 threshold table, the Section 54/54F combined
  exemption cap, the Section 54EC annual bond-investment cap, and the
  FY2026-27 Income-tax Act, 2025 RNOR/120-day provision specifically —
  are flagged inline in their respective articles as needing direct
  confirmation against current-year official text, not general
  secondary-source knowledge. **Every claim in this batch still needs
  Ajinkya's own fact-verification pass before these pages are treated as
  publish-ready** — the same standing flag as every other content page
  on this site.
- No new npm dependencies added to `package.json`. A headless smoke test
  (Playwright, throwaway `--no-save` install reverted before this
  commit) confirmed: `npm run build` produces 35 static routes (up from
  23), all 12 new article pages render with an `h1`, a `Disclaimer`
  (`aria-label="Disclaimer"`), and working related-article links; each
  cluster's category page now links to at least one new batch-2 article
  in its "Related reading" section; `/faq` still renders its
  `Disclaimer`; an unknown `/blog/` slug still 404s; and no unexpected
  console/page errors occurred during the sweep.
