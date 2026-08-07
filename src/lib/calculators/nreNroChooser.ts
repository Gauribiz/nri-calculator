// Helps a user decide between an NRE and NRO account based on FEMA's basic
// distinction: NRE accounts hold foreign-earned funds remitted from abroad
// (tax-exempt interest, freely repatriable); NRO accounts hold India-sourced
// income like rent, dividends, pension, or sale proceeds (taxable interest,
// TDS withheld, repatriation capped and documented).
//
// This does NOT model: FCNR accounts, RFC accounts (for returning NRIs),
// the specific FEMA "person resident outside India" test itself (assumed
// true when the user answers "yes"), or account-opening KYC requirements.
// It is a decision aid, not an eligibility determination.

export type FundsSource = "foreign" | "india" | "both";

export type NreNroChooserInput = {
  isNriOrPio: boolean;
  fundsSource: FundsSource;
  needsFullRepatriability: boolean;
};

export type AccountRecommendation = "NRE" | "NRO" | "both" | "neither";

export type NreNroChooserResult = {
  recommendation: AccountRecommendation;
  notes: string[];
};

export function chooseNreOrNro(
  input: NreNroChooserInput
): NreNroChooserResult {
  if (!input.isNriOrPio) {
    return {
      recommendation: "neither",
      notes: [
        "NRE and NRO accounts are specifically for individuals who qualify as an NRI or PIO under FEMA. If you're unsure of your FEMA residency status, check with your bank before opening either account type — it's a separate test from income-tax residency.",
      ],
    };
  }

  if (input.fundsSource === "foreign") {
    return {
      recommendation: "NRE",
      notes: [
        "An NRE account is for funds you earned outside India and remit in. Interest is exempt from Indian income tax, and both principal and interest are freely repatriable.",
        "The exemption depends on you genuinely qualifying as a person resident outside India under FEMA — don't route India-sourced income (rent, dividends, pension) through an NRE account.",
      ],
    };
  }

  if (input.fundsSource === "india") {
    const notes = [
      "An NRO account is for income earned or received in India — rent, dividends, pension, sale proceeds, and similar. Interest earned is taxable in India, with TDS withheld at source.",
    ];
    if (input.needsFullRepatriability) {
      notes.push(
        "NRO repatriation is capped at USD 1 million per financial year (net of applicable taxes) and requires a CA-certified Form 15CB alongside Form 15CA above the threshold checked in the tool below — it is not as unrestricted as an NRE account."
      );
    }
    return { recommendation: "NRO", notes };
  }

  return {
    recommendation: "both",
    notes: [
      "You can hold an NRE account for money remitted from abroad and an NRO account for India-sourced income at the same time — most NRIs with both kinds of income end up doing this.",
      "Keep the two income streams in the correct account: crediting India-sourced income into an NRE account can jeopardize its tax-exempt, freely-repatriable status.",
    ],
  };
}
