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
];

export function getFaqsForCluster(clusterSlug: string): Faq[] {
  return faqs.filter((faq) => faq.clusterSlug === clusterSlug);
}
