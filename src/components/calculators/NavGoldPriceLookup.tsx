"use client";

import { useEffect, useState } from "react";
import { CalculatorShell } from "./CalculatorShell";
import { DownloadResultsButton } from "./DownloadResultsButton";
import { HowCalculated } from "./HowCalculated";
import { SourceCitation } from "./SourceCitation";
import { PDF_DISCLAIMER } from "./pdfDisclaimer";
import type { NavResult } from "@/app/api/navprice/route";

const NAV_SOURCES = [
  { label: "AMFI India (daily NAV)", href: "https://www.amfiindia.com/" },
];

const GOLD_SOURCES = [
  { label: "goldprice.org (live spot)", href: "https://goldprice.org/" },
  {
    label: "Frankfurter / European Central Bank (USD/INR)",
    href: "https://frankfurter.dev/",
  },
];

const MIN_QUERY_LENGTH = 3;
const DEBOUNCE_MS = 400;

type NavSearchState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; results: NavResult[]; truncated: boolean };

type GoldPriceResponse = {
  asOf: string;
  usdInrRate: number;
  ounce: { usd: number; inr: number };
  gram: { usd: number; inr: number };
  tenGram: { usd: number; inr: number };
};

type GoldState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; data: GoldPriceResponse };

type GoldFetchResult =
  | { status: "ready"; data: GoldPriceResponse }
  | { status: "error" }
  | null;

const navFormatter = new Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 4,
});

