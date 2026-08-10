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
{
  id: "how-is-the-foreign-tax-credit-capped",
  clusterSlug: "dtaa-tax-residency",
  question: "Is there a limit on how much Indian tax I can credit using Form 1116?",
  answer:
    "Yes. The Foreign Tax Credit is capped separately for each income \"basket\" (passive vs. general category) at the US tax attributable to that basket's foreign-source income — it can eliminate US tax on that income but can't refund Indian tax beyond that cap. Credit you can't use in the current year because of this cap isn't lost: it carries back one year and then forward up to ten years within the same basket.",
  relatedArticleSlug: "foreign-tax-credit-form-1116-for-nris",
},
{
  id: "what-is-the-dtaa-tie-breaker-test",
  clusterSlug: "dtaa-tax-residency",
  question: "What happens if both India and the US treat me as a tax resident in the same year?",
  answer:
    "Article 4 of the India-US DTAA resolves it through a fixed, sequential tie-breaker test: first where you have a permanent home available, then (if that's tied) where your personal and economic relations are closer (center of vital interests), then habitual abode, then nationality, and finally — only if all else ties — a government-to-government mutual agreement procedure. Most real cases are resolved at the first or second step.",
  relatedArticleSlug: "dtaa-tie-breaker-test-explained",
},
{
  id: "who-has-to-pay-the-us-exit-tax",
  clusterSlug: "dtaa-tax-residency",
  question: "Do all green card holders owe exit tax when they give up their green card?",
  answer:
    "No. The exit tax under IRC 877A only applies to \"long-term residents\" — those who held a green card in at least 8 of the last 15 tax years — and even then, only if you separately meet one of three \"covered expatriate\" tests: net worth of $2 million or more, average annual US tax liability over an inflation-adjusted threshold, or failure to certify five years of tax compliance on Form 8854. A long-term resident who is a covered expatriate faces a mark-to-market deemed sale of their worldwide assets, with only the gain above an annually adjusted exclusion amount taxed.",
  relatedArticleSlug: "us-exit-tax-for-green-card-holders",
},
{
  id: "can-i-transfer-nro-funds-to-nre",
  clusterSlug: "nre-nro-tds",
  question: "Can I transfer money from my NRO account into my NRE account?",
  answer:
    "Yes, RBI rules allow it, but it isn't a way around the usual NRO restrictions — the transfer counts as repatriation of NRO funds under FEMA. It draws on the same annual RBI ceiling (commonly cited as USD 1 million per financial year; confirm the current figure) that applies to NRO remittances generally, and requires the same Form 15CA/15CB documentation. Only current income or other RBI-eligible NRO balances with tax already accounted for typically qualify.",
  relatedArticleSlug: "nro-to-nre-transfer-explained",
},
{
  id: "why-is-nro-fd-tds-so-high",
  clusterSlug: "nre-nro-tds",
  question: "Why is TDS on my NRO fixed deposit so high?",
  answer:
    "Unlike a resident FD, NRO FD interest has no basic exemption threshold — TDS under Section 195 applies from the first rupee, commonly cited at a flat 30% plus surcharge and cess (confirm the current rate and surcharge slabs, which vary by income level). Submitting a Tax Residency Certificate and Form 10F to your bank in advance can unlock a lower DTAA treaty rate at source instead; without that, the excess is only recoverable later by filing an Indian tax return.",
  relatedArticleSlug: "tds-on-nro-fixed-deposits",
},
{
  id: "does-an-nri-need-a-pan-card",
  clusterSlug: "nre-nro-tds",
  question: "Does an NRI need a PAN card?",
  answer:
    "Yes, in most cases that involve money — opening an NRO or NRE account, buying property or mutual funds, or any transaction where TDS applies (NRO interest, rent paid to an NRI landlord) generally requires a PAN. NRIs can apply from abroad without an Aadhaar number, using overseas address and identity proof, but should apply under NRI status rather than letting an old resident-status PAN carry forward.",
  relatedArticleSlug: "pan-card-for-nris-explained",
},
{
  id: "do-i-need-pis-to-buy-indian-shares-as-nri",
  clusterSlug: "investments-repatriation",
  question: "Do I need a PIS account to buy Indian shares as an NRI?",
  answer:
    "It depends on funding and repatriability. The PIS route, linked to your NRE account through a designated bank branch, is the historical mechanism for repatriable equity investing and remains widely used, while a non-PIS route exists for NRO-funded, non-repatriable equity investing. RBI rules in this area have been adjusted more than once in recent years (including foreign-ownership ceiling changes), so confirm the current requirement with your bank's NRI desk before assuming either route applies to your situation.",
  relatedArticleSlug: "nri-demat-accounts-pis-vs-non-pis",
},
{
  id: "are-ulips-a-pfic-problem-for-us-taxes",
  clusterSlug: "investments-repatriation",
  question: "I'm a US person with an Indian ULIP — is that a PFIC problem like mutual funds?",
  answer:
    "Very likely, yes. If the ULIP's investment component is large relative to its death benefit, it commonly fails the US tax definition of life insurance, and the IRS looks through the insurance wrapper to the underlying fund-like holdings, which typically get treated as PFICs. That triggers the same punitive default tax treatment and Form 8621 filing obligations covered in our mutual-fund PFIC article, and separately, premiums may also implicate a foreign-insurance excise tax whose India-treaty exemption mechanics don't run through the policyholder directly.",
  relatedArticleSlug: "us-tax-on-indian-ulips-and-insurance-plans",
},
{
  id: "does-us-estate-tax-apply-to-nris",
  clusterSlug: "investments-repatriation",
  question: "Does US estate tax apply to NRIs, even if they're not US citizens?",
  answer:
    "Yes, if the NRI owns US-situs property — such as US real estate or US corporate stock — at death. Nonresident aliens get a unified credit that shelters only $60,000 of US-situs assets (not inflation-adjusted, unlike the much larger exemption for US citizens/residents), with amounts above that taxed at rates up to 40%. There's no US-India estate tax treaty to soften this the way treaties do for some other countries, so confirm current thresholds and situs rules with a cross-border estate attorney rather than relying on general figures.",
  relatedArticleSlug: "us-estate-tax-exposure-for-nris",
},
{
  id: "does-ltcg-indexation-still-apply-to-property",
  clusterSlug: "real-estate-capital-gains",
  question: "Does the old indexation benefit still apply when I sell property in India?",
  answer:
    "Not by default anymore — since the Finance (No. 2) Act, 2024, property LTCG is generally computed under a flat, lower rate (commonly cited as 12.5%) without indexation, for transfers from July 23, 2024 onward. A comparison against the old 20%-with-indexation figure was restored for resident individuals/HUFs on property acquired before that date, but multiple sources report this dual-option comparison does not extend to NRIs. Given how recently and how many times this area has been amended, confirm the current rule directly against the Income-tax Act's text or with a CA before relying on any specific rate here.",
  relatedArticleSlug: "ltcg-indexation-removal-budget-2024-property",
},
{
  id: "how-much-property-sale-money-can-nri-repatriate",
  clusterSlug: "real-estate-capital-gains",
  question: "How much money can I actually move out of India after selling my property?",
  answer:
    "It depends on how the property was originally funded. Purchased with foreign-currency funds through an NRE/FCNR account, current guidance describes the full sale proceeds as repatriable, though this route is reported by several sources as limited to a set number of properties (confirm the exact number with your bank). Otherwise, repatriation is capped at USD 1 million per financial year via the NRO account — an aggregate cap across all your remittances that year, not per property — and requires Form 15CA/15CB certification on top of the Section 195 TDS the buyer already withheld at sale.",
  relatedArticleSlug: "repatriating-property-sale-proceeds",
},
{
  id: "how-is-capital-gains-tax-split-among-joint-owners",
  clusterSlug: "real-estate-capital-gains",
  question: "If a property has multiple owners, is the capital gains tax split evenly among them?",
  answer:
    "No — it follows each co-owner's actual registered ownership share, not an even or head-count split, unless that registered share genuinely is 50/50. Section 195 TDS is likewise meant to be deducted separately per co-owner's own share of the sale price and their own PAN, not lumped together as if there's one seller. In practice, buyers sometimes withhold against a single PAN at a single rate for the whole sale, which under-withholds an NRI co-owner's share and creates a mismatch each co-owner has to reconcile when filing their own return.",
  relatedArticleSlug: "joint-property-ownership-nri-capital-gains",
},

