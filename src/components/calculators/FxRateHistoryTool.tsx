"use client";

import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CalculatorShell } from "./CalculatorShell";
import { DownloadResultsButton } from "./DownloadResultsButton";
import { HowCalculated } from "./HowCalculated";
import { SourceCitation } from "./SourceCitation";
import { PDF_DISCLAIMER } from "./pdfDisclaimer";

const FX_HISTORY_SOURCES = [
  {
    label: "Frankfurter (European Central Bank reference rates)",
    href: "https://frankfurter.dev/",
  },
];

const WINDOWS = ["1M", "3M", "6M", "1Y", "5Y"] as const;
type FxWindow = (typeof WINDOWS)[number];

type FxPoint = { date: string; rate: number };
type FxHistoryResponse = { window: string; points: FxPoint[]; latest: FxPoint };

const rateFormatter = new Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const percentFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
  signDisplay: "exceptZero",
});

function formatAxisDate(dateStr: string, window: FxWindow): string {
  const date = new Date(`${dateStr}T00:00:00Z`);
  if (window === "1M" || window === "3M") {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
  }
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "2-digit",
    timeZone: "UTC",
  });
}

export default function FxRateHistoryTool({
  defaultOpen = false,
}: {
  defaultOpen?: boolean;
} = {}) {
  const [window, setWindow] = useState<FxWindow>("1Y");
  // Loading/error are derived from comparing the fetched result's own
  // window to the currently-selected window, rather than a separate flag
  // reset at the top of the effect -- avoids a synchronous setState()
  // call at effect-start (react-hooks/set-state-in-effect), and as a side
  // effect also makes a stale in-flight response for a since-abandoned
  // window impossible to show (the `cancelled` guard already prevents
  // that too, but this makes it structurally true either way).
  const [result, setResult] = useState<
    | { status: "ready"; window: FxWindow; data: FxHistoryResponse }
    | { status: "error"; window: FxWindow }
    | null
  >(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/fxhistory?window=${window}`)
      .then((res) => {
        if (!res.ok) throw new Error("fetch failed");
        return res.json() as Promise<FxHistoryResponse>;
      })
      .then((json: FxHistoryResponse) => {
        if (cancelled) return;
        setResult({ status: "ready", window, data: json });
      })
      .catch(() => {
        if (cancelled) return;
        setResult({ status: "error", window });
      });
    return () => {
      cancelled = true;
    };
  }, [window]);

  const isCurrent = result !== null && result.window === window;
  const status: "loading" | "ready" | "error" = !isCurrent
    ? "loading"
    : (result as { status: "ready" | "error" }).status;
  const data = isCurrent && result.status === "ready" ? result.data : null;

  const first = data?.points[0];
  const last = data?.latest;
  const changePercent =
    first && last && first.rate !== 0
      ? ((last.rate - first.rate) / first.rate) * 100
      : null;

  return (
    <CalculatorShell
      defaultOpen={defaultOpen}
      title="USD/INR FX rate history"
      intro="Tracks the US dollar to Indian rupee exchange rate over time, using the European Central Bank's daily reference rates. Useful for spotting the trend behind a single day's number, not for timing a specific transfer."
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-stone-500 dark:text-primary-300/60">
            1 USD equals
          </p>
          {status === "ready" && last ? (
            <p className="text-3xl font-semibold tabular-nums text-primary-900 dark:text-primary-50">
              ₹{rateFormatter.format(last.rate)}
            </p>
          ) : (
            <p className="text-3xl font-semibold tabular-nums text-stone-300 dark:text-primary-800">
              ₹--.--
            </p>
          )}
          {status === "ready" && last && (
            <p className="text-xs text-stone-500 dark:text-primary-300/60">
              As of {last.date}
              {changePercent !== null && (
                <> · {percentFormatter.format(changePercent)}% over {window}</>
              )}
            </p>
          )}
        </div>

        <div
          className="flex gap-1 rounded-lg border border-stone-200 p-1 dark:border-primary-800"
          role="group"
          aria-label="Time window"
        >
          {WINDOWS.map((w) => (
            <button
              key={w}
              type="button"
              onClick={() => setWindow(w)}
              aria-pressed={window === w}
              className={
                window === w
                  ? "rounded-md bg-gold-100 px-3 py-1 text-xs font-semibold text-gold-800 dark:bg-gold-950 dark:text-gold-300"
                  : "rounded-md px-3 py-1 text-xs font-medium text-stone-600 hover:bg-stone-100 dark:text-primary-200/70 dark:hover:bg-primary-900/40"
              }
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      <div className="h-64 w-full [--fx-fill:var(--color-primary-200)] [--fx-line:var(--color-primary-600)] dark:[--fx-fill:var(--color-primary-800)] dark:[--fx-line:var(--color-primary-300)]">
        {status === "loading" && (
          <div className="flex h-full items-center justify-center text-sm text-stone-500 dark:text-primary-300/60">
            Loading rate history…
          </div>
        )}
        {status === "error" && (
          <div className="flex h-full items-center justify-center text-sm text-amber-700 dark:text-amber-400">
            Couldn&apos;t load rate history — try again.
          </div>
        )}
        {status === "ready" && data && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.points} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="fxRateFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--fx-fill)" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="var(--fx-fill)" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7e5e4" />
              <XAxis
                dataKey="date"
                tickFormatter={(value: string) => formatAxisDate(value, window)}
                tick={{ fontSize: 11, fill: "#78716c" }}
                minTickGap={40}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={["auto", "auto"]}
                tick={{ fontSize: 11, fill: "#78716c" }}
                axisLine={false}
                tickLine={false}
                width={44}
                tickFormatter={(value: number) => value.toFixed(1)}
              />
              <Tooltip
                formatter={(value) => [
                  `₹${rateFormatter.format(Number(value))}`,
                  "1 USD",
                ]}
                contentStyle={{
                  fontSize: 12,
                  borderRadius: 8,
                  border: "1px solid #e7e5e4",
                }}
              />
              <Area
                type="monotone"
                dataKey="rate"
                stroke="var(--fx-line)"
                strokeWidth={2}
                fill="url(#fxRateFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {status === "ready" && last && (
        <DownloadResultsButton
          fileNameBase="usd-inr-fx-rate-history-result"
          calculatorTitle="USD/INR FX rate history"
          inputs={[{ label: "Time window", value: window }]}
          results={[
            {
              label: "1 USD equals (latest)",
              value: `₹${rateFormatter.format(last.rate)}`,
            },
            { label: "As of", value: last.date },
            ...(changePercent !== null
              ? [
                  {
                    label: `Change over ${window}`,
                    value: `${percentFormatter.format(changePercent)}%`,
                  },
                ]
              : []),
          ]}
          disclaimer={PDF_DISCLAIMER}
          sources={FX_HISTORY_SOURCES}
        />
      )}

      <p className="text-xs text-stone-500 dark:text-primary-300/60">
        Reference rates only — your bank or remittance provider&apos;s
        actual exchange rate will differ (spread/margin, timing, and rate
        source all vary). Not a live/real-time market rate; updated once
        per business day.
      </p>

      <HowCalculated>
        <p>
          Historical USD/INR rates come from the European Central
          Bank&apos;s daily reference rates (via frankfurter.dev), fetched
          server-side and cached for up to an hour so repeated page views
          don&apos;t re-fetch on every load. The percentage change shown
          is a plain point-to-point comparison — (latest rate − first
          rate in the selected window) ÷ first rate in the window — not
          an annualized or volatility-adjusted figure.
        </p>
      </HowCalculated>

      <SourceCitation sources={FX_HISTORY_SOURCES} />
    </CalculatorShell>
  );
}
