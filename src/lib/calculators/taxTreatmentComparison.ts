// A static reference comparison of how common NRI investment types are
// taxed in India, for a side-by-side view. Figures are kept consistent
// with the rates already used elsewhere on this site (LTCG at 12.5% and
// STCG at 20% on listed equity/equity funds and immovable property post
// the Finance (No. 2) Act, 2024; the flat 30% + cess non-resident TDS rate
// on NRO interest under Section 195) — see nroInterestTds.ts,
// realEstateCapitalGains.ts, and nriPropertySaleTds.ts for the modeled
// calculators behind several of these rows.
//
// This is general information, not tax advice, and does not model DTAA
// relief, surcharge slabs, or your specific residency/tax-filing position.
// Rates and thresholds change with each Finance Act — verify current rates
// at incometax.gov.in before relying on this for a filing or investment
// decision.

export type InstrumentTaxProfile = {
  id: string;
  label: string;
  incomeTaxTreatment: string;
  capitalGainsTreatment: string;
  tdsTreatment: string;
  repatriability: string;
};

export const INSTRUMENT_TAX_PROFILES: InstrumentTaxProfile[] = [
  {
    id: "nre-account",
    label: "NRE savings / fixed deposit",
    incomeTaxTreatment:
      "Interest is exempt from Indian income tax under Section 10(4)(ii), as long as FEMA's person-resident-outside-India conditions are met.",
    capitalGainsTreatment: "Not applicable — interest-bearing deposit.",
    tdsTreatment: "None — exempt income is not subject to Indian TDS.",
    repatriability:
      "Freely repatriable. Funds are already held in convertible foreign exchange.",
  },
  {
    id: "nro-account",
    label: "NRO savings / fixed deposit",
    incomeTaxTreatment:
      "Interest is taxable in India at the NRI's applicable slab rate.",
    capitalGainsTreatment: "Not applicable — interest-bearing deposit.",
    tdsTreatment:
      "Flat 30% plus 4% cess (31.2% effective) withheld under Section 195, before any DTAA relief or Form 13 lower-TDS certificate.",
    repatriability:
      "Subject to RBI's USD 1 million per financial year facility for remittance of assets, net of applicable tax.",
  },
  {
    id: "equity-mf",
    label: "Equity mutual funds",
    incomeTaxTreatment:
      "Dividends/IDCW are taxable in India at the NRI's applicable rate.",
    capitalGainsTreatment:
      "LTCG (units held over 12 months): 12.5% above a ₹1.25 lakh exemption per financial year. STCG (12 months or less): 20%.",
    tdsTreatment:
      "The fund house withholds TDS on redemption — broadly at the LTCG/STCG rate above, subject to change under each Finance Act.",
    repatriability:
      "Sale proceeds (net of tax) are generally routed through NRO and subject to the USD 1 million per financial year facility.",
  },
  {
    id: "debt-mf",
    label: "Debt mutual funds",
    incomeTaxTreatment:
      "Dividends/IDCW are taxable in India at the NRI's applicable rate.",
    capitalGainsTreatment:
      "For units acquired on or after 1 April 2023, gains are taxed as short-term capital gains at slab rates regardless of holding period — the Finance Act, 2023 withdrew indexation and the LTCG concessional rate for most debt funds.",
    tdsTreatment:
      "The fund house withholds TDS on redemption at the NRI's applicable rate.",
    repatriability:
      "Same USD 1 million per financial year facility as equity mutual funds.",
  },
  {
    id: "direct-equity",
    label: "Direct equity (listed shares)",
    incomeTaxTreatment:
      "Dividends are taxable in India at the NRI's applicable rate.",
    capitalGainsTreatment:
      "LTCG (held over 12 months, STT-paid): 12.5% above a ₹1.25 lakh exemption per financial year. STCG (12 months or less): 20%.",
    tdsTreatment:
      "Typically withheld by the broker/depository participant at the applicable capital-gains rate at the time of sale.",
    repatriability:
      "Same USD 1 million per financial year facility, via the NRO route for sale proceeds.",
  },
  {
    id: "real-estate",
    label: "Real estate (residential/commercial)",
    incomeTaxTreatment:
      "Rental income is taxable in India at slab rates; the tenant typically withholds TDS at 31.2% under Section 195 unless a Form 13 lower-TDS certificate is obtained.",
    capitalGainsTreatment:
      "LTCG (held over 24 months): 12.5% without indexation. STCG (24 months or less): taxed at slab rates, not a flat rate.",
    tdsTreatment:
      "The buyer withholds TDS — 12.5% (LTCG) or 20% (STCG) by default, before any Form 13 relief — see the Real Estate Capital Gains category for the modeled calculator.",
    repatriability:
      "Sale proceeds repatriation is capped at the equivalent of two residential properties over the NRI's lifetime, within the broader USD 1 million facility.",
  },
];

export function getInstrumentTaxProfile(
  id: string
): InstrumentTaxProfile | undefined {
  return INSTRUMENT_TAX_PROFILES.find((profile) => profile.id === id);
}
