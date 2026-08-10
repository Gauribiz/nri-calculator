# ADR 0016: Blog/FAQ content pass, batch 6 -- scope and topic selection

## Status

Accepted, 2026-08-10.

## Context

nric-0086 continues the multi-pass blog/FAQ content build ADR 0011/0012/0013/0014/0015 started: batches 1-5 (nric-006/nric-006b/nric-006c/nric-006d/nric-006e) shipped 15 articles/cluster (60 total) plus 60 FAQ entries, all merged to main except batch 5 (PR #17) pending Gauri's review at the time this pass started. This task continues the same 3-articles-per-cluster pace toward the charter's 25-30/cluster target.

## Decision

- Volume: 3 new articles per cluster (12 total) plus a matching FAQ per article (12 total), the same pace batches 1-5 used. Site now totals 72 articles / 72 FAQ entries (18/cluster) -- past the halfway point of the charter's 25-30/cluster target.
- No changes to batches 1-5's own articles, FAQs, or the /blog, /blog/[slug], /faq infrastructure -- this pass only appends to src/lib/blog/articles.ts and src/lib/blog/faqs.ts using the existing Article/Faq types and helpers.
- Every claim in this batch was checked via live web search before drafting (per the lesson from the ADR 0015 fact-check pass, which found the value of catching issues before publish rather than after) -- 12 targeted searches covering: US "sticky state" residency, Form 8802/6166, IRS Streamlined Filing Compliance Procedures, FEMA resident-account redesignation, Section 195 vs 194J/192 TDS, Section 64 clubbing, RSU/ESPP cross-border taxation, the Section 10(10D) FA2023 high-premium carve-out, Section 115BBH crypto/VDA taxation, CGAS mechanics, Section 56(2)(x) gift taxation, and Section 24(b)/80C joint home loan deductions.
- Topic selection avoids re-covering batches 1-5's ground:
  - DTAA & Tax Residency: US state-level "sticky residency" rules after moving to India; Form 8802 (the US-side application for Form 6166 tax residency certificate, needed for DTAA claims); and the IRS Streamlined Filing Compliance Procedures for NRIs catching up on missed US filings.
  - NRE/NRO & TDS: the mandatory FEMA redesignation of a resident account to NRO on status change; the Section 195 vs 194J/192 TDS distinction for NRI salary/professional income; and Section 64 clubbing of income on gifts to a resident spouse or minor child.
  - Investments & Repatriation: RSU/ESPP dual-country taxation timing; the Section 10(10D) Finance Act 2023 high-premium carve-out for life insurance maturity proceeds; and Section 115BBH's flat 30% crypto/VDA taxation regime.
  - Real Estate Capital Gains: the Capital Gains Account Scheme (CGAS) mechanics; Section 56(2)(x) gift-of-property tax treatment; and Section 24(b)/80C joint home loan deductions for NRI co-owners.
- Render the standard Disclaimer component near the top of every new article -- inherited automatically from the existing template, unchanged this pass, per CLAUDE.md rule 3.
- Interlink each new article within its cluster via relatedSlugs, without retroactively editing batches 1-5's own entries, consistent with the append-only policy prior ADRs established.

## Consequences

- 72 articles now exist total (60 from batches 1-5, 12 from this pass) -- 18 per cluster -- plus 72 FAQ entries. A further batch or two remains queued as follow-up work toward the 25-30/cluster charter target.
- One item flagged for professional confirmation rather than resolved by this pass's research: the interaction between DTAA relief and Section 115BBH's flat-rate crypto/VDA regime is not settled in secondary sources -- Section 115BBH's flat 30% rate with no loss offset is a domestic-law provision, and whether/how treaty relief can apply to it is genuinely unclear from public commentary. The crypto article flags this inline; it should be checked with a professional before publish, not treated as resolved.
- Per CLAUDE.md rule 2 (PR, never merge), this batch was opened as PR #20 and left unmerged for Ajinkya's or Gauri's review.
- Local verification: `npx tsc --noEmit` and `npm run lint` both pass clean against this branch. `npm run build` fails in this sandbox, but only on a network-restricted step (next/font's Google Fonts fetch times out inside the sandbox) unrelated to any content or code in this pass -- not a regression introduced by this batch's changes.
