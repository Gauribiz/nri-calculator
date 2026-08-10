// Estimates the impact of a one-time lump-sum prepayment on an amortizing
// loan (e.g. an Indian home loan), assuming the EMI stays the same and the
// tenure shortens — the default prepayment treatment most Indian banks
// apply unless you explicitly ask for a reduced EMI instead.
//
// Given the current outstanding principal, the annual interest rate, and
// the monthly EMI, this solves the standard amortization identity
//   EMI = P * r * (1+r)^n / ((1+r)^n - 1)
// for the number of remaining months n (r = monthly rate), both before and
// after applying the prepayment to reduce principal. The difference gives
// months saved and interest saved.
//
// Not modeled: prepayment or foreclosure charges (floating-rate retail
// loans in India generally cannot carry these under RBI rules, but check
// your loan terms), changes to the interest rate over the remaining
// tenure, processing fees, or the "reduce EMI, keep tenure" alternative
// prepayment style (this tool only models "reduce tenure, keep EMI").

export type LoanPrepaymentInput = {
  outstandingPrincipal: number;
  annualRatePercent: number;
  monthlyEmi: number;
  prepaymentAmount: number;
};

export type LoanPrepaymentResult = {
  monthlyRatePercent: number;
  newPrincipalAfterPrepayment: number;
  loanFullyPaidByPrepayment: boolean;
  monthsRemainingWithoutPrepayment: number | null;
  totalInterestWithoutPrepayment: number | null;
  monthsRemainingWithPrepayment: number | null;
  totalInterestWithPrepayment: number | null;
  monthsSaved: number | null;
  interestSaved: number | null;
  emiTooLowToAmortize: boolean;
};

function monthsToPayoff(
  principal: number,
  monthlyRate: number,
  emi: number
): number | null {
  if (principal <= 0) return 0;
  if (emi <= 0) return null;
  if (monthlyRate === 0) return principal / emi;

  const monthlyInterestOnPrincipal = principal * monthlyRate;
  if (emi <= monthlyInterestOnPrincipal) return null;

  return (
    -Math.log(1 - (principal * monthlyRate) / emi) / Math.log(1 + monthlyRate)
  );
}

export function estimateLoanPrepaymentImpact(
  input: LoanPrepaymentInput
): LoanPrepaymentResult {
  const principal = Math.max(0, input.outstandingPrincipal);
  const annualRate = Math.max(0, input.annualRatePercent);
  const emi = Math.max(0, input.monthlyEmi);
  const prepayment = Math.max(
    0,
    Math.min(input.prepaymentAmount, principal)
  );

  const monthlyRate = annualRate / 12 / 100;

  const monthsWithout = monthsToPayoff(principal, monthlyRate, emi);
  const totalInterestWithout =
    monthsWithout !== null ? emi * monthsWithout - principal : null;

  const newPrincipal = Math.max(0, principal - prepayment);
  const loanFullyPaidByPrepayment = principal > 0 && newPrincipal === 0;

  const monthsWith = loanFullyPaidByPrepayment
    ? 0
    : monthsToPayoff(newPrincipal, monthlyRate, emi);
  const totalInterestWith = loanFullyPaidByPrepayment
    ? 0
    : monthsWith !== null
      ? emi * monthsWith - newPrincipal
      : null;

  const monthsSaved =
    monthsWithout !== null && monthsWith !== null
      ? monthsWithout - monthsWith
      : null;
  const interestSaved =
    totalInterestWithout !== null && totalInterestWith !== null
      ? totalInterestWithout - totalInterestWith
      : null;

  return {
    monthlyRatePercent: monthlyRate * 100,
    newPrincipalAfterPrepayment: newPrincipal,
    loanFullyPaidByPrepayment,
    monthsRemainingWithoutPrepayment: monthsWithout,
    totalInterestWithoutPrepayment: totalInterestWithout,
    monthsRemainingWithPrepayment: monthsWith,
    totalInterestWithPrepayment: totalInterestWith,
    monthsSaved,
    interestSaved,
    emiTooLowToAmortize: principal > 0 && monthsWithout === null,
  };
}
