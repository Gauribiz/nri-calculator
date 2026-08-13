import { NextResponse } from "next/server";

// nric-011: third piece of server-side code in this repo (see ADR 0020),
// same stateless-proxy shape as ADR 0019's fxhistory route. Gold spot
// price providers generally don't allow direct browser fetches either,
// and this also needs a USD/INR conversion, which is cleaner to do
// server-side in one response than to make the client stitch together
// two API calls.

const GOLD_SPOT_URL = "https://data-asg.goldprice.org/dbXRates/USD";
const FX_LATEST_URL = "https://api.frankfurter.dev/v1/latest?base=USD&symbols=INR";

const TROY_OUNCE_IN_GRAMS = 31.1034768;

type GoldSpotResponse = {
  date?: string;
  items?: Array<{ xauPrice?: number; curr?: string }>;
};

type FrankfurterLatest = {
  rates?: { INR?: number };
};

// Live/intraday price -- cached briefly so the page feels current without
// re-fetching the upstream provider on every page view. A judgment call
// (same posture as ADR 0019's fx caching), not a published rate limit.
export const revalidate = 300; // 5 minutes

export async function GET() {
  let goldRes: Response;
  let fxRes: Response;
  try {
    [goldRes, fxRes] = await Promise.all([
      fetch(GOLD_SPOT_URL, { next: { revalidate } }),
      fetch(FX_LATEST_URL, { next: { revalidate } }),
    ]);
  } catch {
    return NextResponse.json(
      { error: "Could not reach the gold price provider." },
      { status: 502 }
    );
  }

  if (!goldRes.ok || !fxRes.ok) {
    return NextResponse.json(
      { error: "Could not reach the gold price provider." },
      { status: 502 }
    );
  }

  let goldData: GoldSpotResponse;
  let fxData: FrankfurterLatest;
  try {
    [goldData, fxData] = await Promise.all([goldRes.json(), fxRes.json()]);
  } catch {
    return NextResponse.json(
      { error: "Unexpected response from the gold price provider." },
      { status: 502 }
    );
  }

  const ouncePriceUsd = goldData.items?.[0]?.xauPrice;
  const usdToInr = fxData.rates?.INR;

  if (
    typeof ouncePriceUsd !== "number" ||
    !Number.isFinite(ouncePriceUsd) ||
    typeof usdToInr !== "number" ||
    !Number.isFinite(usdToInr)
  ) {
    return NextResponse.json(
      { error: "Unexpected response from the gold price provider." },
      { status: 502 }
    );
  }

  const gramPriceUsd = ouncePriceUsd / TROY_OUNCE_IN_GRAMS;
  const ouncePriceInr = ouncePriceUsd * usdToInr;
  const gramPriceInr = gramPriceUsd * usdToInr;

  return NextResponse.json(
    {
      asOf: goldData.date ?? new Date().toISOString(),
      usdInrRate: usdToInr,
      ounce: { usd: ouncePriceUsd, inr: ouncePriceInr },
      gram: { usd: gramPriceUsd, inr: gramPriceInr },
      tenGram: { usd: gramPriceUsd * 10, inr: gramPriceInr * 10 },
    },
    { headers: { "Cache-Control": "public, max-age=300, s-maxage=300" } }
  );
}
