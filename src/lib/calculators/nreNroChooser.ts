// NRE vs NRO account chooser — a fund-sourcing rule, not a full account
// comparison. NRE (Non-Resident External) accounts may only hold funds
// originating outside India (foreign salary, foreign investment income,
// savings remitted from abroad); NRO (Non-Resident Ordinary) accounts hold
// income earned or accrued in India (rent, dividends from Indian
// companies/funds, pension from an Indian employer, sale proceeds of
// Indian assets, interest on existing India-based deposits).
//
// Deliberately NOT modeled: the interest-taxability and repatriation-limit
// differences between the two account types (NRE interest is exempt under
// section 10(4)(ii) and the principal is fully and freely repatriable; NRO
// interest is taxable with TDS — see nroInterestTds.ts — and repatriation
// of NRO funds is capped at USD 1 million per financial year with a CA
// certificate), joint-account rules (NRO permits a resident close relative
// as a joint holder under liberalised conditions, NRE does not), moving
// funds from NRE to NRO (allowed) versus NRO to NRE (generally not,
// without specific RBI permission), FCNR(B) as a foreign-currency-
// denominated alternative to NRE, or the RFC account used by returning
// NRIs. Verify against rbi.org.in / incometax.gov.in or with a bank's NRI
// desk before relying on this for a specific situation.

export type NreNroChooserInput = {
  hasForeignSourceFunds: boolean;
  hasIndiaSourceIncome: boolean;
};

export type NreNroRecommendation = "nre-only" | "nro-only" | "both" | "unclear";

export type NreNroChooserResult = {
  recommendation: NreNroRecommendation;
  needsNre: boolean;
  needsNro: boolean;
};

export function recommendNreNroAccounts(
  input: NreNroChooserInput
): NreNroChooserResult {
  const needsNre = input.hasForeignSourceFunds;
  const needsNro = input.hasIndiaSourceIncome;

  let recommendation: NreNroRecommendation;
  if (needsNre && needsNro) {
    recommendation = "both";
  } else if (needsNre) {
    recommendation = "nre-only";
  } else if (needsNro) {
    recommendation = "nro-only";
  } else {
    recommendation = "unclear";
  }

  return { recommendation, needsNre, needsNro };
}
