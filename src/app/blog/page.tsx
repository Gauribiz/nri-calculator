import type { Metadata } from "next";
import Link from "next/link";
import Disclaimer from "@/components/Disclaimer";
import { categories } from "@/lib/categories";
import { getArticlesForCluster } from "@/lib/blog/articles";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Plain-English articles on NRI tax residency, NRE/NRO & TDS, investments & repatriation, and real estate capital gains for the US-India corridor.",
};

export default function BlogIndexPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-6 py-12">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold tracking-tight text-primary-900 dark:text-primary-50">
          Blog
        </h1>
        <p className="max-w-2xl text-stone-600 dark:text-primary-200/70">
          Plain-English articles on how NRI tax and finance rules actually
          work on the US-India corridor, organized by topic. Each article
          links to the related calculator so you can go from concept to your
          own numbers.
        </p>
      </div>

      <Disclaimer />

      <div className="flex flex-col gap-10">
        {categories.map((category) => {
          const clusterArticles = getArticlesForCluster(category.slug);
          if (clusterArticles.length === 0) return null;

          return (
            <div key={category.slug} className="flex flex-col gap-3">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-lg font-semibold tracking-tight text-primary-900 dark:text-primary-50">
                  {category.shortTitle}
                </h2>
                <Link
                  href={`/${category.slug}`}
                  className="text-sm text-gold-700 underline hover:no-underline dark:text-gold-300"
                >
                  Open the calculators &rarr;
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {clusterArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/blog/${article.slug}`}
                    className="flex flex-col gap-1.5 rounded-xl border border-stone-200 bg-white p-4 shadow-sm transition-colors hover:border-primary-400 dark:border-primary-900 dark:bg-primary-950 dark:hover:border-primary-600"
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
          );
        })}
      </div>
    </div>
  );
}
