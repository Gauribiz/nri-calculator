# ADR 0019: USD/INR FX rate history tool — data source, caching, and first server-side code

## Status
Accepted, 2026-08-13.

## Context
`nric-012` asked for a USD/INR rate-history tool in the `/tools` hub —
current rate as a headline, 1M/3M/6M/1Y/5Y trend chart below it. This is
also the concrete unblock for `nric-009`'s multi-currency-overlay task,
which CLAUDE.md's "Known open items" flagged as paused specifically for
"no live exchange-rate/FX data source anywhere in the codebase."

**The task brief assumed something about this repo that isn't true.** It
described the work as "matching this repo's existing `api/*.js`
functions" and pointed at Family Ledger's own `api/fxhistory.js` as the
pattern to replicate. Checked before writing anything (not assumed):
this repo has no `api/` directory, no `src/app/api/` route handler, and
no `vercel.json` — zero server-side code anywhere. Every one of the 16
calculators here is pure client-side, exactly matching CLAUDE.md's
stated "no database, client-side logic only" stack description. Family
Ledger is a different, no-build-step single-file app where root-level
`api/*.js` Vercel Functions are the *only* way to add server code;
that's not this project's shape. **This is the first server-side code
ever added to this repo.**

This isn't a CLAUDE.md conflict, so this ADR doesn't stop and report
one: the guardrail against unrequested features and the "client-side
only" stack description are both about not adding a database/backend
state, and a stateless proxy adds neither — it holds no data between
requests, same as every other page here, just fetched server-side
instead of client-side because the upstream API blocks direct browser
calls. But it's a genuine architectural first for this project, flagged
here explicitly rather than folded in silently as "one more tool
matching the existing pattern."

## Decision — where the server code lives
A Next.js App Router route handler, `src/app/api/fxhistory/route.ts`
(`GET`), not a root-level `api/fxhistory.js`. Both compile to a Vercel
serverless function once deployed and serve the identical purpose the
task describes (server-to-server proxy, avoiding the browser CORS
block) — the difference is purely which convention is idiomatic for
*this* framework. Family Ledger's root-level `api/*.js` is idiomatic
for a plain Vercel Functions / no-framework setup; this repo is a Next.js
App Router app, where `src/app/api/.../route.ts` is the framework's own,
documented mechanism for exactly this. Using the App Router convention
here isn't "reinventing" Family Ledger's approach — it's the same
approach translated into the framework this project actually uses.

