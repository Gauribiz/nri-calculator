# ADR 0014: Blog/FAQ content pass, batch 4 — scope and topic selection

## Status
Accepted, 2026-08-06.

## Context
`nric-006d` continues the multi-pass blog/FAQ content build ADR
0011/0012/0013 started: batches 1-3 (`nric-006`/`nric-006b`/`nric-006c`,
PR #13 merged + PR #14 merged + PR #15 merged — PR #15's merged status
was confirmed live via the GitHub API this pass, since the task's own
description flagged the state-file note describing it as "open" as
something to re-check rather than trust) shipped 9 articles/cluster (36
total) plus 36 FAQ entries. This task's own description asks for
"another 3-5 per cluster" using the existing `articles.ts`/`faqs.ts`
structure — not a new content system, not a rewrite of batches 1-3.

## Decision
1. **Volume: 3 new articles per cluster (12 total), each with a
   matching FAQ entry (12 total)** — the same pace batches 1-3 all used,
   for the same reason: every article here is a public
   financial-advisory page, this pass's topics are all genuinely new
   factual ground needing their own verification pass, and holding the
   pace at 3/cluster keeps that verification real rather than stretched
   thin. 31 more articles across the four clusters remain to reach the
   charter's stated 25-30/cluster target — tracked as a further
   follow-up task (`nric-006e`), the same ongoing-build framing
   ADR 0011/0012/0013 set.
2. **No changes to batches 1-3's articles, FAQs, or the `/blog`,
   `/blog/[slug]`, `/faq` infrastructure.** This pass only appends new
   entries to `src/lib/blog/articles.ts` and `src/lib/blog/faqs.ts`,
   reusing the existing `Article`/`Faq` types, `getArticlesForCluster`,
   and `getRelatedArticles` helpers verbatim. Category pages and the
   `/blog`/`/faq` index pages automatically pick up the new entries with
   no page-level code changes.
3. **Research method**: four independent parallel subagent passes, one
   per cluster, each cross-checking its own topics via live web search
   against convergent secondary tax-reference sources. Direct fetches of
   `irs.gov`/`incometax.gov.in`/`rbi.org.in` were attempted or considered
   in each pass; all returned HTTP 403 or were not attempted given that
   consistent history, so every figure in this batch rests on
   convergent secondary sources, never a directly-read primary source —
   the same standing access constraint noted in every prior ADR on this
   site.
