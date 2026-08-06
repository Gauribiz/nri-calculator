# ADR 0011: Blog/FAQ content pass — scope and interlinking approach

## Status
Accepted, 2026-08-05.

## Note on numbering
Filed as ADR 0011, not 0008 or 0010, even though neither exists on `main`
as of this pass. `nric-002`'s PR #9 and `nric-004`'s PR #12 (both open,
unmerged as of this pass) already document themselves internally as ADR
0008 and ADR 0010 respectively. Taking either number here would collide
once those PRs merge. Skipping past both avoids the collision regardless
of merge order, consistent with ADR 0009's same reasoning for the
0008 collision it avoided.

## Context
`nric-006` reads: "25-30 interlinked articles per topic cluster, per the
charter's traffic-growth research. Needed before applying for AdSense."
Taken literally, across the site's four topic clusters, that's roughly
100-120 individual articles.

Producing that volume in a single unattended pass is not achievable
without compromising something this routine treats as non-negotiable:
every numeric or factual claim about tax/financial rules on this site
needs to be genuinely researched and flagged for Ajinkya's own
fact-verification pass (see ADR 0002, 0005, 0006, 0008, 0009, 0010 for
the established pattern), not templated or asserted from general
knowledge to hit a volume target. Rushing 100+ articles in one pass would
mean either padding with thin, low-value content (bad for the site's own
SEO goal, which rewards genuine depth over volume) or making unverified
factual claims at scale on public financial-advisory pages — both worse
outcomes than shipping a smaller, real first installment.

## Decision
Treat `nric-006` as the first installment of an ongoing, multi-pass
content build, not a single pass that must hit 25-30/cluster to count as
done:

1. Build the reusable infrastructure this needs once: a `/blog` index
   (grouped by cluster), a dynamic `/blog/[slug]` article route
   (statically generated via `generateStaticParams`, consistent with
   every other page on this site), and a `/faq` page. Content lives as
   structured TypeScript data (`src/lib/blog/articles.ts`,
   `src/lib/blog/faqs.ts`) rather than a CMS or markdown pipeline — this
   project has no database (`supabase_project_ref_production: null`) and
   adding an MDX/CMS dependency for a first content batch would be scope
   creep beyond what `nric-006` asked for.
2. Ship a real, complete first batch: 3 articles per cluster (12 total)
   plus a 12-question FAQ page spanning all four clusters — not
   placeholders, not stubs. Each article is interlinked within its
   cluster (2-3 related-article links) and links back to its cluster's
   calculator page; the FAQ links out to the fuller articles.
3. Extend interlinking to the four existing category pages themselves: a
   "Related reading" section was added below each category's calculators
   (or below the "coming soon" placeholder, for `nre-nro-tds` and
   `real-estate-capital-gains`, since PRs #9/#12 are still unmerged on
   `main` as of this branch), linking to that cluster's new articles.
   This directly serves the task's own "interlinked" framing and doesn't
   touch the `Disclaimer` component's required top-of-page position
   (CLAUDE.md rule 3) — it's appended after existing content, not
   inserted before or in place of it.
4. Render the standard `Disclaimer` component near the top of `/blog`,
   every `/blog/[slug]` article, and `/faq` — the same placement rule
   CLAUDE.md rule 3 requires for every advisory/calculator page. Blog and
   FAQ content is exactly the kind of general financial-information
   content that rule is written for, even though the rule's text
   predates this task.
5. Add `/blog` and `/faq` to the top-level nav in `layout.tsx`, alongside
   the four category links, since a content section nobody can navigate
   to defeats its own SEO purpose.
6. Do not mark `nric-006` as fully "done" against its own literal
   25-30/cluster target. Instead, `orchestrator-state/state.json` records
   this pass as completing a defined first batch and queues a follow-up
   task (`nric-006b`) to continue the build in future passes, the same
   way `nric-001d` split "download as PDF" out as `nric-001e` rather than
   silently under-delivering against an unstated scope.

## Consequences
- 12 articles now exist (3 per cluster) plus a 12-question FAQ page,
  fully interlinked to each other and to their cluster's calculator page.
  67 more articles across the four clusters remain to reach the stated
  25-30/cluster target — tracked as `nric-006b` in
  `orchestrator-state/state.json`, not silently dropped.
- Every factual/numeric claim in this batch either (a) points to an
  already-implemented calculator/tool for the actual figure rather than
  restating it, to avoid maintaining the same number in two places, or
  (b) is a structural/conceptual claim (e.g., "NRE interest is generally
  exempt," "PFIC default treatment denies long-term capital gains rates")
  cross-checked via live web search against multiple independent
  secondary tax-reference sources, with no discrepancies found. No direct
  irs.gov / incometaxindia.gov.in fetch was attempted this pass (same
  access constraint noted in ADR 0005/0006/0008/0009/0010). **Every claim
  in this batch still needs Ajinkya's own fact-verification pass before
  the pages are treated as publish-ready** — same standing flag as every
  other content/calculator page on this site.
- The Form 13 → Form 128 / Section 197 → Section 395 renumbering flagged
  in `nric-004`'s ADR 0010 is repeated in this batch's
  `form-13-lower-tds-certificate-worth-it` article and its matching FAQ
  entry, with the same "not independently verified against the Act's
  official text" caveat carried forward.
- No new npm dependencies added. A Playwright smoke test was run against
  a local production build to confirm disclaimer placement, article/FAQ
  rendering, nav links, and a 404 for unknown slugs, using a throwaway
  `devDependency` install that was reverted before this commit (not
  checked into `package.json`), consistent with the project having no
  existing test-runner dependency.