## Decision — data source
[frankfurter.dev](https://frankfurter.dev) (ECB daily reference rates),
as the task specified by its old domain name. **Confirmed live via curl
before writing any code, not assumed**: `api.frankfurter.app` now
permanently redirects (301) to `api.frankfurter.dev/v1/...` — the API
moved domains. The route handler calls the new host directly
(`https://api.frankfurter.dev/v1/{start}..{end}?base=USD&symbols=INR`)
to avoid eating a redirect on every request. Confirmed response shape
by hitting the live endpoint directly:
```json
{"amount":1.0,"base":"USD","start_date":"...","end_date":"...","rates":{"YYYY-MM-DD":{"INR":95.34}, ...}}
```
The route handler reshapes this into a sorted `{date, rate}[]` array
server-side (`rates` is a date-keyed object; sorting explicitly rather
than trusting object key order) plus a `latest` point, so the client
component doesn't need to know frankfurter's own response shape at all.

## Decision — caching
No existing caching posture in this repo to match (this is the first
server-side code, so there's no precedent) — decided from the source's
own characteristics instead, per the task's own fallback instruction.
ECB publishes its reference rates once per business day, around 16:00
CET. There is no correctness benefit to fetching more often than that.
Set `revalidate = 3600` (1 hour) on the route handler — both a Next.js
fetch-cache hint and a `Cache-Control: public, max-age=3600, s-maxage=3600`
response header — comfortably inside that once-a-day cadence without
tying freshness to a measured rate limit frankfurter doesn't publish.
**Explicitly a judgment call, not a known constraint** — if frankfurter
ever publishes real rate-limit guidance, prefer that over this default.

## Decision — recharts
Added as a new dependency (`^3.10.1`) for the trend chart — no existing
charting library in this repo to reuse. `npm audit` after installing
shows the same 3 pre-existing advisories (`postcss`, `sharp`, `xlsx` —
see ADR 0017/CLAUDE.md) and nothing new from `recharts` itself.

**Styling**: recharts renders inline SVG with explicit color props, not
Tailwind classes, so it can't pick up `dark:` variants the normal way.
Handled by scoping two CSS custom properties (`--fx-line`, `--fx-fill`)
on the chart's wrapper `<div>` via Tailwind's arbitrary-property syntax
(`[--fx-line:var(--color-primary-600)] dark:[--fx-line:var(--color-primary-300)]`),
referencing this project's own `--color-primary-*` tokens (confirmed to
exist as real CSS custom properties in `globals.css`, not assumed) —
darker navy for light mode, a lighter tint for dark-mode contrast against
the near-black background. Grid lines and axis-tick text use plain
Tailwind `stone-200`/`stone-500` hex values directly rather than a CSS
variable, since low-emphasis chart chrome doesn't need theme-reactive
color and hardcoding the known-correct hex avoids depending on whether
Tailwind v4 happens to expose its built-in palette as global CSS
variables (not verified either way). The active window-tab button uses
`bg-gold-100/text-gold-800` (`dark:bg-gold-950/text-gold-300`) — the
same soft light-background-plus-matching-text pattern ADR 0004's
`STATUS_BADGE_CLASSES` already established, not a solid `gold-500`
fill, to stay consistent with this site's "single muted gold accent
used sparingly" principle rather than introducing a bolder treatment.

## Decision — download button
`DownloadResultsButton` fits without modification: `inputs` = the
selected window, `results` = the latest rate, its date, and the percent
change over the window. The full time-series isn't exported (the
button's `ResultField[]` shape is flat label/value pairs, not built for
a multi-point series) — the exported file documents what the headline
figure was and under which window, not a full data dump. Not treated as
a scope-expanding gap: the task explicitly said to skip this affordance
if it needed real extra work, and a full-series export would.

## Decision — loading/error state (implementation detail, not scoped by the task)
The window-switch fetch's loading/error state is derived by comparing
the fetched result's own window to the currently-selected window
(`result.window === window`), rather than a separately-tracked flag
reset at the top of the effect. This was a **lint fix, not a design
choice** — `react-hooks/set-state-in-effect` flagged the more obvious
"call `setStatus('loading')` synchronously, then resolve/reject it
async" pattern. Recorded here only because it shapes how a future change
to this component should extend the state, not because it needed a
product decision.

## Consequences
- New route: `/api/fxhistory` (dynamic, server-rendered on demand — every
  other route in this repo remains statically prerendered; confirmed via
  `next build` output, route count 84 → 85).
- New dependency: `recharts`.
- Resolves the blocker CLAUDE.md's "Known open items" recorded for
  `nric-009` (multi-currency overlay, paused for lack of a live FX
  source) at the infrastructure level: a live, cached USD/INR rate now
  exists behind `/api/fxhistory`. `nric-009` itself is not built by this
  change and would still need its own scoping pass (which calculators
  get a 3rd-currency overlay, UI placement, etc.) — this ADR only
  confirms the previously-missing data source now exists.
- If a second currency pair or a second upstream consumer of live FX
  data is ever needed, extend `/api/fxhistory`'s `window`/pair handling
  rather than standing up a second proxy route.
- Verified: `npx tsc --noEmit` (clean), `npm run lint` (clean),
  `npm run build` (85 routes, `/api/fxhistory` correctly dynamic, every
  other route unchanged and static), and a live `npm run dev` smoke
  test — headline rate, chart, and window-switching (1Y → 5Y, confirmed
  via the actual network request and a visibly different chart) all
  verified against the real API, not mocked.