4. **Topic selection deliberately avoids re-covering batches 1-3's
   ground** and instead picks natural follow-up questions per cluster:
   - **DTAA & Tax Residency**: Form W-8BEN treaty-rate claims on
     US-source income (a mechanical follow-up the existing DTAA-relief
     and Form 8833 articles didn't cover); the absence of an India-US
     Social Security totalization agreement (confirmed via research,
     not assumed — a genuinely under-covered but consequential gap for
     anyone with a career split across both countries); and the
     distinction between OCI/PIO civil status and actual tax residency,
     including the one place (the FA2020 120-day rule) where OCI/PIO
     status genuinely does matter to the tax outcome.
   - **NRE/NRO & TDS**: premature withdrawal of an NRO fixed deposit and
     what happens to TDS already withheld on the higher, pre-closure
     interest; joint NRE/NRO/FCNR accounts with a resident close
     relative ("Former or Survivor" mode) and whose income the interest
     actually is; and Form 26AS as the NRI's own tool for confirming
     that TDS withheld by a bank, tenant, or property buyer actually
     posted to their PAN.
   - **Investments & Repatriation**: Form 8621 mechanics (a direct
     deep-dive follow-up on the existing PFIC-mutual-fund-trap article,
     which flags the form but doesn't explain it); SIP investing and how
     the NRE-vs-NRO funding account changes repatriability while the
     PFIC treatment stays the same per-installment; and what happens to
     a US 401(k)/Roth IRA under Indian tax law (Section 89A) once an
     NRI moves back to India permanently — the Roth-specific treatment
     is flagged as genuinely unsettled in current guidance, not
     asserted as a settled rule.
   - **Real Estate Capital Gains**: claiming a refund of excess Section
     195 TDS via an Indian tax return when a Form 13/128 certificate
     wasn't obtained upfront; selling inherited agricultural
     land/farmhouse/plantation property as an NRI, including the
     buyer-eligibility restriction and the rural/urban capital-asset
     classification that determines whether the gain is taxable at all;
     and Power of Attorney mechanics for an NRI property sale, including
     the express point that a PoA never shifts Section 195/capital-gains
     liability off the NRI seller.
5. **Render the standard `Disclaimer` component near the top of every
   new article** — inherited automatically from the existing
   `src/app/blog/[slug]/page.tsx` template (confirmed unchanged this
   pass, and confirmed live via a local build/serve smoke test), per
   `CLAUDE.md` rule 3.
6. **Interlink each new article within its cluster** (2-3 related
   article links, mixing references to batches 1-3 and to each other)
   but **do not retroactively edit batches 1-3's own `relatedSlugs`**,
   for the same out-of-scope/conflict-risk reasoning ADR 0012/0013 gave.

## Consequences
- 48 articles now exist total (36 from batches 1-3, 12 from this pass)
  — 12 per cluster — plus 48 FAQ entries, still short of the charter's
  25-30/cluster target. A further batch (`nric-006e`) remains queued.
- Every factual/numeric claim in this batch was cross-checked via live
  web search this pass, run by four parallel research passes (one per
  cluster) each independently verifying its own topics. No direct
  irs.gov/incometax.gov.in/rbi.org.in fetch succeeded during this run.
- A meaningfully broad list of figures needs Ajinkya's direct
  fact-verification pass, spanning genuinely unsettled or fast-moving
  ground:
  - The India-US treaty's specific dividend/interest withholding-rate
    percentages for the W-8BEN article, and the W-8BEN validity-period
    mechanics, should be checked against the treaty's actual text and
    current IRS instructions.
  - The claim that no India-US Social Security totalization agreement
    is currently in force is a live negotiation status, not a permanent
    fact — worth re-confirming at publish time, not just at research
    time.
  - The Roth IRA / Section 89A interaction is flagged in its own article
    as **genuinely unresolved among tax professionals** — this is not a
    case of "confirm a number," but of getting a current cross-border
    preparer's opinion before publishing anything more assertive than
    what's already hedged in the article.
  - The Section 91(A)/89A "saving clause" interaction with US-citizen/
    green-card-holder retirement distributions under DTAA Article 20 is
    similarly flagged as a contested reading across sources.
  - The rural/urban agricultural-land capital-asset thresholds (the
    10,000-population and ~8km aerial-distance figures under Section
    2(14)(iii)) are exactly the kind of frequently-amended figures this
    site's prior ADRs (0010, 0013) have flagged as needing direct
    statutory confirmation, and are called out as the single most
    important figures in the real-estate batch to verify before
    publishing.
  - State-specific agricultural-land buyer-eligibility rules
    (Maharashtra/Gujarat/Karnataka) and the Power of Attorney
    stamping/adjudication window under the Indian Stamp Act, 1899, are
    both sourced from secondary legal commentary rather than primary
    statutory or case-law text.
  - The NRO FD premature-withdrawal penalty rate/minimum holding period
    and how banks reconcile already-deposited TDS against a
    downward-recalculated interest figure were not resolved to a single
    consistent answer in research and are flagged in the article itself
    as an open question to raise directly with a bank.
  - Rule 37BA's citation under the Income-tax Act, 2025 (renumbering
    status), and the Form 8621 QEF-unavailability claim about specific
    Indian AMCs, are both flagged as needing direct confirmation.

See the batch's own articles (`src/lib/blog/articles.ts`) for each
figure's inline hedge — every one of these is flagged on the page
itself, not just here.
