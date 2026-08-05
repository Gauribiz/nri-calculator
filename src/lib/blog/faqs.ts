export type Faq = {
  id: string;
  clusterSlug: string;
  question: string;
  answer: string;
  relatedArticleSlug?: string;
};

export const faqs: Faq[] = [
  {
    id: "am-i-an-nri-for-tax-purposes",
    clusterSlug: "dtaa-tax-residency",
    question: "Am I an NRI for tax purposes, or a resident?",
    answer:
      "It depends which country's tax authority is asking, and residency is decided year by year on your actual day-count, not on your visa type or how long you've generally lived abroad. India uses its own day-in-India test; the US uses the Substantial Presence Test for non-citizens (green card holders and citizens are automatically US tax residents). You can be a non-resident in one country and a resident in the other in the same year.",
    relatedArticleSlug: "nri-or-resident-how-tax-residency-works",
  },
  {
    id: "does-dtaa-mean-i-pay-no-tax-twice",
    clusterSlug: "dtaa-tax-residency",
    question: "Does the DTAA mean I never pay tax twice on the same income?",
    answer:
      "Not automatically, and not always fully. The DTAA sets out relief mechanisms — mainly a foreign tax credit (capped at what your resident country would have charged) or, for specific income categories, an exemption — but you generally have to actively claim that relief on your return, with documentation. It reduces double taxation; it doesn't eliminate the need to file correctly in both countries where required.",
    relatedArticleSlug: "claiming-dtaa-relief-credit-vs-exemption",
  },
  {
    id: "which-account-nre-or-nro",
    clusterSlug: "nre-nro-tds",
    question: "Should my salary from abroad go into an NRE or NRO account?",
    answer:
      "Foreign-earned income like salary from abroad generally belongs in an NRE account — it's freely repatriable and the interest is tax-exempt in India. India-sourced income (rent, dividends, pension, asset sale proceeds) belongs in an NRO account instead, which faces India tax and an RBI repatriation ceiling. Mixing the two isn't just a tax inefficiency — it can create a FEMA compliance issue.",
    relatedArticleSlug: "nre-vs-nro-accounts-which-do-you-need",
  },
  {
    id: "can-i-get-nro-tds-back",
    clusterSlug: "nre-nro-tds",
    question: "Can I get back TDS withheld on my NRO interest if it's more than I actually owe?",
    answer:
      "Yes — TDS is a withholding rate, not your final liability. If your actual Indian tax liability for the year is lower than what was withheld (common once your total income, deductions, and any DTAA relief are factored in), you recover the difference by filing an Indian income tax return and claiming a refund. A Tax Residency Certificate plus Form 10F, submitted to your bank in advance, can also unlock a lower treaty rate at the point of withholding rather than waiting for a refund.",
    relatedArticleSlug: "tds-on-nro-interest-explained",
  },
  {
    id: "do-i-always-need-form-15cb",
    clusterSlug: "nre-nro-tds",
    question: "Do I always need a CA certificate (Form 15CB) to remit money out of India?",
    answer:
      "No. Whether Form 15CB is required depends on the remittance amount and whether it falls on the specified exempt list under Rule 37BB. Smaller or listed-exempt remittances can qualify for simplified treatment (Form 15CA Part A or Part D) without a CA certificate; larger taxable remittances typically need both the certificate and the corresponding 15CA part. Because the CA certificate takes time to arrange, it's worth checking which category applies well before a remittance deadline.",
    relatedArticleSlug: "form-15ca-15cb-explained",
  },
  {
    id: "how-much-can-i-repatriate-per-year",
    clusterSlug: "investments-repatriation",
    question: "Is there a limit on how much money I can move out of India per year?",
    answer:
      "It depends on the account. NRE funds are freely repatriable with no RBI ceiling. NRO funds — built from India-sourced income — are capped by an annual RBI ceiling under FEMA (current and accumulated income combined), applied per remitter rather than per account, plus Form 15CA/15CB documentation. Property sale proceeds have their own related documentation given their interaction with Section 195 TDS.",
    relatedArticleSlug: "nri-repatriation-limits-explained",
  },
  {
    id: "are-indian-mutual-funds-a-problem-for-us-taxes",
    clusterSlug: "investments-repatriation",
    question: "I'm a US person — are Indian mutual funds a problem for my US taxes?",
    answer:
      "Very likely, yes. Indian mutual funds are typically classified as PFICs (Passive Foreign Investment Companies) under US tax law, which triggers both a punitive default tax treatment on gains/distributions and a separate annual filing obligation (Form 8621) once value thresholds are crossed — independent of whether you sold anything that year. This surprises a lot of NRIs who assumed a mutual fund was too ordinary an investment to trigger special US reporting.",
    relatedArticleSlug: "pfic-rules-for-nris-mutual-fund-trap",
  },
  {
    id: "can-nris-buy-property-in-india",
    clusterSlug: "real-estate-capital-gains",
    question: "Can NRIs buy any type of property in India?",
    answer:
      "NRIs can generally purchase residential and commercial property in India. Agricultural land, plantation property, and farmhouses are the notable exceptions, generally restricted for NRI purchase under FEMA rules (inheriting such property is treated differently from purchasing it).",
    relatedArticleSlug: "nri-investment-options-in-india-overview",
  },
  {
    id: "how-is-property-sale-gain-taxed",
    clusterSlug: "real-estate-capital-gains",
    question: "How is the gain on selling my Indian property actually taxed?",
    answer:
      "It depends on your holding period. Hold the property more than 24 months and the gain is long-term (LTCG), taxed at a flat rate under the post-Finance (No. 2) Act, 2024 regime, without the indexation option available to resident individuals. Hold it 24 months or less and it's short-term (STCG), added to your other income and taxed at your slab rate instead of a flat rate.",
    relatedArticleSlug: "selling-property-in-india-as-nri-ltcg-vs-stcg",
  },
  {
    id: "why-is-tds-so-high-on-my-property-sale",
    clusterSlug: "real-estate-capital-gains",
    question: "Why did the buyer withhold so much TDS on my property sale — way more than my actual gain?",
    answer:
      "Because Section 195 TDS on an NRI seller is calculated by default on the full sale consideration, not on your capital gain, unlike the lower-rate withholding that applies to resident sellers. For a property that's appreciated significantly, that produces a much larger withheld amount than your actual tax liability. A lower/nil TDS certificate obtained in advance (Form 13, being renumbered Form 128 under the Income-tax Act, 2025) can correct this at the source instead of waiting for a refund after filing.",
    relatedArticleSlug: "section-195-tds-on-nri-property-sales",
  },
  {
    id: "is-this-site-personalized-advice",
    clusterSlug: "dtaa-tax-residency",
    question: "Is anything on this site personalized tax or legal advice?",
    answer:
      "No. Every calculator and article here explains how a rule generally works and applies well-established formulas to the numbers you enter — it doesn't account for your complete individual circumstances, and none of it is a substitute for advice from a qualified, licensed tax advisor, chartered accountant, or attorney familiar with your specific situation. See the disclaimer on every page for the full statement.",
  },

  // --- batch 2 additions ---
  {
    id: "what-is-rnor-status",
    clusterSlug: "dtaa-tax-residency",
    question: "What is RNOR status, and why does it matter for a returning NRI?",
    answer:
      "RNOR (Resident but Not Ordinarily Resident) is a transitional status between non-resident and full resident, typically available to NRIs returning to settle in India if they were a non-resident in 9 of the preceding 10 financial years, or present in India under 730 days across the preceding 7 years. While it applies (generally up to about 3 financial years after return), only India-sourced income is taxed — foreign income stays outside India's tax net, the same as it would for a non-resident.",
    relatedArticleSlug: "rnor-status-explained-for-returning-nris",
  },
  {
    id: "what-is-a-dual-status-tax-year",
    clusterSlug: "dtaa-tax-residency",
    question: "What does it mean to file a \"dual-status\" US tax return?",
    answer:
      "It applies in the year you move to or from the US: you're a nonresident alien for part of the year and a resident alien for the rest, taxed on worldwide income only for the resident portion and on US-source income only for the nonresident portion. It requires a combination filing rather than a single standard Form 1040, and some usual conveniences like the standard deduction generally aren't available without a separate election.",
    relatedArticleSlug: "dual-status-tax-return-year-you-move",
  },
  {
    id: "do-i-need-form-8833",
    clusterSlug: "dtaa-tax-residency",
    question: "Do I need to file Form 8833 if I claim a DTAA benefit on my US return?",
    answer:
      "Generally yes, if the treaty position overrides what standard US tax law would otherwise produce — the IRS requires disclosure under Section 6114, and skipping it carries a $1,000 penalty for individuals even if the treaty claim itself was valid. Some routine treaty positions are specifically exempted from this disclosure requirement, so check the current Form 8833 instructions for whether your particular claim qualifies as an exception.",
    relatedArticleSlug: "form-8833-treaty-based-return-disclosure",
  },
  {
    id: "what-is-an-fcnr-account",
    clusterSlug: "nre-nro-tds",
    question: "What's the difference between an FCNR deposit and an NRE deposit?",
    answer:
      "Both are tax-exempt and freely repatriable, but an NRE deposit is held in rupees (so it's exposed to exchange-rate movement), while an FCNR deposit is held in a foreign currency the entire time — no conversion to rupees at any point — so the principal is shielded from rupee depreciation or appreciation. The trade-off is that FCNR is term-deposit-only with a minimum one-year tenure, not a savings-account option.",
    relatedArticleSlug: "fcnr-deposits-explained",
  },
  {
    id: "does-an-nri-with-no-india-income-need-to-file",
    clusterSlug: "nre-nro-tds",
    question: "If I have no India income at all, do I still need to file an Indian tax return?",
    answer:
      "Generally not mandatory in that case, but a few specific triggers apply regardless of your total income level: any short-term capital gains on listed equity or equity mutual fund units, TDS/TCS on India income exceeding ₹25,000 in the year, or depositing more than ₹1 crore across current accounts. Any one of those makes filing mandatory even with otherwise minimal India income, so check for these before assuming you're exempt.",
    relatedArticleSlug: "do-nris-need-to-file-indian-tax-return",
  },
  {
    id: "who-withholds-tds-on-rent-to-nri-landlord",
    clusterSlug: "nre-nro-tds",
    question: "If my landlord is an NRI, who has to withhold the TDS on my rent?",
    answer:
      "The tenant does, under Section 195 — not the landlord, and not the standard resident-landlord rent TDS rules. There's no minimum rent threshold before this applies (unlike renting from a resident), the default rate runs around 30% plus cess, and the tenant generally needs a TAN to deposit it correctly. A lower rate is possible if the landlord has a DTAA-based or certificate-based reduction in hand in advance.",
    relatedArticleSlug: "tds-on-rent-paid-to-nri-landlord",
  },
  {
    id: "what-is-the-difference-between-fbar-and-fatca",
    clusterSlug: "investments-repatriation",
    question: "What's the difference between FBAR and FATCA reporting for US persons with Indian accounts?",
    answer:
      "FBAR (FinCEN Form 114) applies once your combined foreign account value exceeds $10,000 at any point in the year, filed separately from your tax return. FATCA (Form 8938, filed with your return) has higher, filing-status-and-residence-dependent thresholds and covers a broader range of foreign assets, not just accounts. You can owe both for the same holdings in the same year — they aren't alternatives to each other.",
    relatedArticleSlug: "fbar-fatca-reporting-for-nris",
  },
  {
    id: "can-nris-invest-in-nps",
    clusterSlug: "investments-repatriation",
    question: "Can NRIs invest in India's National Pension System (NPS)?",
    answer:
      "Yes, on largely the same terms as resident Indians, funded through an NRE or NRO account. The notable exception is eligibility itself: NPS is open based on Indian citizenship, not the broader PIO/OCI category, so OCIs and PIOs are generally not eligible to open an account, unlike some other NRI investment routes.",
    relatedArticleSlug: "nps-for-nris-explained",
  },
  {
    id: "is-a-gift-from-my-parents-in-india-taxable-in-the-us",
    clusterSlug: "investments-repatriation",
    question: "I'm a US person and my parents in India sent me a large gift — do I owe US tax on it?",
    answer:
      "Generally not income tax — a gift from a foreign person isn't taxable income to the US recipient. But if gifts from a nonresident alien (or related nonresident aliens combined) exceed $100,000 in the year, you're required to report it on Form 3520, itemizing gifts over $5,000 individually. This is a reporting requirement, not a tax bill, but the penalty for missing it can run up to 25% of the gift's value.",
    relatedArticleSlug: "gifting-money-india-us-tax-rules",
  },
  {
    id: "can-nris-reduce-property-sale-tax-by-reinvesting",
    clusterSlug: "real-estate-capital-gains",
    question: "Can NRIs avoid capital gains tax on a property sale by reinvesting the money?",
    answer:
      "NRIs get the same reinvestment exemptions residents do: Section 54 exempts LTCG reinvested into another Indian residential property within a set window (1 year before to 2 years after the sale, or 3 years for construction), and Section 54EC exempts LTCG from land/building sales reinvested into specified bonds within 6 months, subject to an annual cap. Neither is automatic — both require action within the deadline.",
    relatedArticleSlug: "section-54-54ec-exemptions-for-nris",
  },
  {
    id: "how-is-inherited-property-cost-basis-calculated",
    clusterSlug: "real-estate-capital-gains",
    question: "I inherited property in India — what counts as the \"cost\" when I sell it?",
    answer:
      "The original owner's actual purchase cost carries forward to you, not the property's value on the date you inherited it. The holding period also carries forward from the original owner's acquisition date, which can make an inherited property long-term even if you personally inherited it recently. If the original owner bought before April 1, 2001, the fair market value as of that date can be elected as the cost basis instead, with a registered valuer's certificate.",
    relatedArticleSlug: "selling-inherited-property-in-india-as-nri",
  },
  {
    id: "does-tcs-apply-to-nri-repatriation",
    clusterSlug: "real-estate-capital-gains",
    question: "Does the TCS on foreign remittance I keep hearing about apply to my NRI repatriation?",
    answer:
      "No — that TCS applies under the Liberalised Remittance Scheme (LRS), which is specifically for resident Indians sending money abroad. NRIs are non-residents under FEMA, so LRS doesn't apply to them at all. NRI repatriation instead runs through NRE's free repatriation, the NRO annual ceiling with Form 15CA/15CB, or, for property sales, Section 195 TDS — none of which involve LRS or its TCS rates.",
    relatedArticleSlug: "tcs-lrs-and-nri-remittances-explained",
  },
];

export function getFaqsForCluster(clusterSlug: string): Faq[] {
  return faqs.filter((faq) => faq.clusterSlug === clusterSlug);
}
