"use client";

import { useState } from "react";
import { calculateSubstantialPresence } from "@/lib/calculators/substantialPresenceTest";
import {
  CalculatorShell,
  NumberField,
  ResultRow,
} from "./CalculatorShell";

export default function SubstantialPresenceCalculator() {
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

      <div className="flex flex-col gap-1 rounded-md bg-zinc-50 p-4 dark:bg-zinc-900">
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
              ? "Meets the test — likely a US resident alien for tax purposes"
              : "Does not meet the test"
          }
          emphasis
        />
      </div>

      <p className="text-xs text-zinc-500 dark:text-zinc-500">
        This is one of two independent US residency tests (the other is the
        Green Card test, not covered here) and figures shown are for
        reference only — verify against irs.gov before relying on the
        result.
      </p>
    </CalculatorShell>
  );
}
