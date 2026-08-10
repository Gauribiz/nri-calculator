"use client";

import { useState } from "react";
import { estimateLoanPrepaymentImpact } from "@/lib/calculators/loanPrepayment";
import { CalculatorShell, NumberField, ResultRow } from "./CalculatorShell";
import { HowCalculated } from "./HowCalculated";
import { SourceCitation } from "./SourceCitation";

const inrFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0,
});

function formatMonths(months: number): string {
  const years = Math.floor(months / 12);
  const remMonths = Math.round(months % 12);
  if (years === 0) return `${remMonths} mo`;
  if (remMonths === 0) return `${years} yr`;
  return `${years} yr ${remMonths} mo`;
}

export default function LoanPrepaymentCalculator() {
  const [outstandingPrincipal, setOutstandingPrincipal] = useState(0);
  const [annualRatePercent, setAnnualRatePercent] = useState(0);
  const [monthlyEmi, setMonthlyEmi] = useState(0);
  const [prepaymentAmount, setPrepaymentAmount] = useState(0);

  const result = estimateLoanPrepaymentImpact({
    outstandingPrincipal,
    annualRatePercent,
    monthlyEmi,
    prepaymentAmount,
  });

  return (
    <CalculatorShell
      title="Loan prepayment impact calculator"
      intro="Estimates how a one-time lump-sum prepayment shortens the remaining tenure and reduces total interest on an amortizing loan, keeping the EMI the same — the default prepayment treatment most Indian banks apply."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <NumberField
          label="Current outstanding principal"
          value={outstandingPrincipal}
          onChange={setOutstandingPrincipal}
          suffix="INR"
        />
        <NumberField
          label="Annual interest rate"
          value={annualRatePercent}
          onChange={setAnnualRatePercent}
          suffix="%"
        />
        <NumberField
          label="Current monthly EMI"
          value={monthlyEmi}
          onChange={setMonthlyEmi}
          suffix="INR"
        />
        <NumberField
          label="One-time prepayment amount"
          value={prepaymentAmount}
          onChange={setPrepaymentAmount}
          suffix="INR"
        />
      </div>

      <div className="flex flex-col gap-1 rounded-lg bg-stone-50 p-4 dark:bg-primary-900/20">
        {result.emiTooLowToAmortize ? (
          <ResultRow
            label="EMI too low to pay off this loan"
            value="Increase the EMI or check the inputs"
            status="warning"
          />
        ) : (
          <>
            <ResultRow
              label="Months remaining (no prepayment)"
              value={
                result.monthsRemainingWithoutPrepayment !== null
                  ? formatMonths(result.monthsRemainingWithoutPrepayment)
                  : "—"
              }
            />
            <ResultRow
              label="Total interest remaining (no prepayment)"
              value={
                result.totalInterestWithoutPrepayment !== null
                  ? `₹${inrFormatter.format(result.totalInterestWithoutPrepayment)}`
                  : "—"
              }
            />
            {result.loanFullyPaidByPrepayment ? (
              <ResultRow
                label="After prepayment"
                value="Loan fully paid off"
                status="favorable"
                emphasis
              />
            ) : (
              <>
                <ResultRow
                  label="Months remaining (after prepayment)"
                  value={
                    result.monthsRemainingWithPrepayment !== null
                      ? formatMonths(result.monthsRemainingWithPrepayment)
                      : "—"
                  }
                />
                <ResultRow
                  label="Total interest remaining (after prepayment)"
                  value={
                    result.totalInterestWithPrepayment !== null
                      ? `₹${inrFormatter.format(result.totalInterestWithPrepayment)}`
                      : "—"
                  }
                />
              </>
            )}
            <ResultRow
              label="Tenure shortened by"
              value={result.monthsSaved !== null ? formatMonths(Math.max(0, result.monthsSaved)) : "—"}
              status="favorable"
              emphasis
            />
            <ResultRow
              label="Interest saved"
              value={
                result.interestSaved !== null
                  ? `₹${inrFormatter.format(result.interestSaved)}`
                  : "—"
              }
              status="favorable"
              emphasis
            />
          </>
        )}
      </div>

      <p className="text-xs text-stone-500 dark:text-primary-300/60">
        Assumes the interest rate stays constant over the remaining tenure
        and that the bank applies the prepayment to reduce tenure (not EMI).
        Does not model prepayment/foreclosure charges, processing fees, or a
        rate change. Confirm your loan&apos;s actual prepayment terms with
        your bank.
      </p>

      <HowCalculated>
        <p>
          Solves the standard EMI identity EMI = P × r × (1+r)<sup>n</sup> ÷
          [(1+r)<sup>n</sup> − 1] for the number of remaining months n,
          where r is the monthly interest rate, once for the current
          outstanding principal and once for the principal after the
          prepayment is subtracted — both at the same EMI. Interest saved is
          the difference between the total interest that would have been
          paid over each of those two remaining schedules.
        </p>
      </HowCalculated>

      <SourceCitation
        sources={[
          {
            label:
              "RBI: Guidelines on charging of foreclosure/prepayment charges on floating rate loans",
            href: "https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=8104",
          },
        ]}
      />
    </CalculatorShell>
  );
}
