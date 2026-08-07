import type { Metadata } from "next";
import Link from "next/link";
import Disclaimer from "@/components/Disclaimer";
import { getCategory } from "@/lib/categories";
import RealEstateCapitalGainsCalculator from "@/components/calculators/RealEstateCapitalGainsCalculator";
import NriPropertySaleTdsCalculator from "@/components/calculators/NriPropertySaleTdsCalculator";
import Form13Explainer from "@/components/calculators/Form13Explainer";
import { getArticlesForCluster } from "@/lib/blog/articles";

const category = getCategory("real-estate-capital-gains")!;
const clusterArticles = getArticlesForCluster("real-estate-capital-gains");

export const metadata: Metadata = {
  title: category.title,
  description: category.description,
};

export default function RealEstateCapitalGainsPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-6 py-12">
      <h1 className="text-2xl font-semibold tracking-tight text-primary-900 dark:text-primary-50">
        {category.title}
      </h1>

      <Disclaimer />

      <p className="max-w-2xl text-stone-600 dark:text-primary-200/70">
        {category.description}
      </p>

      <div className="flex flex-col gap-6">
        <RealEstateCapitalGainsCalculator />
        <NriPropertySaleTdsCalculator />
        <Form13Explainer />
      </div>

      {clusterArticles.length > 0 && (
        <div className="flex flex-col gap-3 border-t border-zinc-200 pt-6 dark:border-zinc-800">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-500">
            Related reading
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {clusterArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="flex flex-col gap-1 rounded-lg border border-zinc-200 p-4 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
              >
                <h3 className="font-medium">{article.title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
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
