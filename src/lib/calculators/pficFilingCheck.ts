// Checks the Form 8621 "de minimis" filing exception for PFIC stock -- the category
// most Indian mutual funds fall into for US tax purposes, since they are foreign
// vehicles that hold or earn income from passive assets. This is a bright-line
// value/event test only.
//
// This does NOT determine whether a given fund IS a PFIC (that depends on the
// fund's own income/asset composition each year), does NOT compute any Section 1291
// "excess distribution" tax or the associated interest charge, and does NOT evaluate
// QEF or mark-to-market election eligibility (those elections generally require a
// PFIC annual information statement that most Indian mutual funds do not provide).
// Deliberately scoped to "is filing likely required," not "what tax is owed" -- see
// ADR 0009 for why a fuller tax-liability calculator was judged too high-liability
// for this general-information site. Verify against irs.gov and with a qualified US
// tax preparer experienced in PFIC reporting before relying on this.

export type PficFilingCheckInput = {
  aggregatePficValueUsd: number;
  filingStatus: "single_or_other" | "married_filing_jointly";
  receivedExcessDistributionOrDisposedStock: boolean;
  ownedThroughAnotherPfic: boolean;
};

export type PficFilingCheckResult = {
  thresholdUsd: number;
  likelyExemptFromFiling: boolean;
  reason: string;
};

export function checkPficFilingRequirement(
  input: PficFilingCheckInput
): PficFilingCheckResult {
  const value = Math.max(0, input.aggregatePficValueUsd);
  const thresholdUsd = input.ownedThroughAnotherPfic
    ? 5_000
    : input.filingStatus === "married_filing_jointly"
      ? 50_000
      : 25_000;
  const formattedThreshold = `$${thresholdUsd.toLocaleString("en-US")}`;

  if (input.receivedExcessDistributionOrDisposedStock) {
    return {
      thresholdUsd,
      likelyExemptFromFiling: false,
      reason:
        "A distribution was received or PFIC stock was disposed of this year -- the de minimis value exception does not apply regardless of total value.",
    };
  }

  if (value <= thresholdUsd) {
    return {
      thresholdUsd,
      likelyExemptFromFiling: true,
      reason: `Aggregate PFIC value is at or below the ${formattedThreshold} de minimis threshold for your situation, and no reportable distribution or disposition occurred this year.`,
    };
  }

  return {
    thresholdUsd,
    likelyExemptFromFiling: false,
    reason: `Aggregate PFIC value exceeds the ${formattedThreshold} de minimis threshold for your situation.`,
  };
}
