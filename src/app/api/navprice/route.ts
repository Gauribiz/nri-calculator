import { NextRequest, NextResponse } from "next/server";

// nric-011: second piece of server-side code in this repo, same
// stateless-proxy shape as nric-012's fxhistory route (see ADR 0019) and
// its own new ADR 0020 -- AMFI's NAVAll.txt has no CORS allowance for
// direct browser fetches (documented behavior, could not be confirmed
// live from this sandboxed session -- see ADR 0020's "not independently
// verified" note), so this proxies and parses it server-side instead.

const NAVALL_URL = "https://www.amfiindia.com/spages/NAVAll.txt";
const MIN_QUERY_LENGTH = 3;
const MAX_RESULTS = 20;

export type NavResult = {
  schemeCode: string;
  schemeName: string;
  nav: number;
  date: string;
};

// AMFI updates NAV once per business day, published after the day's
// cut-off (evening IST) -- there's no benefit to re-fetching more often
// than a few hours. A judgment call, same as ADR 0019's fx-rate caching,
// not a published rate limit (AMFI doesn't document one).
export const revalidate = 21600; // 6 hours

function parseNavAll(text: string): NavResult[] {
  const results: NavResult[] = [];

  for (const rawLine of text.split("\n")) {
    const line = rawLine.trim();
    if (!line || !line.includes(";")) continue;

    const fields = line.split(";");
    if (fields.length < 6) continue;

    const [schemeCode, , , schemeName, navStr, dateStr] = fields;
    const nav = Number.parseFloat(navStr);

    // Filters out header/section-marker lines (fund-house names, category
    // headers) the same way for any AMC, without depending on AMFI's
    // exact header wording: a real data row always has a numeric scheme
    // code and a numeric NAV.
    if (!/^\d+$/.test(schemeCode.trim())) continue;
    if (!Number.isFinite(nav)) continue;

    results.push({
      schemeCode: schemeCode.trim(),
      schemeName: schemeName.trim(),
      nav,
      date: dateStr.trim(),
    });
  }

  return results;
}

export async function GET(request: NextRequest) {
  const query = (request.nextUrl.searchParams.get("q") ?? "").trim();

  if (query.length < MIN_QUERY_LENGTH) {
    return NextResponse.json(
      { error: `Query must be at least ${MIN_QUERY_LENGTH} characters.` },
      { status: 400 }
    );
  }

  let upstream: Response;
  try {
    upstream = await fetch(NAVALL_URL, { next: { revalidate } });
  } catch {
    return NextResponse.json(
      { error: "Could not reach the mutual fund NAV provider." },
      { status: 502 }
    );
  }

  if (!upstream.ok) {
    return NextResponse.json(
      { error: "Could not reach the mutual fund NAV provider." },
      { status: 502 }
    );
  }

  let text: string;
  try {
    text = await upstream.text();
  } catch {
    return NextResponse.json(
      { error: "Unexpected response from the mutual fund NAV provider." },
      { status: 502 }
    );
  }

  const all = parseNavAll(text);
  if (all.length === 0) {
    return NextResponse.json(
      { error: "Unexpected response from the mutual fund NAV provider." },
      { status: 502 }
    );
  }

  const lowerQuery = query.toLowerCase();
  const matches = all.filter((entry) =>
    entry.schemeName.toLowerCase().includes(lowerQuery)
  );

  return NextResponse.json(
    {
      query,
      results: matches.slice(0, MAX_RESULTS),
      truncated: matches.length > MAX_RESULTS,
      totalMatches: matches.length,
    },
    { headers: { "Cache-Control": "public, max-age=21600, s-maxage=21600" } }
  );
}
