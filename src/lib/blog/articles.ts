export type ArticleSection = {
  heading?: string;
  paragraphs: string[];
  list?: string[];
};

export type Article = {
  slug: string;
  clusterSlug: string;
  title: string;
  description: string;
  dek: string;
  sections: ArticleSection[];
  relatedSlugs: string[];
};

export const articles: Article[] = [
  // --- DTAA / Tax Residency cluster ---
  {
    slug: "nri-or-resident-how-tax-residency-works",
    clusterSlug: "dtaa-tax-residency",
    title: "NRI or Resident? How Tax Residency Actually Works",
    description:
      "Why 'NRI' is not one single status — India and the US each apply their own residency tests, and you can be taxed differently, or by both, depending on the year.",
    dek: "\"NRI\" is a convenient label, but India and the US don't share a definition of it. Here's how the two systems actually decide who owes tax where.",
    sections: [
      {
        paragraphs: [
          "It's tempting to think of 'NRI' as a single, portable status — either you are one or you aren't. In reality, India and the US each run their own residency test, on their own facts, for their own tax year. It's entirely possible to be a non-resident for Indian tax purposes and a tax resident of the US in the very same year, or the reverse during a transition year like the one you move.",
          "That matters because residency, not citizenship or visa category, is usually what determines which country taxes your worldwide income versus only your India-sourced or US-sourced income.",
        ],
      },
      {
        heading: "How India decides",
        paragraphs: [
          "India's residential status test is based primarily on the number of days you're physically present in India during the financial year (and the preceding years), with different day-thresholds depending on whether you're an Indian citizen or person of Indian origin visiting India. Cross the relevant threshold and you may be classified as 'Resident and Ordinarily Resident,' 'Resident but Not Ordinarily Resident (RNOR),' or 'Non-Resident,' each with different consequences for what income India taxes.",
          "A Finance Act 2020 change added an extra wrinkle for higher-income visiting NRIs: a shorter 120-day threshold can apply in certain cases. Our residency calculator on the DTAA & Tax Residency page walks through this day-count and flags when that nuance applies to you.",
        ],
      },
      {
        heading: "How the US decides",
        paragraphs: [
          "The US uses a different mechanism entirely for non-citizens: the Substantial Presence Test, a formula that weighs your days present in the current year against a fraction of the two preceding years. Meet the threshold and the IRS treats you as a US tax resident for that year, generally taxable on worldwide income, regardless of visa type.",
          "Green card holders and US citizens are treated as US tax residents automatically, independent of the Substantial Presence Test, for as long as that status is held.",
        ],
      },
      {
        heading: "When both countries claim you",
        paragraphs: [
          "Dual residency in the same year is possible, and it's exactly the situation the India-US Double Taxation Avoidance Agreement (DTAA) exists to resolve — through 'tie-breaker' rules and relief mechanisms like foreign tax credits, so the same income isn't taxed twice at full rates in both countries.",
        ],
      },
    ],
    relatedSlugs: [
      "substantial-presence-test-explained",
      "claiming-dtaa-relief-credit-vs-exemption",
      "nre-vs-nro-accounts-which-do-you-need",
    ],
  },
  {
    slug: "substantial-presence-test-explained",
    clusterSlug: "dtaa-tax-residency",
    title: "The Substantial Presence Test, Explained",
    description:
      "How the IRS counts your days in the US to decide whether you're a resident alien for tax purposes — including the weighted lookback formula most people get wrong.",
    dek: "The IRS doesn't just count this year's days in the US. Here's the actual weighted formula behind the Substantial Presence Test, and the common misreadings of it.",
    sections: [
      {
        paragraphs: [
          "The Substantial Presence Test (SPT) is the primary way the US decides whether a non-citizen without a green card counts as a resident alien for federal tax purposes in a given year. Pass it, and you're generally taxed like a US citizen on worldwide income for that year; fail it, and you're typically a nonresident alien taxed only on US-sourced income (subject to treaty provisions).",
        ],
      },
      {
        heading: "The formula",
        paragraphs: [
          "The test has two parts. First, you must be present in the US at least 31 days during the current calendar year. Second — and this is the part people most often get wrong — you total up a weighted count across three years: all of the current year's days, plus one-third of the prior year's days, plus one-sixth of the year before that. If that weighted total reaches the statutory threshold, you pass the test.",
          "This weighting means someone who spent a lot of time in the US two years ago can still be pulled into US tax residency this year, even with a much shorter current-year stay — the lookback keeps contributing to the total.",
        ],
      },
      {
        heading: "Common exceptions",
        paragraphs: [
          "Certain days don't count toward the test at all — for example, days as an exempt individual under specific visa categories (some students and teachers/trainees), days you couldn't leave the US because of a medical condition that arose while there, and days commuting from Canada or Mexico for work. These carve-outs are easy to miss and can change the outcome entirely.",
        ],
      },
      {
        heading: "Why the count matters beyond the yes/no answer",
        paragraphs: [
          "Even when the SPT is a close call, the day-count itself feeds into other decisions: whether a first-year or last-year 'dual-status' election makes sense, whether treaty tie-breaker rules under the DTAA need to be invoked, and how residency start/end dates are set for that transition year. Use the Substantial Presence Test calculator on the DTAA & Tax Residency page to run your own day-count and see where you land against the threshold.",
        ],
      },
    ],
    relatedSlugs: [
      "nri-or-resident-how-tax-residency-works",
      "claiming-dtaa-relief-credit-vs-exemption",
    ],
  },
  {
    slug: "claiming-dtaa-relief-credit-vs-exemption",
    clusterSlug: "dtaa-tax-residency",
    title: "Claiming DTAA Relief: Tax Credit vs. Exemption Method",
    description:
      "The India-US DTAA relieves double taxation two different ways depending on the income type — here's how the credit method and exemption method differ in practice.",
    dek: "Not all DTAA relief works the same way. Some income gets a foreign tax credit; some gets exempted outright. The mechanism you get changes what you actually owe.",
    sections: [
      {
        paragraphs: [
          "When the same income is taxable in both India and the US, the India-US DTAA doesn't eliminate tax in either country outright — instead, it specifies a relief mechanism so the two taxes don't simply stack. The two broad mechanisms are the credit method and the exemption method, and which one applies depends on the article of the treaty governing that particular income type.",
        ],
      },
      {
        heading: "Credit method",
        paragraphs: [
          "Under the credit method, both countries can tax the income, but your country of residence gives you a credit for tax already paid to the other country — generally capped at what your resident country would have charged on that same income. This is the more common mechanism for income like dividends, interest, and royalties under the India-US treaty, and it's also how the US's domestic Foreign Tax Credit (Form 1116) interacts with treaty-sourced income.",
        ],
      },
      {
        heading: "Exemption method",
        paragraphs: [
          "Under the exemption method, one country agrees not to tax income that's taxable in the other, full stop — no residual top-up. This is less common under the India-US treaty than the credit method, but it does apply in specific carve-outs (for example, certain government service or specific categories of independent personal services income, subject to the treaty's exact wording).",
        ],
      },
      {
        heading: "Why the mechanism you get matters",
        paragraphs: [
          "A flat exemption and a capped credit can produce very different final tax bills, especially when the two countries' rates diverge. Getting the mechanism wrong — claiming an exemption where only a credit applies, for instance — is a common source of both overpayment and IRS/CBDT scrutiny. The DTAA relief estimator on the DTAA & Tax Residency page walks through the credit-method math for a given income and foreign tax paid; it doesn't attempt to classify which mechanism applies to your specific income type, since that depends on treaty article and your own facts.",
        ],
      },
    ],
    relatedSlugs: [
      "nri-or-resident-how-tax-residency-works",
      "tds-on-nro-interest-explained",
    ],
  },

  // --- NRE/NRO & TDS cluster ---
  {
    slug: "nre-vs-nro-accounts-which-do-you-need",
    clusterSlug: "nre-nro-tds",
    title: "NRE vs. NRO Accounts: Which One Do You Actually Need?",
    description:
      "NRE and NRO accounts look similar on the surface but serve different purposes under FEMA — here's what actually decides which one your money belongs in.",
    dek: "The NRE/NRO choice isn't about which bank offers a better rate — it's about where the money came from, and what FEMA lets you do with it afterward.",
    sections: [
      {
        paragraphs: [
          "NRE (Non-Resident External) and NRO (Non-Resident Ordinary) accounts both let NRIs hold rupee funds in India, and both are opened at the same banks with similar-looking paperwork. The difference that actually matters is regulatory, not cosmetic: FEMA (the Foreign Exchange Management Act) treats the source of the money, and what you're allowed to do with it afterward, very differently between the two.",
        ],
      },
      {
        heading: "NRE: for money earned outside India",
        paragraphs: [
          "An NRE account is meant for foreign income you're bringing into India — salary earned abroad, foreign savings, and similar sources. Funds in an NRE account, and the interest earned on them, are freely repatriable (you can move them back out of India without RBI permission for the transfer itself), and NRE interest is generally exempt from Indian income tax for as long as you hold NRI status.",
        ],
      },
      {
        heading: "NRO: for money earned or held in India",
        paragraphs: [
          "An NRO account is meant for income that originates in India — rent from Indian property, dividends from Indian investments, a pension, or proceeds from selling Indian assets. NRO funds are only repatriable up to specified RBI limits and procedures (not freely, the way NRE funds are), and interest on an NRO account is taxable in India with TDS withheld at source.",
        ],
      },
      {
        heading: "The FEMA-status question you can't skip",
        paragraphs: [
          "Choosing the wrong account type for a given deposit isn't just a labeling issue — it's a FEMA compliance question, since routing India-sourced income through an NRE account (or vice versa) can create a genuine regulatory problem, not just a tax inefficiency. The NRE vs. NRO chooser on the NRE/NRO & TDS page walks through the source-of-funds question to point you toward the right account type; it doesn't replace confirming your specific transaction with your bank's NRI desk.",
        ],
      },
    ],
    relatedSlugs: [
      "tds-on-nro-interest-explained",
      "form-15ca-15cb-explained",
      "nri-repatriation-limits-explained",
    ],
  },
  {
    slug: "tds-on-nro-interest-explained",
    clusterSlug: "nre-nro-tds",
    title: "How TDS on NRO Interest Works (and How to Reduce It)",
    description:
      "NRO account interest is taxed at source, often at a higher effective rate than most NRIs expect — here's why, and the legitimate ways to bring it down.",
    dek: "The TDS rate on your NRO interest statement is usually higher than the tax you'd actually owe on it. Here's why, and how the gap gets closed.",
    sections: [
      {
        paragraphs: [
          "Interest earned on an NRO account is taxable in India, and unlike NRE interest, the bank withholds tax at source before you ever see it — meaning your actual credited interest is already net of TDS. The rate the bank applies by default is often noticeably higher than the tax you'd owe once your actual total income and any applicable DTAA relief are factored in, which is why NRO TDS is one of the more common sources of NRI tax refunds.",
        ],
      },
      {
        heading: "Why the default rate runs high",
        paragraphs: [
          "Banks generally apply a standard TDS rate under the Income-tax Act on NRO interest, plus applicable surcharge and cess, without knowing your total income, your applicable deductions, or your treaty position — because a bank isn't positioned to make those individualized judgment calls at the point of a routine interest credit. That standard rate is a withholding rate, not necessarily your final tax liability.",
        ],
      },
      {
        heading: "Ways to legitimately reduce it",
        paragraphs: [
          "A lower DTAA treaty rate can sometimes apply in place of the domestic default, if you submit the required documentation (typically a Tax Residency Certificate and Form 10F) to your bank before the interest is credited — after the fact, it usually can't be adjusted at source. Separately, if your actual tax liability for the year is lower than the TDS already withheld, the excess is recoverable by filing an Indian income tax return and claiming a refund; it isn't lost, just fronted.",
        ],
        list: [
          "Submit a Tax Residency Certificate + Form 10F to your bank in advance to potentially unlock a treaty rate",
          "File an Indian ITR to claim back TDS that exceeds your actual liability",
          "For a large one-off transaction, a lower/nil TDS certificate can front-load the correction instead of waiting for a refund",
        ],
      },
      {
        paragraphs: [
          "Use the TDS-on-NRO-interest calculator on the NRE/NRO & TDS page to see how a given interest amount and rate translate into net proceeds, and compare a default withholding scenario against a certified lower rate.",
        ],
      },
    ],
    relatedSlugs: [
      "nre-vs-nro-accounts-which-do-you-need",
      "form-15ca-15cb-explained",
      "form-13-lower-tds-certificate-worth-it",
    ],
  },
  {
    slug: "form-15ca-15cb-explained",
    clusterSlug: "nre-nro-tds",
    title: "Form 15CA/15CB Explained: When Do You Need Them?",
    description:
      "Remitting money out of India isn't always as simple as an online transfer — past certain thresholds, the bank needs specific certified forms first.",
    dek: "Form 15CA and 15CB exist so India's tax department can see cross-border remittances before they happen. Here's which one (if either) applies to your transfer.",
    sections: [
      {
        paragraphs: [
          "When money is remitted out of India, banks are required to check whether appropriate tax has been accounted for on it before releasing the transfer. Forms 15CA and 15CB are the mechanism for that check: 15CA is a self-declaration the remitter files (often electronically), and 15CB is a chartered accountant's certificate confirming the tax position, required for larger or more complex remittances.",
        ],
      },
      {
        heading: "Which part applies",
        paragraphs: [
          "The specific requirement depends on the amount being remitted and whether the remittance is taxable in India at all. Small remittances, and remittances on a specified exempt list under Rule 37BB, can qualify for simplified treatment (Part A of Form 15CA, no 15CB needed). Larger taxable remittances typically need both the CA certificate (15CB) and the corresponding declaration (Part C of 15CA); a specified list of exempt categories can bypass the CA certificate requirement even at larger amounts (Part D).",
        ],
      },
      {
        heading: "Why this trips people up",
        paragraphs: [
          "The friction usually isn't the tax itself — it's the paperwork lead time. A CA certificate takes time to obtain, and banks won't process the transfer without it once it's required, so remittances planned around a deadline (a property closing, a tuition payment) can stall if the Form 15CB step is left until the last minute.",
        ],
      },
      {
        paragraphs: [
          "The Form 15CA/15CB checker on the NRE/NRO & TDS page estimates which part of the form applies to a given remittance amount and purpose, so you know what documentation to line up in advance.",
        ],
      },
    ],
    relatedSlugs: [
      "nre-vs-nro-accounts-which-do-you-need",
      "tds-on-nro-interest-explained",
      "nri-repatriation-limits-explained",
    ],
  },

  // --- Investments & Repatriation cluster ---
  {
    slug: "nri-repatriation-limits-explained",
    clusterSlug: "investments-repatriation",
    title: "How Much Money Can NRIs Repatriate From India? The RBI Limits Explained",
    description:
      "Repatriation from India isn't unlimited even from your own NRO account — RBI sets an annual ceiling, and the account type you use changes the rules entirely.",
    dek: "NRE funds move freely. NRO funds face an annual RBI ceiling. Confusing the two is one of the most common NRI money mistakes.",
    sections: [
      {
        paragraphs: [
          "Repatriation — moving funds from India back to your country of residence — works very differently depending on which account or asset type the money sits in. Funds in an NRE account are freely repatriable. Funds in an NRO account, built up from India-sourced income like rent, dividends, or asset sale proceeds, are subject to an annual ceiling set by the RBI under FEMA, along with documentation requirements.",
        ],
      },
      {
        heading: "The annual ceiling",
        paragraphs: [
          "The RBI caps how much can be remitted out of NRO balances in a financial year (current and accumulated income together), a limit that applies per remitter, not per account — so consolidating funds across multiple NRO accounts doesn't create additional headroom. Amounts above the ceiling generally require specific RBI approval, which is not something routinely granted for ordinary personal remittances.",
        ],
      },
      {
        heading: "Documentation you'll need regardless of amount",
        paragraphs: [
          "Even within the ceiling, a remittance from an NRO account isn't a same-day online transfer in most cases: banks require Form 15CA (and often 15CB, a CA certificate) confirming the applicable tax has been paid or accounted for, before releasing funds. Property sale proceeds carry their own additional documentation given how directly they interact with Section 195 TDS.",
        ],
      },
      {
        paragraphs: [
          "The repatriation headroom estimator on the Investments & Repatriation page tracks how much of the annual NRO ceiling a given remittance amount would use, alongside what you've already remitted in the same financial year.",
        ],
      },
    ],
    relatedSlugs: [
      "nre-vs-nro-accounts-which-do-you-need",
      "form-15ca-15cb-explained",
      "selling-property-in-india-as-nri-ltcg-vs-stcg",
    ],
  },
  {
    slug: "pfic-rules-for-nris-mutual-fund-trap",
    clusterSlug: "investments-repatriation",
    title: "PFIC Rules for NRIs: Why Indian Mutual Funds Are a US Tax Trap",
    description:
      "A US person holding Indian mutual funds can trigger PFIC reporting and punitive default tax treatment — a rule most people only discover after the fact.",
    dek: "Indian mutual funds are a completely ordinary investment in India. To the IRS, most of them are 'Passive Foreign Investment Companies' — and that label comes with teeth.",
    sections: [
      {
        paragraphs: [
          "If you're a US person (citizen, green card holder, or US tax resident) who also holds Indian mutual funds, you've very likely triggered a US tax regime most NRIs have never heard of: PFIC — Passive Foreign Investment Company. Indian mutual funds are pooled investment vehicles earning largely passive income (dividends, interest, capital gains), which is exactly the profile PFIC rules were written to capture, regardless of how ordinary or low-risk the fund itself is by Indian standards.",
        ],
      },
      {
        heading: "Why the default treatment is punitive",
        paragraphs: [
          "Absent an election, the IRS's default PFIC tax treatment (the 'excess distribution' regime) is designed to be unfavorable — it taxes gains and certain distributions at the highest marginal rate regardless of your actual bracket, applies retroactive interest charges as if the gain had accrued evenly over your entire holding period, and denies the preferential long-term capital gains rate you'd normally get on a held investment. It's a compliance-forcing mechanism as much as a revenue one: the alternative elections (like a Qualified Electing Fund election) require information Indian mutual funds essentially never provide in the format the IRS wants.",
        ],
      },
      {
        heading: "The filing trigger most people miss",
        paragraphs: [
          "Separate from the tax treatment itself, PFIC holdings above certain value thresholds require their own annual filing (Form 8621) — one per fund, in many cases — and this reporting obligation exists independently of whether you actually sold anything or owe any additional tax that year. It's easy to build up a portfolio of several Indian mutual funds over the years without realizing each one is a separate PFIC filing obligation once thresholds are crossed.",
        ],
      },
      {
        paragraphs: [
          "The PFIC filing-threshold checker on the Investments & Repatriation page estimates whether your PFIC holdings likely cross the Form 8621 filing threshold; it does not calculate the excess-distribution tax itself, which depends on your specific holding history and requires professional preparation.",
        ],
      },
    ],
    relatedSlugs: [
      "nri-investment-options-in-india-overview",
      "nri-repatriation-limits-explained",
    ],
  },
  {
    slug: "nri-investment-options-in-india-overview",
    clusterSlug: "investments-repatriation",
    title: "NRI Investment Options in India: A Category-by-Category Overview",
    description:
      "From equities and mutual funds to real estate and NPS — a plain overview of what NRIs can invest in from abroad, and what to check before each one.",
    dek: "Most investment categories open to resident Indians are open to NRIs too, with extra rules layered on top. Here's the landscape at a glance.",
    sections: [
      {
        paragraphs: [
          "NRIs have access to most of the same broad investment categories available to resident Indians — equities, mutual funds, fixed deposits, real estate, and government schemes — but each comes with its own NRI-specific rules around account routing, repatriability, and tax treatment layered on top of the ordinary product rules.",
        ],
      },
      {
        heading: "Direct equities and mutual funds",
        paragraphs: [
          "NRIs can invest in Indian listed equities generally through the Portfolio Investment Scheme (PIS) route via a designated NRE/NRO account, and in Indian mutual funds directly (subject to individual fund houses' own NRI policies, which vary by the investor's country of residence — US/Canada-based NRIs in particular sometimes face restricted fund availability due to those funds' own FATCA-related compliance overhead). US-person NRIs should read this alongside the PFIC implications of Indian mutual fund holdings before investing.",
        ],
      },
      {
        heading: "Fixed deposits",
        paragraphs: [
          "NRE fixed deposits offer tax-exempt interest (in India) and free repatriability; NRO fixed deposits are taxable with TDS withheld and face the standard NRO repatriation ceiling. FCNR (Foreign Currency Non-Resident) deposits are a third option, held in foreign currency, which sidesteps rupee exchange-rate risk on the principal — a materially different trade-off from a rupee-denominated NRE deposit.",
        ],
      },
      {
        heading: "Real estate and government schemes",
        paragraphs: [
          "NRIs can generally purchase residential and commercial property in India (agricultural land, plantation property, and farmhouses are typically restricted), with capital gains on eventual sale subject to the LTCG/STCG and Section 195 TDS rules covered on the Real Estate Capital Gains page. NRIs are also eligible for the National Pension System (NPS) on the same broad terms as residents, though repatriation of NPS proceeds follows its own scheme rules rather than the general NRO ceiling.",
        ],
      },
    ],
    relatedSlugs: [
      "pfic-rules-for-nris-mutual-fund-trap",
      "selling-property-in-india-as-nri-ltcg-vs-stcg",
      "nri-repatriation-limits-explained",
    ],
  },

  // --- Real Estate Capital Gains cluster ---
  {
    slug: "selling-property-in-india-as-nri-ltcg-vs-stcg",
    clusterSlug: "real-estate-capital-gains",
    title: "Selling Property in India as an NRI: LTCG vs. STCG Explained",
    description:
      "The holding period on your Indian property sale doesn't just affect the tax rate — it determines the entire calculation method used to get there.",
    dek: "Cross the 24-month holding line and your property sale is taxed under a completely different regime. Here's what actually changes.",
    sections: [
      {
        paragraphs: [
          "When an NRI sells property in India, the very first question is how long it was held, because that single fact determines which tax regime applies: hold it for more than 24 months and the gain is classified as long-term (LTCG); hold it 24 months or less and it's short-term (STCG). The two aren't just taxed at different rates — they're calculated differently.",
        ],
      },
      {
        heading: "Long-term: flat rate, no indexation for NRIs",
        paragraphs: [
          "Following the Finance (No. 2) Act, 2024 changes to the capital gains regime, LTCG on property is generally taxed at a flat rate without the indexation benefit (which adjusts the purchase cost for inflation) that resident individuals and HUFs can still elect under a grandfathering option for pre-existing assets — that grandfathering choice does not extend to NRIs, which is a distinction worth double-checking against your own facts before assuming otherwise.",
        ],
      },
      {
        heading: "Short-term: taxed at your slab rate",
        paragraphs: [
          "STCG on property doesn't get a special flat rate — it's added to your other taxable income for the year and taxed at your applicable slab rate, which means the actual rupee tax figure depends on your total income for the year, not just the gain itself. That's also why an STCG calculator can classify the gain and compute it, but generally can't assert a single tax-rate figure the way an LTCG calculation can.",
        ],
      },
      {
        paragraphs: [
          "The LTCG/STCG classifier on the Real Estate Capital Gains page walks through the holding-period classification and the resulting gain calculation, including acquisition cost, improvement costs, and transfer expenses.",
        ],
      },
    ],
    relatedSlugs: [
      "section-195-tds-on-nri-property-sales",
      "form-13-lower-tds-certificate-worth-it",
    ],
  },
  {
    slug: "section-195-tds-on-nri-property-sales",
    clusterSlug: "real-estate-capital-gains",
    title: "Section 195 TDS on NRI Property Sales: What Buyers Withhold",
    description:
      "When a buyer purchases property from an NRI seller, they're legally required to withhold TDS on the full sale price — not just the gain. Here's why that matters.",
    dek: "Section 195 TDS is withheld on the full sale consideration, not the profit. For a highly appreciated property, that's a very different number than sellers expect.",
    sections: [
      {
        paragraphs: [
          "Section 195 of the Income-tax Act places the withholding obligation on the buyer, not the seller, whenever the seller is a non-resident. In practice this means: when you sell Indian property as an NRI, the buyer is legally required to deduct TDS before paying you, and hand that amount over to the tax department directly.",
        ],
      },
      {
        heading: "The detail that surprises most sellers",
        paragraphs: [
          "Unlike TDS on a resident seller (typically withheld on the sale value under a different, lower-rate provision), Section 195 TDS on an NRI seller is calculated on the full sale consideration by default — not on the capital gain. For a property that's appreciated significantly, that produces a TDS figure that can be far larger than the seller's actual tax liability on the gain, simply because the default withholding basis ignores the seller's cost.",
        ],
      },
      {
        heading: "Where the rate comes from",
        paragraphs: [
          "The applicable rate depends on whether the gain is long-term or short-term, plus applicable surcharge and cess — or a different, often lower, rate if the seller has obtained a lower/nil TDS certificate under Section 197 in advance. Buyers who skip or underwithhold this TDS can themselves face penalties and interest, which is part of why buyers tend to withhold conservatively (i.e., on the full consideration) absent that certificate.",
        ],
      },
      {
        paragraphs: [
          "The Section 195 TDS estimator on the Real Estate Capital Gains page estimates the withholding a buyer would apply on a given sale, with or without a certified lower rate, so you can see the gap between what gets withheld and what you may actually owe.",
        ],
      },
    ],
    relatedSlugs: [
      "selling-property-in-india-as-nri-ltcg-vs-stcg",
      "form-13-lower-tds-certificate-worth-it",
    ],
  },
  {
    slug: "form-13-lower-tds-certificate-worth-it",
    clusterSlug: "real-estate-capital-gains",
    title: "Form 13 Lower TDS Certificate: Is It Worth Applying?",
    description:
      "Applying for a lower TDS certificate before a property sale can prevent a large chunk of your proceeds from being tied up until refund season — but it isn't free.",
    dek: "A lower TDS certificate can be the difference between waiting months for a refund and getting the right amount at closing. Here's how to tell if it's worth the effort.",
    sections: [
      {
        paragraphs: [
          "Because Section 195 TDS is withheld on the full sale consideration by default, NRI sellers with a genuinely small gain relative to the sale price can end up with a large share of their proceeds withheld — money that's technically recoverable, but only by filing an Indian tax return and waiting for a refund, which can take months. Applying to the assessing officer for a lower or nil TDS certificate (historically under Section 197, using Form 13) is the mechanism to correct the withholding amount upfront instead.",
        ],
      },
      {
        heading: "The trade-off",
        paragraphs: [
          "Getting the certificate takes time and requires supporting documentation of your actual cost basis and expected gain — meaning it needs to be started well before the sale closes, not requested at the closing table. It's most worth pursuing when the gap between default TDS (on full consideration) and your actual expected tax liability (on the gain) is large, and least worth it for a sale happening on a tight timeline where the refund-later route may simply be faster in practice.",
        ],
      },
      {
        heading: "A renumbering worth flagging",
        paragraphs: [
          "Under the Income-tax Act, 2025, this mechanism is renumbered — Section 197 becomes Section 395, and Form 13 becomes Form 128 — a change that affects the form name and section reference but not the underlying purpose of the certificate. Because this renumbering was surfaced via a general cross-check rather than a direct reading of the new Act's text, treat the old/new number pairing as a starting point for your own verification, not a final answer.",
        ],
      },
      {
        paragraphs: [
          "The Form 13 explainer on the Real Estate Capital Gains page compares your default Section 195 withholding against your own estimated actual tax, to give a rough sense of whether the certificate is likely worth pursuing for your sale.",
        ],
      },
    ],
    relatedSlugs: [
      "section-195-tds-on-nri-property-sales",
      "selling-property-in-india-as-nri-ltcg-vs-stcg",
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getArticlesForCluster(clusterSlug: string): Article[] {
  return articles.filter((article) => article.clusterSlug === clusterSlug);
}

export function getRelatedArticles(article: Article): Article[] {
  return article.relatedSlugs
    .map((slug) => getArticle(slug))
    .filter((related): related is Article => Boolean(related));
}
