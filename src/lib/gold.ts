// Mirrors Family Ledger's own api/metals.js (github.com/kathakar/Family-ledger)
// gold-fetch pattern rather than re-deriving the math from scratch: goldapi.io's
// response already includes price_gram_24k directly, so no troy-ounce-to-gram
// conversion is needed on our end. INR conversion is deliberately NOT done in
// this function -- it returns the USD/gram price only, and the caller combines
// it with the current USD/INR rate (src/lib/fx.ts) to avoid this module also
// needing to know about currency conversion.
//
// GOLD_API_KEY confirmed as the exact Vercel env var name for this project via
// the actual dashboard (Environment Variables, Production + Preview) -- not
// assumed, and not just inferred from Family Ledger's matching convention for
// the same service, though that was consistent with it.

export type GoldSpotPrice = {
  pricePerGram24kUsd: number;
};

export async function fetchGoldSpotPriceUsd(): Promise<GoldSpotPrice | null> {
  const apiKey = process.env.GOLD_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch("https://www.goldapi.io/api/XAU/USD", {
      headers: {
        "x-access-token": apiKey,
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return null;

    const data = await res.json();
    const pricePerGram24kUsd = data?.price_gram_24k;
    if (typeof pricePerGram24kUsd !== "number") return null;

    return { pricePerGram24kUsd };
  } catch {
    return null;
  }
}
