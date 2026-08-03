import type { Metadata } from "next";
import Disclaimer from "@/components/Disclaimer";
import { getCategory } from "@/lib/categories";

const category = getCategory("nre-nro-tds")!;

export const metadata: Metadata = {
  title: category.title,
  description: category.description,
};

export default function NreNroTdsPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-6 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">
        {category.title}
      </h1>

      <Disclaimer />

      <p className="max-w-2xl text-zinc-600 dark:text-zinc-400">
        {category.description}
      </p>

      <p className="max-w-2xl text-zinc-500 dark:text-zinc-500">
        Detailed guidance and calculators for this topic are coming soon.
      </p>
    </div>
  );
}
