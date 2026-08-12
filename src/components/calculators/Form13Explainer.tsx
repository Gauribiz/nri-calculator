"use client";

import { useState } from "react";
import { assessForm13Case } from "@/lib/calculators/form13LowerTds";
import { CalculatorShell, NumberField, ResultRow } from "./CalculatorShell";
import { HowCalculated } from "./HowCalculated";
import { SourceCitation } from "./SourceCitation";

const inrFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0,
});

export default function Form13Explainer({
  defaultOpen = false,
}: {
  defaultOpen?: boolean;
} = {}) {
  const [saleConsiderationInr, setSaleConsiderationInr] = useState(0);
  const [isLongTerm, setIsLongTerm] = useState(true);
  const [estimatedActualTaxLiabilityInr, setEstimatedActualTaxLiabilityInr] =
    useState(0);

  const result = assessForm13Case({
    saleConsiderationInr,
    isLongTerm,
    estimatedActualTaxLiabilityInr,
  });

  return (
    <CalculatorShell
      defaultOpen={defaultOpen}
      title="Form 13 (lower/nil TDS certificate) explainer"
      intro="Explains when applying for a Form 13 lower/nil TDS certificate is worth the effort, and roughly how much default withholding it could avoid. Does not determine your actual tax liability — use the classifier tool above, or a tax preparer, to estimate that first."
    >
      <div
        role="note"
        className="rounded-lg bg-stone-50 p-4 text-sm text-stone-700 dark:bg-primary-900/20 dark:text-primary-100"
      >
        <p>
          Because Section 393(2) TDS is withheld on the full sale consideration
          rather than on your actual gain, the default withholding on a
          property sale is often much larger than the tax you actually owe.
          NRIs can apply under Section 197 (Form 13) for a certificate
          allowing the buyer to withhold at a lower — or nil — rate instead,
          avoiding a long wait for a refund after filing a return.
        </p>
        <p className="mt-2">
          Under the Income-tax Act, 2025 (in force from FY 2026-27 onward),
          Form 13 is renumbered <strong>Form 128</strong>, and the
          underlying provision, Section 197, is renumbered{" "}
          <strong>Section 395</strong>. The mechanism itself — apply before
          your sale/registration, processed through the TRACES portal,
          certificate valid for one financial year — is not expected to
          change, but this renumbering has not been independently verified
          against the Act&apos;s official text.
        </p>
      </div>

      <NumberField
        label="Sale consideration (full sale price)"
        value={saleConsiderationInr}
        onChange={setSaleConsiderationInr}
        suffix="₹"
      />

      <fieldset className="flex flex-col gap-2 text-sm">
        <legend className="mb-1 text-stone-700 dark:text-primary-100">
          Holding period
        </legend>
        <label className="flex items-center gap-2 text-stone-700 dark:text-primary-100">
          <input
            type="radio"
            name="form13-holding-period"
            checked={isLongTerm}
            onChange={() => setIsLongTerm(true)}
            className="accent-gold-500"
          />
          Long-term (held more than 24 months)
        </label>
        <label className="flex items-center gap-2 text-stone-700 dark:text-primary-100">
          <input
            type="radio"
            name="form13-holding-period"
            checked={!isLongTerm}
            onChange={() => setIsLongTerm(false)}
            className="accent-gold-500"
          />
          Short-term (held 24 months or less)
        </label>
      </fieldset>

      <NumberField
        label="Your own estimate of actual tax owed on this sale"
        value={estimatedActualTaxLiabilityInr}
        onChange={setEstimatedActualTaxLiabilityInr}
        suffix="₹"
        hint="From the LTCG/STCG classifier tool above, or your own/your tax preparer's estimate — not computed by this tool."
      />

      <div className="flex flex-col gap-1 rounded-lg bg-stone-50 p-4 dark:bg-primary-900/20">
        <ResultRow
          label="Estimated default TDS without a certificate"
          value={`₹${inrFormatter.format(result.defaultTdsInr)}`}
        />
        <ResultRow
          label="Your estimated actual tax liability"
          value={`₹${inrFormatter.format(result.estimatedActualTaxLiabilityInr)}`}
        />
        <ResultRow
          label="Likely excess withheld without a certificate"
          value={`₹${inrFormatter.format(result.likelyExcessWithheldInr)}`}
          emphasis
        />
        <ResultRow
          label="Worth applying for Form 13?"
          value={result.worthApplying ? "Likely worth it" : "Unlikely to help much"}
          status={result.worthApplying ? "favorable" : "neutral"}
        />
      </div>

      <p className="text-xs text-stone-500 dark:text-primary-300/60">
        Does not determine your actual tax liability — enter your own
        estimate above. Does not guarantee a certificate will be granted at
        that rate (the Assessing Officer decides) or model processing time
        (commonly several weeks — apply well before your planned sale/
        registration date). Verify against incometax.gov.in before relying
        on this.
      </p>

      <HowCalculated>
        <p>
          Estimated default TDS = sale consideration × the same default
          rate used by the Section 393(2) TDS estimator above (12.5% + 4% cess
          for long-term, 20% + 4% cess for short-term, the statutory rate under Section 393(2)/196, absent a
          certificate). Likely excess withheld = default TDS − your entered
          estimate of actual tax owed, floored at zero. This is a rough
          comparison to help decide whether applying is worth the effort —
          not a determination of what certificate rate you would actually
          receive.
        </p>
        <p className="mt-2">
          Not modeled: whether a certificate would actually be granted at
          any particular rate, and processing-time — see the ADR for this
          tool.
        </p>
      </HowCalculated>

      <SourceCitation
        sources={[
          {
            label: "Income Tax Dept.: Certificate of lower/no TDS deduction",
            href: "https://www.incometaxindia.gov.in/w/certificate-of-lower/no-deduction-of-tax-at-source",
          },
        ]}
      />
    </CalculatorShell>
  );
}
