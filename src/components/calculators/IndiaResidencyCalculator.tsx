"use client";

import { useState } from "react";
import { calculateIndiaResidencyStatus } from "@/lib/calculators/indiaResidency";
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

const STATUS_LABEL: Record<string, string> = {
  "non-resident": "Non-Resident (NR)",
  rnor: "Resident but Not Ordinarily Resident (RNOR)",
  ror: "Resident and Ordinarily Resident (ROR)",
};

// Finance Act 2020: for a visiting citizen/PIO whose India-sourced income
// (excluding foreign-source income) exceeds this amount, the relaxed
// second-test threshold drops from 182 to 120 days. Disclosure only — the
// calculation below still applies 182 days; see indiaResidency.ts's header.
const FA2020_INCOME_THRESHOLD_INR = 1_500_000;

export default function IndiaResidencyCalculator() {
  const [currentYearDays, setCurrentYearDays] = useState(0);
  const [precedingFourYearsDays, setPrecedingFourYearsDays] = useState(0);
  const [isCitizenOrPioVisiting, setIsCitizenOrPioVisiting] = useState(false);
  const [yearsNonResidentInPrecedingTen, setYearsNonResidentInPrecedingTen] =
    useState(0);
  const [daysInPrecedingSevenYears, setDaysInPrecedingSevenYears] =
    useState(0);
  const [indiaSourceIncomeInr, setIndiaSourceIncomeInr] = useState(0);

  const result = calculateIndiaResidencyStatus({
    currentYearDays,
    precedingFourYearsDays,
    isCitizenOrPioVisiting,
    yearsNonResidentInPrecedingTen,
    daysInPrecedingSevenYears,
  });

  const incomeExceeds15L = indiaSourceIncomeInr > FA2020_INCOME_THRESHOLD_INR;

  return (
    <CalculatorShell
      title="India residential status & RNOR tool"
      intro="Applies the two basic tests under Income Tax Act section 6, then checks the RNOR refinement. Does NOT model the Finance Act 2020 deemed-residency rule, the income-linked 120-day threshold for citizens/PIOs with India income over Rs 15 lakh, or year-specific CBDT travel relaxations."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <NumberField
          label="Days present in India this financial year"
          value={currentYearDays}
          onChange={setCurrentYearDays}
          suffix="days"
        />
        <NumberField
          label="Days present in India in the preceding 4 financial years (total)"
          value={precedingFourYearsDays}
          onChange={setPrecedingFourYearsDays}
          suffix="days"
        />
        <NumberField
          label="Years NOT resident in India, of the preceding 10 financial years"
          value={yearsNonResidentInPrecedingTen}
          onChange={setYearsNonResidentInPrecedingTen}
          suffix="years"
        />
        <NumberField
          label="Days present in India in the preceding 7 financial years (total)"
          value={daysInPrecedingSevenYears}
          onChange={setDaysInPrecedingSevenYears}
          suffix="days"
        />
      </div>

      <CheckboxField
        label="I am an Indian citizen or Person of Indian Origin (PIO) visiting India (not primarily for other business), so the second test's threshold is 182 days instead of 60"
        checked={isCitizenOrPioVisiting}
        onChange={setIsCitizenOrPioVisiting}
      />

      {isCitizenOrPioVisiting && (
        <div className="flex flex-col gap-2">
          <NumberField
            label="India-sourced income this financial year, excluding foreign-source income (optional — only used for the note below)"
            value={indiaSourceIncomeInr}
            onChange={setIndiaSourceIncomeInr}
            suffix="₹"
          />
          <div
            className={
              incomeExceeds15L
                ? "rounded-lg border border-gold-400 bg-gold-50 p-3 text-sm text-gold-900 dark:border-gold-700 dark:bg-gold-900/30 dark:text-gold-200"
                : "rounded-lg border border-stone-200 bg-stone-50 p-3 text-sm text-stone-600 dark:border-primary-900 dark:bg-primary-900/20 dark:text-primary-300/70"
            }
          >
            {incomeExceeds15L ? (
              <>
                <strong>Your India-sourced income exceeds ₹15 lakh.</strong>{" "}
                Under the Finance Act 2020 amendment, the relaxed threshold
                for a visiting citizen/PIO in this situation is 120 days,
                not 182. This calculator still applies 182 days below — it
                does not recalculate the second test for the income-linked
                threshold. Verify against incometax.gov.in for your
                specific year before relying on this.
              </>
            ) : (
              <>
                If your India-sourced income (excluding foreign-source
                income) exceeds ₹15 lakh this year, the Finance Act 2020
                amendment lowers the applicable relaxed threshold to 120
                days, not 182 — verify against incometax.gov.in for your
                specific year.
              </>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-1 rounded-lg bg-stone-50 p-4 dark:bg-primary-900/20">
        <ResultRow
          label="Second-test day threshold applied"
          value={`${result.appliedSecondTestThresholdDays} days`}
        />
        <ResultRow
          label="Meets basic resident test (182 days, or the second test)"
          value={result.metBasicResidentTest ? "Yes" : "No"}
        />
        <ResultRow
          label="Residential status"
          value={STATUS_LABEL[result.status]}
          status={result.status === "rnor" ? "warning" : "neutral"}
        />
      </div>

      <DownloadResultsButton
        fileNameBase="india-residential-status-result"
        calculatorTitle="India residential status & RNOR tool"
        inputs={[
          {
            label: "Days present in India this financial year",
            value: `${currentYearDays} days`,
          },
          {
            label: "Days present in India, preceding 4 financial years",
            value: `${precedingFourYearsDays} days`,
          },
          {
            label: "Citizen/PIO visiting India (182-day relaxed threshold)",
            value: isCitizenOrPioVisiting ? "Yes" : "No",
          },
          ...(isCitizenOrPioVisiting
            ? [
                {
                  label: "India-sourced income this financial year",
                  value: `₹${indiaSourceIncomeInr}`,
                },
              ]
            : []),
          {
            label: "Years NOT resident, of the preceding 10 financial years",
            value: `${yearsNonResidentInPrecedingTen} years`,
          },
          {
            label: "Days present in India, preceding 7 financial years",
            value: `${daysInPrecedingSevenYears} days`,
          },
        ]}
        results={[
          {
            label: "Second-test day threshold applied",
            value: `${result.appliedSecondTestThresholdDays} days`,
          },
          {
            label: "Meets basic resident test",
            value: result.metBasicResidentTest ? "Yes" : "No",
          },
          {
            label: "Residential status",
            value: STATUS_LABEL[result.status],
          },
          ...(incomeExceeds15L
            ? [
                {
                  label: "Note",
                  value:
                    "India-sourced income exceeds Rs 15 lakh — FA2020 lowers the relaxed threshold to 120 days, not applied above.",
                },
              ]
            : []),
        ]}
        disclaimer={PDF_DISCLAIMER}
        sources={[
          {
            label: "Income Tax Dept.: Residential Status",
            href: "https://www.incometaxindia.gov.in/w/residential-status",
          },
        ]}
      />

      <p className="text-xs text-stone-500 dark:text-primary-300/60">
        Thresholds and exceptions here reflect the general rule as commonly
        summarized — verify current-year figures against incometax.gov.in
        or with a chartered accountant before relying on this.
      </p>

      <HowCalculated>
        <p>
          Under Income Tax Act section 6, you&apos;re a resident if you meet
          Test A (present in India ≥182 days this financial year) or Test B
          (present ≥60 days this year — relaxed to 182 days for a visiting
          citizen/PIO not primarily here for other business — and ≥365 days
          across the preceding 4 financial years).
        </p>
        <p className="mt-2">
          If resident, you&apos;re RNOR rather than ordinarily resident if
          you were non-resident in at least 9 of the preceding 10 financial
          years, or present 729 days or fewer in the preceding 7 financial
          years.
        </p>
        <p className="mt-2">
          Not modeled: the Finance Act 2020 deemed-residency rule for
          citizens with no tax domicile elsewhere, and year-specific CBDT
          travel relaxations — see ADR 0002 and ADR 0003.
        </p>
      </HowCalculated>

      <SourceCitation
        sources={[
          {
            label: "Income Tax Dept.: Residential Status",
            href: "https://www.incometaxindia.gov.in/w/residential-status",
          },
        ]}
      />
    </CalculatorShell>
  );
}
