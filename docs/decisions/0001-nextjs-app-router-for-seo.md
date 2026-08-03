# ADR 0001: Next.js App Router over a client-side SPA

## Status
Accepted, 2026-08-03.

## Context
This site's entire purpose is to be found by NRIs searching for US-India
tax/financial questions — organic search traffic is the primary (likely
only, for a while) acquisition channel, since there's no existing brand,
domain, or audience to draw on yet. That makes crawlability and
per-page metadata a first-order requirement, not something to retrofit
later once content exists.

A client-rendered SPA (e.g. Vite + React, the pattern used for the
Family Ledger project) ships an empty shell on first load and renders
content in the browser after JS runs. That's fine for a private,
logged-in household tool where the audience already knows the URL. It's
a poor fit here: search crawlers see an empty or delayed page unless
extra work (prerendering, a headless-browser render step, etc.) is
bolted on after the fact, and per-page `<title>`/meta description would
need a client-side workaround (e.g. `react-helmet`) instead of a native
mechanism.

## Decision
Use Next.js with the App Router — pages are server-rendered, and each
route (homepage, each of the four category pages) sets its own
`<title>` and meta description via Next's built-in `Metadata` API,
with no additional library or build step. This was already the decision
made in the project charter; this ADR records the reasoning for future
reference rather than re-deciding it.

## Consequences
- Every page is crawlable and has real metadata from day one, with no
  separate SEO-tooling workstream needed later.
- This repo's stack now diverges from Family Ledger's single-file
  no-build-step React pattern — that's intentional and specific to this
  project; the two should not be conflated or unified.
- No database yet, so Phase 1 calculators are plain client-side logic
  inside otherwise server-rendered pages — adding a database later (if
  the calculators need persistence, e.g. saved scenarios) is additive,
  not a rearchitecture.
