import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Disclaimer from "@/components/Disclaimer";
import { RelatedReading } from "@/components/RelatedReading";
import { getCategory } from "@/lib/categories";
import {
  articles,
  getArticle,
  getRelatedArticles,
} from "@/lib/blog/articles";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const cluster = getCategory(article.clusterSlug);
  const related = getRelatedArticles(article);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-6 py-12">
      <div className="flex flex-col gap-2">
        {cluster && (
          <Link
            href={`/blog`}
            className="text-sm text-stone-500 hover:text-primary-800 dark:text-primary-300/60 dark:hover:text-primary-50"
          >
            &larr; Blog
          </Link>
        )}
        <h1 className="text-2xl font-semibold tracking-tight text-primary-900 dark:text-primary-50">
          {article.title}
        </h1>
        <p className="max-w-2xl text-stone-600 dark:text-primary-200/70">
          {article.dek}
        </p>
      </div>

      <Disclaimer />

      <article className="flex flex-col gap-6">
        {article.sections.map((section, index) => (
          <div key={index} className="flex flex-col gap-2">
            {section.heading && (
              <h2 className="text-lg font-semibold tracking-tight text-primary-900 dark:text-primary-50">
                {section.heading}
              </h2>
            )}
            {section.paragraphs.map((paragraph, pIndex) => (
              <p
                key={pIndex}
                className="text-stone-700 dark:text-primary-200/80"
              >
                {paragraph}
              </p>
            ))}
            {section.list && (
              <ul className="list-disc pl-5 text-stone-700 dark:text-primary-200/80">
                {section.list.map((item, lIndex) => (
                  <li key={lIndex}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </article>

      {cluster && (
        <Link
          href={`/${cluster.slug}`}
          className="w-fit rounded-lg border border-primary-300 bg-primary-50 px-4 py-2 text-sm font-medium text-primary-900 transition-colors hover:border-primary-500 dark:border-primary-700 dark:bg-primary-900 dark:text-primary-50"
        >
          Try the {cluster.shortTitle} calculators &rarr;
        </Link>
      )}

      <RelatedReading articles={related} />
    </div>
  );
}
