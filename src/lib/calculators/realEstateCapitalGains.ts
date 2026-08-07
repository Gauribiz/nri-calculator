// Classifies a sale of Indian immovable property (land/building) as long-term or
// short-term capital gains and estimates the gain and headline LTCG tax rate.
//
// Holding period: immovable property held for more than 24 months is long-term
// (LTCG); 24 months or less is short-term (STCG). Since the Finance (No. 2) Act,
// 2024 (effective 23 July 2024), LTCG on land/buildings is taxed at a flat 12.5%
// WITHOUT indexation. The Act's "grandfathering" option (20% WITH indexation, for
// property acquired before 23 July 2024, if lower) applies only to resident
// individuals and resident HUFs — NOT to NRIs — so this tool always uses the flat
// 12.5% rate for LTCG, with no indexation branch. STCG on property has no special
// rate; it is taxed at the seller's ordinary income-tax slab rate, which this tool
// cannot know, so it does not estimate a rupee STCG tax figure.
//
// Deliberately NOT modeled: indexation (moot for NRIs per the above), Section 50C/
// 43CA stamp-duty-value substitution (if the stamp-duty value of the property
// exceeds the actual sale consideration, gains are computed on the higher stamp-
// duty value instead, subject to a safe-harbor tolerance), Section 54/54EC/54F
// reinvestment exemptions, surcharge and cess on the LTCG tax figure, and any
// foreign-currency conversion (RBI's rules for computing capital gains on assets
// bought in foreign currency, applicable to some NRIs, are not applied here — see
// Section 48 first proviso). Verify against incometax.gov.in and with a chartered
// accountant before relying on this for a specific sale.

export const LONG_TERM_HOLDING_THRESHOLD_MONTHS = 24;
export const LTCG_TAX_RATE_PERCENT = 12.5;

export type RealEstateCapitalGainsInput = {
  holdingPeriodMonths: number;
  saleConsiderationInr: number;
  costOfAcquisitionInr: number;
  costOfImprovementInr: number;
  transferExpensesInr: number;
};

export type RealEstateCapitalGainsResult = {
  isLongTerm: boolean;
  capitalGainInr: number;
  estimatedLtcgTaxInr: number | null;
};

export function calculateRealEstateCapitalGains(
  input: RealEstateCapitalGainsInput
): RealEstateCapitalGainsResult {
  const holdingPeriodMonths = Math.max(0, input.holdingPeriodMonths);
  const saleConsiderationInr = Math.max(0, input.saleConsiderationInr);
  const costOfAcquisitionInr = Math.max(0, input.costOfAcquisitionInr);
  const costOfImprovementInr = Math.max(0, input.costOfImprovementInr);
  const transferExpensesInr = Math.max(0, input.transferExpensesInr);

  const isLongTerm = holdingPeriodMonths > LONG_TERM_HOLDING_THRESHOLD_MONTHS;

  const capitalGainInr =
    saleConsiderationInr -
    costOfAcquisitionInr -
    costOfImprovementInr -
    transferExpensesInr;

  const estimatedLtcgTaxInr = isLongTerm
    ? Math.max(0, capitalGainInr) * (LTCG_TAX_RATE_PERCENT / 100)
    : null;

  return {
    isLongTerm,
    capitalGainInr,
    estimatedLtcgTaxInr,
  };
}
