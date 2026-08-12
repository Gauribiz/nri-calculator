# ADR 0018: Nav single-line fix — widen nav specifically, not page content

## Status
Accepted, 2026-08-12.

## Context
`nric-014` Part 2 added a "Financial Tools" nav link (renamed + repositioned
from "Tools") alongside the existing four category links, Blog, and FAQ.
The nav (`src/app/layout.tsx`) already had `flex-wrap`, so it didn't break —
it silently wrapped to two lines at every desktop width, including 1440px,
which is the scope's explicit target.

Measured directly (`getBoundingClientRect()` on each nav child) rather than
guessing: the nine nav items (logo, 4 categories, Financial Tools, Blog,
FAQ, search) plus their `gap-x-6` (24px) spacing need roughly 1146px of
content width to fit on one line. The nav's container was capped at
`max-w-4xl` (896px) — the same max-width the page's actual prose content
below it uses — so it was never close, regardless of viewport.

## Options considered
1. **Tighten spacing/font-size at a breakpoint** (smaller `gap-x`, smaller
   `text-sm` variant). Keeps nav and content at the same width, but the
   items are already fairly compact; shrinking further starts to hurt
   tap targets and legibility for a marginal amount of room.
2. **Collapse/overflow pattern** (hamburger or "More" overflow menu at
   narrower widths). More engineering for a nav that's only 9 items and
   already degrades acceptably (clean 2-line wrap, not broken) below the
   width where it fits — overkill for what this is.
3. **Widen the nav's own container past the content's `max-w-4xl`,
   `xl:`-and-up only.** Chosen.

## Decision
Added a single Tailwind responsive override: `xl:max-w-7xl` on the nav's
existing `max-w-4xl` class (`src/app/layout.tsx`). Below the `xl` breakpoint
(1280px), nothing changes — the nav still wraps to two clean lines exactly
as it did before, which is an acceptable degradation, not a regression.
At `xl:` and up, the nav's own row gets a wider cap (1152px, later
confirmed sufficient with ~85px of margin even accounting for a
browser scrollbar) while the page's actual content below it stays at the
unchanged `max-w-4xl` (896px).

**This is a deliberate, minor visual asymmetry** — the header row spans
wider than the content column beneath it at `xl:`+ viewports — flagged
here specifically because it's a new pattern for this site (every other
element uses one consistent `max-w-4xl`). Judged acceptable: a nav bar
being wider than a centered prose column is common on real sites, the
site's header already has a full-bleed white background regardless (only
the inner content width was ever constrained), and it fixes the wrap with
a single class rather than compressing type/spacing or building an
overflow menu for what is fundamentally a "one row of links" nav.

## Verification
Checked directly in-browser (not just computed from the spec) at three
widths:
- 1440px (the reported/target width): single line.
- 1280px (the `xl:` breakpoint's own edge, worst case for the new rule):
  single line, ~70px of margin even with a scrollbar present.
- 1024px (below `xl:`): unchanged two-line wrap, clean, no overlap.

## Consequences
- No new dependency, no JS — a single Tailwind class.
- If the nav ever gains another item, re-measure rather than assuming
  `max-w-7xl` still has headroom (current slack is comfortable but not
  huge — recompute via the same `getBoundingClientRect()` approach used
  here rather than guessing).
