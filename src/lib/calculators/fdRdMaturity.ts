// Estimates the maturity value of a fixed deposit (FD, a lump-sum deposit)
// or a recurring deposit (RD, equal monthly deposits) held with an Indian
// bank, using the standard quarterly-compounding conventions most Indian
// banks apply to both product types.
//
// FD: standard compound interest, compounded quarterly —
//   maturity = principal * (1 + rate/4/100)^(4 * years)
//
// RD: the widely-used banker's formula for a recurring deposit compounded
// quarterly, which credits each monthly installment interest for the
// fraction of each quarter it was actually on deposit —
//   maturity = monthlyDeposit * [(1+i)^n - 1] / (1 - (1+i)^(-1/3))
//   where i = annualRatePercent / 400 (the quarterly rate) and
//   n = tenureMonths / 3 (the number of quarters).
//
// Both are pre-tax estimates using a fixed rate for the whole tenure. Not
// modeled: TDS on FD/RD interest (NRO FDs are subject to TDS; NRE FDs are
// tax-free in India but may be taxable in your country of residence — see
// the NRE/NRO & TDS category), premature withdrawal penalties, or
// bank-specific rounding conventions. Verify the exact maturity value with
// your bank before relying on this.

export type DepositType = "fd" | "rd";

export type FdRdMaturityInput = {
  depositType: DepositType;
  amount: number;
  annualRatePercent: number;
  tenureMonths: number;
};

export type FdRdMaturityResult = {
  totalDeposited: number;
  maturityValue: number;
  interestEarned: number;
  interestEarnedPercent: number;
};

export function estimateFdRdMaturity(
  input: FdRdMaturityInput
): FdRdMaturityResult {
  const rate = Math.max(0, input.annualRatePercent);
  const tenureMonths = Math.max(0, input.tenureMonths);
  const amount = Math.max(0, input.amount);

  if (input.depositType === "fd") {
    const years = tenureMonths / 12;
    const quarterlyRate = rate / 100 / 4;
    const maturityValue = amount * Math.pow(1 + quarterlyRate, 4 * years);
    return {
      totalDeposited: amount,
      maturityValue,
      interestEarned: maturityValue - amount,
      interestEarnedPercent:
        amount > 0 ? ((maturityValue - amount) / amount) * 100 : 0,
    };
  }

  const totalDeposited = amount * tenureMonths;
  const i = rate / 400;
  const n = tenureMonths / 3;

  const maturityValue =
    i === 0 || tenureMonths === 0
      ? totalDeposited
      : (amount * (Math.pow(1 + i, n) - 1)) / (1 - Math.pow(1 + i, -1 / 3));

  return {
    totalDeposited,
    maturityValue,
    interestEarned: maturityValue - totalDeposited,
    interestEarnedPercent:
      totalDeposited > 0
        ? ((maturityValue - totalDeposited) / totalDeposited) * 100
        : 0,
  };
}
