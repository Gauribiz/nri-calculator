import type { Metadata } from "next";
import Disclaimer from "@/components/Disclaimer";
import RelatedReading from "@/components/RelatedReading";
import { getCategory } from "@/lib/categories";
import NreNroChooser from "@/components/calculators/NreNroChooser";
import NroInterestTdsCalculator from "@/components/calculators/NroInterestTdsCalculator";
import Form15caChecker from "@/components/calculators/Form15caChecker";
import { getArticlesForCluster } from "@/lib/blog/articles";

const category = getCategory("nre-nro-tds")!;
const clusterArticles = getArticlesForCluster("nre-nro-tds");

export const metadata: Metadata = {
  title: category.title,
  description: category.description,
};

export default function NreNroTdsPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-6 py-12">
      <h1 className="text-2xl font-semibold tracking-tight text-primary-900 dark:text-primary-50">
        {category.title}
      </h1>

      <Disclaimer />

      <p className="max-w-2xl text-stone-600 dark:text-primary-200/70">
        {category.description}
      </p>

      <p className="max-w-2xl text-sm text-stone-500 dark:text-primary-300/60">
        The three tools below apply general, well-established rates and
        thresholds. Each one flags what it does not model — review those
        notes, and the disclaimer above, before relying on a result.
      </p>

      <p className="max-w-2xl rounded-lg border border-gold-300 bg-gold-50 px-4 py-3 text-xs text-gold-900 dark:border-gold-700 dark:bg-gold-900/30 dark:text-gold-100">
        India&apos;s Income-tax Act, 2025 came into force on 1 April 2026,
        replacing the Income Tax Act, 1961, for tax years from FY 2026-27
        onward. The rates and thresholds below (30% NRO interest
        withholding + cess, the NRE-interest exemption, the ₹5 lakh Form
        15CA/15CB threshold) are corroborated by current public
        tax-reference sources and believed to carry over substantively,
        but the specific 1961-Act section numbers referenced in this
        page&apos;s explanations (e.g. Section 195, renumbered to Section 393(2) of the Income-tax Act, 2025, effective 1 April 2026) have <strong>now</strong>{" "}
        been individually re-verified against the new Act&apos;s
        renumbered sections. Please confirm current section references
        with a qualified advisor or incometax.gov.in before citing any of
        them in a filing.
      </p>

      <div className="flex flex-col gap-3">
        <NreNroChooser defaultOpen />
        <NroInterestTdsCalculator />
        <Form15caChecker />
      </div>
      <RelatedReading
        variant="zinc"
        items={clusterArticles.map((article) => ({
          slug: article.slug,
          href: `/blog/${article.slug}`,
          title: article.title,
          dek: article.dek,
        }))}
      />
    </div>
  );
}
