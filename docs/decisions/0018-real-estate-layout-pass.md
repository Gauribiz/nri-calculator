# ADR 0018: Real estate / layout pass — accordion rollout, nav restructure, Tax Treatment default, related-reading cap

## Status
Accepted, 2026-08-12.

## Context
`nric-014` bundled four mechanical UX/layout fixes from Ajinkya's own
2026-08-11 full-site UI/UX review, explicitly prioritized ahead of
`nric-011`/`nric-012`/`nric-013` (all three of which need a live rate/price
data source that doesn't exist in this codebase yet — see CLAUDE.md's
"Known open items"). No calculation logic touched anywhere in this PR.

## Decision

**1. Accordion rollout.** Rather than duplicating the FAQ page's inline
`<details>`/`<summary>` markup on every multi-calculator page, the
accordion behavior was built directly into `CalculatorShell` — every one
of the 15 calculator components already renders through it, and every
page that uses any of them has 2–5 calculators, so there was no case where
accordion behavior needed to be conditional. `CalculatorShell` now renders
a `<details name="calculators">` (native, mutually-exclusive grouping —
supported broadly since 2024) instead of a `<section>`, with the title
moved into `<summary>` and a chevron matching the FAQ page's own icon. Each
calculator component gained an optional `defaultOpen` prop threaded into
`CalculatorShell`; each page passes it only to its first calculator.

**Regression caught and fixed**: `/tools` wraps each calculator in an
`id="slug"` div so site search (`src/lib/search.ts`) can deep-link to
`/tools#loan-prepayment` etc. Collapsing calculators by default would have
made those links land on a page with the target hidden — the browser only
auto-reveals a closed `<details>` when the link target is a *descendant*
of it, not when the target is the id'd wrapper *around* it. Added
`OpenTargetDetails` (a small client component, mounted once on `/tools`)
that opens the matching `<details>` and scrolls to it on load and on
same-page hash change, so existing search deep links keep working.

**2. Nav restructure.** Moved the `/tools` link (renamed "Tools" →
"Financial Tools" to match that page's own H1) to immediately after the
four category links, ahead of Blog/FAQ. Fixed messy wrapping at 1440px
(confirmed by Ajinkya) by widening the header `<nav>`'s max-width from
`max-w-4xl` to `xl:max-w-6xl` (896px → 1152px from the 1280px breakpoint
up) — page body content stays at `max-w-4xl`, only the header row widens.
Verified with Playwright screenshots at 1280px, 1440px (one line, no wrap)
and 390px (still wraps normally, unaffected).

**3. Tax Treatment Comparison default.** Changed the default-checked
instruments from all 6 to just `nre-account` + `nro-account` (IDs in
`taxTreatmentComparison.ts`), matching the framing already used by the
`NreNroChooser` tool on this site. Added a one-line hint under the
checkbox group ("NRE and NRO accounts are checked by default — check or
uncheck any instrument to change the comparison") so the checkboxes read
as interactive rather than a fixed table.

**4. Related reading cap.** Extracted the near-identical "Related reading"
block (previously duplicated with two different color-token sets across
5 pages: `dtaa-tax-residency`, `investments-repatriation`, and
`blog/[slug]` used stone/primary/gold; `nre-nro-tds` and
`real-estate-capital-gains` used zinc — a pre-existing inconsistency, not
introduced or resolved here) into a shared `RelatedReading` client
component with a `variant` prop (`"default"` | `"zinc"`) that reproduces
each page's exact prior classes. Caps visible articles to 4 with a
"Show N more" toggle; each page kept its own variant so no visual
appearance changed beyond the cap itself.

## Consequences
- New shared components: `src/components/RelatedReading.tsx`,
  `src/components/OpenTargetDetails.tsx`.
- `CalculatorShell` signature changed (`defaultOpen?: boolean` added); all
  15 calculator components' exported function signatures changed in the
  same mechanical way (`defaultOpen` prop threaded through, default
  `false`). No calculator's internal logic, state, or computed values
  changed.
- Disclaimer placement unchanged on every page — still renders above the
  fold, outside any accordion, per CLAUDE.md rule 3.
- No new dependencies, no new figures or tax content — this PR does not
  need a fact-verification pass.
- Verified with `npx tsc --noEmit` (clean), `npx eslint .` (clean),
  `npm run build` (all 84 routes still prerender statically, unchanged
  route count), and headless Playwright screenshots against the built
  production server covering: `/dtaa-tax-residency` and `/tools` at
  1440px and 1280px (nav on one line, first calculator open, rest
  collapsed, related reading capped at 4 with working "Show more"),
  `/tools#loan-prepayment` (deep link correctly opens that calculator and
  collapses the others), the Tax Treatment Comparison tool's default
  checkbox state, and a 390px mobile check (nav still wraps normally).
