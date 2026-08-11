"use client";

import { useState } from "react";
import { estimateCurrencyImpact } from "@/lib/calculators/currencyImpact";
import { CalculatorShell, NumberField, ResultRow } from "./CalculatorShell";
import { DownloadResultsButton } from "./DownloadResultsButton";
import { HowCalculated } from "./HowCalculated";
import { SourceCitation } from "./SourceCitation";
import { PDF_DISCLAIMER } from "./pdfDisclaimer";

const CURRENCY_IMPACT_SOURCES = [
  {
    label: "RBI: Reference Rate Archive",
    href: "https://www.rbi.org.in/Scripts/ReferenceRateArchive.aspx",
  },
];

const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const percentFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 1,
  signDisplay: "exceptZero",
});

const signedUsdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
  signDisplay: "exceptZero",
});

export default function CurrencyImpactCalculator() {
  const [initialValueInr, setInitialValueInr] = useState(0);
  const [initialRateInrPerUsd, setInitialRateInrPerUsd] = useState(0);
  const [currentValueInr, setCurrentValueInr] = useState(0);
  const [currentRateInrPerUsd, setCurrentRateInrPerUsd] = useState(0);

  const result = estimateCurrencyImpact({
    initialValueInr,
    initialRateInrPerUsd,
    currentValueInr,
    currentRateInrPerUsd,
  });

  return (
    <CalculatorShell
      title="Currency impact calculator"
      intro="Splits the USD-terms change in an INR asset's value into real growth (the asset's own performance in INR) and currency effect (the impact of the rupee moving against the dollar). Useful for seeing how much of a gain or loss was the investment itself versus the exchange rate."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <NumberField
          label="Initial value"
          value={initialValueInr}
          onChange={setInitialValueInr}
          suffix="INR"
        />
        <NumberField
          label="Exchange rate on that date"
          value={initialRateInrPerUsd}
          onChange={setInitialRateInrPerUsd}
          suffix="INR/USD"
          hint="How many rupees one US dollar bought on the initial date."
        />
        <NumberField
          label="Current value"
          value={currentValueInr}
          onChange={setCurrentValueInr}
          suffix="INR"
        />
        <NumberField
          label="Current exchange rate"
          value={currentRateInrPerUsd}
          onChange={setCurrentRateInrPerUsd}
          suffix="INR/USD"
          hint="How many rupees one US dollar buys today."
        />
      </div>

      <div className="flex flex-col gap-1 rounded-lg bg-stone-50 p-4 dark:bg-primary-900/20">
        <ResultRow
          label="Initial value in USD"
          value={usdFormatter.format(result.initialValueUsd)}
        />
        <ResultRow
          label="Current value in USD"
          value={usdFormatter.format(result.currentValueUsd)}
        />
        <ResultRow
          label="Total change in USD"
          value={`${signedUsdFormatter.format(result.totalChangeUsd)} (${percentFormatter.format(result.totalChangePercent)}%)`}
          emphasis
        />
        <ResultRow
          label="Real growth (asset performance, in INR)"
          value={`${signedUsdFormatter.format(result.realGrowthUsd)} (${percentFormatter.format(result.realGrowthPercent)}%)`}
        />
        <ResultRow
          label="Currency effect (rupee move vs dollar)"
          value={`${signedUsdFormatter.format(result.currencyEffectUsd)} (${percentFormatter.format(result.currencyEffectPercent)}%)`}
          status={result.currencyEffectUsd >= 0 ? "favorable" : "warning"}
        />
        <ResultRow
          label="Rupee moved"
          value={result.inrAppreciated ? "Stronger vs USD" : "Weaker vs USD"}
        />
      </div>

      <DownloadResultsButton
        fileNameBase="currency-impact-result"
        calculatorTitle="Currency impact calculator"
        inputs={[
          { label: "Initial value", value: `₹${initialValueInr}` },
          {
            label: "Exchange rate on that date",
            value: `${initialRateInrPerUsd} INR/USD`,
          },
          { label: "Current value", value: `₹${currentValueInr}` },
          {
            label: "Current exchange rate",
            value: `${currentRateInrPerUsd} INR/USD`,
          },
        ]}
        results={[
          {
            label: "Initial value in USD",
            value: usdFormatter.format(result.initialValueUsd),
          },
          {
            label: "Current value in USD",
            value: usdFormatter.format(result.currentValueUsd),
          },
          {
            label: "Total change in USD",
            value: `${signedUsdFormatter.format(result.totalChangeUsd)} (${percentFormatter.format(result.totalChangePercent)}%)`,
          },
          {
            label: "Real growth (asset performance, in INR)",
            value: `${signedUsdFormatter.format(result.realGrowthUsd)} (${percentFormatter.format(result.realGrowthPercent)}%)`,
          },
          {
            label: "Currency effect (rupee move vs dollar)",
            value: `${signedUsdFormatter.format(result.currencyEffectUsd)} (${percentFormatter.format(result.currencyEffectPercent)}%)`,
          },
          {
            label: "Rupee moved",
            value: result.inrAppreciated ? "Stronger vs USD" : "Weaker vs USD",
          },
        ]}
        disclaimer={PDF_DISCLAIMER}
        sources={CURRENCY_IMPACT_SOURCES}
      />

      <p className="text-xs text-stone-500 dark:text-primary-300/60">
        Assumes a single lump-sum comparison between two dates — it does not
        account for contributions or withdrawals in between, tax on gains, or
        remittance frictions such as TCS on outward remittance under LRS or
        bank conversion margins. Use the same type of exchange rate (e.g.
        both RBI reference rates, or both your bank&apos;s card rates) for
        both dates.
      </p>

      <HowCalculated>
        <p>
          Total change in USD = current value ÷ current rate − initial value
          ÷ initial rate. This splits exactly into two parts that add back
          up to the total: real growth = (current value − initial value) ÷
          initial rate (the asset&apos;s own change in INR, converted at the
          old rate, isolating performance from currency movement); currency
          effect = current value ÷ current rate − current value ÷ initial
          rate (what the ending INR value gained or lost purely from the
          exchange rate moving).
        </p>
        <p className="mt-2">
          This is a standard point-to-point performance-attribution split.
          It does not model intermediate cash flows, so for an account with
          contributions or withdrawals between the two dates, treat the
          result as a rough approximation rather than an exact return.
        </p>
      </HowCalculated>

      <SourceCitation sources={CURRENCY_IMPACT_SOURCES} />
    </CalculatorShell>
  );
}
