// Estimates relief under the ordinary foreign tax credit (FTC) method used
// by Article 25 of the India-US DTAA: foreign tax on an item of income can
// offset domestic tax on that same income, but only up to the domestic tax
// otherwise due on it.
//
// This models the general credit-method mechanic only. It does NOT model:
// income-basket/resourcing rules, India's Rule 128 procedural requirements
// (e.g. Form 67 filing deadline), US Form 1116 category limitations, PFIC/
// Subpart F treatment of Indian mutual funds, or carryover of unused
// credit. Treat the domestic tax rate entered here as a user-supplied
// estimate, not a rate this tool asserts — verify actual applicable rates
// and procedural rules against irs.gov / incometax.gov.in and the treaty
// text before relying on this.

export type ForeignTaxCreditInput = {
  foreignSourceIncome: number;
  foreignTaxPaid: number;
  domesticTaxRatePercent: number;
};

export type ForeignTaxCreditResult = {
  domesticTaxOnIncome: number;
  creditableForeignTax: number;
  nonCreditableForeignTax: number;
  netAdditionalDomesticTax: number;
};

export function estimateForeignTaxCredit(
  input: ForeignTaxCreditInput
): ForeignTaxCreditResult {
  const foreignSourceIncome = Math.max(0, input.foreignSourceIncome);
  const foreignTaxPaid = Math.max(0, input.foreignTaxPaid);
  const domesticTaxRatePercent = Math.max(0, input.domesticTaxRatePercent);

  const domesticTaxOnIncome =
    foreignSourceIncome * (domesticTaxRatePercent / 100);
  const creditableForeignTax = Math.min(foreignTaxPaid, domesticTaxOnIncome);
  const nonCreditableForeignTax = Math.max(
    foreignTaxPaid - creditableForeignTax,
    0
  );
  const netAdditionalDomesticTax = Math.max(
    domesticTaxOnIncome - creditableForeignTax,
    0
  );

  return {
    domesticTaxOnIncome,
    creditableForeignTax,
    nonCreditableForeignTax,
    netAdditionalDomesticTax,
  };
}
