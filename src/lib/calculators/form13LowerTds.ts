// Explains Form 13 (the application for a lower/nil TDS deduction certificate under
// Section 197) as it applies to an NRI's property sale, and compares the default
// Section 195 TDS (withheld on the full sale consideration — see
// nriPropertySaleTds.ts) against the seller's own estimate of their actual tax
// liability on the gain, to gauge whether applying is likely worth the effort.
//
// Under the Income-tax Act, 2025 (in force from 1 April 2026, for FY 2026-27
// onward), Form 13 is renumbered Form 128 and Section 197 is renumbered Section
// 395 — the underlying mechanism (apply before the sale/registration, processed on
// the TRACES portal, certificate valid for one financial year) is not expected to
// change, but this renumbering itself has not been independently verified against
// the Act's official text; see the "not modeled" note in the ADR for this tool.
//
// This does NOT determine the actual tax liability itself (the seller must estimate
// or obtain that from the real-estate-capital-gains classifier tool or a tax
// preparer), does NOT guarantee a certificate will be granted at the seller's
// estimated rate (the Assessing Officer decides), and does NOT model application
// processing time (commonly several weeks — apply well before the planned sale/
// registration date). Verify against incometax.gov.in before relying on this.

export type Form13AssessmentInput = {
  saleConsiderationInr: number;
  isLongTerm: boolean;
  estimatedActualTaxLiabilityInr: number;
};

export type Form13AssessmentResult = {
  defaultTdsInr: number;
  estimatedActualTaxLiabilityInr: number;
  likelyExcessWithheldInr: number;
  worthApplying: boolean;
};

const LTCG_DEFAULT_RATE_PERCENT = 12.5;
const STCG_DEFAULT_RATE_PERCENT = 30;
const CESS_RATE_PERCENT = 4;

export function assessForm13Case(
  input: Form13AssessmentInput
): Form13AssessmentResult {
  const saleConsiderationInr = Math.max(0, input.saleConsiderationInr);
  const estimatedActualTaxLiabilityInr = Math.max(
    0,
    input.estimatedActualTaxLiabilityInr
  );

  const defaultBaseRatePercent = input.isLongTerm
    ? LTCG_DEFAULT_RATE_PERCENT
    : STCG_DEFAULT_RATE_PERCENT;
  const defaultEffectiveRatePercent =
    defaultBaseRatePercent * (1 + CESS_RATE_PERCENT / 100);
  const defaultTdsInr =
    saleConsiderationInr * (defaultEffectiveRatePercent / 100);

  const likelyExcessWithheldInr = Math.max(
    0,
    defaultTdsInr - estimatedActualTaxLiabilityInr
  );

  return {
    defaultTdsInr,
    estimatedActualTaxLiabilityInr,
    likelyExcessWithheldInr,
    worthApplying: likelyExcessWithheldInr > 0,
  };
}
