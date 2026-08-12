"use client";

import { useState } from "react";
import { estimateForeignTaxCredit } from "@/lib/calculators/dtaaRelief";
import {
  CalculatorShell,
  NumberField,
  ResultRow,
} from "./CalculatorShell";
import { DownloadResultsButton } from "./DownloadResultsButton";
import { HowCalculated } from "./HowCalculated";
import { SourceCitation } from "./SourceCitation";
import { PDF_DISCLAIMER } from "./pdfDisclaimer";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
});

export default function DtaaReliefEstimator({
  defaultOpen,
}: {
  defaultOpen: boolean;
}) {
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
      defaultOpen={defaultOpen}
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

      <DownloadResultsButton
        fileNameBase="dtaa-relief-estimate-result"
        calculatorTitle="DTAA relief (foreign tax credit) estimator"
        inputs={[
          {
            label: "Foreign-source income",
            value: currencyFormatter.format(foreignSourceIncome),
          },
          {
            label: "Tax already paid on it abroad",
            value: currencyFormatter.format(foreignTaxPaid),
          },
          {
            label: "Domestic tax rate on this income",
            value: `${domesticTaxRatePercent}%`,
          },
        ]}
        results={[
          {
            label: "Domestic tax on this income (before credit)",
            value: currencyFormatter.format(result.domesticTaxOnIncome),
          },
          {
            label: "Creditable foreign tax",
            value: currencyFormatter.format(result.creditableForeignTax),
          },
          {
            label: "Foreign tax paid but not creditable",
            value: currencyFormatter.format(result.nonCreditableForeignTax),
          },
          {
            label: "Net additional domestic tax due",
            value: currencyFormatter.format(result.netAdditionalDomesticTax),
          },
        ]}
        disclaimer={PDF_DISCLAIMER}
        sources={[
          {
            label: "Income Tax Dept.: Double Taxation Relief",
            href: "https://www.incometaxindia.gov.in/w/double-taxation-relief",
          },
          {
            label: "IRS: Foreign Tax Credit",
            href: "https://www.irs.gov/individuals/international-taxpayers/foreign-tax-credit",
          },
        ]}
      />

      <p className="text-xs text-stone-500 dark:text-primary-300/60">
        Does not model income-basket/resourcing rules, India Rule 128
        procedural requirements (e.g. Form 67 filing deadlines), US Form
        1116 category limitations, PFIC treatment of Indian mutual funds,
        or carryover of unused credit. Verify against irs.gov,
        incometax.gov.in, and the treaty text before relying on this.
      </p>

      <HowCalculated>
        <p>
          Estimates relief under the ordinary foreign tax credit method used
          by Article 25 of the India-US DTAA: the credit for foreign tax
          paid is capped at whichever is lower — the foreign tax actually
          paid, or the domestic tax otherwise due on that same income. Net
          additional domestic tax = domestic tax on the income − creditable
          foreign tax (floored at zero).
        </p>
        <p className="mt-2">
          Not modeled: income-basket/resourcing rules, India&apos;s Rule 128
          procedural requirements (e.g. Form 67 filing deadline), US Form
          1116 category limitations, PFIC treatment of Indian mutual funds,
          or carryover of unused credit — see ADR 0002.
        </p>
      </HowCalculated>

      <SourceCitation
        sources={[
          {
            label: "Income Tax Dept.: Double Taxation Relief",
            href: "https://www.incometaxindia.gov.in/w/double-taxation-relief",
          },
          {
            label: "IRS: Foreign Tax Credit",
            href: "https://www.irs.gov/individuals/international-taxpayers/foreign-tax-credit",
          },
        ]}
      />
    </CalculatorShell>
  );
}