const priceFormatter = new Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export default function NavGoldPriceLookup({
  defaultOpen = false,
}: {
  defaultOpen?: boolean;
} = {}) {
  const [mode, setMode] = useState<"fund" | "gold">("fund");

  const [query, setQuery] = useState("");
  const [selectedFund, setSelectedFund] = useState<NavResult | null>(null);

  // Same "derive status by comparing the fetched result's own key to the
  // current key" shape as FxRateHistoryTool, to avoid a synchronous
  // setState() call at effect-start (react-hooks/set-state-in-effect) --
  // here the key is the trimmed query a given result was fetched for.
  const [navResult, setNavResult] = useState<
    | { status: "ready"; query: string; results: NavResult[]; truncated: boolean }
    | { status: "error"; query: string }
    | null
  >(null);

  const [goldResult, setGoldResult] = useState<GoldFetchResult>(null);

  const trimmedQuery = query.trim();

  useEffect(() => {
    if (trimmedQuery.length < MIN_QUERY_LENGTH) return;

    let cancelled = false;
    const timer = setTimeout(() => {
      fetch(`/api/navprice?q=${encodeURIComponent(trimmedQuery)}`)
        .then((res) => {
          if (!res.ok) throw new Error("fetch failed");
          return res.json() as Promise<{
            results: NavResult[];
            truncated: boolean;
          }>;
        })
        .then((json) => {
          if (cancelled) return;
          setNavResult({
            status: "ready",
            query: trimmedQuery,
            results: json.results,
            truncated: json.truncated,
          });
        })
        .catch(() => {
          if (cancelled) return;
          setNavResult({ status: "error", query: trimmedQuery });
        });
    }, DEBOUNCE_MS);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [trimmedQuery]);

  const navIsCurrent = navResult !== null && navResult.query === trimmedQuery;
  const navState: NavSearchState =
    trimmedQuery.length < MIN_QUERY_LENGTH
      ? { status: "idle" }
      : !navIsCurrent
        ? { status: "loading" }
        : navResult.status === "ready"
          ? {
              status: "ready",
              results: navResult.results,
              truncated: navResult.truncated,
            }
          : { status: "error" };

  useEffect(() => {
    if (mode !== "gold") return;
    let cancelled = false;
    fetch("/api/goldprice")
      .then((res) => {
        if (!res.ok) throw new Error("fetch failed");
        return res.json() as Promise<GoldPriceResponse>;
      })
      .then((json) => {
        if (cancelled) return;
        setGoldResult({ status: "ready", data: json });
      })
      .catch(() => {
        if (cancelled) return;
        setGoldResult({ status: "error" });
      });
    return () => {
      cancelled = true;
    };
  }, [mode]);

  const goldState: GoldState = goldResult ?? { status: "loading" };

  return (
    <CalculatorShell
      defaultOpen={defaultOpen}
      title="Live NAV & gold price lookup"
      intro="Look up a mutual fund's latest published NAV or the current international gold spot price, converted to INR. A live lookup, not a tracker — nothing is saved."
    >
      <div
        className="flex gap-1 self-start rounded-lg border border-stone-200 p-1 dark:border-primary-800"
        role="group"
        aria-label="Lookup type"
      >
        <button
          type="button"
          onClick={() => setMode("fund")}
          aria-pressed={mode === "fund"}
          className={
            mode === "fund"
              ? "rounded-md bg-gold-100 px-3 py-1 text-xs font-semibold text-gold-800 dark:bg-gold-950 dark:text-gold-300"
              : "rounded-md px-3 py-1 text-xs font-medium text-stone-600 hover:bg-stone-100 dark:text-primary-200/70 dark:hover:bg-primary-900/40"
          }
        >
          Mutual fund NAV
        </button>
        <button
          type="button"
          onClick={() => setMode("gold")}
          aria-pressed={mode === "gold"}
          className={
            mode === "gold"
              ? "rounded-md bg-gold-100 px-3 py-1 text-xs font-semibold text-gold-800 dark:bg-gold-950 dark:text-gold-300"
              : "rounded-md px-3 py-1 text-xs font-medium text-stone-600 hover:bg-stone-100 dark:text-primary-200/70 dark:hover:bg-primary-900/40"
          }
        >
          Gold price
        </button>
      </div>

      {mode === "fund" && (
        <div className="flex flex-col gap-3">
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-stone-700 dark:text-primary-100">
              Fund name
            </span>
            <input
              type="text"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setSelectedFund(null);
              }}
              placeholder="e.g. Parag Parikh Flexi Cap"
              className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-stone-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-primary-800 dark:bg-primary-950 dark:text-primary-50"
            />
          </label>

          {query.trim().length > 0 &&
            query.trim().length < MIN_QUERY_LENGTH && (
              <p className="text-xs text-stone-500 dark:text-primary-300/60">
                Keep typing — at least {MIN_QUERY_LENGTH} characters.
              </p>
            )}

          {navState.status === "loading" && (
            <p className="text-sm text-stone-500 dark:text-primary-300/60">
              Searching…
            </p>
          )}

          {navState.status === "error" && (
            <p className="text-sm text-amber-700 dark:text-amber-400">
              Couldn&apos;t load NAV data — try again.
            </p>
          )}

          {navState.status === "ready" && navState.results.length === 0 && (
            <p className="text-sm text-stone-500 dark:text-primary-300/60">
              No matching schemes found.
            </p>
          )}

          {navState.status === "ready" && navState.results.length > 0 && (
            <div className="flex flex-col gap-1 rounded-lg border border-stone-200 dark:border-primary-900">
              {navState.results.map((fund) => (
                <button
                  key={fund.schemeCode}
                  type="button"
                  onClick={() => setSelectedFund(fund)}
                  className={`flex items-center justify-between gap-4 border-b border-stone-100 px-3 py-2 text-left text-sm last:border-b-0 hover:bg-stone-50 dark:border-primary-900 dark:hover:bg-primary-900/40 ${
                    selectedFund?.schemeCode === fund.schemeCode
                      ? "bg-gold-50 dark:bg-gold-950/40"
                      : ""
                  }`}
                >
                  <span className="text-stone-700 dark:text-primary-100">
                    {fund.schemeName}
                  </span>
                  <span className="shrink-0 tabular-nums text-stone-900 dark:text-primary-50">
                    ₹{navFormatter.format(fund.nav)}
                  </span>
                </button>
              ))}
              {navState.truncated && (
                <p className="px-3 py-2 text-xs text-stone-500 dark:text-primary-300/60">
                  More matches exist — refine your search to narrow the list.
                </p>
              )}
            </div>
          )}

          {selectedFund && (
            <div className="flex flex-col gap-3 rounded-lg border border-stone-200 p-4 dark:border-primary-900">
              <div>
                <p className="text-sm font-medium text-primary-900 dark:text-primary-50">
                  {selectedFund.schemeName}
                </p>
                <p className="text-xs text-stone-500 dark:text-primary-300/60">
                  Scheme code {selectedFund.schemeCode} · NAV as of{" "}
                  {selectedFund.date}
                </p>
              </div>
              <p className="text-2xl font-semibold tabular-nums text-primary-900 dark:text-primary-50">
                ₹{navFormatter.format(selectedFund.nav)}
              </p>
              <DownloadResultsButton
                fileNameBase="mutual-fund-nav-result"
                calculatorTitle="Mutual fund NAV lookup"
                inputs={[{ label: "Search query", value: query.trim() }]}
                results={[
                  { label: "Scheme name", value: selectedFund.schemeName },
                  { label: "Scheme code", value: selectedFund.schemeCode },
                  {
                    label: "NAV",
                    value: `₹${navFormatter.format(selectedFund.nav)}`,
                  },
                  { label: "As of", value: selectedFund.date },
                ]}
                disclaimer={PDF_DISCLAIMER}
                sources={NAV_SOURCES}
              />
            </div>
          )}

          <HowCalculated>
            <p>
              NAV data comes from AMFI&apos;s official daily NAV file,
              fetched server-side and cached for up to 6 hours — AMFI
              publishes updated NAVs once per business day, so more
              frequent fetching wouldn&apos;t show a different number.
              Search matches any part of the scheme name, case-insensitive,
              and is capped to the first 20 matches.
            </p>
          </HowCalculated>

          <SourceCitation sources={NAV_SOURCES} />
        </div>
      )}

      {mode === "gold" && (
        <div className="flex flex-col gap-3">
          {goldState.status === "loading" && (
            <p className="text-sm text-stone-500 dark:text-primary-300/60">
              Loading gold price…
            </p>
          )}

          {goldState.status === "error" && (
            <p className="text-sm text-amber-700 dark:text-amber-400">
              Couldn&apos;t load the gold price — try again.
            </p>
          )}

          {goldState.status === "ready" && (
            <>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-stone-200 p-4 dark:border-primary-900">
                  <p className="text-xs font-medium uppercase tracking-wide text-stone-500 dark:text-primary-300/60">
                    Per troy ounce
                  </p>
                  <p className="text-xl font-semibold tabular-nums text-primary-900 dark:text-primary-50">
                    ₹{priceFormatter.format(goldState.data.ounce.inr)}
                  </p>
                  <p className="text-xs tabular-nums text-stone-500 dark:text-primary-300/60">
                    ${priceFormatter.format(goldState.data.ounce.usd)}
                  </p>
                </div>
                <div className="rounded-lg border border-stone-200 p-4 dark:border-primary-900">
                  <p className="text-xs font-medium uppercase tracking-wide text-stone-500 dark:text-primary-300/60">
                    Per 10 grams
                  </p>
                  <p className="text-xl font-semibold tabular-nums text-primary-900 dark:text-primary-50">
                    ₹{priceFormatter.format(goldState.data.tenGram.inr)}
                  </p>
                  <p className="text-xs tabular-nums text-stone-500 dark:text-primary-300/60">
                    ${priceFormatter.format(goldState.data.tenGram.usd)}
                  </p>
                </div>
              </div>
              <p className="text-xs text-stone-500 dark:text-primary-300/60">
                International wholesale spot price, converted at the
                current USD/INR reference rate — not a retail jewelry
                price. Actual jeweler prices differ with purity (22K vs
                24K), making charges, and GST, and vary by seller. As of{" "}
                {goldState.data.asOf}.
              </p>
              <DownloadResultsButton
                fileNameBase="gold-price-result"
                calculatorTitle="Gold price lookup"
                inputs={[]}
                results={[
                  {
                    label: "Price per troy ounce (INR)",
                    value: `₹${priceFormatter.format(goldState.data.ounce.inr)}`,
                  },
                  {
                    label: "Price per troy ounce (USD)",
                    value: `$${priceFormatter.format(goldState.data.ounce.usd)}`,
                  },
                  {
                    label: "Price per 10 grams (INR)",
                    value: `₹${priceFormatter.format(goldState.data.tenGram.inr)}`,
                  },
                  {
                    label: "USD/INR rate used",
                    value: navFormatter.format(goldState.data.usdInrRate),
                  },
                  { label: "As of", value: goldState.data.asOf },
                ]}
                disclaimer={PDF_DISCLAIMER}
                sources={GOLD_SOURCES}
              />
            </>
          )}

          <HowCalculated>
            <p>
              Gold spot price comes from an international live gold-price
              feed (troy ounce, USD), fetched server-side and cached for
              up to 5 minutes. Converted to INR using the current
              USD/INR reference rate. Per-gram and per-10-gram figures are
              a straight unit conversion (1 troy ounce = 31.1034768
              grams) of the same spot price — not a retail or jewelry
              price, which also depends on purity, making charges, and
              GST.
            </p>
          </HowCalculated>

          <SourceCitation sources={GOLD_SOURCES} />
        </div>
      )}
    </CalculatorShell>
  );
}
