"use client";

import { useState } from "react";
import {
  checkForm15caRequirement,
  type Form15caPart,
} from "@/lib/calculators/form15caChecker";
import { CalculatorShell, CheckboxField, NumberField, ResultRow } from "./CalculatorShell";
import { HowCalculated } from "./HowCalculated";
import { SourceCitation } from "./SourceCitation";

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0,
});

const PART_LABEL: Record<Form15caPart, string> = {
  none: "No Form 15CA/15CB needed",
  A: "Form 15CA, Part A only",
  B: "Form 15CA, Part B (with your AO certificate/order)",
  C: "Form 15CA, Part C + Form 15CB",
};

export default function Form15caChecker() {
  const [remittanceAmount, setRemittanceAmount] = useState(0);
  const [isOnRbiExemptList, setIsOnRbiExemptList] = useState(false);
  const [hasAoCertificateOrOrder, setHasAoCertificateOrOrder] =
    useState(false);

  const result = checkForm15caRequirement({
    remittanceAmount,
    isOnRbiExemptList,
    hasAoCertificateOrOrder,
  });

  return (
    <CalculatorShell
      title="Form 15CA/15CB checker"
      intro="Checks which part of Form 15CA applies to a single foreign remittance, and whether a CA-certified Form 15CB is also required, based on the Rs 5 lakh aggregate-per-year threshold."
    >
      <NumberField
        label="Remittance amount (aggregate so far this financial year, if more than one)"
        value={remittanceAmount}
        onChange={setRemittanceAmount}
        suffix="₹"
      />

      <CheckboxField
        label="This remittance is on the RBI/CBDT specified exempt list (Rule 37BB) — e.g. certain personal or business payments not requiring Form 15CA/15CB at all"
        checked={isOnRbiExemptList}
        onChange={setIsOnRbiExemptList}
        hint="This tool doesn't check the specified list for you — verify your specific remittance purpose against Rule 37BB's list, or with your bank, before relying on this checkbox."
      />

      {!isOnRbiExemptList && (
        <CheckboxField
          label="I've already obtained a certificate/order under section 195(2), 195(3), or 197 from my Assessing Officer for this remittance"
          checked={hasAoCertificateOrOrder}
          onChange={setHasAoCertificateOrOrder}
        />
      )}

      <div className="flex flex-col gap-1 rounded-lg bg-stone-50 p-4 dark:bg-primary-900/20">
        <ResultRow
          label="Requirement"
          value={PART_LABEL[result.part]}
          status={
            result.part === "none"
              ? "favorable"
              : result.needsForm15cb
                ? "warning"
                : "neutral"
          }
        />
        {result.needsForm15cb && (
          <p className="mt-1 text-xs text-stone-600 dark:text-primary-200/70">
            Above ₹{currencyFormatter.format(500_000)}, a chartered
            accountant must certify Form 15CB before you file Form 15CA
            Part C.
          </p>
        )}
      </div>

      <p className="text-xs text-stone-500 dark:text-primary-300/60">
        Does not check your remittance against the full Rule 37BB exempt
        list itself, does not aggregate multiple remittances across the
        year for you (enter your own running total), and does not cover
        Form 15CA Part D (used by banks, not the remitter).
      </p>

      <HowCalculated>
        <p>
          If the remittance is on the RBI/CBDT specified exempt list, no
          form is needed. Otherwise, if you already hold an Assessing
          Officer certificate/order under section 195(2)/195(3)/197, only
          Form 15CA Part B applies. Otherwise: aggregate remittances of ₹5
          lakh or less this financial year need only Form 15CA Part A;
          above that, Form 15CA Part C plus a CA-certified Form 15CB are
          both required.
        </p>
        <p className="mt-2">
          Not modeled: the specified list itself, cross-remittance
          aggregation, and Form 15CA Part D.
        </p>
      </HowCalculated>

      <SourceCitation
        sources={[
          {
            label: "Income Tax Dept.: Form 15CA",
            href: "https://www.incometax.gov.in/iec/foportal/help/statutory-forms/popular-forms/form-15ca-faq",
          },
        ]}
      />
    </CalculatorShell>
  );
}