// --- batch 4 additions ---
{
  id: "what-is-form-w8ben",
  clusterSlug: "dtaa-tax-residency",
  question: "What does Form W-8BEN actually do for an NRI with US brokerage income?",
  answer:
    "It certifies your foreign status to a US broker or payer and, where a treaty applies, claims a reduced withholding rate in place of the default 30% NRA withholding on US-source dividends and certain interest. It's filed with the payer, not the IRS, is commonly described as valid through the end of the third calendar year after signing, and expires early if your treaty-relevant facts change — confirm the current India-US treaty rate for your specific income type before relying on a figure.",
  relatedArticleSlug: "form-w8ben-treaty-rate-claims",
},
{
  id: "does-india-us-have-totalization-agreement",
  clusterSlug: "dtaa-tax-residency",
  question: "Do India and the US have a Social Security totalization agreement?",
  answer:
    "No — as of this writing, no such agreement is in force, unlike the roughly 30 countries (UK, Canada, Japan, most of the EU) that do have one with the US. This means someone working across both countries over a career can face Social Security/FICA contributions in both systems without the ability to combine years toward either country's benefit-eligibility threshold. Negotiations have reportedly continued on and off for years, so confirm current status before assuming this holds indefinitely.",
  relatedArticleSlug: "india-us-totalization-agreement-explained",
},
{
  id: "does-oci-status-determine-tax-residency",
  clusterSlug: "dtaa-tax-residency",
  question: "Does holding an OCI or PIO card determine my tax residency in India or the US?",
  answer:
    "No — OCI/PIO is an immigration and civil status, not a tax status, and Indian and US tax residency are each worked out independently through their own day-count or citizenship-based tests. The one place OCI/PIO status genuinely matters is the Finance Act 2020's 120-day rule, which explicitly applies its shorter day-count threshold to \"a citizen of India or a person of Indian origin\" with India income above the commonly cited Rs 15 lakh mark. A separate, narrower \"deemed resident\" provision from the same Finance Act is reported to apply to citizens only, not OCI/PIO holders — confirm this distinction against current law before relying on it.",
  relatedArticleSlug: "oci-pio-status-vs-tax-residency",
},
{
  id: "nro-fd-premature-withdrawal-tds",
  clusterSlug: "nre-nro-tds",
  question: "If I break my NRO fixed deposit early, what happens to the TDS already deducted?",
  answer:
    "The bank recalculates your interest at the rate applicable to the shorter actual tenure (not your original contracted rate) and deducts a penalty, commonly cited around 0.5%-1%, but confirm your bank's exact figure. Because TDS was already withheld on interest credited at the higher original rate in earlier quarters, there can be a gap between TDS already paid to the government and tax due on the final, lower interest amount; how individual banks true this up at closure varies, so check your Form 16A after closure. Any TDS that ends up in excess of your actual liability is recoverable by filing an Indian tax return and claiming a refund, the same backstop that applies to NRO TDS generally.",
  relatedArticleSlug: "premature-withdrawal-nro-fixed-deposit",
},
{
  id: "joint-nro-account-resident-relative-tax",
  clusterSlug: "nre-nro-tds",
  question: "If I add my resident mother as a joint holder on my NRO account, does the interest become her income instead of mine?",
  answer:
    "Not automatically — the bank will likely still deduct TDS under your PAN as the primary holder by default, but actual tax liability follows whoever's money funded the deposit, not whose name the TDS certificate shows. If she deposited her own funds, her proportionate share of the interest is arguably her income and taxable in her hands; Rule 37BA (confirm whether this citation has changed under the Income-tax Act, 2025) is the mechanism to have the TDS credit reallocated to match. This only works cleanly when ownership is genuinely traceable to each person's own contributions, so keep records of who deposited what.",
  relatedArticleSlug: "joint-nre-nro-account-with-resident-relative",
},
{
  id: "form-26as-tds-not-showing-nri",
  clusterSlug: "nre-nro-tds",
  question: "The bank deducted TDS on my NRO interest, but it isn't showing in my Form 26AS. What do I do?",
  answer:
    "This is a common mismatch — it can mean the deductor deposited the tax late, hasn't yet filed their quarterly TDS return, or quoted the wrong PAN, any of which can leave the credit missing from your 26AS even though tax was genuinely withheld from your interest. Since the fix generally has to come from the deductor's side (a return revision, or for property transactions a TRACES correction request), raise it with the bank as soon as you spot the gap rather than waiting until you're filing. Check Form 26AS well ahead of your filing deadline specifically because these corrections take real processing time.",
  relatedArticleSlug: "form-26as-reconciling-tds-credit-as-nri",
},
{
  id: "form-8621-one-per-fund",
  clusterSlug: "investments-repatriation",
  question: "Do I need to file a separate Form 8621 for every Indian mutual fund I own?",
  answer:
    "Generally yes — the IRS requires one Form 8621 per PFIC held, so multiple Indian mutual fund schemes typically mean multiple forms attached to the same return. There's a commonly cited de minimis exception around $25,000 total PFIC value ($50,000 married filing jointly), but it doesn't apply if you had an excess distribution, a sale, or an election in effect that year — confirm your specific numbers with a preparer since thresholds and edge cases here are easy to get wrong.",
  relatedArticleSlug: "form-8621-pfic-reporting-explained",
},
{
  id: "sip-nre-nro-repatriation-difference",
  clusterSlug: "investments-repatriation",
  question: "Does it matter whether I fund my Indian mutual fund SIP from an NRE or NRO account?",
  answer:
    "Yes, primarily for repatriation later — NRE-funded investments are commonly described as fully repatriable, while NRO-funded ones are subject to a cap (commonly cited around USD 1 million per financial year in aggregate) and require CA certification (Form 15CB) and your own filing (Form 15CA). The mutual fund units themselves look identical either way, but the source account determines what paperwork and limits apply when you eventually take proceeds out of India — worth confirming current figures and process with your bank or a CA.",
  relatedArticleSlug: "sip-investing-for-nris-nre-vs-nro",
},
{
  id: "roth-ira-india-tax-uncertain",
  clusterSlug: "investments-repatriation",
  question: "Will India tax my Roth IRA withdrawals the same tax-free way the US does?",
  answer:
    "This is genuinely unsettled — Roth withdrawals are US tax-free because contributions were already taxed, but India has no native equivalent concept, and secondary sources disagree on whether Section 89A's deferral relief even applies to an account whose withdrawals aren't taxable in the foreign country. Some describe Roth withdrawals as potentially taxed by India as ordinary income or capital gains regardless of US treatment; treat this as an open question requiring a current cross-border tax preparer's opinion rather than a settled rule.",
  relatedArticleSlug: "401k-roth-ira-returning-to-india",
},
{
  id: "how-do-i-get-back-excess-tds-on-my-property-sale",
  clusterSlug: "real-estate-capital-gains",
  question: "The buyer already withheld TDS on my property sale and I never got a Form 13/128 certificate — can I still get the excess back?",
  answer:
    "Yes — filing an Indian income tax return (reporting the sale and your actual capital gain) is the after-the-fact route to recover TDS withheld above your real tax liability, distinct from a Form 13/128 certificate, which corrects the withholding upfront instead. Processing is commonly cited at roughly four to eight weeks for a routine return once e-verified, but NRI returns reporting capital gains are described as more likely to face scrutiny, which can push the timeline out to months — and Section 244A interest is meant to compensate you for that wait. Confirm current processing patterns and required forms (Form 26AS/AIS, Form 16A) before assuming a specific timeline.",
  relatedArticleSlug: "claiming-refund-excess-tds-property-sale-nri",
},
{
  id: "can-nri-sell-inherited-agricultural-land",
  clusterSlug: "real-estate-capital-gains",
  question: "I inherited agricultural land in India as an NRI — can I sell it, and is the gain taxed?",
  answer:
    "You can generally sell inherited agricultural land, a farmhouse, or plantation property, but sources describe the buyer as restricted to a resident Indian citizen (not another NRI, OCI, or foreigner), with some states layering on further buyer-eligibility rules for agricultural land specifically. Whether the gain is taxable depends on a location test, not on how the land is used: land classified as \"rural\" under Section 2(14)(iii) generally isn't a capital asset at all and falls outside capital gains tax, while \"urban\" agricultural land (based on distance from, and population of, nearby municipalities) is taxed like any other property. The specific distance/population thresholds and state buyer rules are exactly the kind of figures that need direct verification before you rely on them.",
  relatedArticleSlug: "selling-agricultural-land-farmhouse-nri",
},
{
  id: "does-a-poa-holder-take-on-the-tax-liability",
  clusterSlug: "real-estate-capital-gains",
  question: "If someone holds my Power of Attorney and signs my property sale in India, do they become liable for the TDS and capital gains tax?",
  answer:
    "No. A Power of Attorney authorizes someone to act on your behalf, but the acts are legally treated as your own acts as the principal — so Section 195 TDS and capital gains liability stay with you as the NRI seller, assessed against your own PAN, regardless of who signs at the registrar's office. Separately, a PoA executed abroad has its own requirements (notarization plus apostille, or execution at an Indian embassy/consulate, followed by stamping and adjudication in India, commonly cited as required within three months of the document's arrival) that are worth getting right well before a sale closes.",
  relatedArticleSlug: "power-of-attorney-nri-property-sale",
},
  {
      id: "how-do-i-claim-foreign-tax-credit-in-india",
            clusterSlug: "dtaa-tax-residency",
            question: "How do I actually claim foreign tax credit against my Indian tax bill?",
            answer:
        "You file Form 67 under Rule 128 of the Income-tax Rules, attaching proof of the foreign tax paid — a foreign tax authority certificate, a foreign payer's TDS certificate, or a self-certified statement with supporting proof — and converting the foreign tax at the Telegraphic Transfer buying rate for the month before payment. The rule technically allows filing up to the end of the relevant assessment year, but filing it with or before your return avoids processing mismatches. Even filed late, several ITAT benches have held the credit can't be denied for a procedural delay alone, though relying on that means going through rectification or appeal rather than a smooth first pass.",
              relatedArticleSlug: "form-67-foreign-tax-credit-filing-guide",
          },
        {
              id: "who-does-the-deemed-residency-rule-apply-to",
              clusterSlug: "dtaa-tax-residency",
              question: "Does the deemed residency rule mean I'm now an Indian tax resident even though I live abroad?",
              answer:
                      "Only if all three conditions hit at once: you're an Indian citizen, your Indian-source income exceeds ₹15 lakh in the year, and you're not liable to income tax in any other country by reason of residence or domicile. If you're a genuine tax resident of the US, UK, Singapore, or almost any other country with a functioning income tax system, you're liable to tax there and this provision doesn't reach you at all — it's aimed specifically at Indian citizens based in zero-personal-income-tax jurisdictions like the UAE. Even if it does catch you, you're classified as RNOR rather than a full resident, so foreign-source income stays untaxed and you don't pick up Schedule FA foreign-asset disclosure obligations.",
              relatedArticleSlug: "deemed-residency-rule-explained-who-it-hits",
        },
        {
              id: "do-i-need-form-10f-if-i-already-have-a-trc",
              clusterSlug: "dtaa-tax-residency",
              question: "I already have a Tax Residency Certificate — do I still need to file Form 10F separately?",
              answer:
                      "Yes. A TRC alone stopped being sufficient once the law added a requirement for supplementary details a foreign TRC template often doesn't include, like your foreign tax identification number and the exact residency period covered. That declaration — historically Form 10F, renumbered Form 41 under the Income-tax Act, 2025 — now has to be filed electronically on the Indian e-filing portal in every case where you're claiming a treaty rate, even if your TRC happens to already contain all the required information. Without both documents on file with the payer before the payment is made, they'll withhold at the higher domestic rate and you'll have to claim the difference back as a refund later.",
              relatedArticleSlug: "form-10f-and-trc-claiming-dtaa-benefits-in-india",
        },
        {
              id: "tds-rate-on-nri-mutual-fund-dividends",
              clusterSlug: "nre-nro-tds",
              question: "What TDS rate applies to mutual fund dividends and IDCW payouts for NRIs?",
              answer:
                      "Indian AMCs withhold tax at a flat 20% (plus surcharge and cess) on dividend and IDCW income paid to NRI investors, under what was Section 196A of the 1961 Act and is now Section 393(2) of the Income-tax Act, 2025. A lower DTAA rate can apply only if a valid Tax Residency Certificate is on file with the AMC, and even then some fund houses default to 20% because mutual fund distributions don't always fit a treaty's definition of dividend income — leaving a refund claim on the tax return as the fallback.",
              relatedArticleSlug: "tds-on-nri-mutual-fund-dividends-and-capital-gains",
        },
        {
              id: "do-nris-have-to-pay-advance-tax",
              clusterSlug: "nre-nro-tds",
              question: "Do NRIs have to pay advance tax on their Indian income?",
              answer:
                      "Yes — if an NRI's estimated Indian tax liability, after subtracting TDS already deducted, is ₹10,000 or more for the year, advance tax is due in the same four instalments (15 June, 15 September, 15 December, 15 March) that apply to residents. Unlike resident senior citizens, NRIs get no age-based exemption from this obligation regardless of how old they are. Missing an instalment triggers monthly interest under what are now Sections 424 and 425 of the Income-tax Act, 2025 (formerly Sections 234B and 234C).",
              relatedArticleSlug: "advance-tax-for-nris-explained",
        },
        {
              id: "what-happens-to-nre-account-on-returning-to-india",
              clusterSlug: "nre-nro-tds",
              question: "What happens to my NRE and NRO accounts when I move back to India permanently?",
              answer:
                      "Once your FEMA residency status changes to resident, RBI rules require your NRE account to be redesignated as a resident rupee account or transferred into an RFC account, and this is described as an 'immediate' obligation rather than one with a fixed grace period. Existing NRE term deposits are generally allowed to run to their original maturity at the contracted rate first. NRO accounts are simply redesignated as ordinary resident accounts, with no material change to their tax treatment since NRO interest was already taxable.",
              relatedArticleSlug: "nre-nro-accounts-when-you-return-to-india",
        },
        {
              id: "how-are-reit-invit-distributions-taxed-for-nris",
              clusterSlug: "investments-repatriation",
              question: "How are REIT and InvIT distributions taxed for NRIs?",
              answer:
                      "A single distribution can contain up to four components taxed differently: interest (5% TDS for NRIs, taxable), dividend (taxable with 10% TDS only if the underlying SPV used the concessional 22% corporate tax rate, otherwise exempt), rental income (generally exempt, though TDS is often still withheld and refundable), and return of capital (not taxed on receipt, but reduces your cost basis for a future capital gain). Selling the units themselves is taxed separately as a capital gain, at 20% short-term or 12.5% long-term depending on the 12-month holding period.",
              relatedArticleSlug: "reits-and-invits-taxation-for-nris",
        },
        {
              id: "can-nri-keep-contributing-to-ppf-account",
              clusterSlug: "investments-repatriation",
              question: "Can an NRI keep contributing to a PPF account opened before moving abroad?",
              answer:
                      "Yes. An NRI cannot open a new PPF account, but an account opened while resident can be kept running and funded — up to Rs 1.5 lakh per financial year, from an NRE, NRO or FCNR account — until it reaches its original 15-year maturity. What an NRI cannot do is extend the account beyond that 15-year term the way a resident can; a late-2024 rule tightened the consequences for NRIs who extend anyway, cutting the account to post-office savings rates and then to zero interest after a fixed cutoff date.",
              relatedArticleSlug: "ppf-for-nris-existing-accounts-explained",
        },
        {
              id: "does-form-15g-15h-work-for-nri-epf-withdrawal",
              clusterSlug: "investments-repatriation",
              question: "Can an NRI file Form 15G or 15H to avoid TDS on an EPF withdrawal?",
              answer:
                      "No. Both forms are restricted to residents, and an NRI who submits one risks having the claim rejected outright. If your EPF withdrawal happens before five years of continuous service and TDS applies, an NRI's only recourse is to let the TDS get deducted and then claim a refund by filing an Indian tax return, applying DTAA relief where the treaty rate is lower than the TDS actually withheld.",
              relatedArticleSlug: "epf-withdrawal-tds-for-nris",
        },
        {
              id: "can-nris-buy-agricultural-land-in-india",
              clusterSlug: "real-estate-capital-gains",
              question: "Can an NRI buy agricultural land or a farmhouse in India?",
              answer:
                      "No — under the FEMA rules governing property acquisition, NRIs and OCIs cannot directly purchase agricultural land, plantation property, or a farmhouse anywhere in India, regardless of local zoning. The main exception is inheritance: an NRI can inherit such land, but if they later sell it, the buyer must be a person resident in India. Structuring around the restriction by buying in a resident relative's name while funding and controlling the purchase risks being treated as a benami transaction, with the property liable to confiscation.",
              relatedArticleSlug: "buying-property-in-india-as-nri-fema-and-buyer-tds",
        },
        {
              id: "can-nri-claim-section-54f-house-outside-india",
              clusterSlug: "real-estate-capital-gains",
              question: "Can an NRI claim Section 54F (now Section 86) by buying a house outside India?",
              answer:
                      "No. The residential property purchased or constructed to claim the exemption under Section 86 of the Income-tax Act, 2025 (the renumbered Section 54F) must be located in India — there's no version of this exemption for reinvesting into property abroad. NRIs also need to check they don't already own more than one other residential house in India on the date they sell the original asset, since that alone disqualifies the claim.",
              relatedArticleSlug: "section-54f-exemption-nris-reinvesting-other-assets",
        },
        {
              id: "do-i-owe-us-tax-after-paying-tds-in-india",
              clusterSlug: "real-estate-capital-gains",
              question: "I already paid TDS in India on my property sale — do I still owe US tax?",
              answer:
                      "Possibly, if you're a US citizen, green card holder, or otherwise a US tax resident. The Indian TDS becomes a foreign tax credit on Form 1116 rather than a full exemption, and because Indian capital-gains tax is often lower than the combined US federal rate plus the 3.8% Net Investment Income Tax — which the credit generally can't offset — many NRIs and OCIs owe incremental US tax on the same gain even after claiming the credit.",
              relatedArticleSlug: "us-tax-reporting-when-nri-sells-indian-property",
        },
