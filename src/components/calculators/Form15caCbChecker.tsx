"use client";

import { useState } from "react";
import {
  checkForm15caCb,
  type Form15caCbFormRequirement,
} from "@/lib/calculators/form15caCb";
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
  maximumFractionDigits: 0,
});

const FORM_REQUIREMENT_LABEL: Record<Form15caCbFormRequirement, string> = {
  none: "Neither Form 15CA nor Form 15CB required",
  "15ca-only": "Form 15CA required (no 15CB)",
  "15ca-and-15cb": "Form 15CA and Form 15CB both required",
};

const FORM_REQUIREMENT_STATUS: Record<
  Form15caCbFormRequirement,
  "favorable" | "warning" | "neutral"
> = {
  none: "favorable",
  "15ca-only": "neutral",
  "15ca-and-15cb": "warning",
};

export default function Form15caCbChecker() {
  const [isOnSpecifiedExemptList, setIsOnSpecifiedExemptList] =
    useState(false);
  const [isChargeableToTax, setIsChargeableToTax] = useState(true);
  const [hasAssessingOfficerCertificate, setHasAssessingOfficerCertificate] =
    useState(false);
  const [remittanceAmountInr, setRemittanceAmountInr] = useState(0);

  const result = checkForm15caCb({
    isOnSpecifiedExemptList,
    isChargeableToTax,
    hasAssessingOfficerCertificate,
    remittanceAmountInr,
  });

  return (
    <CalculatorShell
      title="Form 15CA / 15CB checker"
      intro="Determines which Form 15CA part applies to a remittance abroad, and whether a chartered accountant's Form 15CB certificate is also needed, under Rule 37BB. This tool doesn't determine whether a remittance is on the exempt list or chargeable to tax — you supply those facts."
    >
      <div className="flex flex-col gap-2">
        <CheckboxField
          label="The remittance is on Rule 37BB's specified exempt list (e.g. certain imports, personal/travel remittances covered elsewhere)"
          checked={isOnSpecifiedExemptList}
          onChange={setIsOnSpecifiedExemptList}
          hint="A list of 33 specified remittance categories that need no Form 15CA/15CB regardless of amount — check the current list on incometax.gov.in."
        />
        <CheckboxField
          label="The remittance is chargeable to tax in India"
          checked={isChargeableToTax}
          onChange={setIsChargeableToTax}
          hint="Whether an amount is chargeable to tax is a substantive tax question — this tool doesn't determine it for you."
        />
        <CheckboxField
          label="A certificate/order under section 195(2), 195(3), or 197 has already been obtained from the Assessing Officer"
          checked={hasAssessingOfficerCertificate}
          onChange={setHasAssessingOfficerCertificate}
        />
      </div>

      <NumberField
        label="Remittance amount (aggregate for the financial year)"
        value={remittanceAmountInr}
        onChange={setRemittanceAmountInr}
        suffix="₹"
      />

      <div className="flex flex-col gap-1 rounded-lg bg-stone-50 p-4 dark:bg-primary-900/20">
        <ResultRow
          label="Form requirement"
          value={FORM_REQUIREMENT_LABEL[result.formRequired]}
          status={FORM_REQUIREMENT_STATUS[result.formRequired]}
        />
        {result.part && (
          <ResultRow label="Form 15CA part" value={`Part ${result.part}`} />
        )}
      </div>

      <DownloadPdfButton
        fileName="form-15ca-15cb-checker-result.pdf"
        calculatorTitle="Form 15CA / 15CB checker"
        inputs={[
          {
            label: "On Rule 37BB specified exempt list",
            value: isOnSpecifiedExemptList ? "Yes" : "No",
          },
          {
            label: "Chargeable to tax",
            value: isChargeableToTax ? "Yes" : "No",
          },
          {
            label: "Assessing Officer certificate/order obtained",
            value: hasAssessingOfficerCertificate ? "Yes" : "No",
          },
          {
            label: "Remittance amount (FY aggregate)",
            value: `₹${currencyFormatter.format(remittanceAmountInr)}`,
          },
        ]}
        results={[
          {
            label: "Form requirement",
            value: FORM_REQUIREMENT_LABEL[result.formRequired],
          },
          ...(result.part
            ? [{ label: "Form 15CA part", value: `Part ${result.part}` }]
            : []),
        ]}
        disclaimer={PDF_DISCLAIMER}
        sources={[
          {
            label: "Income Tax Dept.: Who is required to file Form 15CA",
            href: "https://www.incometaxindia.gov.in/w/who-is-required-to-file-form-15ca-",
          },
        ]}
      />

      <p className="text-xs text-stone-500 dark:text-primary-300/60">
        Does not reproduce Rule 37BB&apos;s specified exempt list, evaluate
        whether a remittance is chargeable to tax, or check RBI&apos;s
        Liberalised Remittance Scheme USD 250,000/year cap — a separate
        restriction from the Form 15CA/15CB requirement. Verify against
        incometax.gov.in and Rule 37BB&apos;s current text, or with a
        chartered accountant, before relying on this.
      </p>

      <HowCalculated>
        <p>
          If the remittance is on Rule 37BB&apos;s specified exempt list,
          neither form is required. Otherwise: not chargeable to tax →
          Form 15CA Part D only. An Assessing Officer certificate/order
          already obtained → Part B only. Chargeable to tax, no AO
          certificate, and the FY aggregate is ₹5 lakh or less → Part A
          only. Above ₹5 lakh with no AO certificate → Part C, plus a
          chartered accountant&apos;s Form 15CB certificate.
        </p>
        <p className="mt-2">
          Not modeled: the specified exempt list&apos;s 33 items
          themselves, whether an amount is in fact chargeable to tax, and
          RBI&apos;s Liberalised Remittance Scheme cap — see the ADR for
          this tool.
        </p>
      </HowCalculated>

      <SourceCitation
        sources={[
          {
            label: "Income Tax Dept.: Who is required to file Form 15CA",
            href: "https://www.incometaxindia.gov.in/w/who-is-required-to-file-form-15ca-",
          },
        ]}
      />
    </CalculatorShell>
  );
}
