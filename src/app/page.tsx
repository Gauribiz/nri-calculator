import Link from "next/link";
import Disclaimer from "@/components/Disclaimer";
import { categories } from "@/lib/categories";

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-6 py-12">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold tracking-tight">
          NRI Calculator
        </h1>
        <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          General financial information for NRIs navigating the US-India
          corridor — covering tax residency under DTAA, NRE/NRO interest and
          TDS, cross-border investments and repatriation, and capital gains on
          Indian real estate. This site explains how these rules generally
          work; it is not personalized tax, legal, or financial advice.
        </p>
      </div>

      <Disclaimer />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/${category.slug}`}
            className="flex flex-col gap-2 rounded-lg border border-zinc-200 p-5 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
          >
            <h2 className="font-medium">{category.title}</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {category.description}
            </p>
          </Link>
        ))}
      </div>

      <Link
        href="/tools"
        className="flex flex-col gap-2 rounded-lg border border-zinc-200 p-5 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
      >
        <h2 className="font-medium">Financial Tools</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Currency impact, SIP/mutual fund XIRR, FD/RD maturity, loan
          prepayment impact, and a tax treatment comparison across common
          NRI investment types — general-purpose calculators alongside the
          topic categories above.
        </p>
      </Link>
    </div>
  );
}
