# ADR 0007: PDF export for the DTAA/tax-residency calculators

## Status
Accepted, 2026-08-04.

## Context
`nric-001e` (split out of `nric-001d`, see ADR 0005) asks for a visible
"Download result as PDF" affordance under each of the three DTAA/tax-
residency calculators' result sections, with a library choice evaluated
and documented — bundle size and no server dependency were called out
explicitly, since this site is server-rendered for SEO but the
calculators themselves are client-side only and there is no backend.

Two approaches were considered:

1. **Browser-native print-to-PDF** (`window.print()` scoped to one
   calculator via a print stylesheet, no new dependency). Rejected: on
   this page, three calculators share one DOM tree alongside nav/footer/
   other page content, so print-scoping a single calculator's result to
   the exclusion of everything else needs either fragile CSS (`@media
   print` visibility toggling keyed to a dynamically-set class, working
   around the layout's actual DOM structure) or a duplicate print-only
   render tree. Either adds real complexity for a worse, less
   predictable result (output layout is whatever the browser's print
   engine does with the page's live styling) than just generating the
   PDF's content directly.
2. **A client-side PDF-generation library, dynamically imported.**
   Chosen. Generating the PDF from the calculator's own input/result data
   (not a DOM screenshot) gives full control over a clean, minimal,
   single-page layout and avoids a library that rasterizes HTML
   (`html2canvas`-style tools), which is both heavier and unnecessary
   here — the content is a handful of labeled fields, not a rich layout.

## Decision
Added `jspdf` (^4.2.1) as the PDF-generation library — it draws text
directly via its own API (`doc.text`, `doc.splitTextToSize`), so no
`html2canvas` or DOM-rasterization dependency is needed. It is imported
with `await import("jspdf")` inside the click handler
(`DownloadPdfButton.tsx`), not at module scope, so it's code-split into
its own chunk and adds nothing to the initial page bundle any visitor
loads — confirmed in the production build: none of the three DTAA-page
routes' first-load JS changed, and `jspdf` only appears in a
separately-loaded chunk (412 KB unminified-mapped) fetched on click.
This matters specifically because the site's traffic model is SEO/organic
search, so initial-load performance for visitors who never touch a
calculator shouldn't regress.

A single shared `DownloadPdfButton` component
(`src/components/calculators/DownloadPdfButton.tsx`) is used by all three
calculators, taking the calculator's title, its current input values, its
current result values, a disclaimer string, and its source list as props
— each calculator passes its own live state, so the PDF always reflects
exactly what's on screen when clicked, not a hardcoded example.

**The generated PDF embeds the same "not professional advice" disclaimer
text as the on-page `Disclaimer` component** (via a shared
`pdfDisclaimer.ts` constant), plus the calculator's source links. This
isn't explicitly asked for in the task text, but CLAUDE.md rule 3 treats
the disclaimer as belonging with the content, not just the page chrome —
a downloaded PDF is a copy of the content that leaves the page (and the
page's Disclaimer component) behind, so a bare numbers-only export would
undercut that rule's intent. This is judged as fulfilling the existing
non-negotiable rule for a new surface, not as adding a new unrequested
feature.

The PDF includes both the calculator's inputs and its results (not just
results) so the downloaded file is self-contained and legible without the
page open alongside it — a results-only PDF (e.g. "245.0 days, meets the
test") is meaningless without knowing what was entered to produce it.

## Consequences
- New dependency: `jspdf` (~412 KB, code-split, loaded only on click).
  No other dependency changes.
- No changes to `src/lib/calculators/*.ts` — this is a new UI affordance
  only, calculator logic and outputs are unchanged.
- Verified with `npm run lint` (clean), `npm run build` (all 7 routes
  still prerender statically, first-load JS unchanged), and a headless
  Playwright smoke test on the built production server: all three
  "Download result as PDF" buttons trigger a real file download
  (confirmed via Playwright's `download` event) producing a valid
  single-page PDF (`%PDF-1.3` header, non-empty), with no console errors.
- If a fourth category page later needs the same affordance, reuse
  `DownloadPdfButton` and `pdfDisclaimer.ts` rather than duplicating the
  PDF-layout logic.
