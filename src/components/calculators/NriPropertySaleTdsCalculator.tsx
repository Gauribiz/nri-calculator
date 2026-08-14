"use client";

import { useState } from "react";
import { estimateNriPropertySaleTds } from "@/lib/calculators/nriPropertySaleTds";
import {
  CalculatorShell,
  CheckboxField,
  NumberField,
  ResultRow,
} from "./CalculatorShell";
import { DownloadResultsButton } from "./DownloadResultsButton";
import { HowCalculated } from "./HowCalculated";
import { SourceCitation } from "./SourceCitation";
import { PDF_DISCLAIMER } from "./pdfDisclaimer";

const inrFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0,
});

const NRI_PROPERTY_SALE_TDS_SOURCES = [
  {
    label: "Income Tax Dept.: Section 393 (TDS to non-residents)",
    href: "https://www.incometaxindia.gov.in/w/section-393-5",
  },
];

export default function NriPropertySaleTdsCalculator({
  defaultOpen = false,
}: {
  defaultOpen?: boolean;
} = {}) {
  const [saleConsiderationInr, setSaleConsiderationInr] = useState(0);
  const [isLongTerm, setIsLongTerm] = useState(true);
  const [hasLowerDeductionCertificate, setHasLowerDeductionCertificate] =
    useState(false);
  const [certifiedRatePercent, setCertifiedRatePercent] = useState(0);

  const result = estimateNriPropertySaleTds({
    saleConsiderationInr,
    isLongTerm,
    hasLowerDeductionCertificate,
    certifiedRatePercent,
  });

  return (
    <CalculatorShell
      defaultOpen={defaultOpen}
      title="Section 393(2) TDS-on-NRI-property-sale estimator"
      intro="Estimates the TDS a buyer must withhold under Section 393(2) when buying property from an NRI seller — applied to the full sale consideration, not just the gain, unless a lower-deduction certificate is held."
    >
      <NumberField
        label="Sale consideration (full sale price)"
        value={saleConsiderationInr}
        onChange={setSaleConsiderationInr}
        suffix="₹"
        hint="TDS under Section 393(2) applies to the entire sale price, unlike a normal capital-gains tax which applies only to the gain."
      />

      <fieldset className="flex flex-col gap-2 text-sm">
        <legend className="mb-1 text-stone-700 dark:text-primary-100">
          Holding period
        </legend>
        <label className="flex items-center gap-2 text-stone-700 dark:text-primary-100">
          <input
            type="radio"
            name="nri-tds-holding-period"
            checked={isLongTerm}
            onChange={() => setIsLongTerm(true)}
            className="accent-gold-500"
          />
          Long-term (held more than 24 months)
        </label>
        <label className="flex items-center gap-2 text-stone-700 dark:text-primary-100">
          <input
            type="radio"
            name="nri-tds-holding-period"
            checked={!isLongTerm}
            onChange={() => setIsLongTerm(false)}
            className="accent-gold-500"
          />
          Short-term (held 24 months or less)
        </label>
      </fieldset>

      <CheckboxField
        label="I have a Form 13 lower/nil-deduction certificate"
        checked={hasLowerDeductionCertificate}
        onChange={setHasLowerDeductionCertificate}
        hint="See the Form 13 tool below if you don't have one yet."
      />

      {hasLowerDeductionCertificate && (
        <NumberField
          label="Certified rate on your certificate"
          value={certifiedRatePercent}
          onChange={setCertifiedRatePercent}
          suffix="%"
        />
      )}

      <div className="flex flex-col gap-1 rounded-lg bg-stone-50 p-4 dark:bg-primary-900/20">
        <ResultRow
          label={
            result.usedCertifiedRate
              ? "Certified TDS rate"
              : "Default TDS rate (base + 4% cess, no certificate)"
          }
          value={`${result.effectiveRatePercent.toFixed(2)}%`}
        />
        <ResultRow
          label="Estimated TDS to be withheld"
          value={`₹${inrFormatter.format(result.estimatedTdsInr)}`}
          emphasis
        />
      </div>

      <DownloadResultsButton
        fileNameBase="nri-property-sale-tds-result"
        calculatorTitle="Section 393(2) TDS-on-NRI-property-sale estimator"
        inputs={[
          {
            label: "Sale consideration",
            value: `₹${inrFormatter.format(saleConsiderationInr)}`,
          },
          {
            label: "Holding period",
            value: isLongTerm
              ? "Long-term (more than 24 months)"
              : "Short-term (24 months or less)",
          },
          {
            label: "Form 13 lower/nil-deduction certificate",
            value: hasLowerDeductionCertificate
              ? `Yes — ${certifiedRatePercent}%`
              : "No",
          },
        ]}
        results={[
          {
            label: result.usedCertifiedRate
              ? "Certified TDS rate"
              : "Default TDS rate (base + 4% cess, no certificate)",
            value: `${result.effectiveRatePercent.toFixed(2)}%`,
          },
          {
            label: "Estimated TDS to be withheld",
            value: `₹${inrFormatter.format(result.estimatedTdsInr)}`,
          },
        ]}
        disclaimer={PDF_DISCLAIMER}
        sources={NRI_PROPERTY_SALE_TDS_SOURCES}
      />

      <p className="text-xs text-stone-500 dark:text-primary-300/60">
        Does not model surcharge (10%-15% for capital-gains-type income,
        depending on your total income — a buyer generally cannot know
        this), so an actual TDS certificate or return will typically show a
        somewhat higher effective rate than shown here. Also does not model
        the buyer&apos;s TAN requirement or Form 27Q filing. Verify against
        incometax.gov.in before relying on this for a specific transaction.
      </p>

      <HowCalculated>
        <p>
          Section 393(2) requires the buyer to withhold TDS at the rate the
          gain is actually taxable at, on the full sale consideration —
          unlike the flat 1% under Section 194-IA for resident sellers.
          Absent a lower-deduction certificate, this tool uses 12.5% for
          long-term gains (the flat LTCG rate on real estate since the
          Finance (No. 2) Act, 2024) and 20% for short-term gains — the
          statutory rate under Section 393(2) [Table S. No. 17(e)], tied to
          Section 196&apos;s short-term classification, plus a flat 4% cess on whichever
          base rate applies.
        </p>
        <p className="mt-2">
          Not modeled: surcharge, the buyer&apos;s TAN requirement, and Form
          27Q filing mechanics.
        </p>
      </HowCalculated>

      <SourceCitation sources={NRI_PROPERTY_SALE_TDS_SOURCES} />
    </CalculatorShell>
  );
}
