"use client";

import { useState } from "react";
import {
  LONG_TERM_HOLDING_THRESHOLD_MONTHS,
  LTCG_TAX_RATE_PERCENT,
  calculateRealEstateCapitalGains,
} from "@/lib/calculators/realEstateCapitalGains";
import { CalculatorShell, NumberField, ResultRow } from "./CalculatorShell";
import { HowCalculated } from "./HowCalculated";
import { SourceCitation } from "./SourceCitation";

const inrFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0,
});

export default function RealEstateCapitalGainsCalculator() {
  const [holdingPeriodMonths, setHoldingPeriodMonths] = useState(0);
  const [saleConsiderationInr, setSaleConsiderationInr] = useState(0);
  const [costOfAcquisitionInr, setCostOfAcquisitionInr] = useState(0);
  const [costOfImprovementInr, setCostOfImprovementInr] = useState(0);
  const [transferExpensesInr, setTransferExpensesInr] = useState(0);

  const result = calculateRealEstateCapitalGains({
    holdingPeriodMonths,
    saleConsiderationInr,
    costOfAcquisitionInr,
    costOfImprovementInr,
    transferExpensesInr,
  });

  return (
    <CalculatorShell
      title="LTCG / STCG classifier for a property sale"
      intro="Classifies a sale of Indian land/a building as long-term or short-term based on holding period, and estimates the capital gain. Property held more than 24 months is long-term (LTCG); 24 months or less is short-term (STCG)."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <NumberField
          label="How long did you hold the property?"
          value={holdingPeriodMonths}
          onChange={setHoldingPeriodMonths}
          suffix="months"
          hint={`More than ${LONG_TERM_HOLDING_THRESHOLD_MONTHS} months is long-term (LTCG); ${LONG_TERM_HOLDING_THRESHOLD_MONTHS} months or less is short-term (STCG).`}
        />
        <NumberField
          label="Sale consideration (full sale price)"
          value={saleConsiderationInr}
          onChange={setSaleConsiderationInr}
          suffix="₹"
        />
        <NumberField
          label="Cost of acquisition"
          value={costOfAcquisitionInr}
          onChange={setCostOfAcquisitionInr}
          suffix="₹"
          hint="What you originally paid for the property, including stamp duty and registration."
        />
        <NumberField
          label="Cost of improvement"
          value={costOfImprovementInr}
          onChange={setCostOfImprovementInr}
          suffix="₹"
          hint="Capital expenditure on the property since acquisition, e.g. structural additions — not routine repairs."
        />
        <NumberField
          label="Transfer expenses"
          value={transferExpensesInr}
          onChange={setTransferExpensesInr}
          suffix="₹"
          hint="Brokerage, legal fees, and similar costs directly tied to this sale."
        />
      </div>

      <div className="flex flex-col gap-1 rounded-lg bg-stone-50 p-4 dark:bg-primary-900/20">
        <ResultRow
          label="Classification"
          value={result.isLongTerm ? "Long-term (LTCG)" : "Short-term (STCG)"}
          status={result.isLongTerm ? "favorable" : "neutral"}
        />
        <ResultRow
          label="Capital gain (unindexed)"
          value={`₹${inrFormatter.format(result.capitalGainInr)}`}
          emphasis
        />
        {result.isLongTerm ? (
          <ResultRow
            label={`Estimated LTCG tax at ${LTCG_TAX_RATE_PERCENT}% (before surcharge & cess)`}
            value={`₹${inrFormatter.format(result.estimatedLtcgTaxInr ?? 0)}`}
          />
        ) : (
          <ResultRow
            label="STCG tax"
            value="Taxed at your income-tax slab rate — not a flat rate"
            status="warning"
          />
        )}
      </div>

      <p className="text-xs text-stone-500 dark:text-primary-300/60">
        Does not model indexation (moot for NRIs — the Finance Act 2024
        grandfathering option to use 20% with indexation applies only to
        resident individuals/HUFs, not NRIs), Section 50C/43CA stamp-duty-value
        substitution, Section 54/54EC/54F reinvestment exemptions, surcharge
        or cess on the LTCG figure above, or foreign-currency conversion
        rules. Verify against incometax.gov.in and with a chartered
        accountant before relying on this for a specific sale.
      </p>

      <HowCalculated>
        <p>
          Property held for more than 24 months is long-term; 24 months or
          less is short-term. Capital gain = sale consideration − cost of
          acquisition − cost of improvement − transfer expenses (no
          indexation). Since the Finance (No. 2) Act, 2024, long-term gains
          on land/buildings are taxed at a flat 12.5% without indexation —
          this applies to NRIs unconditionally, since the Act&apos;s
          grandfathering option (20% with indexation, for property acquired
          before 23 July 2024) is available only to resident individuals and
          resident HUFs. Short-term gains have no special rate and are taxed
          at the seller&apos;s ordinary slab rate, which this tool cannot
          compute.
        </p>
        <p className="mt-2">
          Not modeled: indexation, Section 50C/43CA stamp-duty-value
          substitution, Section 54/54EC/54F exemptions, surcharge, cess, and
          foreign-currency conversion rules — see the ADR for this tool.
        </p>
      </HowCalculated>

      <SourceCitation
        sources={[
          {
            label: "Income Tax Dept.: Capital Gains",
            href: "https://www.incometaxindia.gov.in/w/capital-gains",
          },
        ]}
      />
    </CalculatorShell>
  );
}
