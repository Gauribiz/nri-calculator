# ADR 0021: Site-wide USD/INR + gold price banner — scope pivot, architecture, fail-quiet design

## Status
Accepted, 2026-08-13.

## Context
`nric-011`'s original scope, queued 2026-08-10, was an interactive
lookup tool ported from Family Ledger's live NAV/gold pricing: "user
enters a fund/ticker or selects gold, gets the current live price/NAV,"
as a standalone `/tools` entry alongside `nric-012`'s FX history tool.

That scope is superseded entirely, per a decision made directly with
Ajinkya on 2026-08-13: not an interactive tool at all, but a quiet,
site-wide info banner — current USD/INR rate and gold price, visible on
every page (calculators, blog, FAQ, home), not a separate page, not
clickable, no links out. `state.json`'s own task entry for `nric-011`
was rewritten to match this before work started (its stale
"lookup tool" wording was not left in place per Ajinkya's own
instruction), so this ADR documents the decision already reflected
there, not a separate one made independently here.

## Decision — reuse, not rebuild
Two existing pieces get reused rather than re-derived:
- **USD/INR rate**: `nric-012` already proxies frankfurter.dev. Rather
  than having the banner hit that route's full timeseries endpoint just
  to read one number, factored the shared host constant
  (`FRANKFURTER_BASE`) and added a lean `fetchCurrentUsdInrRate()` in
  `src/lib/fx.ts` that calls frankfurter's `/latest` endpoint directly —
  a smaller payload, and `/api/fxhistory/route.ts` now imports the same
  constant instead of duplicating the host string. This was explicitly
  offered as an option in the task brief ("factor out a shared 'current
  rate' function if that's cleaner than having the banner hit the full
  history endpoint") — taken, because this banner's call volume
  (every pageview, sitewide) makes the payload-size difference actually
  matter, unlike `nric-012`'s single `/tools`-page usage.
- **Gold price math**: mirrors Family Ledger's `api/metals.js`
  (`github.com/kathakar/Family-ledger`) rather than re-deriving
  troy-ounce-to-gram conversion — goldapi.io's own response already
  includes `price_gram_24k` directly, so no conversion math is needed on
  our end at all, only the USD→INR step (this project already has that
  logic via `nric-012`, reused here too). `src/lib/gold.ts`'s INR
  conversion is deliberately left out of that file itself — it returns
  the raw USD/gram figure, and the banner component combines it with
  the FX rate — so `gold.ts` doesn't also need to know about currency
  conversion.

**`GOLD_API_KEY`** is the confirmed exact Vercel env var name — verified
directly against the nri-calculator Vercel project's Environment
Variables dashboard (Production + Preview), not just inferred from
Family Ledger's matching convention for the same service, though that
was consistent with it and was the working assumption before the
dashboard check was available. `vercel env ls` itself could not be run
from this environment (would have required an interactive browser-based
Vercel login this session doesn't have local credentials for); the
dashboard check served the same purpose the task asked for.

## Decision — architecture: async Server Component, not a route + client fetch
`nric-012`'s tool is a client component fetching from a dedicated API
route (`/api/fxhistory`) — the task offered the same shape here
("route handler or a cached function called directly from the layout —
your call"). Chosen instead: `src/components/PriceBanner.tsx` is an
`async` Server Component, calling `src/lib/fx.ts`/`src/lib/gold.ts`
directly, wired into `src/app/layout.tsx` — no new API route, no client
JS shipped for this feature at all.

This isn't just "simpler" — it's a better fit for two requirements the
task stated explicitly:
1. **"Never show a loading spinner... for a passive info strip."** A
   Server Component's data is fully resolved before any HTML reaches the
   browser. There is no loading state to design around, because there is
   no client-side fetch happening after paint — unlike a client-fetched
   design, which would need to render *something* for the brief window
   before its own fetch resolves.
2. **Cache aggressively, since this loads on every pageview site-wide.**
   Next.js's fetch cache (`next: { revalidate: 3600 }`) behaves
   identically whether the `fetch()` call happens inside a Route Handler
   or a Server Component — confirmed in the build output itself, not
   just assumed: `next build` now prints an explicit `Revalidate: 1h /
   Expire: 1y` column against *every* route, confirming every page
   picked up the cache policy from the layout it shares, and every route
   remains statically prerendered (○/●, none became `ƒ` dynamic) —
   `next build`'s route table is otherwise byte-for-byte the same shape
   as before this change, just with that new column. The upstream APIs
   are hit once per hour, total, across the entire site, not once per
   page per visitor — this is the main reason "protect GoldAPI's
   free-tier quota" is achievable at site-wide scale at all.

Both underlying fetches carry a 3-second timeout (`AbortSignal.timeout`)
so a hanging upstream can't drag down every page's render — not asked
for explicitly, but a direct consequence of this architecture choice
that wasn't a concern for `nric-012`'s single opt-in tool page.

## Decision — fail-quiet, and why gold and FX aren't independent
The task's fail-quiet instruction ("omit that piece... or hide the whole
banner if both fail") frames the two figures as independent. They're
not, quite: gold is displayed as an **INR** figure (the requested Indian
retail convention), so it structurally needs the FX rate too, not just
its own fetch succeeding. If frankfurter fails but goldapi succeeds,
there is no meaningful way to show "Gold (24K/10g): ₹—" — showing a raw
USD figure instead would be a silent format change nobody asked for.

Resolved as: the USD/INR piece shows independently on its own fetch
succeeding; the gold piece shows only if **both** fetches succeed (since
it's derived from both); if FX fails, the gold piece disappears too even
if goldapi itself responded fine. If both fail, the entire banner
element is omitted (`return null`), not an empty shell.

Verified empirically, both directions — not just reasoned through:
- **Partial failure, for real, not simulated**: this environment has no
  local `GOLD_API_KEY` (confirmed, no `.env` file, nothing in Vercel
  reachable locally), so every local dev-server load exercises the real
  "gold fetch unavailable" path already — confirmed via live DOM
  inspection that only the USD/INR piece renders, with no dangling
  separator left behind.
- **Total failure, simulated**: temporarily pointed `FRANKFURTER_BASE` at
  a non-resolving host, restarted the dev server, and confirmed via DOM
  inspection that the banner element is entirely absent (not present-but-
  empty) with zero console errors, then reverted and re-verified `git
  diff` on the file was clean before continuing.

## Decision — visual design
A single quiet line directly beneath the nav (`src/app/layout.tsx`,
between `</header>` and `<main>`), reusing this site's existing muted
`stone` neutral palette (ADR 0004) for the banner's own chrome — no new
color introduced, no red, no animation, no ticker/scroll — matching the
"deliberately restrained, trust-badge aesthetic" ADR 0004 established.
Not a link, not a button, no `href` anywhere in the component.

Mobile (390px): the full combined string ("USD/INR: ₹95.44 · Gold
(24K/10g): ₹1,23,456") fits on one line comfortably even at a worst-case
6-digit gold price, verified via a live 390px screenshot — no stacking
needed, but the gold label shortens to "Gold (24K)" below the `sm:`
breakpoint as a deliberate margin buffer against longer real prices than
this session's placeholder figure, and `flex-wrap` remains a fallback if
a genuinely extreme value ever appears.

## Consequences
- New files: `src/lib/fx.ts`, `src/lib/gold.ts`,
  `src/components/PriceBanner.tsx`. `src/app/api/fxhistory/route.ts`
  changed only to import the shared `FRANKFURTER_BASE` constant instead
  of hardcoding it a second time — no behavior change to that route.
- No new route added; route count is unchanged from `nric-012`'s 85 (the
  task's own predicted outcome for choosing the direct-layout-fetch
  path over a dedicated route).
- No new dependency.
- **Cannot be end-to-end verified against live GoldAPI.io data without
  deploying** — this environment has no real key locally, consistent
  with how every other keyed-API task on this site has handled the same
  gap. Verified instead against the documented goldapi.io response shape
  (`price_gram_24k` field, confirmed via Family Ledger's own working
  integration with the same service) and the real local fail-quiet path
  described above. Ajinkya/Gauri should do one live check post-deploy
  that the gold figure actually renders (not just that its absence
  degrades gracefully, which is already confirmed).
- If a second banner-like surface is ever needed, extend
  `PriceBanner.tsx` and the two `src/lib/*.ts` fetchers rather than
  standing up a third parallel FX/gold integration.
