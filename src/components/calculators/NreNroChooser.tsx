"use client";

import { useState } from "react";
import {
  chooseNreOrNro,
  type FundsSource,
} from "@/lib/calculators/nreNroChooser";
import { CalculatorShell, CheckboxField, ResultRow } from "./CalculatorShell";
import { HowCalculated } from "./HowCalculated";
import { SourceCitation } from "./SourceCitation";

const RECOMMENDATION_LABEL: Record<
  ReturnType<typeof chooseNreOrNro>["recommendation"],
  string
> = {
  NRE: "Open an NRE account",
  NRO: "Open an NRO account",
  both: "You likely need both",
  neither: "Check your FEMA status first",
};

const FUNDS_SOURCE_OPTIONS: { value: FundsSource; label: string }[] = [
  { value: "foreign", label: "Earned abroad, remitted from outside India" },
  { value: "india", label: "Earned/received in India (rent, dividends, pension, sale proceeds)" },
  { value: "both", label: "Both — some foreign, some India-sourced" },
];

export default function NreNroChooser({
  defaultOpen = false,
}: {
  defaultOpen?: boolean;
} = {}) {
  const [isNriOrPio, setIsNriOrPio] = useState(true);
  const [fundsSource, setFundsSource] = useState<FundsSource>("foreign");
  const [needsFullRepatriability, setNeedsFullRepatriability] =
    useState(false);

  const result = chooseNreOrNro({
    isNriOrPio,
    fundsSource,
    needsFullRepatriability,
  });

  return (
    <CalculatorShell
      defaultOpen={defaultOpen}
      title="NRE vs. NRO: which account do you need?"
      intro="A quick decision aid based on FEMA's basic distinction between the two account types. It does not check your actual FEMA residency status or account-opening eligibility — confirm both with your bank."
    >
      <CheckboxField
        label="I qualify as an NRI or PIO (Person of Indian Origin) under FEMA"
        checked={isNriOrPio}
        onChange={setIsNriOrPio}
        hint="A separate test from income-tax residency — based on where you live and your citizenship/origin, not day-counts."
      />

      <fieldset className="flex flex-col gap-2 text-sm">
        <legend className="text-stone-700 dark:text-primary-100">
          The money I want to deposit is mostly:
        </legend>
        {FUNDS_SOURCE_OPTIONS.map((option) => (
          <label
            key={option.value}
            className="flex items-start gap-2 text-stone-700 dark:text-primary-100"
          >
            <input
              type="radio"
              name="funds-source"
              checked={fundsSource === option.value}
              onChange={() => setFundsSource(option.value)}
              className="mt-0.5 accent-gold-500"
            />
            {option.label}
          </label>
        ))}
      </fieldset>

      <CheckboxField
        label="I need to be able to fully repatriate these funds abroad without restriction"
        checked={needsFullRepatriability}
        onChange={setNeedsFullRepatriability}
      />

      <div className="flex flex-col gap-2 rounded-lg bg-stone-50 p-4 dark:bg-primary-900/20">
        <ResultRow
          label="Recommendation"
          value={RECOMMENDATION_LABEL[result.recommendation]}
          status={result.recommendation === "neither" ? "warning" : "neutral"}
        />
        <ul className="mt-1 flex flex-col gap-1.5 text-xs text-stone-600 dark:text-primary-200/70">
          {result.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </div>

      <HowCalculated>
        <p>
          NRE accounts hold funds earned outside India and remitted in:
          interest is exempt from Indian income tax, and both principal and
          interest are freely repatriable. NRO accounts hold India-sourced
          income (rent, dividends, pension, sale proceeds): interest is
          taxable with TDS withheld, and repatriation is capped at USD 1
          million per financial year with CA certification above a
          threshold — see the TDS and Form 15CA/15CB tools below.
        </p>
        <p className="mt-2">
          Not modeled: FCNR/RFC accounts, the FEMA &quot;person resident
          outside India&quot; test itself (assumed true when you check the
          first box), and account-opening KYC requirements.
        </p>
      </HowCalculated>

      <SourceCitation
        sources={[
          {
            label: "RBI Master Direction: Deposits and Accounts",
            href: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=10198",
          },
          {
            label: "Income Tax Dept.: NRE account interest exemption",
            href: "https://www.incometaxindia.gov.in/Pages/i-am/non-resident.aspx",
          },
        ]}
      />
    </CalculatorShell>
  );
}
