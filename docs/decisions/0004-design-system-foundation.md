# ADR 0004: Design system foundation — color, typography, shared components

## Status
Accepted, 2026-08-03.

## Context
`nric-001c` asked for a real but restrained design system: the site was
running on unstyled Tailwind defaults (no color identity, plain
gray-bordered boxes, generic template look), which undersells a
public-facing, SEO-driven advisory site. The task explicitly scoped this
as visual/component-layer work — no changes to `src/lib/calculators/*.ts`
calculation logic — and named four areas: color/typography tokens,
shared-component upgrades (`CalculatorShell`, `NumberField`,
`CheckboxField`, `ResultRow`, `Disclaimer`), and new reusable patterns
(info tooltip, collapsible methodology section, source citation,
freshness stamp).

## Decision

**Color tokens** (`src/app/globals.css`, Tailwind v4 `@theme`): added a
`primary` scale (deep navy/indigo, hand-picked hex stops rather than
stock Tailwind `indigo`, to stay darker/less saturated than a generic
"fintech blue") and a `gold` scale (muted saffron/gold accent — named
`gold` rather than `accent` specifically to avoid colliding with
Tailwind's own `accent-*` accent-color utility prefix). `--background`/
`--foreground` now point at warm off-white/near-black values instead of
pure `#fff`/`#000`; body copy and neutral surfaces elsewhere use
Tailwind's built-in `stone` scale rather than `zinc`, which was already
warm-neutral enough not to need custom tokens of its own.

**Typography**: kept Geist Sans (already a clean variable sans-serif, no
value in adding a second font family for a "distinct heading treatment").
Headings now consistently use `text-primary-900`/`tracking-tight` for
differentiation from body text. Calculator number displays (`ResultRow`
values, `NumberField` inputs) use Tailwind's built-in `tabular-nums`
utility so results align in columns.

**Shared components** (`src/components/calculators/CalculatorShell.tsx`):
- `CalculatorShell` is now an elevated card (`rounded-2xl`, `shadow-sm`,
  more padding) instead of a plain bordered box.
- `ResultRow` gained an optional `status: "favorable" | "warning" |
  "neutral"` prop rendering a colored pill instead of plain bold text —
  soft green / amber / warm gray, per the task's explicit instruction to
  avoid alarming red on a YMYL site. `emphasis` (plain bold) is kept for
  rows that are a currency figure rather than a discrete status (e.g.
  the DTAA estimator's tax-due amount) — a badge doesn't fit a dollar
  value, so that distinction is deliberate, not an oversight.
- `NumberField`/`CheckboxField` gained an optional `hint` prop that
  renders the new `InfoTooltip` component next to the label.

**New reusable components** — built per the task, left unwired into any
page for now (see Consequences):
- `InfoTooltip.tsx` — small `i` badge + CSS-only hover/focus tooltip, no
  JS state, degrades to an always-present `aria-label` for screen
  readers.
- `HowCalculated.tsx` — a `<details>`/`<summary>` disclosure, zero-JS,
  styled to match the card system.
- `SourceCitation.tsx` — inline citation links, and `VerifiedStamp` — a
  "Verified against [source], [date]" pill.

**Status-badge semantics on the three live calculators** — this is the
one place badge choices took judgment calls worth recording:
- SPT day-counter: "Meets the test" → favorable (green), "Does not meet"
  → neutral (gray). This reads the test's own pass/fail framing, not a
  claim that meeting it is good or bad for the user financially.
- India residency: NR and ROR → neutral gray (both are just
  classifications, not a qualifying/non-qualifying result — coloring one
  favorable and the other not would assert a value judgment the tool
  doesn't make). RNOR → amber/warning, because it is literally the
  transitional, most-scrutiny-needed status among the three, which fits
  "borderline/needs-review" without asserting anything about the
  underlying tax outcome.
- DTAA relief estimator: no status badge — its headline is a dollar
  amount, not a status word.

**Disclaimer** (`src/components/Disclaimer.tsx`): restyled into a
trust-badge/callout (icon, rounded-xl, shadow, tighter type hierarchy)
using the new `gold` tokens instead of stock `amber-*`. Text content and
`role="note"`/`aria-label` are unchanged. Position is unchanged — still
rendered near the top of the page, above the calculators, per CLAUDE.md
rule 3; this ADR does not touch placement, only visual treatment, per
the task's explicit instruction.

## Consequences
- `src/lib/calculators/*.ts` is untouched — this is a UI/component-layer
  change only. All three existing calculators' *outputs* are unchanged;
  only how the result is displayed changed (badge vs. plain text).
- `InfoTooltip`, `HowCalculated`, `SourceCitation`, and `VerifiedStamp`
  are built and exported but not yet used by any calculator's content —
  `nric-001d` is the task scoped to apply them (methodology text,
  citations, freshness stamps) to the DTAA/tax-residency page
  specifically. Wiring `VerifiedStamp` with a real source/date before an
  actual fact-verification pass against irs.gov/incometax.gov.in has
  happened would be a false claim, so it's deliberately left unused
  rather than seeded with a placeholder date.
- The home page, `/disclaimer` page, and the three still-placeholder
  category pages (`nre-nro-tds`, `investments-repatriation`,
  `real-estate-capital-gains`) still use the old `zinc-*` utility classes
  in places — left as-is since this task scoped to shared
  components/layout, not a full site-wide pass. They'll pick up the new
  tokens as each gets its own calculator-logic task (`nric-002`–`004`) or
  the dedicated apply-pass (`nric-001d`) touches them.
- Verified with `npm run lint` (clean), `npm run build` (all 7 routes
  still prerender statically), and a live `npm run start` + Playwright
  smoke test in both light and dark color schemes, confirming: the
  disclaimer still renders above the calculators, elevated cards/badges
  render correctly, the RNOR→amber and meets/does-not-meet→green/gray
  badge logic behaves as coded, and calculator outputs are unchanged
  (e.g. the FA2020 income-threshold callout from ADR 0003 still shows and
  escalates correctly).
