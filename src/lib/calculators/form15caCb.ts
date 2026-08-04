// Form 15CA/15CB requirement checker under Rule 37BB of the Income Tax
// Rules, 1962: translates facts the user already knows (is the remittance
// on the specified exempt list, is it chargeable to tax, has an Assessing
// Officer certificate/order already been obtained, what is the amount)
// into which Form 15CA part applies and whether a chartered accountant's
// Form 15CB certificate is also required.
//
// Deliberately NOT modeled: the specified list itself (33 categories of
// remittance under Rule 37BB — e.g. certain imports — that need no
// Form 15CA/15CB regardless of amount; this tool asks the user to
// determine list-membership themselves rather than reproducing all 33
// items, which change from time to time), whether a remittance is in fact
// "chargeable to tax" (a substantive tax-characterization question this
// tool does not answer), RBI's Liberalised Remittance Scheme USD 250,000/
// year cap (a separate restriction from the Form 15CA/15CB requirement,
// not evaluated here), and bank-specific paperwork (Form A2, purpose-code
// declarations) beyond the income-tax forms. Verify against
// incometax.gov.in and Rule 37BB's current text, or with a chartered
// accountant, before relying on this for a specific remittance.

export type Form15caCbInput = {
  isOnSpecifiedExemptList: boolean;
  isChargeableToTax: boolean;
  hasAssessingOfficerCertificate: boolean;
  remittanceAmountInr: number;
};

export type Form15caCbFormRequirement = "none" | "15ca-only" | "15ca-and-15cb";
export type Form15caCbPart = "A" | "B" | "C" | "D" | null;

export type Form15caCbResult = {
  formRequired: Form15caCbFormRequirement;
  part: Form15caCbPart;
};

const PART_A_THRESHOLD_INR = 500_000;

export function checkForm15caCb(input: Form15caCbInput): Form15caCbResult {
  if (input.isOnSpecifiedExemptList) {
    return { formRequired: "none", part: null };
  }

  if (!input.isChargeableToTax) {
    return { formRequired: "15ca-only", part: "D" };
  }

  if (input.hasAssessingOfficerCertificate) {
    return { formRequired: "15ca-only", part: "B" };
  }

  const remittanceAmountInr = Math.max(0, input.remittanceAmountInr);
  if (remittanceAmountInr <= PART_A_THRESHOLD_INR) {
    return { formRequired: "15ca-only", part: "A" };
  }

  return { formRequired: "15ca-and-15cb", part: "C" };
}
