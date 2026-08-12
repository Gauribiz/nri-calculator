import type { Metadata } from "next";
import Disclaimer from "@/components/Disclaimer";
import { RelatedReading } from "@/components/RelatedReading";
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
        <RealEstateCapitalGainsCalculator defaultOpen />
        <NriPropertySaleTdsCalculator defaultOpen={false} />
        <Form13Explainer defaultOpen={false} />
      </div>

      <RelatedReading articles={clusterArticles} />
    </div>
  );
}
