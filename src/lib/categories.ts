export type Category = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
};

export const categories: Category[] = [
  {
    slug: "dtaa-tax-residency",
    title: "DTAA & Tax Residency",
    shortTitle: "DTAA / Tax Residency",
    description:
      "How the India-US Double Taxation Avoidance Agreement and tax residency rules affect where you owe tax.",
  },
  {
    slug: "nre-nro-tds",
    title: "NRE/NRO Interest & TDS",
    shortTitle: "NRE/NRO & TDS",
    description:
      "How interest on NRE and NRO accounts is taxed, and how TDS is withheld and can be reclaimed or credited.",
  },
  {
    slug: "investments-repatriation",
    title: "Investments & Repatriation",
    shortTitle: "Investments & Repatriation",
    description:
      "General guidance on holding investments as an NRI and repatriating funds between India and the US.",
  },
  {
    slug: "real-estate-capital-gains",
    title: "Real Estate Capital Gains",
    shortTitle: "Real Estate Capital Gains",
    description:
      "How capital gains on Indian real estate are calculated and taxed when sold by an NRI.",
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}
