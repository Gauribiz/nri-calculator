"use client";

import { useState } from "react";
import { calculateNroInterestTds } from "@/lib/calculators/nroInterestTds";
import {
  CalculatorShell,
  CheckboxField,
  NumberField,
  ResultRow,
} from "./CalculatorShell";
import { DownloadPdfButton } from "./DownloadPdfButton";
import { HowCalculated } from "./HowCalculated";
import { SourceCitation } from "./SourceCitation";
import { PDF_DISCLAIMER } from "./pdfDisclaimer";

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
});

export default function NroInterestTdsCalculator() {
  const [grossInterestInr, setGrossInterestInr] = useState(0);
  const [hasPan, setHasPan] = useState(true);
  const [claimingDtaaBenefit, setClaimingDtaaBenefit] = useState(false);

  const result = calculateNroInterestTds({
    grossInterestInr,
    hasPan,
    claimingDtaaBenefit,
  });

  return (
    <CalculatorShell
      title="TDS on NRO interest calculator"
      intro="Estimates TDS withheld on NRO account interest under section 195 — 30% plus 4% cess by default, or 15% plus cess if you're claiming the India-US DTAA Article 11 rate with a valid TRC and Form 10F on file. Does not model surcharge."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <NumberField
          label="Gross NRO interest for the year"
          value={grossInterestInr}
          onChange={setGrossInterestInr}
          suffix="₹"
        />
      </div>

      <div className="flex flex-col gap-2">
        <CheckboxField
          label="I have a PAN on file with the bank"
          checked={hasPan}
          onChange={setHasPan}
          hint="Without PAN, section 206AA can require a higher withholding rate — this calculator applies the standard domestic rate in that case rather than assuming a treaty rate still applies."
        />
        <CheckboxField
          label="I'm claiming the India-US DTAA benefit (valid Tax Residency Certificate and Form 10F filed for the year, no PAN issue)"
          checked={claimingDtaaBenefit}
          onChange={setClaimingDtaaBenefit}
          hint="Article 11's general interest rate is 15% — a lower 10% can apply to certain approved financial institutions, not modeled here."
        />
      </div>

      {!hasPan && claimingDtaaBenefit && (
        <div className="rounded-lg border border-gold-400 bg-gold-50 p-3 text-sm text-gold-900 dark:border-gold-700 dark:bg-gold-900/30 dark:text-gold-200">
          Without PAN, whether the DTAA rate still applies is disputed —
          case law has gone both ways and deductor practice varies. This
          calculator applies the standard domestic rate below rather than
          the DTAA rate. Verify with a chartered accountant.
        </div>
      )}

      <div className="flex flex-col gap-1 rounded-lg bg-stone-50 p-4 dark:bg-primary-900/20">
        <ResultRow
          label="Applied rate (before cess)"
          value={`${result.appliedRatePercent}%`}
        />
        <ResultRow
          label="Effective rate (with 4% cess)"
          value={`${result.effectiveRatePercent.toFixed(2)}%`}
        />
        <ResultRow
          label="TDS amount"
          value={`₹${currencyFormatter.format(result.tdsAmountInr)}`}
        />
        <ResultRow
          label="Net interest after TDS"
          value={`₹${currencyFormatter.format(result.netInterestInr)}`}
          emphasis
        />
        <ResultRow
          label="DTAA rate applied"
          value={result.dtaaBenefitApplied ? "Yes" : "No"}
          status={result.dtaaBenefitApplied ? "favorable" : "neutral"}
        />
      </div>

      <DownloadPdfButton
        fileName="nro-interest-tds-result.pdf"
        calculatorTitle="TDS on NRO interest calculator"
        inputs={[
          {
            label: "Gross NRO interest for the year",
            value: `₹${currencyFormatter.format(grossInterestInr)}`,
          },
          { label: "PAN on file", value: hasPan ? "Yes" : "No" },
          {
            label: "Claiming DTAA benefit",
            value: claimingDtaaBenefit ? "Yes" : "No",
          },
        ]}
        results={[
          {
            label: "Applied rate (before cess)",
            value: `${result.appliedRatePercent}%`,
          },
          {
            label: "Effective rate (with 4% cess)",
            value: `${result.effectiveRatePercent.toFixed(2)}%`,
          },
          {
            label: "TDS amount",
            value: `₹${currencyFormatter.format(result.tdsAmountInr)}`,
          },
          {
            label: "Net interest after TDS",
            value: `₹${currencyFormatter.format(result.netInterestInr)}`,
          },
        ]}
        disclaimer={PDF_DISCLAIMER}
        sources={[
          {
            label: "Income Tax Dept.: TDS on payments to non-residents (section 195)",
            href: "https://www.incometaxindia.gov.in/w/tds-on-payments-to-non-residents",
          },
        ]}
      />

      <p className="text-xs text-stone-500 dark:text-primary-300/60">
        Does not model surcharge (income-slab and aggregate-income
        dependent, set each year), the 10%/0% DTAA rates for approved
        institutions/government loans, or the disputed no-PAN/DTAA-
        override question beyond applying the conservative domestic rate.
        Unlike a resident&apos;s FD, NRO interest has no basic exemption
        threshold — TDS applies from the first rupee. Verify against
        incometax.gov.in and the treaty text, or with a chartered
        accountant, before relying on this.
      </p>

      <HowCalculated>
        <p>
          TDS = gross interest × effective rate. The applied rate is 15%
          if you&apos;re claiming the DTAA benefit (with PAN), 30% as the
          standard domestic rate, or the higher of 30%/20% if PAN is
          missing (section 206AA) — cess of 4% is then added on top of
          whichever rate applies.
        </p>
        <p className="mt-2">
          Not modeled: surcharge, the DTAA&apos;s 10%/0% rates for
          approved institutions/government loans, and the disputed
          question of whether a DTAA rate survives a missing PAN — see
          the ADR for this tool.
        </p>
      </HowCalculated>

      <SourceCitation
        sources={[
          {
            label: "Income Tax Dept.: TDS on payments to non-residents (section 195)",
            href: "https://www.incometaxindia.gov.in/w/tds-on-payments-to-non-residents",
          },
        ]}
      />
    </CalculatorShell>
  );
}
