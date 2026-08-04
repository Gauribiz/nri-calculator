// TDS on NRO account interest under section 195 of the Income Tax Act,
// 1961: the standard rate is 30% plus 4% health & education cess (31.2%
// effective), applied from the first rupee — unlike a resident's FD
// interest, there is no basic exemption threshold before TDS applies. A
// lower rate can apply under Article 11 of the India-US DTAA (15% general
// rate; a lower 10% applies to certain approved financial institutions,
// not modeled here) if the recipient has a valid Tax Residency Certificate
// and has filed Form 10F for the year.
//
// Deliberately NOT modeled: surcharge (income-slab and aggregate-income
// dependent, set by each year's Finance Act — can push the effective rate
// above 31.2% for higher earners), the 10%/0% India-US DTAA rates for
// approved institutions/government loans, and the disputed question of
// whether section 206AA's no-PAN floor rate can override a lower
// DTAA-entitled rate — case law (e.g. Delhi HC's reasoning in cases like
// Danisco India) holds that a DTAA rate should still apply even without
// PAN, but bank/deductor practice varies and this is not a settled,
// bright-line rule this tool can safely encode. When PAN is missing, this
// calculator applies the standard domestic rate (the conservative
// default most deductors use in practice) rather than asserting the DTAA
// rate still applies — verify with a chartered accountant if this
// matters for a specific case. Verify all figures against irs.gov,
// incometax.gov.in, and the treaty text before relying on this.

export type NroInterestTdsInput = {
  grossInterestInr: number;
  hasPan: boolean;
  claimingDtaaBenefit: boolean;
};

export type NroInterestTdsResult = {
  appliedRatePercent: number;
  effectiveRatePercent: number;
  tdsAmountInr: number;
  netInterestInr: number;
  dtaaBenefitApplied: boolean;
};

const DOMESTIC_INTEREST_RATE_PERCENT = 30;
const DTAA_INDIA_US_INTEREST_RATE_PERCENT = 15;
const NO_PAN_FLOOR_RATE_PERCENT = 20;
const HEALTH_EDUCATION_CESS_RATE = 0.04;

export function calculateNroInterestTds(
  input: NroInterestTdsInput
): NroInterestTdsResult {
  const grossInterestInr = Math.max(0, input.grossInterestInr);
  const dtaaBenefitApplied = input.claimingDtaaBenefit && input.hasPan;

  let appliedRatePercent: number;
  if (dtaaBenefitApplied) {
    appliedRatePercent = DTAA_INDIA_US_INTEREST_RATE_PERCENT;
  } else if (!input.hasPan) {
    appliedRatePercent = Math.max(
      DOMESTIC_INTEREST_RATE_PERCENT,
      NO_PAN_FLOOR_RATE_PERCENT
    );
  } else {
    appliedRatePercent = DOMESTIC_INTEREST_RATE_PERCENT;
  }

  const effectiveRatePercent =
    appliedRatePercent * (1 + HEALTH_EDUCATION_CESS_RATE);
  const tdsAmountInr = grossInterestInr * (effectiveRatePercent / 100);
  const netInterestInr = grossInterestInr - tdsAmountInr;

  return {
    appliedRatePercent,
    effectiveRatePercent,
    tdsAmountInr,
    netInterestInr,
    dtaaBenefitApplied,
  };
}
