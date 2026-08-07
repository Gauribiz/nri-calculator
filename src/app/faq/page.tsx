import type { Metadata } from "next";
import Link from "next/link";
import Disclaimer from "@/components/Disclaimer";
import { categories } from "@/lib/categories";
import { getFaqsForCluster } from "@/lib/blog/faqs";
import { getArticle } from "@/lib/blog/articles";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions on NRI tax residency, NRE/NRO & TDS, investments & repatriation, and real estate capital gains for the US-India corridor.",
};

export default function FaqPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-6 py-12">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold tracking-tight text-primary-900 dark:text-primary-50">
          Frequently Asked Questions
        </h1>
        <p className="max-w-2xl text-stone-600 dark:text-primary-200/70">
          Short answers to the questions we see most often, grouped by topic.
          Each one links to a fuller article or the relevant calculator.
        </p>
      </div>

      <Disclaimer />

      <div className="flex flex-col gap-10">
        {categories.map((category) => {
          const clusterFaqs = getFaqsForCluster(category.slug);
          if (clusterFaqs.length === 0) return null;

          return (
            <div key={category.slug} className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold tracking-tight text-primary-900 dark:text-primary-50">
                {category.shortTitle}
              </h2>
              <dl className="flex flex-col divide-y divide-stone-200 dark:divide-primary-900">
                {clusterFaqs.map((faq) => {
                  const relatedArticle = faq.relatedArticleSlug
                    ? getArticle(faq.relatedArticleSlug)
                    : undefined;
                  return (
                    <div key={faq.id} className="flex flex-col gap-2 py-4">
                      <dt className="font-medium text-primary-900 dark:text-primary-50">
                        {faq.question}
                      </dt>
                      <dd className="text-sm text-stone-600 dark:text-primary-200/70">
                        {faq.answer}
                      </dd>
                      {relatedArticle && (
                        <dd>
                          <Link
                            href={`/blog/${relatedArticle.slug}`}
                            className="text-sm text-gold-700 underline hover:no-underline dark:text-gold-300"
                          >
                            Read more: {relatedArticle.title} &rarr;
                          </Link>
                        </dd>
                      )}
                    </div>
                  );
                })}
              </dl>
            </div>
          );
        })}
      </div>
    </div>
  );
}
