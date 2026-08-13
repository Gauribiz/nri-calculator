# ADR 0020: Live NAV / gold price lookup — data sources, caching, and the Family Ledger reuse gap

## Status
Accepted, 2026-08-13.

## Context
`nric-011` asked for a live mutual-fund-NAV and gold-price lookup tool in
the `/tools` hub, porting Family Ledger's existing `livePrices` /
live-gold-pricing pattern: "Reuse Family Ledger existing price-fetch
logic/proxy where possible rather than rebuilding from scratch."

**This session's GitHub access is scoped to three repos only**
(`Gauribiz/nri-calculator`, `kathakar/orchestrator-state`,
`kathakar/project-docs-index`) — Family Ledger is not one of them, and
this session has no way to read its `livePrices` implementation. This
isn't a CLAUDE.md conflict or a reason to stop (the task's own wording —
"where possible" — treats reuse as best-effort, not a hard requirement),
but it means this build is independent from scratch, not a port. Flagged
here explicitly rather than silently described as "reused Family
Ledger's pattern" when it wasn't.

## Decision — two data sources, two new proxy routes
Same stateless-proxy shape as `nric-012`'s `/api/fxhistory` (ADR 0019):
- `src/app/api/navprice/route.ts` — fetches AMFI India's daily
  `NAVAll.txt` (the same official publication Family Ledger's own
  description implies it also pulls from, being the standard public
  source for Indian mutual fund NAVs), parses the semicolon-delimited
  rows server-side, and returns scheme-name substring matches (min 3
  characters, capped to 20 results) as JSON. AMFI's format has no
  official schema doc; parsing keys off "numeric scheme code + numeric
  NAV" to identify real data rows and skip AMC/category header lines,
  rather than depending on exact header text, since that's more robust
  to formatting drift than string-matching a specific header row.
- `src/app/api/goldprice/route.ts` — fetches
  `data-asg.goldprice.org/dbXRates/USD` for the live XAU (gold) spot
  price in USD per troy ounce, and `api.frankfurter.dev/v1/latest` (the
  same host `/api/fxhistory` already calls in production) for the
  current USD/INR rate, converts to price-per-gram and price-per-10-gram
  in both currencies, and returns one combined JSON response so the
  client doesn't need to make two calls or know either upstream's shape.

## Decision — could not confirm either source live from this session
ADR 0019 confirmed frankfurter's redirect and response shape "live via
curl before writing any code." **This build could not do the same**:
every external host this session tried to reach for verification —
`amfiindia.com`, `data-asg.goldprice.org`, `api.goldprice.dev`, and even
`api.frankfurter.dev` itself (the host `/api/fxhistory` already calls
successfully in production) — returned a 403 from this sandbox's own
outbound network policy (`gateway answered 403 to CONNECT`), not from
the upstream APIs. This is an environment constraint of the session that
built this, not evidence the chosen APIs don't work; it matches the
same pattern CLAUDE.md already documents for tax-figure sourcing
("direct fetches to irs.gov / incometax.gov.in / rbi.org.in have
consistently returned HTTP 403" from this kind of session).

Both routes' request/response handling is instead based on published
documentation and third-party usage examples found via web search
(AMFI's semicolon-delimited NAVAll.txt format; goldprice.org's
`dbXRates` JSON shape — `date` + `items[].xauPrice` — as documented by
several independent open-source consumers of that endpoint), and both
parse defensively: any missing/non-numeric field in the response
produces a clean `502` with a stated error message rather than a crash.
**Explicitly flagged in CLAUDE.md's "Known open items"** — this needs an
actual live check against production before being treated as verified
working, not just "builds, type-checks, and lints clean" (which it
does — confirmed via `npx tsc --noEmit`, `npm run lint`, and `npm run
build`, all clean, plus a local `npm run start` smoke test showing the
`/tools` page renders both lookup modes and both new routes return
well-formed error JSON rather than crashing when the upstream 403s).

## Decision — caching
- NAV: `revalidate = 21600` (6 hours). AMFI publishes NAV once per
  business day; more frequent fetching can't show a newer number. Same
  judgment-call posture as ADR 0019's FX caching, not a published rate
  limit (AMFI doesn't publish one).
- Gold: `revalidate = 300` (5 minutes). Spot gold price moves
  intraday, unlike NAV or ECB's once-daily FX rates, so a much shorter
  window trades a little staleness for not hammering a free, unauthenticated
  endpoint on every page view. Also a judgment call, not a measured limit.

## Decision — UI scope
One new tool card in `/tools`, `NavGoldPriceLookup.tsx`, with two modes
via the same tab-button pattern `FxRateHistoryTool.tsx` already
established (`role="group"`, `aria-pressed`) rather than inventing a new
toggle pattern:
- **Mutual fund NAV**: free-text scheme-name search (debounced 400ms,
  minimum 3 characters) against `/api/navprice`, results list, select one
  to see its NAV + PDF/Excel export.
- **Gold price**: auto-loads on switching to this mode; shows spot price
  per troy ounce and per 10 grams, in both INR and USD, with PDF/Excel
  export. Explicitly labeled as the **international wholesale spot
  price, not a retail/jewelry price** — actual jeweler pricing depends on
  purity (22K vs 24K), making charges, and GST, none of which this tool
  computes. This distinction matters on a YMYL financial site where a
  visitor could otherwise read "gold price" as "what I'd pay at a
  jeweler today."

PDF/Excel export via the existing `DownloadResultsButton` on both modes,
matching ADR 0017's sitewide export coverage rather than leaving this
tool as an inconsistent exception.

## Not done
`nric-009` (multi-currency overlay) remains untouched and still paused —
out of scope for this task, per the routine's "work only the single
highest-priority queued task" rule.
