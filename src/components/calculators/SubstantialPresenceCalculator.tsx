"use client";

import { useState } from "react";
import { calculateSubstantialPresence } from "@/lib/calculators/substantialPresenceTest";
import {
  CalculatorShell,
  NumberField,
  ResultRow,
} from "./CalculatorShell";
import { DownloadResultsButton } from "./DownloadResultsButton";
import { HowCalculated } from "./HowCalculated";
import { SourceCitation } from "./SourceCitation";
import { PDF_DISCLAIMER } from "./pdfDisclaimer";

export default function SubstantialPresenceCalculator({
  defaultOpen = false,
}: {
  defaultOpen?: boolean;
} = {}) {
  const [currentYearDays, setCurrentYearDays] = useState(0);
  const [priorYearDays, setPriorYearDays] = useState(0);
  const [yearBeforePriorDays, setYearBeforePriorDays] = useState(0);

  const result = calculateSubstantialPresence({
    currentYearDays,
    priorYearDays,
    yearBeforePriorDays,
  });

  return (
    <CalculatorShell
      defaultOpen={defaultOpen}
      title="US Substantial Presence Test day-counter"
      intro="Enter the number of days you were physically present in the US in each of the last three years. This does not exclude exempt-individual days (e.g. certain F/J/M/Q visa statuses) or apply the closer-connection exception — both can change the real answer."
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <NumberField
          label="Current year"
          value={currentYearDays}
          onChange={setCurrentYearDays}
          suffix="days"
        />
        <NumberField
          label="1 year ago"
          value={priorYearDays}
          onChange={setPriorYearDays}
          suffix="days"
        />
        <NumberField
          label="2 years ago"
          value={yearBeforePriorDays}
          onChange={setYearBeforePriorDays}
          suffix="days"
        />
      </div>

      <div className="flex flex-col gap-1 rounded-lg bg-stone-50 p-4 dark:bg-primary-900/20">
        <ResultRow
          label="Weighted total (current + 1/3 + 1/6)"
          value={`${result.weightedTotal.toFixed(1)} days`}
        />
        <ResultRow
          label="Current-year minimum (31 days) met"
          value={result.meetsCurrentYearMinimum ? "Yes" : "No"}
        />
        <ResultRow
          label="Substantial Presence Test result"
          value={
            result.meetsSubstantialPresenceTest
              ? "Meets the test"
              : "Does not meet the test"
          }
          status={result.meetsSubstantialPresenceTest ? "favorable" : "neutral"}
        />
        {result.meetsSubstantialPresenceTest && (
          <p className="mt-1 text-xs text-stone-500 dark:text-primary-300/60">
            Likely a US resident alien for tax purposes.
          </p>
        )}
      </div>

      <DownloadResultsButton
        fileNameBase="substantial-presence-test-result"
        calculatorTitle="US Substantial Presence Test day-counter"
        inputs={[
          { label: "Current year", value: `${currentYearDays} days` },
          { label: "1 year ago", value: `${priorYearDays} days` },
          { label: "2 years ago", value: `${yearBeforePriorDays} days` },
        ]}
        results={[
          {
            label: "Weighted total (current + 1/3 + 1/6)",
            value: `${result.weightedTotal.toFixed(1)} days`,
          },
          {
            label: "Current-year minimum (31 days) met",
            value: result.meetsCurrentYearMinimum ? "Yes" : "No",
          },
          {
            label: "Substantial Presence Test result",
            value: result.meetsSubstantialPresenceTest
              ? "Meets the test"
              : "Does not meet the test",
          },
        ]}
        disclaimer={PDF_DISCLAIMER}
        sources={[
          {
            label: "IRS: Substantial Presence Test",
            href: "https://www.irs.gov/individuals/international-taxpayers/substantial-presence-test",
          },
        ]}
      />

      <p className="text-xs text-stone-500 dark:text-primary-300/60">
        This is one of two independent US residency tests (the other is the
        Green Card test, not covered here) and figures shown are for
        reference only — verify against irs.gov before relying on the
        result.
      </p>

      <HowCalculated>
        <p>
          Weighted total = current-year days + (days one year ago × ⅓) +
          (days two years ago × ⅙). You meet the Substantial Presence Test
          if that weighted total is at least 183 and you were present at
          least 31 days in the current year (IRC §7701(b)(3)).
        </p>
        <p className="mt-2">
          Not modeled: &quot;exempt individual&quot; days (certain F/J/M/Q
          visa statuses don&apos;t count toward the test) and the
          closer-connection-to-a-foreign-country exception, either of which
          can change the real outcome — see ADR 0002.
        </p>
      </HowCalculated>

      <SourceCitation
        sources={[
          {
            label: "IRS: Substantial Presence Test",
            href: "https://www.irs.gov/individuals/international-taxpayers/substantial-presence-test",
          },
        ]}
      />
    </CalculatorShell>
  );
}
