"use client";

import { useState } from "react";
import { calculateIndiaResidencyStatus } from "@/lib/calculators/indiaResidency";
import {
  CalculatorShell,
  CheckboxField,
  NumberField,
  ResultRow,
} from "./CalculatorShell";

const STATUS_LABEL: Record<string, string> = {
  "non-resident": "Non-Resident (NR)",
  rnor: "Resident but Not Ordinarily Resident (RNOR)",
  ror: "Resident and Ordinarily Resident (ROR)",
};

export default function IndiaResidencyCalculator() {
  const [currentYearDays, setCurrentYearDays] = useState(0);
  const [precedingFourYearsDays, setPrecedingFourYearsDays] = useState(0);
  const [isCitizenOrPioVisiting, setIsCitizenOrPioVisiting] = useState(false);
  const [yearsNonResidentInPrecedingTen, setYearsNonResidentInPrecedingTen] =
    useState(0);
  const [daysInPrecedingSevenYears, setDaysInPrecedingSevenYears] =
    useState(0);

  const result = calculateIndiaResidencyStatus({
    currentYearDays,
    precedingFourYearsDays,
    isCitizenOrPioVisiting,
    yearsNonResidentInPrecedingTen,
    daysInPrecedingSevenYears,
  });

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

      <div className="flex flex-col gap-1 rounded-md bg-zinc-50 p-4 dark:bg-zinc-900">
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
          emphasis
        />
      </div>

      <p className="text-xs text-zinc-500 dark:text-zinc-500">
        Thresholds and exceptions here reflect the general rule as commonly
        summarized — verify current-year figures against incometax.gov.in
        or with a chartered accountant before relying on this.
      </p>
    </CalculatorShell>
  );
}
