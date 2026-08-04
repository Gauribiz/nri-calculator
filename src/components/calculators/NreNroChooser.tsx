"use client";

import { useState } from "react";
import {
  recommendNreNroAccounts,
  type NreNroRecommendation,
} from "@/lib/calculators/nreNroChooser";
import { CalculatorShell, CheckboxField, ResultRow } from "./CalculatorShell";
import { DownloadPdfButton } from "./DownloadPdfButton";
import { HowCalculated } from "./HowCalculated";
import { SourceCitation } from "./SourceCitation";
import { PDF_DISCLAIMER } from "./pdfDisclaimer";

const RECOMMENDATION_LABEL: Record<NreNroRecommendation, string> = {
  "nre-only": "An NRE account",
  "nro-only": "An NRO account",
  both: "Both an NRE and an NRO account",
  unclear: "Tell us about your funds above to see a recommendation",
};

const RECOMMENDATION_STATUS: Record<
  NreNroRecommendation,
  "favorable" | "warning" | "neutral"
> = {
  "nre-only": "favorable",
  "nro-only": "favorable",
  both: "warning",
  unclear: "neutral",
};

export default function NreNroChooser() {
  const [hasForeignSourceFunds, setHasForeignSourceFunds] = useState(false);
  const [hasIndiaSourceIncome, setHasIndiaSourceIncome] = useState(false);

  const result = recommendNreNroAccounts({
    hasForeignSourceFunds,
    hasIndiaSourceIncome,
  });

  return (
    <CalculatorShell
      title="NRE vs NRO account chooser"
      intro="A fund-sourcing rule, not a full comparison. NRE accounts may only hold funds originating outside India; NRO accounts hold income earned or accrued in India. Check whichever apply to you."
    >
      <div className="flex flex-col gap-2">
        <CheckboxField
          label="I have foreign-source funds — foreign salary, foreign investment income, or savings remitted from abroad"
          checked={hasForeignSourceFunds}
          onChange={setHasForeignSourceFunds}
          hint="Funds that originated outside India, in foreign currency, before being brought into an Indian account."
        />
        <CheckboxField
          label="I have India-source income — rent, dividends from Indian companies/funds, a pension from an Indian employer, sale proceeds of Indian assets, or interest on existing India deposits"
          checked={hasIndiaSourceIncome}
          onChange={setHasIndiaSourceIncome}
          hint="Income earned or accrued within India, regardless of where you currently live."
        />
      </div>

      <div className="flex flex-col gap-1 rounded-lg bg-stone-50 p-4 dark:bg-primary-900/20">
        <ResultRow
          label="Recommended account(s)"
          value={RECOMMENDATION_LABEL[result.recommendation]}
          status={RECOMMENDATION_STATUS[result.recommendation]}
        />
        {result.recommendation === "both" && (
          <p className="mt-1 text-xs text-stone-500 dark:text-primary-300/60">
            NRE funds generally can&apos;t be moved back into an NRO
            account without specific RBI permission — keep the two income
            streams in their matching account from the start.
          </p>
        )}
      </div>

      <DownloadPdfButton
        fileName="nre-nro-chooser-result.pdf"
        calculatorTitle="NRE vs NRO account chooser"
        inputs={[
          {
            label: "Has foreign-source funds",
            value: hasForeignSourceFunds ? "Yes" : "No",
          },
          {
            label: "Has India-source income",
            value: hasIndiaSourceIncome ? "Yes" : "No",
          },
        ]}
        results={[
          {
            label: "Recommended account(s)",
            value: RECOMMENDATION_LABEL[result.recommendation],
          },
        ]}
        disclaimer={PDF_DISCLAIMER}
        sources={[
          {
            label: "RBI: Non-Resident Ordinary Rupee (NRO) Account",
            href: "https://www.rbi.org.in/Scripts/FAQView.aspx?Id=94",
          },
        ]}
      />

      <p className="text-xs text-stone-500 dark:text-primary-300/60">
        Does not compare interest taxability or repatriation limits between
        the two account types (see the NRO interest TDS calculator below
        for NRO taxation), joint-account rules, or FCNR(B)/RFC
        alternatives. Verify against rbi.org.in or with a bank&apos;s NRI
        desk before relying on this.
      </p>

      <HowCalculated>
        <p>
          NRE accounts may only hold funds that originated outside India.
          NRO accounts hold income earned or accrued in India. If you have
          both kinds of funds, you need both account types — one account
          can&apos;t substitute for the other&apos;s eligible fund source.
        </p>
        <p className="mt-2">
          Not modeled: the interest-taxability and repatriation-limit
          differences between the two (NRE interest is tax-exempt and
          fully repatriable; NRO interest is taxable with TDS and
          repatriation is capped), joint-account rules, moving funds
          between account types, or FCNR(B)/RFC as alternatives — see the
          ADR for this tool.
        </p>
      </HowCalculated>

      <SourceCitation
        sources={[
          {
            label: "RBI: Non-Resident Ordinary Rupee (NRO) Account",
            href: "https://www.rbi.org.in/Scripts/FAQView.aspx?Id=94",
          },
        ]}
      />
    </CalculatorShell>
  );
}
