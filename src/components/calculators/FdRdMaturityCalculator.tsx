"use client";

import { useState } from "react";
import {
  estimateFdRdMaturity,
  type DepositType,
} from "@/lib/calculators/fdRdMaturity";
import { CalculatorShell, NumberField, ResultRow } from "./CalculatorShell";
import { DownloadResultsButton } from "./DownloadResultsButton";
import { HowCalculated } from "./HowCalculated";
import { SourceCitation } from "./SourceCitation";
import { PDF_DISCLAIMER } from "./pdfDisclaimer";

const FD_RD_MATURITY_SOURCES = [
  {
    label: "RBI: Master Direction — Interest Rate on Deposits",
    href: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=11566",
  },
];

const inrFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0,
});

const percentFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 1,
});

export default function FdRdMaturityCalculator({
  defaultOpen,
  id,
}: {
  defaultOpen: boolean;
  id?: string;
}) {
  const [depositType, setDepositType] = useState<DepositType>("fd");
  const [amount, setAmount] = useState(0);
  const [annualRatePercent, setAnnualRatePercent] = useState(0);
  const [tenureMonths, setTenureMonths] = useState(0);

  const result = estimateFdRdMaturity({
    depositType,
    amount,
    annualRatePercent,
    tenureMonths,
  });

  return (
    <CalculatorShell
      id={id}
      defaultOpen={defaultOpen}
      title="FD / RD maturity calculator"
      intro="Estimates the maturity value of a fixed deposit (lump sum) or recurring deposit (equal monthly deposits) with an Indian bank, using the standard quarterly-compounding conventions most banks apply."
    >
      <fieldset className="flex flex-col gap-2 text-sm">
        <legend className="mb-1 text-stone-700 dark:text-primary-100">
          Deposit type
        </legend>
        <label className="flex items-center gap-2 text-stone-700 dark:text-primary-100">
          <input
            type="radio"
            name="deposit-type"
            checked={depositType === "fd"}
            onChange={() => setDepositType("fd")}
            className="accent-gold-500"
          />
          Fixed deposit (one-time lump sum)
        </label>
        <label className="flex items-center gap-2 text-stone-700 dark:text-primary-100">
          <input
            type="radio"
            name="deposit-type"
            checked={depositType === "rd"}
            onChange={() => setDepositType("rd")}
            className="accent-gold-500"
          />
          Recurring deposit (equal monthly deposits)
        </label>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-3">
        <NumberField
          label={depositType === "fd" ? "Principal amount" : "Monthly deposit"}
          value={amount}
          onChange={setAmount}
          suffix="INR"
        />
        <NumberField
          label="Annual interest rate"
          value={annualRatePercent}
          onChange={setAnnualRatePercent}
          suffix="%"
        />
        <NumberField
          label="Tenure"
          value={tenureMonths}
          onChange={setTenureMonths}
          suffix="months"
        />
      </div>

      <div className="flex flex-col gap-1 rounded-lg bg-stone-50 p-4 dark:bg-primary-900/20">
        <ResultRow
          label={depositType === "fd" ? "Principal" : "Total deposited"}
          value={`₹${inrFormatter.format(result.totalDeposited)}`}
        />
        <ResultRow
          label="Maturity value"
          value={`₹${inrFormatter.format(result.maturityValue)}`}
          emphasis
        />
        <ResultRow
          label="Interest earned"
          value={`₹${inrFormatter.format(result.interestEarned)} (${percentFormatter.format(result.interestEarnedPercent)}%)`}
          status="favorable"
        />
      </div>

      <DownloadResultsButton
        fileNameBase="fd-rd-maturity-result"
        calculatorTitle="FD / RD maturity calculator"
        inputs={[
          {
            label: "Deposit type",
            value: depositType === "fd" ? "Fixed deposit" : "Recurring deposit",
          },
          {
            label: depositType === "fd" ? "Principal amount" : "Monthly deposit",
            value: `₹${amount}`,
          },
          { label: "Annual interest rate", value: `${annualRatePercent}%` },
          { label: "Tenure", value: `${tenureMonths} months` },
        ]}
        results={[
          {
            label: depositType === "fd" ? "Principal" : "Total deposited",
            value: `₹${inrFormatter.format(result.totalDeposited)}`,
          },
          {
            label: "Maturity value",
            value: `₹${inrFormatter.format(result.maturityValue)}`,
          },
          {
            label: "Interest earned",
            value: `₹${inrFormatter.format(result.interestEarned)} (${percentFormatter.format(result.interestEarnedPercent)}%)`,
          },
        ]}
        disclaimer={PDF_DISCLAIMER}
        sources={FD_RD_MATURITY_SOURCES}
      />

      <p className="text-xs text-stone-500 dark:text-primary-300/60">
        Pre-tax estimate at a fixed rate for the full tenure. Does not model
        TDS on FD/RD interest (NRO deposit interest is subject to TDS; NRE
        deposit interest is tax-free in India but may be taxable in your
        country of residence), premature withdrawal penalties, or
        bank-specific rounding. Verify the exact maturity value with your
        bank.
      </p>

      <HowCalculated>
        <p>
          <strong>Fixed deposit:</strong> maturity = principal × (1 +
          rate/4/100)<sup>4 × years</sup>, i.e. standard compound interest
          compounded quarterly.
        </p>
        <p className="mt-2">
          <strong>Recurring deposit:</strong> maturity = monthly deposit ×
          [(1 + i)<sup>n</sup> − 1] ÷ [1 − (1 + i)<sup>−1/3</sup>], where i =
          annual rate ÷ 400 (the quarterly rate) and n = tenure in months ÷
          3 (the number of quarters). This is the standard banker&apos;s
          formula that credits each monthly installment interest for the
          fraction of each quarter it was actually on deposit.
        </p>
      </HowCalculated>

      <SourceCitation sources={FD_RD_MATURITY_SOURCES} />
    </CalculatorShell>
  );
}
