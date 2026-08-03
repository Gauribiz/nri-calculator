// India tax residential status for individuals (Income Tax Act, 1961,
// section 6) — the two basic tests plus the "Resident but Not Ordinarily
// Resident" (RNOR) refinement.
//
// Deliberately NOT modeled, and needing a chartered accountant's review
// before this is treated as authoritative: the Finance Act 2020 deemed-
// residency rule for Indian citizens not liable to tax in any other
// country, the graded 120-day (income > Rs 15 lakh) vs 182-day threshold
// nuance for citizens/PIOs visiting India, and any year-specific CBDT
// relaxations (e.g. COVID-year travel exceptions). Verify current
// thresholds against incometax.gov.in before publishing or relying on
// this for a specific year.

export type IndiaResidencyInput = {
  currentYearDays: number;
  precedingFourYearsDays: number;
  isCitizenOrPioVisiting: boolean;
  yearsNonResidentInPrecedingTen: number;
  daysInPrecedingSevenYears: number;
};

export type IndiaResidencyStatus = "non-resident" | "rnor" | "ror";

export type IndiaResidencyResult = {
  status: IndiaResidencyStatus;
  metBasicResidentTest: boolean;
  appliedSecondTestThresholdDays: number;
};

const TEST_A_THRESHOLD_DAYS = 182;
const DEFAULT_TEST_B_THRESHOLD_DAYS = 60;
const CITIZEN_OR_PIO_VISITING_TEST_B_THRESHOLD_DAYS = 182;
const PRECEDING_FOUR_YEARS_THRESHOLD_DAYS = 365;
const RNOR_NON_RESIDENT_YEARS_THRESHOLD = 9;
const RNOR_PRECEDING_SEVEN_YEARS_DAYS_THRESHOLD = 729;

export function calculateIndiaResidencyStatus(
  input: IndiaResidencyInput
): IndiaResidencyResult {
  const currentYearDays = Math.max(0, input.currentYearDays);
  const precedingFourYearsDays = Math.max(0, input.precedingFourYearsDays);
  const yearsNonResidentInPrecedingTen = Math.min(
    10,
    Math.max(0, input.yearsNonResidentInPrecedingTen)
  );
  const daysInPrecedingSevenYears = Math.max(0, input.daysInPrecedingSevenYears);

  const appliedSecondTestThresholdDays = input.isCitizenOrPioVisiting
    ? CITIZEN_OR_PIO_VISITING_TEST_B_THRESHOLD_DAYS
    : DEFAULT_TEST_B_THRESHOLD_DAYS;

  const meetsTestA = currentYearDays >= TEST_A_THRESHOLD_DAYS;
  const meetsTestB =
    currentYearDays >= appliedSecondTestThresholdDays &&
    precedingFourYearsDays >= PRECEDING_FOUR_YEARS_THRESHOLD_DAYS;

  const metBasicResidentTest = meetsTestA || meetsTestB;

  if (!metBasicResidentTest) {
    return {
      status: "non-resident",
      metBasicResidentTest,
      appliedSecondTestThresholdDays,
    };
  }

  const isRnor =
    yearsNonResidentInPrecedingTen >= RNOR_NON_RESIDENT_YEARS_THRESHOLD ||
    daysInPrecedingSevenYears <= RNOR_PRECEDING_SEVEN_YEARS_DAYS_THRESHOLD;

  return {
    status: isRnor ? "rnor" : "ror",
    metBasicResidentTest,
    appliedSecondTestThresholdDays,
  };
}
