# ADR 0013: Blog/FAQ content pass, batch 3 — scope and topic selection

## Status
Accepted, 2026-08-06.

## Context
`nric-006c` continues the multi-pass blog/FAQ content build ADR 0011
started and ADR 0012 continued: batches 1-2 (`nric-006`/`nric-006b`, PR
#13 merged + PR #14 merged — PR #14's merged status was confirmed live
via the GitHub API this pass, since the queue task's own description
flagged the state-file note describing it as "open" as something to
re-check rather than trust) shipped 6 articles/cluster (24 total) plus
24 FAQ entries. This task's own description asks for "another 3-5 per
cluster" using the existing `articles.ts`/`faqs.ts` structure — not a
new content system, not a rewrite of batches 1-2.

## Decision
1. **Volume: 3 new articles per cluster (12 total), each with a
   matching FAQ entry (12 total)** — the same low end of the suggested
   3-5/cluster range batches 1 and 2 both used, for the same reason:
   every article here is a public financial-advisory page, this pass's
   topics are all genuinely new factual ground needing their own
   verification pass, and holding the pace at 3/cluster keeps that
   verification real rather than stretched thin. 43 more articles
   across the four clusters remain to reach the charter's stated
   25-30/cluster target — tracked as a further follow-up task, the same
   ongoing-build framing ADR 0011/0012 set.
2. **No changes to batches 1-2's articles, FAQs, or the `/blog`,
   `/blog/[slug]`, `/faq` infrastructure.** This pass only appends new
   entries to `src/lib/blog/articles.ts` and `src/lib/blog/faqs.ts`,
   reusing the existing `Article`/`Faq` types, `getArticlesForCluster`,
   and `getRelatedArticles` helpers verbatim. Category pages and the
   `/blog`/`/faq` index pages automatically pick up the new entries with
   no page-level code changes.
3. **Topic selection deliberately avoids re-covering batches 1-2's
   ground** and instead picks the next-most-common follow-up questions
   per cluster:
   - **DTAA & Tax Residency**: the Foreign Tax Credit mechanism (Form
     1116) that batch 1's DTAA-relief article referenced but didn't
     detail; the Article 4 tie-breaker test's actual sequential
     mechanism, which the site's original residency article mentions
     exists but doesn't explain; and the US exit tax for long-term green
     card holders giving up status to move back to India — relevant to
     a segment of this site's audience the content hadn't addressed yet.
   - **NRE/NRO & TDS**: NRO-to-NRE fund transfers, a common but
     easy-to-misunderstand consolidation move; TDS specifically on NRO
     fixed deposits (batch 1 covered NRO interest generally, this
     drills into the FD-specific rate/mechanics); and PAN card
     application for NRIs, a prerequisite that touches nearly every
     other topic on this site but hadn't been its own article.
   - **Investments & Repatriation**: PIS vs. non-PIS demat routes for
     NRI equity investing; US tax treatment of Indian ULIPs as a PFIC
     analog to the existing mutual-fund article; and US estate tax
     exposure for NRAs with US-situs assets, distinct from the existing
     lifetime-gift-reporting article's death-vs-life-transfer scope.
   - **Real Estate Capital Gains**: the Budget 2024 indexation-removal
     change on property LTCG — flagged in the article itself, and again
     below, as needing unusually heavy hedging given how recently and
     how many times this area has already been amended; property-sale-
     specific repatriation mechanics, distinct from the site's general
     NRO repatriation-limits article; and joint-property-ownership
     capital gains/TDS splitting, a practical gap buyers and co-owners
     commonly get wrong.
4. **Render the standard `Disclaimer` component near the top of every
   new article** — inherited automatically from the existing
   `src/app/blog/[slug]/page.tsx` template (confirmed unchanged this
   pass), per CLAUDE.md rule 3.
5. **Interlink each new article within its cluster** (2-3 related
   article links, mixing references to batches 1-2 and to each other)
   but **do not retroactively edit batches 1-2's own `relatedSlugs`**,
   for the same out-of-scope/conflict-risk reasoning ADR 0012 gave.

## Consequences
- 36 articles now exist total (24 from batches 1-2, 12 from this pass)
  — 9 per cluster — plus 36 FAQ entries, still short of the charter's
  25-30/cluster target. A further batch remains queued.
- Every factual/numeric claim in this batch was cross-checked via live
  web search this pass, run by four parallel research passes (one per
  cluster) each independently verifying its own topics. No direct
  irs.gov fetch succeeded during this run (IRS.gov returned HTTP 403 to
  direct fetch across multiple attempts); incometax.gov.in fetches were
  similarly unavailable. All figures rely on convergent reputable
  secondary sources (bank NRI-desk pages, CPA/expat-tax specialty firms,
  Indian tax-advisory/law-firm publications) rather than a directly-read
  primary source this pass — the same standing access constraint noted
  in every prior ADR on this site.
- A meaningfully longer list of specific figures needs Ajinkya's direct
  fact-verification pass than in prior batches, because this batch's
  topics skew toward recently-changed or inflation-indexed rules:
  - The Foreign Tax Credit's income-basket mechanics and carryover
    period are stable, long-standing rules with high research
    confidence; the DTAA Article 4 tie-breaker sequence is similarly
    stable.
  - The IRC 877A exit-tax inflation-adjusted thresholds (the average
    annual net income tax liability test threshold, and the
    mark-to-market gain exclusion amount) are revised annually and
    could not be checked against a primary IRS source this pass —
    flagged inline in the article itself.
  - The NRO FD TDS base rate (commonly cited at 30%, but with at least
    one conflicting secondary source citing ~20%) and applicable
    surcharge slabs are flagged inline as needing confirmation.
  - The reported restructuring of PAN application forms (49A/49AA to
    new Form 93/94/95/96 designations) under the Income-tax Act, 2025,
    effective April 2026, and the scope of NRIs' Aadhaar-PAN-linking
    exemption, are both flagged inline as genuinely inconsistent across
    sources.
  - The **Budget 2024 property LTCG indexation-removal rules are the
    single most heavily hedged topic in this batch** — the flat rate
    figure, the July 23, 2024 cutoff, and in particular whether NRIs are
    excluded from the resident-only grandfathering comparison, are all
    called out inline as unconfirmed against primary statutory text and
    specifically flagged for Ajinkya's own verification before
    publication, given this area has already seen one legislative
    revision since the original announcement.
  - The USD 1 million/year property-sale-proceeds repatriation ceiling,
    the "limited to two properties" full-repatriation detail, the
    2026 US citizen/resident estate tax exemption figure, the list of
    US estate/gift tax treaty countries, and the per-co-owner TDS
    deduction mechanic are each flagged inline in their respective
    articles as needing direct confirmation.
  - Every claim in this batch still needs Ajinkya's own
    fact-verification pass before these pages are treated as
    publish-ready — the same standing flag as every other content page
    on this site, but with more inline hedges than prior batches given
    the topic mix.
- No new npm dependencies added to `package.json`. Verified this pass
  with `npm ci`, `npx tsc --noEmit`, `npm run lint` (clean), and
  `npm run build` — 47 static routes generated (up from 35), including
  36 `/blog/[slug]` article pages (up from 24), all prerendering
  statically. Slug/id uniqueness and every `relatedSlugs`/
  `relatedArticleSlug` cross-reference were checked programmatically
  against the full merged file content (no dangling references, no
  duplicate slugs or FAQ ids).
