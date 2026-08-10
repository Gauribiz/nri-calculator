// Splits the change in an INR-denominated asset's value, viewed in USD terms,
// into two additive components: real growth (the asset's own performance,
// measured in INR) and currency effect (the impact of USD/INR exchange rate
// movement between the two dates).
//
// This uses an exact additive decomposition with no residual/interaction
// term, a standard technique in international portfolio performance
// attribution: the currency effect is measured on the ENDING INR value at
// the two exchange rates, and real growth is measured on the CHANGE in INR
// value converted at the STARTING exchange rate. The two components always
// sum exactly to the total USD change.
//
// Not modeled: additional contributions or withdrawals between the two
// dates (this assumes a single lump-sum comparison), tax on gains, and
// remittance frictions such as TCS on outward remittance under LRS, bank
// conversion margins, or bid/ask spread — the exchange rates you enter
// should be the same type of rate (e.g. both RBI reference rates, or both
// your bank's card rates) for the split to be meaningful.

export type CurrencyImpactInput = {
  initialValueInr: number;
  initialRateInrPerUsd: number;
  currentValueInr: number;
  currentRateInrPerUsd: number;
};

export type CurrencyImpactResult = {
  initialValueUsd: number;
  currentValueUsd: number;
  totalChangeUsd: number;
  totalChangePercent: number;
  realGrowthUsd: number;
  realGrowthPercent: number;
  currencyEffectUsd: number;
  currencyEffectPercent: number;
  inrAppreciated: boolean;
};

export function estimateCurrencyImpact(
  input: CurrencyImpactInput
): CurrencyImpactResult {
  const initialValueInr = Math.max(0, input.initialValueInr);
  const currentValueInr = Math.max(0, input.currentValueInr);
  const initialRate = Math.max(0.01, input.initialRateInrPerUsd);
  const currentRate = Math.max(0.01, input.currentRateInrPerUsd);

  const initialValueUsd = initialValueInr / initialRate;
  const currentValueUsd = currentValueInr / currentRate;
  const totalChangeUsd = currentValueUsd - initialValueUsd;

  const realGrowthUsd = (currentValueInr - initialValueInr) / initialRate;
  const currencyEffectUsd = currentValueInr / currentRate - currentValueInr / initialRate;

  const base = initialValueUsd > 0 ? initialValueUsd : null;

  return {
    initialValueUsd,
    currentValueUsd,
    totalChangeUsd,
    totalChangePercent: base ? (totalChangeUsd / base) * 100 : 0,
    realGrowthUsd,
    realGrowthPercent: base ? (realGrowthUsd / base) * 100 : 0,
    currencyEffectUsd,
    currencyEffectPercent: base ? (currencyEffectUsd / base) * 100 : 0,
    inrAppreciated: currentRate < initialRate,
  };
}
