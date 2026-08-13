// Shared frankfurter.dev integration -- used by both the full-history
// /api/fxhistory route (nric-012) and this lean "just the latest rate"
// fetcher (nric-011's site-wide price banner). frankfurter.app (an older
// domain some references still name) permanently redirects here; both
// call this host directly rather than eating that redirect on every
// request -- confirmed live via curl before nric-012 was written.
export const FRANKFURTER_BASE = "https://api.frankfurter.dev/v1";

export type UsdInrRate = {
  date: string;
  rate: number;
};

// A dedicated "latest only" fetch rather than reusing /api/fxhistory's
// full timeseries endpoint and taking its last point -- the banner loads
// on every single pageview site-wide, so fetching a full date-range
// payload just to read one number would be real, avoidable waste (see
// ADR 0021). Fails quiet: any error, non-OK response, unexpected shape,
// or timeout returns null rather than throwing -- callers decide how to
// degrade, never shown to a visitor as an error state.
export async function fetchCurrentUsdInrRate(): Promise<UsdInrRate | null> {
  try {
    const res = await fetch(`${FRANKFURTER_BASE}/latest?base=USD&symbols=INR`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return null;

    const data = await res.json();
    const rate = data?.rates?.INR;
    const date = data?.date;
    if (typeof rate !== "number" || typeof date !== "string") return null;

    return { date, rate };
  } catch {
    return null;
  }
}
