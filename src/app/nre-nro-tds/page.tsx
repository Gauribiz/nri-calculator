import type { Metadata } from "next";
import Disclaimer from "@/components/Disclaimer";
import { getCategory } from "@/lib/categories";
import NreNroChooser from "@/components/calculators/NreNroChooser";
import NroInterestTdsCalculator from "@/components/calculators/NroInterestTdsCalculator";
import Form15caCbChecker from "@/components/calculators/Form15caCbChecker";

const category = getCategory("nre-nro-tds")!;

export const metadata: Metadata = {
  title: category.title,
  description: category.description,
};

export default function NreNroTdsPage() {
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
        The three tools below apply general, well-established rules. Each
        one flags what it does not model — review those notes, and the
        disclaimer above, before relying on a result.
      </p>

      <p className="max-w-2xl text-xs text-stone-500 dark:text-primary-300/60">
        Figures below (the 30%/15% NRO interest TDS rates, the 4% cess, and
        the Form 15CA/15CB ₹5 lakh threshold and Part A/B/C/D structure)
        were cross-checked on 2026-08-04 against public tax-reference
        sources citing incometax.gov.in (see each tool&apos;s source links
        below); a direct incometax.gov.in fetch was blocked (HTTP 403)
        during this pass. This is a secondary-source cross-check, not a
        professional tax or legal review — please verify against
        incometax.gov.in directly, or with a qualified advisor, before
        relying on any result.
      </p>

      <div className="flex flex-col gap-6">
        <NreNroChooser />
        <NroInterestTdsCalculator />
        <Form15caCbChecker />
      </div>
    </div>
  );
}
