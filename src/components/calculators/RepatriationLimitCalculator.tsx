"use client";

import { useState } from "react";
import {
  ANNUAL_REPATRIATION_LIMIT_USD,
  estimateRepatriationHeadroom,
} from "@/lib/calculators/repatriationLimit";
import { CalculatorShell, NumberField, ResultRow } from "./CalculatorShell";
import { DownloadResultsButton } from "./DownloadResultsButton";
import { HowCalculated } from "./HowCalculated";
import { SourceCitation } from "./SourceCitation";
import { PDF_DISCLAIMER } from "./pdfDisclaimer";

const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const REPATRIATION_LIMIT_SOURCES = [
  {
    label: "RBI: Master Direction — Remittance of Assets",
    href: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=10197",
  },
];

export default function RepatriationLimitCalculator({
  defaultOpen = false,
}: {
  defaultOpen?: boolean;
} = {}) {
  const [accountType, setAccountType] = useState<"nro" | "nre_or_fcnr">(
    "nro"
  );
  const [alreadyRepatriatedThisFyUsd, setAlreadyRepatriatedThisFyUsd] =
    useState(0);
  const [requestedAmountUsd, setRequestedAmountUsd] = useState(0);

  const result = estimateRepatriationHeadroom({
    accountType,
    alreadyRepatriatedThisFyUsd,
    requestedAmountUsd,
  });

  return (
    <CalculatorShell
      defaultOpen={defaultOpen}
      title="Repatriation headroom estimator"
      intro="Estimates remaining headroom under RBI's USD 1 million per financial year facility for remittance of assets. NRE/FCNR balances are freely repatriable and are not subject to this ceiling."
    >
      <fieldset className="flex flex-col gap-2 text-sm">
        <legend className="mb-1 text-stone-700 dark:text-primary-100">
          Which account are you repatriating from?
        </legend>
        <label className="flex items-center gap-2 text-stone-700 dark:text-primary-100">
          <input
            type="radio"
            name="repatriation-account-type"
            checked={accountType === "nro"}
            onChange={() => setAccountType("nro")}
            className="accent-gold-500"
          />
          NRO account (or sale proceeds of most movable/financial assets)
        </label>
        <label className="flex items-center gap-2 text-stone-700 dark:text-primary-100">
          <input
            type="radio"
            name="repatriation-account-type"
            checked={accountType === "nre_or_fcnr"}
            onChange={() => setAccountType("nre_or_fcnr")}
            className="accent-gold-500"
          />
          NRE or FCNR account
        </label>
      </fieldset>

      {result.subjectToAnnualLimit && (
        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField
            label="Already repatriated this financial year"
            value={alreadyRepatriatedThisFyUsd}
            onChange={setAlreadyRepatriatedThisFyUsd}
            suffix="USD"
          />
          <NumberField
            label="Amount you want to repatriate now"
            value={requestedAmountUsd}
            onChange={setRequestedAmountUsd}
            suffix="USD"
          />
        </div>
      )}

      <div className="flex flex-col gap-1 rounded-lg bg-stone-50 p-4 dark:bg-primary-900/20">
        {result.subjectToAnnualLimit ? (
          <>
            <ResultRow
              label="Annual facility limit"
              value={usdFormatter.format(ANNUAL_REPATRIATION_LIMIT_USD)}
            />
            <ResultRow
              label="Remaining headroom before this request"
              value={usdFormatter.format(result.remainingHeadroomUsd ?? 0)}
            />
            <ResultRow
              label="Fits within remaining headroom?"
              value={result.fitsWithinLimit ? "Yes" : "No"}
              status={result.fitsWithinLimit ? "favorable" : "warning"}
            />
            {!result.fitsWithinLimit && (
              <ResultRow
                label="Amount over the limit"
                value={usdFormatter.format(result.amountExceedingLimitUsd)}
                emphasis
              />
            )}
          </>
        ) : (
          <ResultRow
            label="RBI annual ceiling"
            value="Not applicable — freely repatriable"
            status="favorable"
          />
        )}
      </div>

      <DownloadResultsButton
        fileNameBase="repatriation-headroom-result"
        calculatorTitle="Repatriation headroom estimator"
        inputs={[
          {
            label: "Account type",
            value:
              accountType === "nro" ? "NRO account" : "NRE or FCNR account",
          },
          ...(result.subjectToAnnualLimit
            ? [
                {
                  label: "Already repatriated this financial year",
                  value: usdFormatter.format(alreadyRepatriatedThisFyUsd),
                },
                {
                  label: "Amount requested now",
                  value: usdFormatter.format(requestedAmountUsd),
                },
              ]
            : []),
        ]}
        results={
          result.subjectToAnnualLimit
            ? [
                {
                  label: "Annual facility limit",
                  value: usdFormatter.format(ANNUAL_REPATRIATION_LIMIT_USD),
                },
                {
                  label: "Remaining headroom before this request",
                  value: usdFormatter.format(result.remainingHeadroomUsd ?? 0),
                },
                {
                  label: "Fits within remaining headroom?",
                  value: result.fitsWithinLimit ? "Yes" : "No",
                },
              ]
            : [
                {
                  label: "RBI annual ceiling",
                  value: "Not applicable — freely repatriable",
                },
              ]
        }
        disclaimer={PDF_DISCLAIMER}
        sources={REPATRIATION_LIMIT_SOURCES}
      />

      <p className="text-xs text-stone-500 dark:text-primary-300/60">
        Does not model the RBI-permission route for amounts above the
        ceiling (e.g. medical emergencies, a child&apos;s education abroad,
        or buying real estate in your country of residence), the separate
        cap on repatriating residential property sale proceeds, or Form
        15CA/15CB documentation (see the NRE/NRO &amp; TDS category).
        Verify the current ceiling and your bank&apos;s own requirements
        before relying on this.
      </p>

      <HowCalculated>
        <p>
          NRO account balances, and proceeds from selling most movable or
          financial assets in India, are capped at USD 1 million per
          financial year (April-March) under RBI&apos;s facility for
          remittance of assets by NRIs/PIOs. Remaining headroom = USD
          1,000,000 − amount already repatriated this financial year. NRE
          and FCNR account balances represent funds already held in
          convertible foreign exchange and are not subject to this
          ceiling.
        </p>
        <p className="mt-2">
          Not modeled: the RBI-permission route for amounts above the
          ceiling, the separate cap limiting repatriation of residential
          property sale proceeds to a maximum of two properties, and Form
          15CA/15CB mechanics — see ADR 0009.
        </p>
      </HowCalculated>

      <SourceCitation sources={REPATRIATION_LIMIT_SOURCES} />
    </CalculatorShell>
  );
}
