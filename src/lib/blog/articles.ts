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

  // --- DTAA / Tax Residency cluster (batch 2) ---
  {
    slug: "rnor-status-explained-for-returning-nris",
    clusterSlug: "dtaa-tax-residency",
    title: "RNOR Status: The Tax Bridge Returning NRIs Often Miss",
    description:
      "Coming back to India for good doesn't flip your tax status overnight — RNOR is a transitional status that can shield your foreign income for a few extra years, if you know it exists.",
    dek: "Moving back to India usually means becoming a tax resident again. RNOR status is the buffer most returning NRIs don't realize they're entitled to.",
    sections: [
      {
        paragraphs: [
          "Residency in India isn't just resident-or-non-resident. There's a third category — Resident but Not Ordinarily Resident (RNOR) — that sits between the two, and it exists specifically for people whose India ties have just changed, most commonly NRIs returning to settle back in India. Missing that RNOR applies to you can mean paying Indian tax on foreign income you didn't actually need to disclose yet.",
        ],
      },
      {
        heading: "How you qualify",
        paragraphs: [
          "You're eligible for RNOR status in a given financial year if you meet the general day-count test for being an Indian resident that year, and additionally satisfy either of two conditions: you were a non-resident in 9 of the 10 financial years preceding that year, or you were present in India for less than 730 days in aggregate across the 7 financial years preceding that year. Either condition is enough on its own — you don't need both.",
          "In practice, this means someone who has spent many years abroad and then returns doesn't jump straight to full ordinary-resident status the moment they cross the resident day-count threshold — they typically pass through RNOR first, for as long as those lookback conditions keep being satisfied, generally up to about 3 financial years after the return.",
        ],
      },
      {
        heading: "Why it matters: what stays untaxed",
        paragraphs: [
          "The tax benefit is the point of the status: an RNOR is taxed in India only on India-sourced income and income actually received in India, the same narrow scope as a non-resident — foreign income (say, a US salary earned before the move, or continuing US investment income) stays outside India's tax net for as long as RNOR status holds. NRE and FCNR account interest, which is tax-exempt for NRIs, also generally continues to be exempt through the RNOR window.",
          "That window closes gradually and automatically, not on a fixed calendar date — it ends whenever the lookback conditions above stop being met, which is why the day-count history matters even after you've physically moved back.",
        ],
      },
      {
        heading: "A rule change worth tracking",
        paragraphs: [
          "The India residency calculator on this site's DTAA & Tax Residency page already covers the Finance Act 2020 nuance where high-income visiting individuals (India income above ₹15 lakh) can face a shorter 120-day residency threshold instead of the general 182-day one. Multiple current secondary sources describe a related change taking effect under the Income-tax Act, 2025 (in force from financial year 2026-27) that extends a comparable 120-day-plus-prior-ties test more broadly to this RNOR determination for high-income individuals. Because this site has not independently verified that provision against the Act's official text, treat it as a flag to check your own facts against the current law directly — or with a CA — rather than a settled figure.",
        ],
      },
    ],
    relatedSlugs: [
      "nri-or-resident-how-tax-residency-works",
      "dual-status-tax-return-year-you-move",
    ],
  },
  {
    slug: "dual-status-tax-return-year-you-move",
    clusterSlug: "dtaa-tax-residency",
    title: "Dual-Status Tax Returns: Filing for the Year You Move",
    description:
      "The calendar year you move to or from the US, you may owe two different tax treatments in the same return — here's what a dual-status year actually means for filing.",
    dek: "Moving countries mid-year doesn't just change where you live. On the US side, it can split a single tax year into two different filing regimes.",
    sections: [
      {
        paragraphs: [
          "Most years, a US filer is cleanly either a resident alien or a nonresident alien for the whole year. The year you actually move — arriving to take up residency, or departing for good — is often the exception: you can be a nonresident for part of the year and a resident for the rest, which the IRS calls dual-status. It changes how the return is structured, not just what boxes get checked.",
        ],
      },
      {
        heading: "What actually changes",
        paragraphs: [
          "For the part of the year you're a resident, you're taxed on worldwide income, the same as any US resident. For the part of the year you're a nonresident, you're taxed only on US-source income. A dual-status year isn't one Form 1040 — it's a combination filing (a 1040 paired with a 1040-NR statement, or the reverse, depending on which status applies at year-end), and several standard resident-year conveniences, like claiming the standard deduction or filing jointly with a spouse, generally aren't available in a dual-status year without a separate election.",
        ],
      },
      {
        heading: "The First-Year Choice election",
        paragraphs: [
          "If you arrive mid-year and wouldn't otherwise pass the Substantial Presence Test until the following year, the First-Year Choice election can let you be treated as a dual-status resident starting partway through the arrival year instead of waiting until you clearly qualify — but only if you're present for at least 31 consecutive days in the current year and present for at least 75% of the days from that 31-day period through the end of the year. It's an election you make, not something that applies automatically.",
        ],
      },
      {
        paragraphs: [
          "This is exactly the kind of transition-year situation where the Substantial Presence Test calculator on this site's DTAA & Tax Residency page is most useful — not just for a yes/no answer, but for pinning down the specific day-count that determines whether a dual-status year applies to you at all, and where your residency starting date falls within it.",
        ],
      },
    ],
    relatedSlugs: [
      "substantial-presence-test-explained",
      "rnor-status-explained-for-returning-nris",
      "form-8833-treaty-based-return-disclosure",
    ],
  },
  {
    slug: "form-8833-treaty-based-return-disclosure",
    clusterSlug: "dtaa-tax-residency",
    title: "Form 8833: Disclosing a Treaty-Based Position on Your US Return",
    description:
      "Claiming a DTAA benefit that overrides the default US tax treatment isn't just a number on your return — the IRS generally requires you to say so explicitly, on Form 8833.",
    dek: "Using a treaty article to reduce your US tax isn't automatic paperwork-free relief. In most cases, you have to formally disclose that you're doing it.",
    sections: [
      {
        paragraphs: [
          "When you rely on a provision of the India-US DTAA to reduce or modify what you'd otherwise owe under standard US tax law, the IRS generally wants that position disclosed, not just reflected silently in a lower number on your return. Form 8833 (Treaty-Based Return Position Disclosure) is that disclosure mechanism, required under Internal Revenue Code Section 6114 for a treaty-based position that overrides domestic law.",
        ],
      },
      {
        heading: "What counts as a disclosable position",
        paragraphs: [
          "A treaty-based position is one where you're claiming the treaty changes an outcome the Internal Revenue Code would otherwise produce — for example, treaty-based relief on a specific income category, or leaning on the treaty's residency tie-breaker article when you'd otherwise be treated as a dual resident. Not every treaty-related claim requires the form; the instructions carve out specific routine situations from the disclosure requirement, so it's worth checking the current Form 8833 instructions for whether your particular claim is one of the exceptions before assuming you need to file it.",
        ],
      },
      {
        heading: "The penalty for skipping it",
        paragraphs: [
          "Failing to file a required Form 8833 carries its own penalty — currently $1,000 for an individual — and notably, that penalty applies even if the underlying treaty position was completely valid and correctly reduced your tax. In other words, this isn't a penalty for claiming the wrong benefit; it's a penalty for claiming a real benefit without the paperwork that says you're claiming it. The IRS can waive it for reasonable cause, but that's a case made after the fact, not a substitute for filing on time.",
        ],
      },
      {
        paragraphs: [
          "Form 8833 is a disclosure, not a calculation — it doesn't replace working out the treaty relief amount itself. The DTAA relief estimator on this site's DTAA & Tax Residency page walks through the credit-method math for a given income and foreign tax paid; whether that specific position also triggers a Form 8833 filing obligation depends on the treaty article involved and is worth confirming with a preparer familiar with treaty disclosure rules.",
        ],
      },
    ],
    relatedSlugs: [
      "claiming-dtaa-relief-credit-vs-exemption",
      "dual-status-tax-return-year-you-move",
    ],
  },

  // --- NRE/NRO & TDS cluster (batch 2) ---
  {
    slug: "fcnr-deposits-explained",
    clusterSlug: "nre-nro-tds",
    title: "FCNR Deposits: The NRI Account That Sidesteps Rupee Risk",
    description:
      "NRE and NRO aren't the only account types available to NRIs — FCNR deposits let you earn interest in foreign currency without ever converting to rupees.",
    dek: "Every NRE/NRO comparison skips a third option. FCNR deposits hold your money in dollars (or another foreign currency) the whole way through — no rupee exposure at all.",
    sections: [
      {
        paragraphs: [
          "NRE and NRO accounts both hold funds in rupees, which means both carry rupee exchange-rate exposure even when the underlying money originated abroad. FCNR (Foreign Currency Non-Resident) deposits are structured differently on purpose: the deposit is held, and earns interest, in a foreign currency — commonly USD, GBP, EUR, JPY, or CAD — with no conversion to rupees at any point in the deposit's life.",
        ],
      },
      {
        heading: "What makes it different",
        paragraphs: [
          "Because the principal never becomes rupees, an FCNR deposit isn't affected by rupee depreciation or appreciation the way an NRE fixed deposit is — you get back the same foreign-currency amount plus interest, regardless of what the exchange rate did in between. The trade-off is structural: FCNR accounts are term deposits only (no savings-account version), with a minimum tenure of one year, so this isn't a place to park funds you might need to move on short notice.",
        ],
      },
      {
        heading: "Tax and repatriation",
        paragraphs: [
          "FCNR interest is tax-exempt in India, with no TDS withheld — the same treatment as NRE interest — and both the principal and accrued interest are freely repatriable, without the annual ceiling that applies to NRO funds.",
        ],
      },
      {
        paragraphs: [
          "The NRE vs. NRO chooser on this site's NRE/NRO & TDS page focuses on the two rupee-denominated account types; if currency risk on the principal itself is your main concern rather than just repatriability, FCNR is the option worth asking your bank's NRI desk about directly, since exact currency options and rates vary by bank.",
        ],
      },
    ],
    relatedSlugs: [
      "nre-vs-nro-accounts-which-do-you-need",
      "nri-investment-options-in-india-overview",
    ],
  },
  {
    slug: "do-nris-need-to-file-indian-tax-return",
    clusterSlug: "nre-nro-tds",
    title: "Do NRIs With No India Income Still Need to File an ITR?",
    description:
      "Not having a salary in India doesn't automatically mean nothing to file — a handful of specific triggers can make an Indian tax return mandatory even for NRIs with minimal India ties.",
    dek: "\"No India income, no India filing\" is mostly true for NRIs — until one of a short list of specific triggers applies. Here's what to check before assuming you're in the clear.",
    sections: [
      {
        paragraphs: [
          "For an NRI with genuinely no India-sourced income in a financial year, filing an Indian income tax return is generally not mandatory. But \"no salary\" isn't the same as \"no filing trigger\" — several other conditions can make a return mandatory even for someone whose only India connection is a bank account or a small investment.",
        ],
      },
      {
        heading: "The core trigger: income above the exemption limit",
        paragraphs: [
          "Filing becomes mandatory once your total taxable India-sourced income for the year exceeds the basic exemption limit for NRIs (India-sourced rent, interest, capital gains, and similar income all count toward this, even without a salary). The exact rupee threshold has moved with recent tax law changes, so check the current-year figure rather than assuming a prior year's number still applies.",
        ],
      },
      {
        heading: "Triggers that apply regardless of total income",
        paragraphs: [
          "A few conditions force a filing requirement independent of whether your total income crosses the exemption limit at all: short-term capital gains on listed equity shares, equity-oriented mutual fund units, or business trust units; TDS or TCS on your India income exceeding ₹25,000 in the financial year; and depositing more than ₹1 crore in aggregate across current accounts. Any one of these on its own is enough to require a return, even if every other figure on your India side looks minor.",
        ],
      },
      {
        paragraphs: [
          "The triggers, at a glance:",
        ],
        list: [
          "India-sourced income above the exemption limit for the year — file",
          "Any short-term capital gains on listed equity/equity MF/business trust units — file, regardless of total income",
          "TDS or TCS on India income over ₹25,000 in the financial year — file",
          "Over ₹1 crore deposited across current accounts in the year — file",
          "None of the above, and genuinely no India income — filing is typically not mandatory, but may still be worth doing voluntarily to claim back excess TDS",
        ],
      },
      {
        paragraphs: [
          "The TDS-on-NRO-interest calculator on this site's NRE/NRO & TDS page is a useful starting point for the second-most-common trigger NRIs hit — interest income and the TDS withheld on it — even when the underlying interest amount itself looks small.",
        ],
      },
    ],
    relatedSlugs: [
      "tds-on-nro-interest-explained",
      "nre-vs-nro-accounts-which-do-you-need",
    ],
  },
  {
    slug: "tds-on-rent-paid-to-nri-landlord",
    clusterSlug: "nre-nro-tds",
    title: "TDS on Rent Paid to an NRI Landlord: What Tenants Must Withhold",
    description:
      "Renting an apartment from an NRI landlord comes with a compliance obligation most tenants don't expect — and it starts from the very first rupee of rent.",
    dek: "If your landlord is an NRI, you — the tenant — are on the hook for withholding tax on the rent. There's no minimum threshold, and the paperwork is genuinely different from renting from a resident.",
    sections: [
      {
        paragraphs: [
          "When a tenant in India rents from a resident landlord, TDS on rent only kicks in above a specified threshold, and the rate is relatively modest. When the landlord is an NRI, Section 195 applies instead, and the obligation looks very different: the tenant must deduct TDS on the rent from the first rupee paid, with no minimum exemption amount, at a materially higher rate.",
        ],
      },
      {
        heading: "The rate and the mechanics",
        paragraphs: [
          "The default TDS rate on rent paid to an NRI landlord runs to roughly 30% of the rent plus applicable cess (commonly cited around 31.2% all-in), deducted at whichever comes first — when the rent is credited to the landlord or when it's actually paid. That deducted amount has to be deposited with the government by the 7th of the following month, using the standard TDS challan, and the tenant generally needs to obtain a TAN (Tax Deduction Account Number) to do this correctly — an extra registration step most individual tenants have never dealt with before.",
        ],
      },
      {
        heading: "Ways the rate can come down",
        paragraphs: [
          "The applicable rate can be reduced if the NRI landlord qualifies for a lower rate under the DTAA, or has obtained a lower/nil deduction certificate in advance — the same Section 197 mechanism (recently renumbered to Section 395 under the Income-tax Act, 2025, per this site's Form 13 explainer) used for NRI property-sale TDS. Without that certificate in hand, tenants generally default to withholding at the full statutory rate, since they have no independent way to verify a lower rate applies.",
        ],
      },
      {
        paragraphs: [
          "This obligation sits on the tenant, not the landlord — which is exactly why it surprises people who've only ever rented from resident landlords before. If you're the tenant, this is worth raising with the landlord (or a CA) before the first rent payment, not after.",
        ],
      },
    ],
    relatedSlugs: [
      "tds-on-nro-interest-explained",
      "form-13-lower-tds-certificate-worth-it",
    ],
  },

  // --- Investments & Repatriation cluster (batch 2) ---
  {
    slug: "fbar-fatca-reporting-for-nris",
    clusterSlug: "investments-repatriation",
    title: "FBAR and FATCA: The US Reporting Rules NRIs Often Overlook",
    description:
      "A US person with Indian bank accounts or investments can owe two separate annual foreign-asset disclosures to the US government, entirely apart from any tax actually owed.",
    dek: "FBAR and FATCA aren't taxes — they're disclosures. But the penalties for missing either one can be steep, and the two have different thresholds and different forms.",
    sections: [
      {
        paragraphs: [
          "If you're a US person (citizen, green card holder, or US tax resident) holding Indian bank accounts, NRE/NRO deposits, or Indian investments, you may have two separate annual US reporting obligations that exist independently of whether you owe any additional tax: FBAR and FATCA. They're often confused for each other, but they're different filings, with different thresholds, going to different places.",
        ],
      },
      {
        heading: "FBAR: a single, low threshold",
        paragraphs: [
          "FBAR (FinCEN Form 114) applies once the combined value of your foreign financial accounts — across all accounts, all countries — exceeds $10,000 at any point during the year, even briefly. It's filed electronically with FinCEN, not attached to your tax return, and the threshold doesn't vary by filing status or where you live.",
        ],
      },
      {
        heading: "FATCA: higher and more variable thresholds",
        paragraphs: [
          "FATCA reporting (Form 8938, filed with your tax return) uses meaningfully higher thresholds than FBAR, and — unlike FBAR — the exact number depends on your filing status and whether you live in the US or abroad, ranging from the tens of thousands of dollars up into the hundreds of thousands for a married couple living overseas. FATCA also covers a broader range of assets than FBAR — not just accounts, but certain foreign investments and interests held outside a traditional account. Check the current Form 8938 instructions for the exact figure that applies to your filing status and residence, since it's a multi-tier table, not one number.",
        ],
      },
      {
        paragraphs: [
          "It's entirely possible to owe both filings for the same accounts in the same year — FBAR and FATCA aren't a choice between the two. And this is separate from PFIC reporting: if your Indian holdings include mutual funds, the PFIC filing-threshold checker on this page addresses that distinct obligation, which layers on top of, not instead of, FBAR/FATCA.",
        ],
      },
    ],
    relatedSlugs: [
      "pfic-rules-for-nris-mutual-fund-trap",
      "gifting-money-india-us-tax-rules",
    ],
  },
  {
    slug: "nps-for-nris-explained",
    clusterSlug: "investments-repatriation",
    title: "NPS for NRIs: Who Can Invest, and How Repatriation Works",
    description:
      "The National Pension System is open to NRIs, but not to everyone with Indian roots — and the repatriation rules for it depend on which account funded your contributions.",
    dek: "NPS eligibility for NRIs comes with an exception that trips people up, and repatriation isn't a single blanket rule the way it is for some other investments.",
    sections: [
      {
        paragraphs: [
          "The National Pension System (NPS) — India's government-regulated retirement savings scheme — is open to NRIs on broadly the same terms as resident Indians, with a PAN and standard KYC required, and a Tier-I account (the primary retirement account) available with a modest minimum contribution.",
        ],
      },
      {
        heading: "The eligibility exception worth knowing",
        paragraphs: [
          "Eligibility is based on Indian citizenship, not on the broader Person of Indian Origin (PIO) or Overseas Citizen of India (OCI) status — OCIs, PIOs, and HUFs are generally not eligible to open an NPS account, unlike some other NRI investment routes covered elsewhere on this site that extend more broadly to PIO/OCI holders. If your Indian-origin status is OCI rather than citizenship, this is worth confirming directly before assuming NPS is available to you.",
        ],
      },
      {
        heading: "Funding and repatriation",
        paragraphs: [
          "Contributions must come through an NRE or NRO account, and which one you use determines the repatriation treatment: funds contributed via NRE follow the free-repatriation rule that applies to NRE money generally, while funds contributed via NRO are subject to the standard NRO repatriation ceiling and documentation. The eventual pension or withdrawal amount itself is repatriable, and — as with most Indian retirement schemes — a portion of the corpus (commonly cited around 40%) is required to be used to purchase an annuity at retirement rather than withdrawn as a lump sum.",
        ],
      },
      {
        paragraphs: [
          "NPS repatriation is governed by RBI/FEMA rules layered on top of the scheme's own regulator (PFRDA), which is a different combination of rules than the repatriation headroom estimator on this page (built around NRO's general ceiling) directly models — treat NPS as its own category rather than assuming the general NRO estimator captures its specifics.",
        ],
      },
    ],
    relatedSlugs: [
      "nri-investment-options-in-india-overview",
      "nri-repatriation-limits-explained",
    ],
  },
  {
    slug: "gifting-money-india-us-tax-rules",
    clusterSlug: "investments-repatriation",
    title: "Gifting Money Between India and the US: What Each Side Taxes",
    description:
      "A gift from a parent in India to a child in the US touches two completely different rulebooks — India's recipient-side gift tax, and a separate US reporting obligation.",
    dek: "India and the US don't tax cross-border family gifts the same way, or even ask the same question. Here's what each side actually looks at.",
    sections: [
      {
        paragraphs: [
          "Gifting money across the India-US corridor — most commonly a parent in India sending money to a child settled in the US, or the reverse — runs into two entirely separate rule sets: India's income-tax treatment of gifts on the recipient's side, and a US information-reporting requirement that applies regardless of whether any US tax is actually owed on the gift itself.",
        ],
      },
      {
        heading: "India's side: it depends who's giving",
        paragraphs: [
          "Under Section 56(2)(x) of the Income-tax Act, gifts received from a defined list of \"relatives\" (parents, spouse, siblings, and certain other specified relations) are fully exempt from tax in India regardless of amount. Gifts from anyone outside that relative definition are taxable as the recipient's income once they exceed ₹50,000 in aggregate for the financial year, generally taxed at the recipient's slab rate. Whether someone counts as a \"relative\" under this specific definition is worth checking carefully — it's narrower than the everyday meaning of family.",
        ],
      },
      {
        heading: "The US side: reporting, not gift tax, for the recipient",
        paragraphs: [
          "On the US side, a gift received from a foreign person generally isn't income to the recipient and doesn't trigger US income tax by itself — but if you're a US person receiving gifts from a nonresident alien (or a foreign estate) totaling more than $100,000 in a year, you're required to report it on Form 3520, itemizing each individual gift over $5,000. Gifts from multiple foreign individuals who are related to each other (say, both parents) are aggregated together against that $100,000 threshold, not counted separately per giver. Missing this filing carries a real penalty — commonly cited at up to 25% of the gift's value — even though no tax was actually due on the gift itself.",
        ],
      },
      {
        paragraphs: [
          "The two sides of this don't cancel each other out or need to match: India's ₹50,000/relative-exemption test and the US's $100,000 Form 3520 reporting threshold are independent tests answering different questions, and a transfer can clear one comfortably while still needing attention on the other.",
        ],
      },
    ],
    relatedSlugs: [
      "fbar-fatca-reporting-for-nris",
      "nri-repatriation-limits-explained",
    ],
  },

  // --- Real Estate Capital Gains cluster (batch 2) ---
  {
    slug: "section-54-54ec-exemptions-for-nris",
    clusterSlug: "real-estate-capital-gains",
    title: "Section 54/54EC: How NRIs Can Reduce Tax on a Property Sale by Reinvesting",
    description:
      "NRIs get the same reinvestment-based capital gains exemptions residents do — reinvesting in another home, or in specified bonds, can meaningfully cut what's owed on a property sale.",
    dek: "The LTCG on an Indian property sale doesn't have to be the final number. Reinvesting the gain, in the right window, can bring it down to zero.",
    sections: [
      {
        paragraphs: [
          "Once a property sale is classified as long-term (see our LTCG vs. STCG explainer for the 24-month line), NRIs have access to the same reinvestment-based exemptions available to resident sellers — most commonly Section 54 (reinvesting in another residential property) and Section 54EC (reinvesting in specified capital gains bonds). Neither is automatic; both require action within a specific window after the sale.",
        ],
      },
      {
        heading: "Section 54: buying or building another home",
        paragraphs: [
          "If the gain is reinvested into purchasing a residential property in India within one year before or two years after the sale (or constructing one within three years of the sale), the reinvested portion of the LTCG is exempt. If the new property costs less than the full gain, only the invested amount is exempt — the shortfall is still taxed. A once-in-a-lifetime option allows reinvesting into two residential properties instead of one, but only if the total gain is below a specified cap, and there's a separate overall ceiling on how much gain can be exempted this way — both figures worth confirming against the current-year rules rather than assuming a number from a prior year still holds.",
        ],
      },
      {
        heading: "Section 54EC: bonds instead of property",
        paragraphs: [
          "For sellers who don't want to reinvest in another property, Section 54EC allows LTCG specifically from land or a building to be exempted by investing in specified bonds (typically issued by government-backed infrastructure institutions) within six months of the sale date — subject to an annual cap on how much can go into these bonds per financial year. This route doesn't tie up funds in another property, but the bonds themselves come with their own lock-in period and lower yield than most alternative investments, which is the trade-off for the tax exemption.",
        ],
      },
      {
        paragraphs: [
          "The LTCG/STCG classifier on this site's Real Estate Capital Gains page calculates the underlying gain these exemptions apply to; it doesn't currently model the Section 54/54EC reinvestment math itself, so treat the exemption calculation as a manual next step once you have the classifier's gain figure.",
        ],
      },
    ],
    relatedSlugs: [
      "selling-property-in-india-as-nri-ltcg-vs-stcg",
      "selling-inherited-property-in-india-as-nri",
    ],
  },
  {
    slug: "selling-inherited-property-in-india-as-nri",
    clusterSlug: "real-estate-capital-gains",
    title: "Selling Inherited Property in India as an NRI: What Actually Changes",
    description:
      "The capital gains math on an inherited property doesn't start over when you inherit it — the original owner's cost and purchase date both carry forward to you.",
    dek: "Inheriting a property doesn't reset its tax history. The person who sells it isn't always the person whose original purchase price and date still matter.",
    sections: [
      {
        paragraphs: [
          "When an NRI inherits property in India and later sells it, a common assumption is that the \"cost\" for capital gains purposes is the property's value at the time it was inherited. That's not how it works: for inherited property, the cost of acquisition carried forward is the original owner's actual purchase cost — not the fair market value on the date you inherited it.",
        ],
      },
      {
        heading: "The holding period carries over too",
        paragraphs: [
          "The same carryover applies to the holding period: it's measured from when the original owner acquired the property, not from the date you inherited it. That means a property inherited quite recently can still qualify as long-term (and get LTCG treatment) if the original owner held it for decades — the clock never resets at inheritance.",
        ],
      },
      {
        heading: "The pre-2001 exception",
        paragraphs: [
          "If the original owner acquired the property before April 1, 2001, current rules allow electing the fair market value as of April 1, 2001 as the cost basis instead of the actual historical purchase price — generally a favorable option for older properties, but one that requires a registered valuer's certificate to support the claimed value, not just an informal estimate.",
        ],
      },
      {
        paragraphs: [
          "None of this changes how TDS is withheld at the point of sale: the Section 195 TDS estimator on this site's Real Estate Capital Gains page still applies the same way, withholding on the full sale consideration regardless of whether the property was purchased or inherited — the inheritance only affects the gain calculation itself, not the buyer's withholding obligation.",
        ],
      },
    ],
    relatedSlugs: [
      "selling-property-in-india-as-nri-ltcg-vs-stcg",
      "section-195-tds-on-nri-property-sales",
      "section-54-54ec-exemptions-for-nris",
    ],
  },
  {
    slug: "tcs-lrs-and-nri-remittances-explained",
    clusterSlug: "real-estate-capital-gains",
    title: "Does TCS Apply to NRI Money Transfers? Clearing Up the LRS Confusion",
    description:
      "Headlines about TCS on foreign remittances are describing a rule for resident Indians sending money abroad — not NRIs repatriating money out of India, which is a different regime entirely.",
    dek: "\"TCS on foreign remittance\" news is about resident Indians sending money out under LRS. If you're an NRI moving property-sale proceeds out of India, that's not the rule you're under.",
    sections: [
      {
        paragraphs: [
          "It's a genuinely common point of confusion: news coverage about Tax Collected at Source (TCS) on foreign remittances is describing the Liberalised Remittance Scheme (LRS), an RBI framework that governs how resident Indians send money out of India — for education, travel, investments, and similar purposes. NRIs repatriating funds out of India, including property-sale proceeds, are not operating under LRS at all.",
        ],
      },
      {
        heading: "Why the distinction holds",
        paragraphs: [
          "FEMA classifies NRIs as non-residents, and LRS is specifically a scheme for residents remitting funds abroad — it simply doesn't apply to an NRI moving their own money out of India. That means the TCS rates and thresholds attached to LRS (which have their own periodic changes NRIs sometimes see referenced in the news and mistakenly assume apply to them) are not the rule governing an NRI's repatriation.",
        ],
      },
      {
        heading: "What NRIs are actually subject to instead",
        paragraphs: [
          "NRI repatriation runs through the mechanisms covered elsewhere on this site: freely repatriable NRE funds, the annual RBI ceiling on NRO funds (with Form 15CA/15CB documentation), and — for property sale proceeds specifically — the Section 195 TDS withheld by the buyer at the time of sale, plus whatever the seller's actual tax liability turns out to be once a return is filed. None of these are LRS or its TCS regime.",
        ],
      },
      {
        paragraphs: [
          "If you've seen a TCS rate or threshold quoted somewhere and are trying to work out whether it affects your own property-sale repatriation as an NRI, the short answer from current guidance is: that rate almost certainly describes LRS for residents, not your situation. The repatriation headroom estimator and Section 195 TDS estimator on this site's Investments & Repatriation and Real Estate Capital Gains pages reflect the rules that actually apply to NRIs instead.",
        ],
      },
    ],
    relatedSlugs: [
      "nri-repatriation-limits-explained",
      "section-195-tds-on-nri-property-sales",
    ],
  },
{
  slug: "foreign-tax-credit-form-1116-for-nris",
  clusterSlug: "dtaa-tax-residency",
  title: "Foreign Tax Credit (Form 1116): How NRIs Claim Credit for Indian Tax Paid",
  description:
    "How US-taxpayer NRIs use IRS Form 1116 to credit Indian tax against US tax on the same income, including the income-basket rules, the credit's built-in cap, and carryover mechanics.",
  dek: "The Foreign Tax Credit is the main tool US taxpayers with Indian-sourced income use to avoid paying tax twice on the same rupee — but it is capped, basket-by-basket, and not automatic.",
  sections: [
    {
      paragraphs: [
        "If you're a US citizen or resident (including a green card holder or someone who meets the substantial presence test) with income sourced in India — NRE/NRO interest, dividends, capital gains, or rental income — that income is taxable in both countries. India taxes it at source (often via TDS), and the US taxes its citizens and residents on worldwide income regardless of where it's earned. The Foreign Tax Credit (FTC), claimed on Form 1116, is how the US side of that double taxation gets relieved: it lets you subtract the Indian tax you already paid from your US tax bill on that same income, dollar for dollar, up to a limit.",
        "The FTC is not a deduction — it reduces US tax liability directly, not just taxable income. But it is not unlimited either, and understanding the mechanics (which income category the credit falls into, how the cap is computed, and what happens to credit you can't use this year) matters more than simply knowing the credit exists.",
      ],
    },
    {
      heading: "Income Categories: Why the Credit Is Split Into Baskets",
      paragraphs: [
        "Form 1116 doesn't let you lump all foreign income and all foreign tax into one pool. Foreign income is sorted into separate categories — commonly called \"baskets\" — the two most relevant for NRIs being passive category income (interest, dividends, capital gains, rental income, most annuities) and general category income (wages, self-employment income, and most active business profits). Other baskets exist for foreign branch income and GILTI (section 951A) income, which are less commonly relevant to individual NRI filers.",
        "A separate Form 1116 (or a separate column) is required for each basket, and the credit limitation is computed independently within each one. If your Indian tax on passive income (say, NRE FD interest and mutual fund capital gains) exceeds the US tax attributable to that passive income, the excess cannot be used to offset US tax on general-category wage income, even in the same year — it can only carry over within the passive basket.",
      ],
    },
    {
      heading: "The Credit Is Capped at the US Tax on That Foreign Income",
      paragraphs: [
        "The core limitation formula is: FTC limit = US tax liability × (foreign-source taxable income in that basket ÷ total worldwide taxable income). In practice, this means the credit can never exceed what the US would have taxed on that foreign income anyway — you can eliminate US tax on Indian-sourced income up to that cap, but the FTC won't refund a rupee amount of Indian tax that exceeds the corresponding US tax liability on the same income in the same basket.",
        "This is why the FTC works cleanly when Indian tax rates and US tax rates on the same category of income are roughly comparable, but leaves residual, unused credit when Indian tax on a basket (e.g., TDS on NRO interest) is higher than the US tax that basket would generate.",
      ],
    },
    {
      heading: "Unused Credit: Carryback One Year, Carryforward Ten",
      paragraphs: [
        "When Indian tax paid in a basket exceeds that basket's US limitation for the year, the excess isn't lost. It can first be carried back one year and applied against unused limitation in that basket for the prior year, and whatever remains after that can be carried forward up to ten years, tracked separately for each basket using Schedule B (Form 1116) to reconcile the prior-year carryover against the current year's usage. One notable exception: unused credit in the GILTI (section 951A) category cannot be carried back or forward at all — that basket is a use-it-or-lose-it calculation each year, though this rarely affects individual NRI filers without controlled foreign corporation interests.",
      ],
    },
    {
      heading: "Why FTC, Not the Foreign Earned Income Exclusion, for Indian-Sourced Income",
      paragraphs: [
        "The Foreign Earned Income Exclusion (FEIE, claimed on Form 2555) only applies to earned income — wages and self-employment income from services performed abroad. It does not apply at all to passive income like NRE/NRO interest, dividends, capital gains, or rental income, which is the bulk of what a US-taxpayer NRI typically has sourced in India. For that income, FTC is the only mechanism available, not merely the preferred one.",
        "Even for the earned-income portion some NRIs may have (for example, consulting income paid into an Indian account), electing FEIE has a real cost: once income is excluded under FEIE, no foreign tax credit can be claimed for the foreign tax paid on that same excluded income. Filers with meaningful foreign tax paid often come out ahead using FTC instead of, or on top of, a partial FEIE election, since FTC preserves the ability to credit tax already paid rather than simply removing income from the US return.",
      ],
    },
  ],
  relatedSlugs: [
    "claiming-dtaa-relief-credit-vs-exemption",
    "form-8833-treaty-based-return-disclosure",
    "dtaa-tie-breaker-test-explained",
  ],
},
{
  slug: "dtaa-tie-breaker-test-explained",
  clusterSlug: "dtaa-tax-residency",
  title: "The DTAA Article 4 Tie-Breaker Test, Explained",
  description:
    "When both India and the US claim you as a tax resident in the same year, Article 4 of the India-US tax treaty resolves it through a fixed sequence: permanent home, center of vital interests, habitual abode, nationality, and mutual agreement.",
  dek: "Dual residency isn't resolved by picking whichever country you prefer — Article 4 runs through a strict, ordered test, and most cases are settled at the very first or second step.",
  sections: [
    {
      paragraphs: [
        "It's entirely possible to be a tax resident of both India and the US in the same year under each country's own domestic rules — for instance, meeting the US substantial presence test while also crossing India's residency day-count thresholds during a transition year. When that happens, both countries could in theory tax your worldwide income, which is exactly the double-residency problem Article 4 of the India-US Double Taxation Avoidance Agreement (DTAA) is built to solve for individuals. Article 4 doesn't ask which country you'd rather be a resident of — it applies a fixed, sequential set of tests, and you stop at the first one that produces a clear answer.",
      ],
    },
    {
      heading: "Step One: Permanent Home",
      paragraphs: [
        "The first test asks where you have a \"permanent home available to you\" — a dwelling you can access continuously, as distinct from a place you stay only occasionally (a relative's spare room on a short visit doesn't count the same way an owned or long-term-leased home does). If a permanent home is available in only one of the two countries, that settles it immediately and the analysis stops there. It's only when a permanent home is available in both countries — a common situation for NRIs who own property in India while also maintaining a residence in the US — that you move to the next test.",
      ],
    },
    {
      heading: "Step Two: Center of Vital Interests",
      paragraphs: [
        "If a permanent home exists in both countries, the tie-breaker turns to where your personal and economic relations are closer — your \"center of vital interests.\" This is a genuinely factual, weighted inquiry rather than a bright-line rule. On the personal side, the location of your immediate family (spouse and dependent children) generally carries more weight than extended family or social ties. On the economic side, active involvement in business or employment — where you actually work, manage property, or draw a salary — is generally weighted more heavily than passive holdings like a portfolio of investments sitting in one country. Indian tribunals applying this test have repeatedly emphasized nucleus-family location and active business/employment ties over passive investment presence.",
        "Center of vital interests resolves a large share of real dual-residency disputes, because it's rare for someone's family and primary economic activity to be evenly split between two countries in a way that produces a genuine tie.",
      ],
    },
    {
      heading: "Steps Three Through Five: Habitual Abode, Nationality, Mutual Agreement",
      paragraphs: [
        "If center of vital interests can't be determined either — or if no permanent home was available in either country at step one — the test moves to habitual abode: which country you stay in more habitually, looked at over a meaningful period rather than a single year in isolation. If that's still a tie (or you have a habitual abode in neither country), residency is assigned based on nationality — which of the two countries you hold citizenship of. And in the rare case where you're a national of both countries, or neither, the treaty punts the question to the competent authorities of India and the US to resolve directly through a mutual agreement procedure (MAP) — a government-to-government negotiation, not something an individual filer resolves alone on a return.",
        "In practice, very few real cases reach step four or five; most are resolved at the permanent-home or center-of-vital-interests stage. But because the test is sequential, you can't skip ahead — a filer with a permanent home in only one country never even reaches the vital-interests analysis, regardless of where their family or business happens to be.",
      ],
    },
  ],
  relatedSlugs: [
    "nri-or-resident-how-tax-residency-works",
    "substantial-presence-test-explained",
    "form-8833-treaty-based-return-disclosure",
  ],
},
{
  slug: "us-exit-tax-for-green-card-holders",
  clusterSlug: "dtaa-tax-residency",
  title: "The US Exit Tax for Long-Term Green Card Holders Returning to India",
  description:
    "How IRC 877A's 'covered expatriate' rules and mark-to-market exit tax can apply to long-term green card holders who give up their status to move back to India permanently.",
  dek: "Handing back a green card after many years in the US can trigger a deemed sale of your entire worldwide portfolio — the exit tax rules apply to long-term residents, not just citizens who renounce.",
  sections: [
    {
      paragraphs: [
        "The US \"exit tax\" under IRC section 877A is usually discussed in the context of citizens renouncing US citizenship, but it applies equally to green card holders who formally give up lawful permanent resident status — a scenario directly relevant to NRIs who spent years working in the US on a green card and are now moving back to India for good. Not every returning green card holder is affected: the rules only reach \"long-term residents,\" and only long-term residents who separately meet one of three thresholds that make them a \"covered expatriate.\" Understanding both filters matters before assuming — or dismissing — an exit tax exposure.",
      ],
    },
    {
      heading: "Who Counts as a Long-Term Resident",
      paragraphs: [
        "You're a long-term resident for this purpose if you held a green card (lawful permanent resident status) in at least 8 of the 15 tax years ending with the year your status ends. The count is inclusive of any year in which you held the green card for even part of the year, so someone who obtained a green card partway through a calendar year and gives it up partway through another still counts both years toward the 8-of-15. Only long-term residents are exposed to the exit tax rules at all — someone who held a green card for, say, five years and abandons it is generally outside IRC 877A entirely, however large their net worth.",
      ],
    },
    {
      heading: "The Three Covered Expatriate Tests",
      paragraphs: [
        "A long-term resident becomes a \"covered expatriate\" — the status that actually triggers exit tax consequences — by meeting any one of three tests as of the expatriation date. The net worth test is met if your worldwide net worth is $2 million or more; unlike the other thresholds, this figure is fixed by statute and has not been adjusted for inflation, so it captures a wider share of long-tenured green card holders over time, particularly those with appreciated Indian or US real estate, retirement accounts, or employer stock. The average annual net income tax liability test is met if your average US federal income tax liability over the five tax years before expatriation exceeds an inflation-adjusted threshold — figures in this range are revised annually by the IRS, so confirm the exact threshold for your specific expatriation year against the current IRS revenue procedure before relying on it (this could not be directly verified against IRS.gov in this pass; see note below). The certification test is met — regardless of net worth or income — if you fail to certify on Form 8854 that you've complied with all US federal tax obligations for the five years preceding expatriation.",
        "Meeting any single one of the three tests makes you a covered expatriate; you don't need to fail all three. A long-term resident well under the net-worth threshold can still become a covered expatriate purely by failing to certify five years of clean tax compliance on Form 8854.",
      ],
    },
    {
      heading: "The Mark-to-Market Exit Tax Itself",
      paragraphs: [
        "For a covered expatriate, section 877A imposes a mark-to-market regime: you're treated as if you sold your entire worldwide asset portfolio — Indian and US real estate, equities, mutual funds, business interests, essentially everything you own — at fair market value on the day before your green card status ends, and any net deemed gain above an inflation-adjusted exclusion amount is taxed as if realized. That exclusion amount is also revised annually by the IRS and needs direct confirmation for the relevant expatriation year before relying on it (see note below). The exclusion applies once, against your total net deemed gain across all covered assets combined, not separately per asset, and deemed losses on some assets offset deemed gains on others within that calculation. Separate, more complex rules apply to deferred compensation, specified tax-deferred accounts, and interests in certain trusts, so a long-term green card holder with employer retirement plans or foreign trust interests should treat those categories as a distinct sub-analysis rather than assuming the standard mark-to-market rule covers them.",
      ],
    },
  ],
  relatedSlugs: [
    "rnor-status-explained-for-returning-nris",
    "dual-status-tax-return-year-you-move",
    "nri-or-resident-how-tax-residency-works",
  ],
},
{
  slug: "nro-to-nre-transfer-explained",
  clusterSlug: "nre-nro-tds",
  title: "Can You Move Money From an NRO Account to an NRE Account?",
  description:
    "Yes — but transferring NRO funds into an NRE account isn't a workaround for NRO's usual restrictions. It draws on the same annual RBI ceiling and requires the same Form 15CA/15CB documentation as remitting NRO funds abroad directly.",
  dek: "Moving NRO money into an NRE account can feel like a shortcut to free repatriability. It's really the same NRO rules, applied one step earlier.",
  sections: [
    {
      paragraphs: [
        "NRE and NRO accounts serve different purposes, but they aren't sealed off from each other: RBI rules do allow transferring funds from an NRO account into an NRE account, and it's a genuinely common move for NRIs who've accumulated India-sourced income — rent, dividends, maturing deposits — across one or more NRO accounts and want to consolidate it before sending it abroad. The appeal is obvious: once money sits in an NRE account, it's freely repatriable, without the ceiling and paperwork that apply to NRO funds.",
        "What trips people up is treating the transfer itself as a way around those NRO restrictions. It isn't. The transfer is itself a form of repatriation of NRO funds under FEMA, and it's governed by the same rules that would apply if you were remitting that money directly out of India.",
      ],
    },
    {
      heading: "The annual ceiling still applies",
      paragraphs: [
        "NRO funds — current income and other eligible balances — can be moved out of India (or into an NRE account, which amounts to the same thing under FEMA) up to an annual ceiling commonly cited as USD 1 million per financial year, applied per remitter rather than per account. Multiple NRO accounts don't create separate headroom, and a transfer into NRE uses up the same yearly allowance that a direct outward remittance would. Confirm the current figure and its exact composition (current income vs. accumulated balances) before relying on it, since RBI circular details are easy to misstate secondhand.",
        "Our repatriation headroom estimator on the Investments & Repatriation page tracks how much of that ceiling a given remittance amount would use — an NRO-to-NRE transfer counts against it the same way an outward transfer does.",
      ],
    },
    {
      heading: "The same paperwork, even for a domestic-looking transfer",
      paragraphs: [
        "Because the transfer is treated as repatriation of NRO funds, banks require the same documentation they'd ask for on an outward remittance: Form 15CA (the remitter's declaration) and, for larger or taxable amounts, Form 15CB (a chartered accountant's certificate confirming the applicable tax has been accounted for). It's easy to assume that moving money between two of your own accounts at the same bank should be simpler than sending it abroad — banks generally don't treat it that way, precisely because the destination account changes the funds' repatriation status.",
        "The Form 15CA/15CB checker on the NRE/NRO & TDS page estimates which part of the form applies to a given amount; it's a reasonable starting point for an NRO-to-NRE transfer as well as an outward remittance, since the underlying trigger is the same.",
      ],
    },
    {
      heading: "Not every NRO rupee qualifies",
      paragraphs: [
        "The funds being transferred generally need to be current income (rent, dividends, pension, interest, and similar) or other RBI-eligible NRO balances, with applicable Indian tax already paid or accounted for — the transfer isn't a mechanism for moving money whose tax position hasn't been settled. This is also why the move is common specifically as a pre-repatriation step: it lets an NRI consolidate multiple, smaller India-sourced credits into one freely repatriable pool before initiating the actual transfer abroad, rather than filing separate 15CA/15CB paperwork for each individual remittance.",
      ],
    },
  ],
  relatedSlugs: [
    "nre-vs-nro-accounts-which-do-you-need",
    "form-15ca-15cb-explained",
    "tds-on-nro-fixed-deposits",
  ],
},
{
  slug: "tds-on-nro-fixed-deposits",
  clusterSlug: "nre-nro-tds",
  title: "TDS on NRO Fixed Deposits: Why It's Higher Than You'd Expect",
  description:
    "NRO fixed deposit interest is taxed at source from the very first rupee, at a rate well above what most resident FDs face — here's why, and how a treaty rate can bring it down before the money is even credited.",
  dek: "There's no basic exemption on NRO FD interest, and no threshold before TDS kicks in. The default withholding rate is steep by design — but it isn't always the rate you actually owe.",
  sections: [
    {
      paragraphs: [
        "A resident's fixed deposit interest is only subject to TDS once it crosses a threshold in a financial year, and even then at a modest rate, while resident savings account interest isn't subject to TDS at all. NRO fixed deposits work differently: because Section 194A (the resident TDS-on-interest provision, with its exemption threshold and savings-account carve-out) doesn't apply to non-residents, NRO interest — savings or fixed deposit — falls instead under Section 195, which has no equivalent basic exemption. Whatever interest an NRO FD credits, some of it is withheld before it ever reaches the account holder.",
      ],
    },
    {
      heading: "The default rate",
      paragraphs: [
        "Bank NRI-desk pages commonly cite a flat 30% TDS rate on NRO FD interest by default, before adding applicable surcharge and a 4% health and education cess. Note that this figure isn't perfectly uniform across sources — at least one tax-reference source describes Section 195 interest withholding closer to 20% plus surcharge/cess as a general rate — so treat 30% as the widely-cited figure for NRO FD interest specifically, but confirm the exact current rate (and the surcharge slab, which depends on the account holder's total income and can range considerably) before assuming a single all-in percentage.",
      ],
    },
    {
      heading: "Unlocking the treaty rate instead of waiting for a refund",
      paragraphs: [
        "The default domestic rate isn't necessarily the rate the India-US DTAA (or India's treaty with another country of residence) actually allows on interest income. Submitting a Tax Residency Certificate (TRC) from your country of residence, along with Form 10F and your PAN, to the bank before the interest is credited can let the bank apply the lower treaty rate at source instead of the default rate — avoiding the wait for a refund entirely. Submitted after the interest has already been credited, this generally doesn't work retroactively; the overpayment then has to be recovered by filing an Indian income tax return instead.",
        "The TDS-on-NRO-interest calculator on the NRE/NRO & TDS page lets you compare the default withholding scenario against a certified treaty rate, to see the actual difference in net proceeds on a given FD interest amount.",
      ],
    },
    {
      heading: "Why FDs feel like the sharper end of this",
      paragraphs: [
        "NRO savings and NRO fixed deposit interest are taxed under the same Section 195 mechanism, so the underlying rule isn't actually different between the two. What usually makes it more noticeable on an FD is scale: FD interest tends to be a larger, more concentrated sum credited on a defined schedule, so the absence of any exemption threshold shows up as a bigger visible deduction than it does on the smaller, incremental interest a savings account generates.",
      ],
    },
  ],
  relatedSlugs: [
    "tds-on-nro-interest-explained",
    "nre-vs-nro-accounts-which-do-you-need",
    "pan-card-for-nris-explained",
  ],
},
{
  slug: "pan-card-for-nris-explained",
  clusterSlug: "nre-nro-tds",
  title: "PAN Card for NRIs: When You Need One, and How to Apply From Abroad",
  description:
    "A PAN isn't optional once TDS, an NRO/NRE account, or an Indian investment enters the picture — here's when NRIs actually need one, how to apply from outside India, and mistakes that quietly cause problems later.",
  dek: "Almost every NRI financial move in India — opening an account, buying a mutual fund, receiving rent — runs into the same requirement: a PAN. Here's what actually triggers the need for one, and how to get it right the first time.",
  sections: [
    {
      paragraphs: [
        "PAN (Permanent Account Number) isn't just an Indian tax-filing formality — it's the identifier Indian banks, registrars, and the tax department use to track every transaction where tax withholding applies. For NRIs, that reach is broad: opening an NRO or NRE account, buying property, investing in mutual funds or listed securities, and any transaction where TDS is deducted (which, as covered elsewhere on this site, includes NRO interest and rent paid to an NRI landlord) all generally require a PAN.",
      ],
    },
    {
      heading: "Which form you use is about citizenship, not residence",
      paragraphs: [
        "Under the longstanding rules, the form split on citizenship rather than country of residence: Form 49A was for Indian citizens (including NRIs holding an Indian passport), while Form 49AA was for foreign citizens, including Persons of Indian Origin (PIO) and Overseas Citizens of India (OCI) who are not Indian citizens. Multiple secondary sources report this was restructured under the Income-tax Act, 2025 into four separate forms — commonly cited as Form 93 (Indian-citizen individuals), Form 94 (Indian non-individual entities), Form 95 (individuals who are not Indian citizens), and Form 96 (foreign non-individual entities) — effective from April 2026. Because this site hasn't independently verified the new form numbers against the Income Tax Department's own text, confirm the current form name and number before applying rather than relying on the 49A/49AA terminology, which several sources describe as retired for new applications (existing PANs issued under the old forms reportedly remain valid).",
      ],
    },
    {
      heading: "Applying from outside India",
      paragraphs: [
        "NRIs can apply without being physically present in India, submitting the application online (via NSDL/Protean or UTIITSL) along with photocopies — not originals — of a passport for identity and date of birth, and an overseas address proof, such as a recent utility bill, bank statement, residence permit, or foreign driving licence. Along with the physical card being mailed, applicants generally also receive a PDF e-PAN by email once the application is processed — a downloadable, valid copy distinct from the physical card. This routine e-PAN copy is separate from the 'Instant e-PAN' service, which is Aadhaar-based, requires roughly 182 or more days of physical presence in India in the preceding year, and is generally not available to NRIs at all.",
      ],
    },
    {
      heading: "Common mistakes",
      paragraphs: [
        "Two mistakes come up repeatedly. First, applying under, or letting an old PAN persist under, resident status instead of updating it to reflect NRI status once residency changes — this can cause mismatches on transactions that check residency status, such as the TDS rate a bank or property registrar applies. Second, assuming Aadhaar-PAN linking rules apply the same way they do to residents: NRIs are generally described as exempt from the mandatory linking requirement, largely because most don't hold an Aadhaar number at all — but the exemption isn't reported consistently as unconditional, with some sources noting an NRI who does hold an Aadhaar may still be expected to link it, and NRIs whose PAN went inoperative over this confusion have had to petition their jurisdictional Assessing Officer with proof of NRI status to reactivate it. Given how much the guidance on this specific point varies by source, confirm your own Aadhaar-linking obligation directly on the income tax portal rather than assuming from general NRI commentary.",
      ],
    },
    {
      paragraphs: [
        "A PAN issued correctly under NRI status is also what the treaty-rate and refund mechanics in our TDS pieces assume is already in place — the TDS-on-NRO-interest calculator and Form 15CA/15CB checker on the NRE/NRO & TDS page both rely on a valid PAN being on file.",
      ],
    },
  ],
  relatedSlugs: [
    "nre-vs-nro-accounts-which-do-you-need",
    "tds-on-nro-fixed-deposits",
    "form-15ca-15cb-explained",
  ],
},
{
  slug: "nri-demat-accounts-pis-vs-non-pis",
  clusterSlug: "investments-repatriation",
  title: "NRI Demat Accounts: PIS vs. Non-PIS Routes for Buying Indian Shares",
  description:
    "Buying listed Indian shares as an NRI runs through two different regulatory tracks — PIS for repatriable NRE-linked investing, non-PIS for NRO-funded holdings — and the distinction still matters even as the rules around it keep shifting.",
  dek: "Two demat routes, two different account plumbings, two different repatriation outcomes. The PIS/non-PIS split is one of the more RBI-rulebook-heavy corners of NRI investing.",
  sections: [
    {
      paragraphs: [
        "NRIs who want to buy and sell shares listed on Indian stock exchanges — as opposed to mutual funds, which don't require this — have historically had to route those trades through the RBI's Portfolio Investment Scheme (PIS), a designated-bank-branch mechanism that lets the RBI track and cap aggregate foreign/NRI ownership in Indian-listed companies in something close to real time. A separate, non-PIS route exists for NRO-funded, non-repatriable equity investing. The two aren't interchangeable, and using the wrong one for your situation can create compliance headaches later, not just a suboptimal setup.",
      ],
    },
    {
      heading: "The PIS route: NRE-linked and repatriable",
      paragraphs: [
        "Under PIS, an NRI opens a designated PIS account linked to their NRE savings account at an RBI-authorized bank, and gets a PIS permission letter that lets a specific demat/trading account route delivery-based equity trades through that one designated bank branch. Because the funding sits in an NRE account, gains and sale proceeds under this route are generally repatriable, which is the main reason NRIs choose it over the alternative. Every PIS trade is reported by the bank to the RBI, which is how the regulator monitors sector-wise and company-wise foreign shareholding caps.",
      ],
    },
    {
      heading: "The non-PIS route: NRO-funded, non-repatriable",
      paragraphs: [
        "The non-PIS route lets an NRI invest in listed Indian equities using NRO funds without going through the PIS permission/reporting mechanism, but the funds and proceeds are tied to the NRO account's non-repatriable-by-default character (subject to NRO's own repatriation ceiling, covered elsewhere on this site). Non-PIS is also generally the route for secondary-market transactions PIS doesn't cover in the same way, and it does not require the same designated-single-bank-branch routing that PIS does. Mutual fund purchases and IPO applications, notably, sit outside the PIS framework entirely regardless of which account funds them.",
      ],
    },
    {
      heading: "Treat the current rule status as a moving target",
      paragraphs: [
        "PIS requirements have changed more than once over the past several years — including adjustments to individual and aggregate foreign-investment ceilings on listed companies, and periodic simplification of the permission and reporting process — and this is genuinely one of the more fluid areas of NRI-facing RBI/FEMA regulation. Don't treat any specific procedural detail (which trades require PIS routing, what the current ownership caps are, whether a given broker's non-PIS product still requires a separate NRO sub-account) as settled without confirming it directly with your bank's NRI desk or a current RBI/FEMA circular — the mechanics described here are the structural distinction between the two routes, not a guarantee that today's procedural specifics match what's written above.",
      ],
    },
  ],
  relatedSlugs: [
    "nri-investment-options-in-india-overview",
    "nri-repatriation-limits-explained",
    "pfic-rules-for-nris-mutual-fund-trap",
  ],
},
{
  slug: "us-tax-on-indian-ulips-and-insurance-plans",
  clusterSlug: "investments-repatriation",
  title: "US Tax on Indian ULIPs: Why the Insurance Wrapper Doesn't Save You From PFIC",
  description:
    "ULIPs and other India-domiciled insurance-linked investment products are commonly pulled into the same PFIC regime that catches Indian mutual funds — the insurance packaging generally doesn't change the US tax outcome.",
  dek: "It's called insurance in India. To the IRS, if the investment component dominates, it can still look like a basket of PFICs wearing a policy wrapper.",
  sections: [
    {
      paragraphs: [
        "Unit-linked insurance plans (ULIPs) and similar India-domiciled insurance-linked investment products — where premiums are split between a small life-insurance component and a much larger fund-investing component — are widely sold in India, including to NRIs, often through India-based agents who may not be thinking about US tax consequences at all. For a US person (citizen, green card holder, or US tax resident), the label 'insurance' on the product doesn't automatically exempt it from PFIC treatment, and in practice, most Indian ULIPs are caught by the same PFIC regime covered in more depth in our companion piece on Indian mutual funds as a PFIC trap.",
      ],
    },
    {
      heading: "Why US tax law looks past the insurance wrapper",
      paragraphs: [
        "US tax law has its own definition of what qualifies as 'life insurance' for tax purposes (under Internal Revenue Code Section 7702), built around specific cash-value-accumulation and premium tests designed to ensure a real, dominant insurance risk component. Many Indian ULIPs fail these tests because the investment portion is large relative to the death benefit — which means the IRS doesn't respect the policy as insurance for US tax purposes at all. Once that happens, the underlying 'units' — which are themselves invested in pools of Indian equities, debt, or mutual-fund-like structures — get treated as a direct holding in one or more Passive Foreign Investment Companies, subjecting the ULIP to the same excess-distribution default tax regime and Form 8621 filing obligations as a directly-held Indian mutual fund.",
      ],
    },
    {
      heading: "A possible added layer: US excise tax on premiums",
      paragraphs: [
        "Separately from PFIC treatment, US law imposes an excise tax under Internal Revenue Code Section 4371 on premiums paid to foreign insurers, which in principle could apply to premiums paid into an Indian ULIP or endowment plan. The US-India income tax treaty is understood to provide a path to exemption from this excise tax for insurers, but the mechanics run through a closing agreement between the foreign insurer and the IRS rather than something an individual policyholder files directly — whether a specific Indian insurer has such an agreement in place, and whether it's relevant to your policy, is genuinely uncertain from the policyholder's side and worth raising with a cross-border tax preparer rather than assuming either way.",
      ],
    },
    {
      heading: "Why caution matters before buying, not just after",
      paragraphs: [
        "Because ULIPs are frequently pitched in India as tax-efficient insurance-cum-investment products — true enough under Indian tax law — NRIs who are US taxpayers can end up holding one without any of the US-side implications having been flagged by the seller. Given the PFIC default regime's punitive treatment (top marginal rate on gains regardless of your actual bracket, plus retroactive interest charges, as detailed in our mutual-fund-trap article), the more common practical advice from cross-border tax preparers is to avoid buying new ULIPs as a US taxpayer altogether, and to get an existing one reviewed for PFIC exposure and Form 8621 filing history rather than assume it's been handled.",
      ],
    },
  ],
  relatedSlugs: [
    "pfic-rules-for-nris-mutual-fund-trap",
    "fbar-fatca-reporting-for-nris",
    "nri-investment-options-in-india-overview",
  ],
},
{
  slug: "us-estate-tax-exposure-for-nris",
  clusterSlug: "investments-repatriation",
  title: "US Estate Tax Exposure for NRIs: What Happens to US-Situs Assets at Death",
  description:
    "Nonresident aliens face a dramatically smaller US estate tax exemption on US-situs assets than US citizens and residents do — a distinct, death-triggered exposure separate from the lifetime gift-reporting rules covered elsewhere on this site.",
  dek: "The gift-tax rules on this site cover money moving while you're alive. This is about what the US claims at death — and for a nonresident alien, the exemption is a fraction of what US citizens get.",
  sections: [
    {
      paragraphs: [
        "This is a different exposure from the one covered in our article on gifting money between India and the US, which deals with lifetime gift reporting (Form 3520 and similar) between living people. US estate tax is triggered at death, applies to the value of specific property the decedent owned, and — for a nonresident alien (an NRA, meaning someone who is neither a US citizen nor domiciled in the US for estate tax purposes) — comes with a far smaller shelter than most people assume, because the large exemption figures widely quoted in the US press apply to US citizens and domiciliaries, not to NRAs.",
      ],
    },
    {
      heading: "The exemption gap is large, and NRA-specific",
      paragraphs: [
        "The current US estate tax exemption for US citizens and domiciled residents runs into the millions of dollars per person under recent tax legislation and IRS inflation adjustments — confirm the exact current-year figure before citing it, since it changes with each inflation adjustment and legislative update. For a nonresident alien, the exemption is structurally different: NRAs get a unified credit that shelters only the first $60,000 of US-situs property, and — unlike the citizen/resident exemption — this $60,000 figure is not indexed for inflation and has stayed fixed for decades. Anything above that $60,000 in US-situs assets is exposed to US estate tax at graduated rates that top out at 40%. This is one of the more consequential and least understood traps for NRIs who hold US brokerage accounts, US real estate, or US company stock without US citizenship or a US domicile.",
      ],
    },
    {
      heading: "What counts as US-situs property",
      paragraphs: [
        "US-situs property for this purpose generally includes US real estate, tangible personal property physically located in the US, and — notably — stock issued by US corporations, which counts as US-situs regardless of where the shares or brokerage account are actually held or where the decedent lived. Debt obligations of US persons or entities are generally treated as US-situs too, with certain exceptions (such as some portfolio-interest-qualifying debt). By contrast, foreign real estate, shares of non-US companies, and — under commonly cited guidance — US bank deposit accounts and proceeds of a life insurance policy on the decedent's own life are generally treated as non-US-situs and outside this exposure; the deposit and life-insurance treatment in particular is fact-specific enough that it's worth confirming against current IRS guidance or with a cross-border estate attorney rather than relying on a general description.",
      ],
    },
    {
      heading: "No estate tax treaty relief between the US and India",
      paragraphs: [
        "Unlike lifetime income tax, where a US-India tax treaty (DTAA) exists and materially shapes outcomes, the US has estate and gift tax treaties with only a short list of countries (commonly cited examples include the UK, Germany, France, Japan, and Canada) — and India is not on that list. That matters because in some treaty relationships, an NRA's estate can claim a much larger pro-rated share of the citizen-level exemption based on the ratio of US-situs to worldwide assets; without a treaty, an NRI's estate is generally limited to the flat $60,000 shelter with no such pro-ration available. An estate that crosses the threshold is required to file Form 706-NA, and the filing threshold itself is also the fixed, non-inflation-adjusted $60,000 figure — confirm current instructions before relying on any of these figures for actual estate planning, since this is exactly the kind of number that gets casually mis-cited as 'the same as the citizen exemption' when it plainly is not.",
      ],
    },
  ],
  relatedSlugs: [
    "gifting-money-india-us-tax-rules",
    "fbar-fatca-reporting-for-nris",
    "pfic-rules-for-nris-mutual-fund-trap",
  ],
},
{
  slug: "ltcg-indexation-removal-budget-2024-property",
  clusterSlug: "real-estate-capital-gains",
  title: "Indexation Removal on Property LTCG: What Budget 2024 Actually Changed",
  description:
    "India's July 2024 budget replaced the old 20%-with-indexation LTCG rate on property with a flat, lower rate — but who still gets a choice, and whether NRIs are among them, is a narrow point that has kept shifting since.",
  dek: "The 20%-with-indexation vs. flat-rate choice on property LTCG isn't automatic for every seller — least of all for NRIs. Here's what changed, and why every number in this article needs direct confirmation before you rely on it.",
  sections: [
    {
      paragraphs: [
        "Indexation was the mechanism that adjusted a property's original purchase cost upward for inflation before computing the taxable gain, using the government's Cost Inflation Index (CII) — the longer you'd held the property, and the more inflation had moved in between, the more your effective taxable gain shrank relative to the raw difference between sale price and purchase price. It was paired, historically, with a 20% LTCG rate on property.",
        "The Union Budget presented on July 23, 2024 proposed removing that indexation benefit for most long-term capital assets, including property, in exchange for a lower flat rate applied to the un-indexed gain instead. That single change upended a planning assumption a lot of long-time property owners, NRIs included, had been building their expected tax bill around for years.",
      ],
    },
    {
      heading: "What indexation used to do",
      paragraphs: [
        "Under the pre-2024 approach, you'd look up the CII value for your year of purchase and your year of sale, use the ratio between them to inflate your original cost, and subtract that inflated cost — not the raw historical price — from your sale price to arrive at the taxable gain. For property held many years through periods of meaningful inflation, this could shrink the taxable gain substantially compared to simply subtracting the original purchase price, which is exactly why the 20% rate paired with indexation was, for a lot of long-held property, more favorable than it looks on paper.",
      ],
    },
    {
      heading: "The flat rate, and the (partial, resident-only) grandfathering",
      paragraphs: [
        "As enacted through the Finance (No. 2) Act, 2024, the default computation for property LTCG on transfers from July 23, 2024 onward became a flat, lower rate — commonly reported as 12.5% — applied without indexation. After public pushback on the original all-or-nothing proposal, an amendment added a comparison right, but a narrow one: for property acquired before July 23, 2024, resident individuals and HUFs can pay the lower of the old 20%-with-indexation figure or the new flat-rate figure, computed both ways and whichever comes out lower.",
        "Multiple current secondary tax-advisory sources report that this resident-only dual-option comparison is not extended to non-resident sellers, including NRIs — meaning an NRI selling property acquired well before July 2024 would, on this reading, still compute LTCG only under the new flat-rate rule, with no indexation-based comparison available at all. This site's own LTCG vs. STCG explainer already flags the same NRI exclusion as something worth double-checking rather than assuming. Given how narrow this eligibility clause is, how recently it was amended, and how often narrow clauses like this get restated across secondary sources without being re-anchored to the primary statutory text each time, treat the NRI-exclusion point specifically as unconfirmed by this article and requiring direct verification against the Income-tax Act's current text, or a CA, before it informs any actual filing or sale-pricing decision.",
      ],
    },
    {
      heading: "Why the answer is still 'compute both ways' where the option exists",
      paragraphs: [
        "Even setting the NRI-eligibility question aside, the entire point of an indexation-vs-flat-rate comparison is that the better outcome depends entirely on your own numbers — how long you held the property, how much the CII moved across that specific holding period, and how much of your gain is genuine appreciation versus inflation catching up to the price. There's no shortcut answer that holds across sellers; a property with strong real appreciation over a low-inflation stretch can come out ahead under the flat rate, while a longer hold through a high-inflation period can favor the indexed 20% path where that comparison is actually available to the seller.",
        "This area has already seen one legislative reversal within weeks of the original Budget 2024 proposal, and the specific question of NRI eligibility for the dual-option comparison is exactly the kind of detail that could see further clarification. Treat every rate, date, and eligibility rule in this article — and any figure a generic online calculator gives you — as a starting point for your CA to confirm against the current-year Act text, not a final number to build a sale decision around.",
      ],
    },
    {
      paragraphs: [
        "The LTCG/STCG classifier on this site's Real Estate Capital Gains page applies the flat, no-indexation computation consistent with the post-Budget-2024 default; it does not attempt to model the resident-only grandfathering comparison or its precise current eligibility rules, both of which should be confirmed separately before you rely on the classifier's output for a sale involving property acquired before July 23, 2024.",
      ],
    },
  ],
  relatedSlugs: [
    "selling-property-in-india-as-nri-ltcg-vs-stcg",
    "selling-inherited-property-in-india-as-nri",
    "joint-property-ownership-nri-capital-gains",
  ],
},
{
  slug: "repatriating-property-sale-proceeds",
  clusterSlug: "real-estate-capital-gains",
  title: "Repatriating Property Sale Proceeds From India: The NRI-Specific Process",
  description:
    "Moving money out of India after selling property involves its own RBI ceiling, its own CA certification step, and a direct handoff from the TDS already withheld at sale — distinct from general NRO repatriation rules.",
  dek: "Selling the property is only half of it. Getting the proceeds out of India runs through its own USD 1 million ceiling, its own paperwork, and the TDS the buyer already withheld.",
  sections: [
    {
      paragraphs: [
        "This site's general repatriation-limits explainer covers the broad NRO ceiling that applies to rental income, dividends, and other India-sourced income. Property sale proceeds sit inside that same broad framework, but carry enough property-specific wrinkles — how the property was originally funded, a near-mandatory CA certificate, and a direct handoff from the TDS already withheld at sale — that they're worth walking through on their own.",
      ],
    },
    {
      heading: "How the property was funded changes the ceiling",
      paragraphs: [
        "If the property was originally purchased using foreign-currency funds remitted through banking channels, or paid for out of an NRE or FCNR account, current guidance describes NRIs as able to repatriate the full sale proceeds — not capped at USD 1 million — subject to documenting that original foreign-currency funding. Several secondary sources describe this full-repatriation route as limited to a set number of residential properties (two is a figure that recurs across multiple sources) before later sales fall under the general ceiling instead; this specific property-count limit is not independently confirmed here against the RBI's Master Direction and should be checked directly before relying on it.",
        "Where the property was instead purchased using rupee funds (an NRO account, or Indian-sourced income generally) or was acquired by inheritance, repatriation of the sale proceeds is capped at USD 1 million per financial year, out of the NRO account. That ceiling is an aggregate one across all your eligible remittances for the year — not a separate USD 1 million allowance per property or per transaction — so it's worth checking what you've already repatriated in the same financial year before assuming the full headroom is available to this sale.",
      ],
    },
    {
      heading: "The CA certification step",
      paragraphs: [
        "Before a bank will release an outward remittance, the Income-tax Act requires certification that applicable tax has been accounted for: Form 15CB, a chartered accountant's certificate, paired with Form 15CA, the remitter's own online declaration — the same two-form mechanism covered in more general terms on this site's Form 15CA/15CB explainer. For property sale proceeds specifically, the amounts involved and the fact that this is squarely a taxable capital-account remittance mean this almost always lands in the fuller Part C-plus-15CB bracket rather than the simplified small-remittance path, even when the underlying gain itself turns out to be modest.",
      ],
    },
    {
      heading: "How this interacts with the TDS already withheld",
      paragraphs: [
        "By the time you're ready to repatriate, the buyer has typically already withheld TDS under Section 195 — generally on the full sale consideration, as covered in this site's Section 195 explainer, not just on the gain. The certifying CA's job at the 15CB stage is largely to confirm the tax position looks accounted for, referencing that withheld TDS, rather than to independently relitigate your total liability the way filing an actual return does. If the TDS withheld turns out to be larger than what you'll actually owe once your real cost basis and gain are worked out, that excess isn't released early through the 15CB process — it's recovered only by filing an Indian income tax return and claiming a refund, or, for a future sale, by front-loading the correction with a lower/nil TDS certificate obtained before the sale closes.",
      ],
    },
    {
      paragraphs: [
        "The Section 195 TDS estimator and Form 13 explainer on the Real Estate Capital Gains page both feed directly into this chain — the withholding figure they estimate is generally what a 15CB certificate will reference. Confirm the current property-count limit on the full-repatriation route, and the exact document checklist, directly with your bank's NRI desk before setting a remittance timeline around either.",
      ],
    },
  ],
  relatedSlugs: [
    "section-195-tds-on-nri-property-sales",
    "form-13-lower-tds-certificate-worth-it",
    "ltcg-indexation-removal-budget-2024-property",
  ],
},
{
  slug: "joint-property-ownership-nri-capital-gains",
  clusterSlug: "real-estate-capital-gains",
  title: "Joint Property Ownership and NRI Capital Gains: How the Tax Actually Splits",
  description:
    "When co-owners sell property together, the capital gains tax and TDS are meant to follow each owner's actual registered share — not get lumped together as if there's one seller.",
  dek: "Two names on the sale deed doesn't mean an automatic 50/50 tax split. Here's how gains and TDS are actually meant to divide among co-owners, and where the paperwork commonly breaks.",
  sections: [
    {
      paragraphs: [
        "Joint ownership is common among NRI families — spouses who bought a property together, siblings who inherited one jointly, a parent added to a title for convenience. A common assumption when that property is sold is that the gain, and the tax on it, splits evenly between the co-owners simply because there are multiple names on the document. That assumption isn't reliable, and getting it wrong can leave one co-owner over- or under-reporting their own share.",
      ],
    },
    {
      heading: "Gains follow the ownership share on record, not a default split",
      paragraphs: [
        "The capital gain, and the tax on it, is meant to be attributed to each co-owner in proportion to their actual documented share of ownership — as reflected on the title or sale deed, or established by the specific terms of an inheritance or gift — not automatically halved, or split evenly by head count, just because a property has multiple registered owners. A 70/30 registered share means a 70/30 split of the sale consideration, cost basis, and resulting gain between the two co-owners, with each reporting and being taxed on their own proportionate share. For jointly inherited property, this site's inherited-property explainer covers how the underlying cost and holding period carry forward from the original owner in the first place — a question that sits upstream of, and separate from, how the resulting gain then divides among the co-owners.",
      ],
    },
    {
      heading: "TDS is meant to be deducted co-owner by co-owner",
      paragraphs: [
        "Section 195 TDS is meant to be applied separately against each NRI co-owner's own share of the sale consideration, not once against the whole sale price as if there were a single seller. Where a sale involves a mix of resident and NRI co-owners, the correct approach described by tax-advisory sources is seller-wise: the resident co-owner's share is subject to the resident-seller TDS provision (typically the lower rate under Section 194-IA), while the NRI co-owner's share is subject to the higher Section 195 rate — each computed separately against that owner's own portion of the consideration, and deposited against that owner's own PAN.",
      ],
    },
    {
      heading: "Where this breaks down in practice",
      paragraphs: [
        "Buyers unfamiliar with mixed resident/NRI joint ownership sometimes default to withholding against a single PAN — often whichever co-owner is easiest to reach, or the resident co-owner — applying one rate to the entire sale price. That under-withholds relative to what Section 195 actually requires on the NRI co-owner's share, and leaves that co-owner's own Form 26AS without a matching TDS credit, which surfaces later as a reconciliation problem once each co-owner separately files a return and expects to claim their own credit against their own share of tax due. Getting a written breakdown of each co-owner's share, PAN, and residency status in front of the buyer and their bank before closing — not after — is the practical fix.",
      ],
    },
    {
      paragraphs: [
        "This same logic carries through to exemptions: each co-owner independently decides whether and how to claim Section 54 or 54EC against their own share of the gain, so one co-owner reinvesting doesn't automatically shield another co-owner's share (see this site's Section 54/54EC explainer). The Section 195 TDS estimator on the Real Estate Capital Gains page is built around a single seller's consideration and gain; for a joint sale, the practical approach is to run it once per co-owner, using that co-owner's own share of the price and cost basis rather than the sale's combined totals.",
      ],
    },
  ],
  relatedSlugs: [
    "section-195-tds-on-nri-property-sales",
    "section-54-54ec-exemptions-for-nris",
    "ltcg-indexation-removal-budget-2024-property",
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
