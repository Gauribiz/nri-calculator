import type { Metadata } from "next";
import Link from "next/link";
import Disclaimer from "@/components/Disclaimer";
import { getCategory } from "@/lib/categories";
import RepatriationLimitCalculator from "@/components/calculators/RepatriationLimitCalculator";
import PficFilingChecker from "@/components/calculators/PficFilingChecker";
import { getArticlesForCluster } from "@/lib/blog/articles";

const category = getCategory("investments-repatriation")!;
const clusterArticles = getArticlesForCluster("investments-repatriation");

export const metadata: Metadata = {
  title: category.title,
  description: category.description,
};

export default function InvestmentsRepatriationPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-6 py-12">
      <h1 className="text-2xl font-semibold tracking-tight text-primary-900 dark:text-primary-50">
        {category.title}
      </h1>

      <Disclaimer />

      <div
        role="note"
        aria-label="Extra caution for this category"
        className="rounded-xl border border-amber-300 bg-amber-50 px-5 py-4 text-sm text-amber-900 dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-100"
      >
        <p className="font-semibold tracking-tight">
          Higher complexity, higher stakes than our other categories
        </p>
        <p className="mt-1 text-amber-800 dark:text-amber-200/90">
          Cross-border investment and repatriation rules — especially US
          PFIC treatment of Indian mutual funds — involve fact-specific,
          fund-specific, and year-specific determinations that a general
          calculator cannot make for you. The tools below are narrower and
          more conservative than our other categories&apos; on purpose:
          they check well-defined thresholds, not the full analysis. Please
          read each tool&apos;s own &quot;not modeled&quot; notes, and treat
          the disclaimer above as doubly important here.
        </p>
      </div>

      <p className="max-w-2xl text-stone-600 dark:text-primary-200/70">
        {category.description}
      </p>

      <div className="flex flex-col gap-6">
        <RepatriationLimitCalculator />
        <PficFilingChecker />
      </div>

      {clusterArticles.length > 0 && (
        <div className="flex flex-col gap-3 border-t border-stone-200 pt-6 dark:border-primary-900">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500 dark:text-primary-300/60">
            Related reading
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {clusterArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="flex flex-col gap-1 rounded-xl border border-stone-200 bg-white p-4 shadow-sm transition-colors hover:border-primary-400 dark:border-primary-900 dark:bg-primary-950 dark:hover:border-primary-600"
              >
                <h3 className="font-medium text-primary-900 dark:text-primary-50">
                  {article.title}
                </h3>
                <p className="text-sm text-stone-600 dark:text-primary-200/70">
                  {article.dek}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
