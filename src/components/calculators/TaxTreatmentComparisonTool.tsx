"use client";

import { useState } from "react";
import { INSTRUMENT_TAX_PROFILES } from "@/lib/calculators/taxTreatmentComparison";
import { CalculatorShell, CheckboxField } from "./CalculatorShell";
import { DownloadResultsButton } from "./DownloadResultsButton";
import { SourceCitation } from "./SourceCitation";
import { PDF_DISCLAIMER } from "./pdfDisclaimer";

const DEFAULT_SELECTED_IDS = new Set(["nre-account", "nro-account"]);

const TAX_TREATMENT_COMPARISON_SOURCES = [
  {
    label: "Income Tax Department: Tax rates for NRIs",
    href: "https://www.incometax.gov.in/iec/foportal/",
  },
  {
    label: "RBI: Master Direction — Remittance of Assets",
    href: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=10197",
  },
];

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 text-sm">
      <span className="text-xs font-medium uppercase tracking-wide text-stone-500 dark:text-primary-300/60">
        {label}
      </span>
      <span className="text-stone-700 dark:text-primary-100">{value}</span>
    </div>
  );
}

export default function TaxTreatmentComparisonTool({
  defaultOpen = false,
}: {
  defaultOpen?: boolean;
} = {}) {
  const [selected, setSelected] = useState<Record<string, boolean>>(
    () =>
      Object.fromEntries(
        INSTRUMENT_TAX_PROFILES.map((profile) => [
          profile.id,
          DEFAULT_SELECTED_IDS.has(profile.id),
        ])
      )
  );

  const toggle = (id: string) =>
    setSelected((current) => ({ ...current, [id]: !current[id] }));

  const visibleProfiles = INSTRUMENT_TAX_PROFILES.filter(
    (profile) => selected[profile.id]
  );

  return (
    <CalculatorShell
      defaultOpen={defaultOpen}
      title="Tax treatment comparison tool"
      intro="Side-by-side reference on how common NRI investment types are taxed in India: income tax on ongoing returns, capital gains treatment, TDS withheld at source, and repatriation rules. General information, not tax advice — pick the instruments you hold to compare."
    >
      <fieldset className="grid gap-2 text-sm sm:grid-cols-2">
        <legend className="mb-1 text-stone-700 dark:text-primary-100">
          Instruments to compare
        </legend>
        <p className="col-span-full -mt-1 mb-1 text-xs text-stone-500 dark:text-primary-300/60">
          NRE and NRO accounts are checked by default — check or uncheck any
          instrument to change the comparison.
        </p>
        {INSTRUMENT_TAX_PROFILES.map((profile) => (
          <CheckboxField
            key={profile.id}
            label={profile.label}
            checked={Boolean(selected[profile.id])}
            onChange={() => toggle(profile.id)}
          />
        ))}
      </fieldset>

      <div className="flex flex-col gap-4">
        {visibleProfiles.length === 0 && (
          <p className="text-sm text-stone-500 dark:text-primary-300/70">
            Select at least one instrument above to see its tax treatment.
          </p>
        )}
        {visibleProfiles.map((profile) => (
          <div
            key={profile.id}
            className="flex flex-col gap-3 rounded-lg border border-stone-200 bg-stone-50 p-4 dark:border-primary-900 dark:bg-primary-900/20"
          >
            <h3 className="text-sm font-semibold text-primary-900 dark:text-primary-50">
              {profile.label}
            </h3>
            <InfoField
              label="Income tax (interest/dividends)"
              value={profile.incomeTaxTreatment}
            />
            <InfoField
              label="Capital gains treatment"
              value={profile.capitalGainsTreatment}
            />
            <InfoField label="TDS at source" value={profile.tdsTreatment} />
            <InfoField label="Repatriation" value={profile.repatriability} />
          </div>
        ))}
      </div>

      {visibleProfiles.length > 0 && (
        <DownloadResultsButton
          fileNameBase="tax-treatment-comparison-result"
          calculatorTitle="Tax treatment comparison tool"
          inputs={[
            {
              label: "Instruments compared",
              value: visibleProfiles.map((profile) => profile.label).join(", "),
            },
          ]}
          results={visibleProfiles.flatMap((profile) => [
            {
              label: `${profile.label} — Income tax (interest/dividends)`,
              value: profile.incomeTaxTreatment,
            },
            {
              label: `${profile.label} — Capital gains treatment`,
              value: profile.capitalGainsTreatment,
            },
            {
              label: `${profile.label} — TDS at source`,
              value: profile.tdsTreatment,
            },
            {
              label: `${profile.label} — Repatriation`,
              value: profile.repatriability,
            },
          ])}
          disclaimer={PDF_DISCLAIMER}
          sources={TAX_TREATMENT_COMPARISON_SOURCES}
        />
      )}

      <p className="text-xs text-stone-500 dark:text-primary-300/60">
        Does not model DTAA relief, surcharge slabs, your overall tax
        residency position, or Finance Act changes after this was written.
        Rates shown match the calculators elsewhere on this site as of that
        writing — verify current rates at incometax.gov.in before relying on
        this for a filing or investment decision.
      </p>

      <SourceCitation sources={TAX_TREATMENT_COMPARISON_SOURCES} />
    </CalculatorShell>
  );
}
