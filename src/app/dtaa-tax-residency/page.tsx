import type { Metadata } from "next";
import Disclaimer from "@/components/Disclaimer";
import RelatedReading from "@/components/RelatedReading";
import { getCategory } from "@/lib/categories";
import SubstantialPresenceCalculator from "@/components/calculators/SubstantialPresenceCalculator";
import IndiaResidencyCalculator from "@/components/calculators/IndiaResidencyCalculator";
import DtaaReliefEstimator from "@/components/calculators/DtaaReliefEstimator";
import { getArticlesForCluster } from "@/lib/blog/articles";

const clusterArticles = getArticlesForCluster("dtaa-tax-residency");

const category = getCategory("dtaa-tax-residency")!;

export const metadata: Metadata = {
  title: category.title,
  description: category.description,
};

export default function DtaaTaxResidencyPage() {
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
        The three tools below apply general, well-established test formulas.
        Each one flags what it does not model — review those notes, and the
        disclaimer above, before relying on a result.
      </p>

      <p className="max-w-2xl text-xs text-stone-500 dark:text-primary-300/60">
        Every threshold on this page was cross-checked on 2026-08-04 against
        public tax-reference sources citing irs.gov and incometaxindia.gov.in
        (see each tool&apos;s source links below), then reviewed against those
        sources directly by our team the same day. This is a
        secondary-source cross-check, not a professional tax or legal review;
        please verify against irs.gov / incometax.gov.in directly, or with a
        qualified advisor, before relying on any result.
      </p>

      <div className="flex flex-col gap-3">
        <SubstantialPresenceCalculator defaultOpen />
        <IndiaResidencyCalculator />
        <DtaaReliefEstimator />
      </div>

      <RelatedReading
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
