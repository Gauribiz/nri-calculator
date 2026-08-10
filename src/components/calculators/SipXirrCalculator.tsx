"use client";

import { useState } from "react";
import { estimateSipXirr } from "@/lib/calculators/sipXirr";
import {
  CalculatorShell,
  DateField,
  NumberField,
  ResultRow,
} from "./CalculatorShell";
import { HowCalculated } from "./HowCalculated";
import { SourceCitation } from "./SourceCitation";

const inrFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0,
});

const percentFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 1,
  signDisplay: "exceptZero",
});

export default function SipXirrCalculator() {
  const [monthlySipAmount, setMonthlySipAmount] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [currentValueInr, setCurrentValueInr] = useState(0);

  const result = estimateSipXirr({
    monthlySipAmount,
    startDate,
    currentValueInr,
  });

  const hasResult = result.numberOfInstallments > 0;

  return (
    <CalculatorShell
      title="SIP / mutual fund XIRR calculator"
      intro="Estimates the annualised return (XIRR) on a regular monthly SIP, given the monthly amount, the start date, and the current value of the holding. Assumes a fixed monthly amount with no top-ups, withdrawals, or step-ups."
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <NumberField
          label="Monthly SIP amount"
          value={monthlySipAmount}
          onChange={setMonthlySipAmount}
          suffix="INR"
        />
        <DateField
          label="SIP start date"
          value={startDate}
          onChange={setStartDate}
          hint="The date of the first installment."
        />
        <NumberField
          label="Current portfolio value"
          value={currentValueInr}
          onChange={setCurrentValueInr}
          suffix="INR"
        />
      </div>

      <div className="flex flex-col gap-1 rounded-lg bg-stone-50 p-4 dark:bg-primary-900/20">
        {hasResult ? (
          <>
            <ResultRow
              label="Installments so far"
              value={String(result.numberOfInstallments)}
            />
            <ResultRow
              label="Total invested"
              value={`₹${inrFormatter.format(result.totalInvested)}`}
            />
            <ResultRow
              label="Current value"
              value={`₹${inrFormatter.format(result.currentValue)}`}
            />
            <ResultRow
              label="Absolute gain"
              value={`₹${inrFormatter.format(result.absoluteGain)} (${percentFormatter.format(result.absoluteGainPercent)}%)`}
            />
            <ResultRow
              label="Annualised return (XIRR)"
              value={
                result.xirrPercent === null
                  ? "Could not be estimated"
                  : `${percentFormatter.format(result.xirrPercent)}%`
              }
              status={
                result.xirrPercent === null
                  ? "neutral"
                  : result.xirrPercent >= 0
                    ? "favorable"
                    : "warning"
              }
              emphasis
            />
          </>
        ) : (
          <ResultRow
            label="Annualised return (XIRR)"
            value="Enter a start date and amounts above"
            status="neutral"
          />
        )}
      </div>

      <HowCalculated>
        <p>
          Builds one cash outflow of the monthly SIP amount on each
          installment date from the start date to today, plus a single
          terminal cash inflow equal to the current portfolio value today.
          XIRR is the annualised rate that makes the net present value of
          all these cash flows zero, using Actual/365 day-counting — the
          same definition Excel&apos;s XIRR function uses — solved
          numerically with Newton-Raphson iteration.
        </p>
        <p className="mt-2">
          Not modeled: step-up SIPs, mid-series top-ups or partial
          withdrawals, expense ratios, exit loads, or tax on redemption
          (equity and debt mutual funds are taxed differently, and NRIs face
          TDS on redemption — see the Investments &amp; Repatriation
          category). Treat this as an estimate of the pre-tax, pre-load
          return on the contributions as entered.
        </p>
      </HowCalculated>

      <SourceCitation
        sources={[
          {
            label: "AMFI: Mutual Fund SIP basics",
            href: "https://www.amfiindia.com/investor-corner/knowledge-center/what-is-systematic-investment-plan.html",
          },
        ]}
      />
    </CalculatorShell>
  );
}
