import { fetchCurrentUsdInrRate } from "@/lib/fx";
import { fetchGoldSpotPriceUsd } from "@/lib/gold";

// nric-011: a quiet, site-wide info strip -- NOT a tool page, not
// interactive, no links out. See ADR 0021 for the full scope-pivot
// reasoning (this replaces an originally-planned interactive lookup
// tool entirely).
//
// Deliberately an async Server Component, not a client component
// fetching from an API route: the data is fully resolved before any
// HTML reaches the browser, so there is no loading state to show a
// visitor, ever -- a strictly better fit for "never show a spinner for
// a passive info strip" than a client-fetched design could achieve.
// Both underlying fetches (src/lib/fx.ts, src/lib/gold.ts) already
// cache for an hour via Next's fetch cache, shared across every page and
// every visitor hitting this same layout -- the upstream APIs are only
// actually called once per hour total, not once per pageview, which
// matters a lot more here than it did for nric-012's single /tools page
// given this renders on literally every page.

const rateFormatter = new Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const goldFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0,
});

export default async function PriceBanner() {
  const [fx, gold] = await Promise.all([
    fetchCurrentUsdInrRate(),
    fetchGoldSpotPriceUsd(),
  ]);

  // Gold is shown as an INR figure (the standard Indian retail quoting
  // convention the task asked for), so it structurally depends on the FX
  // rate too, not just its own fetch succeeding -- if the FX leg fails,
  // there is no meaningful INR gold price to show even though the raw
  // USD gold fetch may have worked. This is a deliberate coupling, not
  // an oversight: see ADR 0021.
  const goldInrPer10g =
    fx && gold ? gold.pricePerGram24kUsd * fx.rate * 10 : null;

  const showFx = fx !== null;
  const showGold = goldInrPer10g !== null;

  // Fail-quiet: if both legs are unavailable, omit the entire banner --
  // no error state, no empty shell, nothing shown to the visitor at all.
  if (!showFx && !showGold) return null;

  return (
    <div className="border-b border-stone-200 bg-stone-50 px-6 py-1.5 text-xs text-stone-500 dark:border-primary-900 dark:bg-primary-950/40 dark:text-primary-300/60">
      <p className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-3 gap-y-0.5 text-center xl:max-w-6xl">
        {showFx && (
          <span className="tabular-nums">
            USD/INR:{" "}
            <span className="font-medium text-stone-700 dark:text-primary-200">
              ₹{rateFormatter.format(fx.rate)}
            </span>
          </span>
        )}
        {showFx && showGold && <span aria-hidden="true">·</span>}
        {showGold && (
          <span className="tabular-nums">
            <span className="hidden sm:inline">Gold (24K/10g)</span>
            <span className="sm:hidden">Gold (24K)</span>:{" "}
            <span className="font-medium text-stone-700 dark:text-primary-200">
              ₹{goldFormatter.format(goldInrPer10g)}
            </span>
          </span>
        )}
      </p>
    </div>
  );
}
