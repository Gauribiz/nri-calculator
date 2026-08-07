// Estimates TDS a buyer must withhold under Section 393(2) when purchasing immovable
// property from an NRI seller. Unlike Section 194-IA's flat 1% for resident sellers,
// Section 393(2) requires the buyer to withhold at the rate the gain is actually
// taxable at, applied to the FULL sale consideration (not just the gain), unless the
// seller holds a lower/nil-deduction certificate.
//
// Default (no certificate) rates modeled here: 12.5% for long-term gains (property
// held over 24 months; see realEstateCapitalGains.ts) and 20% for short-term gains
// — the definite statutory rate under Section 393(2) [Table S. No. 17(e)], tied to
// Section 196's short-term capital gains classification (not a buyer estimate).
// A flat 4% health-and-education cess is added to whichever base rate applies,
// mirroring how this site's other TDS tool (NRE/NRO & TDS category) presents its
// rate: effective rate = base rate x 1.04.
//
// Deliberately NOT modeled: surcharge (10%-15% for capital-gains-type income,
// depending on the seller's total income, capped at 15% — unlike other income where
// surcharge can reach 25-37%), since a buyer, and this tool, cannot know the
// seller's total income. This means the effective rate on an actual TDS certificate
// or return will typically be somewhat higher than what this tool shows. Also not
// modeled: buyer's obligation to obtain a TAN (not a PAN) before deducting NRI TDS,
// or Form 27Q filing mechanics. Verify against incometax.gov.in before relying on
// this for a specific transaction.

export const CESS_RATE_PERCENT = 4;
export const LTCG_DEFAULT_TDS_RATE_PERCENT = 12.5;
export const STCG_DEFAULT_TDS_RATE_PERCENT = 20;

export type NriPropertySaleTdsInput = {
  saleConsiderationInr: number;
  isLongTerm: boolean;
  hasLowerDeductionCertificate: boolean;
  certifiedRatePercent: number;
};

export type NriPropertySaleTdsResult = {
  defaultBaseRatePercent: number;
  effectiveRatePercent: number;
  estimatedTdsInr: number;
  usedCertifiedRate: boolean;
};

export function estimateNriPropertySaleTds(
  input: NriPropertySaleTdsInput
): NriPropertySaleTdsResult {
  const saleConsiderationInr = Math.max(0, input.saleConsiderationInr);
  const defaultBaseRatePercent = input.isLongTerm
    ? LTCG_DEFAULT_TDS_RATE_PERCENT
    : STCG_DEFAULT_TDS_RATE_PERCENT;

  const usedCertifiedRate =
    input.hasLowerDeductionCertificate && input.certifiedRatePercent >= 0;

  const effectiveRatePercent = usedCertifiedRate
    ? input.certifiedRatePercent
    : defaultBaseRatePercent * (1 + CESS_RATE_PERCENT / 100);

  const estimatedTdsInr = saleConsiderationInr * (effectiveRatePercent / 100);

  return {
    defaultBaseRatePercent,
    effectiveRatePercent,
    estimatedTdsInr,
    usedCertifiedRate,
  };
}
