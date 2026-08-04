"use client";

import { useState } from "react";
import {
  estimateNroInterestTds,
  STATUTORY_NRO_TDS_RATE_PERCENT,
} from "@/lib/calculators/nroInterestTds";
import {
  CalculatorShell,
  CheckboxField,
  NumberField,
  ResultRow,
} from "./CalculatorShell";
import { HowCalculated } from "./HowCalculated";
import { SourceCitation } from "./SourceCitation";

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
});

export default function NroInterestTdsCalculator() {
  const [annualNroInterest, setAnnualNroInterest] = useState(0);
  const [useLowerRate, setUseLowerRate] = useState(false);
  const [lowerRatePercent, setLowerRatePercent] = useState(
    STATUTORY_NRO_TDS_RATE_PERCENT
  );

  const result = estimateNroInterestTds({
    annualNroInterest,
    useLowerRate,
    lowerRatePercent,
  });

  return (
    <CalculatorShell
      title="TDS on NRO account interest"
      intro="Estimates the tax deducted at source on your NRO interest at the statutory flat rate plus cess. Does not include surcharge, which depends on your total income slab."
    >
      <NumberField
        label="NRO interest earned this financial year"
        value={annualNroInterest}
        onChange={setAnnualNroInterest}
        suffix="₹"
      />

      <CheckboxField
        label="I have a lower rate via a valid Tax Residency Certificate + Form 10F + no-PE declaration, or a certificate/order under section 195(2)/195(3)/197"
        checked={useLowerRate}
        onChange={setUseLowerRate}
        hint="Under the India-US DTAA, interest is commonly capped at 15% (10% for bank/financial-institution loans) — but only if you've actually obtained and furnished the supporting paperwork to your bank."
      />

      {useLowerRate && (
        <NumberField
          label="Your certified/treaty rate"
          value={lowerRatePercent}
          onChange={setLowerRatePercent}
          suffix="%"
        />
      )}

      <div className="flex flex-col gap-1 rounded-lg bg-stone-50 p-4 dark:bg-primary-900/20">
        <ResultRow
          label="Rate applied"
          value={`${result.effectiveRatePercent.toFixed(2)}%`}
          status={useLowerRate ? "favorable" : "neutral"}
        />
        <ResultRow
          label="TDS withheld"
          value={`₹${currencyFormatter.format(result.tdsAmount)}`}
        />
        <ResultRow
          label="Net interest credited"
          value={`₹${currencyFormatter.format(result.netInterest)}`}
          emphasis
        />
      </div>

      <p className="text-xs text-stone-500 dark:text-primary-300/60">
        Does not model surcharge (income-slab-dependent, with marginal
        relief) or refunds of excess TDS via ITR filing when your actual
        tax liability is lower than the amount withheld. If you enter a
        lower rate, it is only valid once your bank has the paperwork on
        file — this tool does not check that for you.
      </p>

      <HowCalculated>
        <p>
          TDS = interest × rate. Without a certified lower rate, the rate
          used is the statutory flat non-resident withholding rate of 30%
          on interest, plus a 4% health &amp; education cess on that
          amount ({STATUTORY_NRO_TDS_RATE_PERCENT.toFixed(1)}% effective) —
          historically Section 195 of the Income Tax Act, 1961.
        </p>
        <p className="mt-2">
          Not modeled: surcharge, ITR-filed refunds of excess TDS, and
          whether your paperwork for a lower rate is actually valid.
        </p>
      </HowCalculated>

      <SourceCitation
        sources={[
          {
            label: "Income Tax Dept.: TDS on payments to non-residents",
            href: "https://www.incometaxindia.gov.in/Pages/i-am/non-resident.aspx",
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
