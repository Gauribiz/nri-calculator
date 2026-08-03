import type { Metadata } from "next";
import Disclaimer from "@/components/Disclaimer";
import { getCategory } from "@/lib/categories";
import SubstantialPresenceCalculator from "@/components/calculators/SubstantialPresenceCalculator";
import IndiaResidencyCalculator from "@/components/calculators/IndiaResidencyCalculator";
import DtaaReliefEstimator from "@/components/calculators/DtaaReliefEstimator";

const category = getCategory("dtaa-tax-residency")!;

export const metadata: Metadata = {
  title: category.title,
  description: category.description,
};

export default function DtaaTaxResidencyPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-6 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">
        {category.title}
      </h1>

      <Disclaimer />

      <p className="max-w-2xl text-zinc-600 dark:text-zinc-400">
        {category.description}
      </p>

      <p className="max-w-2xl text-sm text-zinc-500 dark:text-zinc-500">
        The three tools below apply general, well-established test formulas.
        Each one flags what it does not model — review those notes, and the
        disclaimer above, before relying on a result.
      </p>

      <div className="flex flex-col gap-6">
        <SubstantialPresenceCalculator />
        <IndiaResidencyCalculator />
        <DtaaReliefEstimator />
      </div>
    </div>
  );
}
