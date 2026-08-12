"use client";

import { useState } from "react";
import { checkPficFilingRequirement } from "@/lib/calculators/pficFilingCheck";
import { CalculatorShell, CheckboxField, NumberField, ResultRow } from "./CalculatorShell";
import { HowCalculated } from "./HowCalculated";
import { SourceCitation } from "./SourceCitation";

const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default function PficFilingChecker({
  defaultOpen = false,
}: {
  defaultOpen?: boolean;
} = {}) {
  const [aggregatePficValueUsd, setAggregatePficValueUsd] = useState(0);
  const [filingStatus, setFilingStatus] = useState<
    "single_or_other" | "married_filing_jointly"
  >("single_or_other");
  const [
    receivedExcessDistributionOrDisposedStock,
    setReceivedExcessDistributionOrDisposedStock,
  ] = useState(false);
  const [ownedThroughAnotherPfic, setOwnedThroughAnotherPfic] =
    useState(false);

  const result = checkPficFilingRequirement({
    aggregatePficValueUsd,
    filingStatus,
    receivedExcessDistributionOrDisposedStock,
    ownedThroughAnotherPfic,
  });

  return (
    <CalculatorShell
      defaultOpen={defaultOpen}
      title="US tax treatment of Indian mutual funds: PFIC explainer"
      intro="Most Indian mutual funds are treated as PFICs (Passive Foreign Investment Companies) for US tax purposes, triggering the Section 1291 default tax-and-interest regime and annual Form 8621 reporting unless a de minimis exception applies. This tool only checks the Form 8621 filing exception — it does not compute any tax owed."
    >
      <div className="flex gap-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-100">
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="mt-0.5 h-5 w-5 shrink-0 fill-current text-amber-600 dark:text-amber-300"
        >
          <path
            fillRule="evenodd"
            d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.63-1.516 2.63H3.72c-1.347 0-2.189-1.463-1.515-2.63L8.485 2.495ZM10 6a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 6Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
            clipRule="evenodd"
          />
        </svg>
        <p>
          <span className="font-semibold">
            This is the highest-complexity, highest-liability topic on this
            site.
          </span>{" "}
          Whether a fund is a PFIC, whether an election is even available to
          you, and what tax and interest you owe under the default Section
          1291 method all depend on fund-specific and year-specific facts
          this tool does not have. Treat everything below as a starting
          point for a conversation with a US tax preparer experienced in
          PFIC reporting — not as an answer.
        </p>
      </div>

      <div className="text-sm text-stone-600 dark:text-primary-200/70">
        <p>
          A US person holding a PFIC without a Qualified Electing Fund (QEF)
          or mark-to-market election in effect is generally taxed under the
          Section 1291 &quot;excess distribution&quot; regime: gains and
          certain large distributions are spread evenly across the holding
          period, taxed at the highest marginal rate for each of those
          prior years, plus a non-deductible interest charge for the
          deferral. QEF and mark-to-market elections can avoid this, but a
          QEF election generally requires the fund to supply a PFIC Annual
          Information Statement, which most Indian mutual funds do not
          provide.
        </p>
      </div>

      <fieldset className="flex flex-col gap-2 text-sm">
        <legend className="mb-1 text-stone-700 dark:text-primary-100">
          Filing status
        </legend>
        <label className="flex items-center gap-2 text-stone-700 dark:text-primary-100">
          <input
            type="radio"
            name="pfic-filing-status"
            checked={filingStatus === "single_or_other"}
            onChange={() => setFilingStatus("single_or_other")}
            className="accent-gold-500"
          />
          Single, or any status other than married filing jointly
        </label>
        <label className="flex items-center gap-2 text-stone-700 dark:text-primary-100">
          <input
            type="radio"
            name="pfic-filing-status"
            checked={filingStatus === "married_filing_jointly"}
            onChange={() => setFilingStatus("married_filing_jointly")}
            className="accent-gold-500"
          />
          Married filing jointly
        </label>
      </fieldset>

      <NumberField
        label="Aggregate value of all your Indian PFIC holdings, year-end"
        value={aggregatePficValueUsd}
        onChange={setAggregatePficValueUsd}
        suffix="USD"
        hint="Total across every Indian mutual fund and similar PFIC you hold, not per fund."
      />

      <CheckboxField
        label="I received a distribution from, or sold/disposed of, PFIC stock this tax year"
        checked={receivedExcessDistributionOrDisposedStock}
        onChange={setReceivedExcessDistributionOrDisposedStock}
      />

      <CheckboxField
        label="I hold this PFIC indirectly through another PFIC"
        checked={ownedThroughAnotherPfic}
        onChange={setOwnedThroughAnotherPfic}
        hint="Lowers the de minimis threshold to $5,000."
      />

      <div className="flex flex-col gap-1 rounded-lg bg-stone-50 p-4 dark:bg-primary-900/20">
        <ResultRow
          label="De minimis filing threshold for your situation"
          value={usdFormatter.format(result.thresholdUsd)}
        />
        <ResultRow
          label="Form 8621 filing likely required?"
          value={result.likelyExemptFromFiling ? "Likely not required" : "Likely required"}
          status={result.likelyExemptFromFiling ? "favorable" : "warning"}
        />
      </div>

      <p className="text-xs text-stone-500 dark:text-primary-300/60">
        {result.reason}
      </p>

      <p className="text-xs text-stone-500 dark:text-primary-300/60">
        Does not determine whether your fund is actually a PFIC, does not
        compute any Section 1291 tax or interest charge, and does not
        evaluate QEF/mark-to-market election eligibility. Verify against
        irs.gov and with a qualified US tax preparer before relying on
        this.
      </p>

      <HowCalculated>
        <p>
          Checks only the Form 8621 &quot;de minimis&quot; value exception:
          no filing is generally required if the aggregate value of all
          PFIC stock is at or below $25,000 ($50,000 married filing
          jointly, or $5,000 if held indirectly through another PFIC) at
          year-end, and no excess distribution was received and no
          disposition occurred that year. Receiving a distribution or
          disposing of stock removes the exception regardless of value.
        </p>
        <p className="mt-2">
          Not modeled: whether the fund is a PFIC in the first place,
          Section 1291 excess-distribution tax and interest computation,
          and QEF/mark-to-market election mechanics and eligibility — see
          ADR 0009 for why this tool deliberately stops at the filing
          question.
        </p>
      </HowCalculated>

      <SourceCitation
        sources={[
          {
            label: "IRS: Instructions for Form 8621",
            href: "https://www.irs.gov/instructions/i8621",
          },
          {
            label: "IRS: About Form 8621",
            href: "https://www.irs.gov/forms-pubs/about-form-8621",
          },
        ]}
      />
    </CalculatorShell>
  );
}
