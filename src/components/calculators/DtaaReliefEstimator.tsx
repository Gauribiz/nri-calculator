"use client";

import { useState } from "react";
import { estimateForeignTaxCredit } from "@/lib/calculators/dtaaRelief";
import {
  CalculatorShell,
  NumberField,
  ResultRow,
} from "./CalculatorShell";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
});

export default function DtaaReliefEstimator() {
  const [foreignSourceIncome, setForeignSourceIncome] = useState(0);
  const [foreignTaxPaid, setForeignTaxPaid] = useState(0);
  const [domesticTaxRatePercent, setDomesticTaxRatePercent] = useState(0);

  const result = estimateForeignTaxCredit({
    foreignSourceIncome,
    foreignTaxPaid,
    domesticTaxRatePercent,
  });

  return (
    <CalculatorShell
      title="DTAA relief (foreign tax credit) estimator"
      intro="Estimates relief under the ordinary credit method used by Article 25 of the India-US DTAA: foreign tax on an item of income offsets domestic tax on that same income, capped at the domestic tax otherwise due. Enter your own applicable domestic rate — this tool does not assert tax rates."
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <NumberField
          label="Foreign-source income"
          value={foreignSourceIncome}
          onChange={setForeignSourceIncome}
        />
        <NumberField
          label="Tax already paid on it abroad"
          value={foreignTaxPaid}
          onChange={setForeignTaxPaid}
        />
        <NumberField
          label="Your domestic tax rate on this income"
          value={domesticTaxRatePercent}
          onChange={setDomesticTaxRatePercent}
          suffix="%"
        />
      </div>

      <div className="flex flex-col gap-1 rounded-lg bg-stone-50 p-4 dark:bg-primary-900/20">
        <ResultRow
          label="Domestic tax on this income (before credit)"
          value={currencyFormatter.format(result.domesticTaxOnIncome)}
        />
        <ResultRow
          label="Creditable foreign tax"
          value={currencyFormatter.format(result.creditableForeignTax)}
        />
        <ResultRow
          label="Foreign tax paid but not creditable"
          value={currencyFormatter.format(result.nonCreditableForeignTax)}
        />
        <ResultRow
          label="Net additional domestic tax due"
          value={currencyFormatter.format(result.netAdditionalDomesticTax)}
          emphasis
        />
      </div>

      <p className="text-xs text-stone-500 dark:text-primary-300/60">
        Does not model income-basket/resourcing rules, India Rule 128
        procedural requirements (e.g. Form 67 filing deadlines), US Form
        1116 category limitations, PFIC treatment of Indian mutual funds,
        or carryover of unused credit. Verify against irs.gov,
        incometax.gov.in, and the treaty text before relying on this.
      </p>
    </CalculatorShell>
  );
}
