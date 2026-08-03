import type { Metadata } from "next";
import Disclaimer from "@/components/Disclaimer";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "This site provides general information only and is not professional tax, legal, or financial advice.",
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-6 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">Disclaimer</h1>
      <Disclaimer />
      <p className="max-w-2xl text-zinc-600 dark:text-zinc-400">
        Nothing on this site should be relied upon as a substitute for advice
        from a qualified, licensed professional who is familiar with your
        specific circumstances. Tax and legal rules referenced on this site
        can and do change, and this site is not updated on any guaranteed
        schedule. The operator of this site is not liable for decisions made
        based on its content.
      </p>
    </div>
  );
}
