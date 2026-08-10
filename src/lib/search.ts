import { categories } from "@/lib/categories";
import { articles } from "@/lib/blog/articles";
import { faqs } from "@/lib/blog/faqs";

export type SearchResultType = "category" | "article" | "faq" | "tool";

export type SearchIndexEntry = {
  id: string;
  type: SearchResultType;
  title: string;
  subtitle: string;
  href: string;
  keywords: string;
};

function buildIndex(): SearchIndexEntry[] {
  const entries: SearchIndexEntry[] = [];

  for (const category of categories) {
    entries.push({
      id: `category-${category.slug}`,
      type: "category",
      title: category.title,
      subtitle: category.description,
      href: `/${category.slug}`,
      keywords: `${category.title} ${category.shortTitle} ${category.description}`.toLowerCase(),
    });
  }

  for (const article of articles) {
    entries.push({
      id: `article-${article.slug}`,
      type: "article",
      title: article.title,
      subtitle: article.dek,
      href: `/blog/${article.slug}`,
      keywords: `${article.title} ${article.description} ${article.dek}`.toLowerCase(),
    });
  }

  for (const faq of faqs) {
    entries.push({
      id: `faq-${faq.id}`,
      type: "faq",
      title: faq.question,
      subtitle: faq.answer,
      href: `/faq#${faq.id}`,
      keywords: `${faq.question} ${faq.answer}`.toLowerCase(),
    });
  }

  return entries;
}

let cachedIndex: SearchIndexEntry[] | null = null;

export function getSearchIndex(): SearchIndexEntry[] {
  if (!cachedIndex) {
    cachedIndex = buildIndex();
  }
  return cachedIndex;
}

const TYPE_WEIGHT: Record<SearchResultType, number> = {
  category: 3,
  tool: 3,
  article: 2,
  faq: 1,
};

export function search(query: string, limit = 8): SearchIndexEntry[] {
  const trimmed = query.trim().toLowerCase();
  if (trimmed.length < 2) return [];

  const tokens = trimmed.split(/\s+/).filter(Boolean);
  const index = getSearchIndex();

  const scored = index
    .map((entry) => {
      let score = 0;
      const titleLower = entry.title.toLowerCase();

      if (titleLower.includes(trimmed)) {
        score += 10;
      }

      for (const token of tokens) {
        if (titleLower.includes(token)) score += 4;
        if (entry.keywords.includes(token)) score += 1;
      }

      score *= TYPE_WEIGHT[entry.type];

      return { entry, score };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map((result) => result.entry);
}
