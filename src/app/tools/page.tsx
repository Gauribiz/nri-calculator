import type { Metadata } from "next";
import Disclaimer from "@/components/Disclaimer";
import CurrencyImpactCalculator from "@/components/calculators/CurrencyImpactCalculator";
import SipXirrCalculator from "@/components/calculators/SipXirrCalculator";
import FdRdMaturityCalculator from "@/components/calculators/FdRdMaturityCalculator";
import LoanPrepaymentCalculator from "@/components/calculators/LoanPrepaymentCalculator";
import TaxTreatmentComparisonTool from "@/components/calculators/TaxTreatmentComparisonTool";

export const metadata: Metadata = {
  title: "Financial Tools",
  description:
    "General-purpose financial calculators for NRIs: currency impact, SIP/mutual fund XIRR, FD/RD maturity, loan prepayment impact, and a tax treatment comparison across common investment types.",
};

export default function ToolsPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-6 py-12">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold tracking-tight text-primary-900 dark:text-primary-50">
          Financial Tools
        </h1>
        <p className="max-w-2xl text-stone-600 dark:text-primary-200/70">
          General-purpose calculators for money that spans the US and India —
          not specific to any single tax rule. Useful alongside the
          calculators in the four topic categories above.
        </p>
      </div>

      <Disclaimer />

      <div className="flex flex-col gap-6">
        <div id="currency-impact">
          <CurrencyImpactCalculator />
        </div>
        <div id="sip-xirr">
          <SipXirrCalculator />
        </div>
        <div id="fd-rd-maturity">
          <FdRdMaturityCalculator />
        </div>
        <div id="loan-prepayment">
          <LoanPrepaymentCalculator />
        </div>
        <div id="tax-treatment-comparison">
          <TaxTreatmentComparisonTool />
        </div>
      </div>
    </div>
  );
}
