import { NextRequest, NextResponse } from "next/server";
import { FRANKFURTER_BASE } from "@/lib/fx";

// nric-012: the FIRST server-side code in this repo (see ADR 0019). Every
// other calculator here is pure client-side per CLAUDE.md's "no database,
// client-side logic only" -- this is not a database or persistence layer,
// just a stateless proxy, added because frankfurter.dev's API blocks
// direct browser fetches via CORS (confirmed live before writing this,
// not assumed).
//
// frankfurter.app (the domain named in the original task) now permanently
// redirects (301) to frankfurter.dev/v1/... -- confirmed live via curl
// before writing this. Fetching the new host directly server-side avoids
// an extra redirect hop on every request. nric-011's site-wide price
// banner needs only the latest rate (not a full range), so it uses its
// own lean fetcher in src/lib/fx.ts rather than this route -- both share
// the FRANKFURTER_BASE host constant from there instead of duplicating it.

const WINDOW_DAYS: Record<string, number> = {
  "1M": 30,
  "3M": 90,
  "6M": 182,
  "1Y": 365,
  "5Y": 365 * 5,
};

type FrankfurterTimeseries = {
  amount: number;
  base: string;
  start_date: string;
  end_date: string;
  rates: Record<string, { INR: number }>;
};

function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

// ECB (frankfurter's underlying source) publishes reference rates once
// per business day, around 16:00 CET -- there is no benefit to
// re-fetching more often than this. An hour is a conservative default
// well inside that cadence, not a measured rate limit (frankfurter
// doesn't publish one); flagged in the PR/ADR as a judgment call rather
// than a known constraint, per the task's own instruction to do so.
export const revalidate = 3600;

export async function GET(request: NextRequest) {
  const window = request.nextUrl.searchParams.get("window") ?? "1Y";
  const days = WINDOW_DAYS[window];

  if (!days) {
    return NextResponse.json(
      { error: `Invalid window. Expected one of: ${Object.keys(WINDOW_DAYS).join(", ")}` },
      { status: 400 }
    );
  }

  const end = new Date();
  const start = new Date(end);
  start.setDate(start.getDate() - days);

  const upstreamUrl = `${FRANKFURTER_BASE}/${formatDate(start)}..${formatDate(end)}?base=USD&symbols=INR`;

  let upstream: Response;
  try {
    upstream = await fetch(upstreamUrl, { next: { revalidate } });
  } catch {
    return NextResponse.json({ error: "Could not reach the exchange-rate provider." }, { status: 502 });
  }

  if (!upstream.ok) {
    return NextResponse.json({ error: "Could not reach the exchange-rate provider." }, { status: 502 });
  }

  let data: FrankfurterTimeseries;
  try {
    data = await upstream.json();
  } catch {
    return NextResponse.json({ error: "Unexpected response from the exchange-rate provider." }, { status: 502 });
  }

  const points = Object.entries(data.rates)
    .map(([date, rateByCurrency]) => ({ date, rate: rateByCurrency.INR }))
    .sort((a, b) => a.date.localeCompare(b.date));

  if (points.length === 0) {
    return NextResponse.json({ error: "No exchange-rate data available for this window." }, { status: 502 });
  }

  const latest = points[points.length - 1];

  return NextResponse.json(
    { window, points, latest },
    { headers: { "Cache-Control": "public, max-age=3600, s-maxage=3600" } }
  );
}