// --- Batch 6 additions (nric-0086) ---
        {
              id: "does-moving-to-india-end-us-state-tax-residency",
              clusterSlug: "dtaa-tax-residency",
              question: "Does moving to India automatically end my US state tax residency?",
              answer: "Not necessarily. States like California and New York apply \"sticky\" residency rules that keep taxing you as a resident until you can show you've truly severed domicile ties -- selling or renting out your home, moving your driver's license and voter registration, and cutting other state connections. Simply living in India isn't enough on its own; the state looks at your full pattern of ties, not just your physical location.",
              relatedArticleSlug: "state-tax-residency-after-moving-to-india",
        },
        {
              id: "what-is-form-8802-us-tax-residency-certificate",
              clusterSlug: "dtaa-tax-residency",
              question: "What is Form 8802 and why would an NRI in the US need it?",
              answer: "Form 8802 is the application NRIs file with the IRS to obtain Form 6166, the official US tax residency certificate. India's tax treaty partners, including the Indian tax authorities, require this certificate before granting DTAA benefits like reduced withholding on Indian-source income. Processing can take several weeks, so it should be requested well before the Indian filing or TDS deadline it's needed for.",
              relatedArticleSlug: "form-8802-us-tax-residency-certificate",
        },
        {
              id: "what-are-streamlined-filing-compliance-procedures",
              clusterSlug: "dtaa-tax-residency",
              question: "What are the IRS Streamlined Filing Compliance Procedures and who can use them?",
              answer: "The Streamlined Filing Compliance Procedures let US taxpayers, including NRIs who weren't aware of their US filing obligations, catch up on missed tax returns and FBARs without the steeper penalties of standard delinquent filing. Eligibility requires the non-compliance to have been non-willful. The offshore version covers taxpayers living outside the US and generally requires three years of amended or delinquent returns and six years of FBARs.",
              relatedArticleSlug: "streamlined-filing-compliance-procedures-nris",
        },
        {
              id: "do-i-have-to-convert-my-resident-bank-account-to-nro",
              clusterSlug: "nre-nro-tds",
              question: "Do I have to convert my resident savings account once I become an NRI?",
              answer: "Yes. Under FEMA, continuing to hold a resident savings account after your residential status changes to NRI is not permitted -- you're required to redesignate it as an NRO account (or close it and open a new NRE/NRO account) as soon as your status changes. Banks can flag or freeze accounts found to be held in violation of this rule.",
              relatedArticleSlug: "resident-account-redesignation-on-becoming-nri",
        },
        {
              id: "what-tds-rate-applies-to-nri-salary-or-consulting-income",
              clusterSlug: "nre-nro-tds",
              question: "What TDS rate applies when an NRI earns salary or consulting income from an Indian company?",
              answer: "It depends on the nature of the payment. Salary paid to an NRI for services rendered in India is taxed under Section 192 at slab rates, while professional or technical fees paid to an NRI are typically subject to Section 195 withholding rather than the domestic Section 194J rate, since Section 195 governs payments to non-residents and generally applies a higher, non-slab-based withholding until a lower-rate certificate is obtained.",
              relatedArticleSlug: "tds-on-nri-salary-and-professional-income-in-india",
        },
        {
              id: "does-clubbing-of-income-apply-to-nri-gifts-to-spouse",
              clusterSlug: "nre-nro-tds",
              question: "If an NRI gifts money to their resident spouse, does the income it earns get clubbed back to the NRI?",
              answer: "Yes. Section 64 clubbing provisions apply regardless of the giver's residential status -- income earned on assets gifted to a spouse (or a minor child, with limited exceptions) is added back to the donor's own taxable income, not taxed in the recipient's hands. This applies even though the gift itself isn't taxable to the spouse.",
              relatedArticleSlug: "clubbing-of-income-nri-gifts-to-spouse-or-minor-child",
        },
        {
              id: "how-are-rsus-and-espp-shares-taxed-for-nris",
              clusterSlug: "investments-repatriation",
              question: "How are RSUs and ESPP shares from a US employer taxed for someone who is now an NRI in India?",
              answer: "Both countries can have a claim, split by timing. The US generally taxes RSU vesting and ESPP discount income based on where you worked during the vesting/offering period, even after you've left. India taxes the same income if you're a resident when it's realized, and taxes any subsequent capital gain on sale based on your residential status at that time. The India-US DTAA and Form 1116 foreign tax credit are typically used to avoid double taxation on the overlapping piece.",
              relatedArticleSlug: "espp-rsu-taxation-for-nris-us-employers",
        },
        {
              id: "are-nri-life-insurance-maturity-proceeds-always-tax-free",
              clusterSlug: "investments-repatriation",
              question: "Are life insurance maturity proceeds always tax-free for NRIs under Section 10(10D)?",
              answer: "No, not always. Since the Finance Act 2023 amendment, if the annual premium on a life insurance policy (other than ULIPs, which have their own cap) exceeds Rs 5 lakh, the maturity proceeds lose the Section 10(10D) exemption and become taxable as income from other sources. This carve-out applies to policies issued on or after April 1, 2023, so older policies bought before that date are generally unaffected.",
              relatedArticleSlug: "nri-life-insurance-maturity-proceeds-taxation",
        },
        {
              id: "how-is-crypto-taxed-for-nris-in-india",
              clusterSlug: "investments-repatriation",
              question: "How is cryptocurrency taxed for NRIs who trade or hold virtual digital assets connected to India?",
              answer: "Gains on virtual digital assets are taxed under Section 115BBH at a flat 30% rate, with no deduction for expenses (other than cost of acquisition) and no ability to offset losses against other income or carry them forward. This flat-rate regime applies uniformly regardless of holding period or residential status, and TDS under Section 194S can also apply to the transaction itself.",
              relatedArticleSlug: "nri-crypto-virtual-digital-asset-taxation",
        },
        {
              id: "what-is-the-capital-gains-account-scheme-cgas",
              clusterSlug: "real-estate-capital-gains",
              question: "What is the Capital Gains Account Scheme (CGAS) and when does an NRI need it?",
              answer: "CGAS lets you park capital gains from a property sale in a designated bank account when you haven't yet reinvested the proceeds into a qualifying new asset by the time your tax return is due. Depositing into a CGAS account before the filing deadline preserves your eligibility for exemptions like Section 54 or Section 86, giving you the full statutory window to complete the purchase or construction without losing the exemption.",
              relatedArticleSlug: "capital-gains-account-scheme-cgas-nri",
        },
        {
              id: "is-gifting-property-to-a-relative-in-india-tax-free-for-nris",
              clusterSlug: "real-estate-capital-gains",
              question: "If an NRI gifts property in India to a relative, is it tax-free?",
              answer: "Gifts of immovable property between relatives (as defined under the Income-tax Act) are generally exempt from tax in the recipient's hands under Section 56(2)(x), and gifting itself doesn't trigger capital gains for the giver since no consideration changes hands. Stamp duty still applies on the gift deed at rates set by the relevant state, and gifts to non-relatives above the threshold are taxable to the recipient at the property's stamp duty value.",
              relatedArticleSlug: "gifting-immovable-property-in-india-nri-tax-implications",
        },
        {
              id: "can-nri-co-owners-each-claim-home-loan-tax-benefits",
              clusterSlug: "real-estate-capital-gains",
              question: "Can each NRI co-owner on a joint home loan claim separate tax deductions?",
              answer: "Yes, provided each co-owner is also a co-borrower on the loan and contributes to the EMI. Each can separately claim up to Rs 2 lakh under Section 24(b) for interest (on a self-occupied property) and up to Rs 1.5 lakh under Section 80C for principal repayment, effectively doubling the household's total deduction versus a single borrower -- but only in proportion to each owner's actual share of the loan and payments.",
              relatedArticleSlug: "home-loan-tax-benefits-for-nri-co-owners",
        },
];

export function getFaqsForCluster(clusterSlug: string): Faq[] {
  return faqs.filter((faq) => faq.clusterSlug === clusterSlug);
}
