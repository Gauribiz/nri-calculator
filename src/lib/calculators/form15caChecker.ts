// Checks which parts of Form 15CA (and whether Form 15CB) apply to a single
// foreign remittance, based on the aggregate-per-financial-year Rs 5 lakh
// threshold under Rule 37BB.
//
// Does NOT model: the full Rule 37BB specified list of remittance types
// exempt from Form 15CA/15CB entirely (this tool takes the user's own
// "is this on the exempt list" answer rather than checking it against the
// list itself), aggregation across multiple remittances within the same
// financial year (the user must supply the correct running total), or
// Form 15CA Part D (used by authorized dealers/banks, not the remitter).

const PART_A_THRESHOLD_INR = 500_000;

export type Form15caCheckerInput = {
  remittanceAmount: number;
  isOnRbiExemptList: boolean;
  hasAoCertificateOrOrder: boolean;
};

export type Form15caPart = "none" | "A" | "B" | "C";

export type Form15caCheckerResult = {
  part: Form15caPart;
  needsForm15cb: boolean;
};

export function checkForm15caRequirement(
  input: Form15caCheckerInput
): Form15caCheckerResult {
  if (input.isOnRbiExemptList) {
    return { part: "none", needsForm15cb: false };
  }

  if (input.hasAoCertificateOrOrder) {
    return { part: "B", needsForm15cb: false };
  }

  const remittanceAmount = Math.max(0, input.remittanceAmount);

  if (remittanceAmount <= PART_A_THRESHOLD_INR) {
    return { part: "A", needsForm15cb: false };
  }

  return { part: "C", needsForm15cb: true };
}
