// Estimates TDS withheld on NRO account interest under the flat non-resident
// withholding rate (historically Section 195 of the Income Tax Act, 1961),
// plus the standard 4% health & education cess.
//
// Does NOT model: surcharge (income-slab-dependent, 10/15/25/37% with
// marginal relief — varies by the account holder's total income, which
// this tool doesn't collect), any lower rate obtained via a valid Tax
// Residency Certificate + Form 10F + no-PE declaration under a DTAA
// (the tool lets the user supply their own certified/treaty rate instead
// of asserting one), or refund of excess TDS via ITR filing when actual
// tax liability is lower than the amount withheld.

const BASE_TDS_RATE_PERCENT = 30;
const CESS_PERCENT = 4;

export const STATUTORY_NRO_TDS_RATE_PERCENT =
  BASE_TDS_RATE_PERCENT * (1 + CESS_PERCENT / 100);

export type NroInterestTdsInput = {
  annualNroInterest: number;
  useLowerRate: boolean;
  lowerRatePercent: number;
};

export type NroInterestTdsResult = {
  effectiveRatePercent: number;
  tdsAmount: number;
  netInterest: number;
};

export function estimateNroInterestTds(
  input: NroInterestTdsInput
): NroInterestTdsResult {
  const annualNroInterest = Math.max(0, input.annualNroInterest);
  const effectiveRatePercent = Math.max(
    0,
    input.useLowerRate
      ? input.lowerRatePercent
      : STATUTORY_NRO_TDS_RATE_PERCENT
  );

  const tdsAmount = annualNroInterest * (effectiveRatePercent / 100);
  const netInterest = annualNroInterest - tdsAmount;

  return { effectiveRatePercent, tdsAmount, netInterest };
}
