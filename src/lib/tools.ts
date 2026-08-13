export type Tool = {
  slug: string;
  title: string;
  description: string;
};

export const tools: Tool[] = [
  {
    slug: "currency-impact",
    title: "Currency impact calculator",
    description:
      "Splits the USD-terms change in an INR asset's value into real growth and currency effect.",
  },
  {
    slug: "sip-xirr",
    title: "SIP / mutual fund XIRR calculator",
    description:
      "Estimates the annualised return on a regular monthly SIP given the amount, start date, and current value.",
  },
  {
    slug: "fd-rd-maturity",
    title: "FD / RD maturity calculator",
    description:
      "Estimates the maturity value of a fixed deposit or recurring deposit with quarterly compounding.",
  },
  {
    slug: "loan-prepayment",
    title: "Loan prepayment impact calculator",
    description:
      "Estimates how a lump-sum prepayment shortens tenure and reduces total interest on an amortizing loan.",
  },
  {
    slug: "tax-treatment-comparison",
    title: "Tax treatment comparison tool",
    description:
      "Side-by-side reference on how common NRI investment types are taxed in India.",
  },
  {
    slug: "fx-rate-history",
    title: "USD/INR FX rate history",
    description:
      "Current USD/INR exchange rate with a 1-month to 5-year historical trend chart, from the ECB's daily reference rates.",
  },
];
