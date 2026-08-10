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
          Click a question to see the answer. Each one links to a fuller
          article or the relevant calculator.
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
              <div className="flex flex-col gap-2">
                {clusterFaqs.map((faq) => {
                  const relatedArticle = faq.relatedArticleSlug
                    ? getArticle(faq.relatedArticleSlug)
                    : undefined;
                  return (
                    <details
                      key={faq.id}
                      id={faq.id}
                      className="group rounded-lg border border-stone-200 dark:border-primary-900"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-primary-900 dark:text-primary-50">
                        {faq.question}
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 20 20"
                          className="h-4 w-4 shrink-0 fill-current text-stone-400 transition-transform group-open:rotate-180 dark:text-primary-300/70"
                        >
                          <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.06l3.71-3.83a.75.75 0 1 1 1.08 1.04l-4.24 4.38a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06Z" />
                        </svg>
                      </summary>
                      <div className="flex flex-col gap-2 border-t border-stone-200 px-4 py-3 dark:border-primary-900">
                        <p className="text-sm text-stone-600 dark:text-primary-200/70">
                          {faq.answer}
                        </p>
                        {relatedArticle && (
                          <Link
                            href={`/blog/${relatedArticle.slug}`}
                            className="text-sm text-gold-700 underline hover:no-underline dark:text-gold-300"
                          >
                            Read more: {relatedArticle.title} &rarr;
                          </Link>
                        )}
                      </div>
                    </details>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
