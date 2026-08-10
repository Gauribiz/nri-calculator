// Estimates the annualised return (XIRR) on a regular monthly SIP
// (systematic investment plan) into a mutual fund or similar investment,
// given the monthly contribution amount, the date the SIP started, and the
// current value of the holding.
//
// Builds one cash flow per monthly installment (a cash outflow of
// -monthlySipAmount on each installment date) plus a single terminal cash
// inflow of +currentValueInr on the "as of" date, then solves for the
// annualised rate r that makes the net present value of those cash flows
// zero (the standard XIRR definition, using Actual/365 day-counting and
// Newton-Raphson iteration — no external finance library).
//
// Not modeled: step-up SIPs (a fixed monthly amount is assumed throughout),
// mid-month lump-sum top-ups or partial withdrawals, expense ratios, exit
// loads, or tax on redemption. Treat the result as an estimate of the
// pre-tax, pre-load annualised return on the contributions as entered.

export type SipXirrInput = {
  monthlySipAmount: number;
  startDate: string;
  currentValueInr: number;
  asOfDate?: string;
};

export type SipXirrResult = {
  totalInvested: number;
  numberOfInstallments: number;
  currentValue: number;
  absoluteGain: number;
  absoluteGainPercent: number;
  xirrPercent: number | null;
};

const MS_PER_DAY = 1000 * 60 * 60 * 24;
const DAYS_PER_YEAR = 365;

type CashFlow = { date: Date; amount: number };

function buildCashFlows(
  monthlySipAmount: number,
  start: Date,
  asOf: Date,
  currentValueInr: number
): CashFlow[] {
  const flows: CashFlow[] = [];
  const cursor = new Date(start.getTime());

  while (cursor.getTime() <= asOf.getTime()) {
    flows.push({ date: new Date(cursor.getTime()), amount: -monthlySipAmount });
    cursor.setMonth(cursor.getMonth() + 1);
  }

  if (flows.length > 0) {
    flows.push({ date: asOf, amount: currentValueInr });
  }

  return flows;
}

function npv(rate: number, flows: CashFlow[], t0: Date): number {
  return flows.reduce((sum, flow) => {
    const days = (flow.date.getTime() - t0.getTime()) / MS_PER_DAY;
    return sum + flow.amount / Math.pow(1 + rate, days / DAYS_PER_YEAR);
  }, 0);
}

function npvDerivative(rate: number, flows: CashFlow[], t0: Date): number {
  return flows.reduce((sum, flow) => {
    const days = (flow.date.getTime() - t0.getTime()) / MS_PER_DAY;
    const years = days / DAYS_PER_YEAR;
    if (years === 0) return sum;
    return sum - (flow.amount * years) / Math.pow(1 + rate, years + 1);
  }, 0);
}

function solveXirr(flows: CashFlow[]): number | null {
  if (flows.length < 2) return null;
  const t0 = flows[0].date;

  let rate = 0.1;
  for (let iteration = 0; iteration < 100; iteration++) {
    const value = npv(rate, flows, t0);
    const derivative = npvDerivative(rate, flows, t0);
    if (Math.abs(derivative) < 1e-10) break;

    const nextRate = rate - value / derivative;
    if (!Number.isFinite(nextRate) || nextRate <= -0.999) {
      return null;
    }
    if (Math.abs(nextRate - rate) < 1e-7) {
      return nextRate;
    }
    rate = nextRate;
  }

  return Number.isFinite(rate) ? rate : null;
}

export function estimateSipXirr(input: SipXirrInput): SipXirrResult {
  const monthlySipAmount = Math.max(0, input.monthlySipAmount);
  const currentValue = Math.max(0, input.currentValueInr);
  const start = new Date(input.startDate);
  const asOf = input.asOfDate ? new Date(input.asOfDate) : new Date();

  const invalid =
    monthlySipAmount <= 0 ||
    currentValue <= 0 ||
    Number.isNaN(start.getTime()) ||
    start.getTime() >= asOf.getTime();

  if (invalid) {
    return {
      totalInvested: 0,
      numberOfInstallments: 0,
      currentValue,
      absoluteGain: 0,
      absoluteGainPercent: 0,
      xirrPercent: null,
    };
  }

  const flows = buildCashFlows(monthlySipAmount, start, asOf, currentValue);
  const numberOfInstallments = flows.length - 1;
  const totalInvested = numberOfInstallments * monthlySipAmount;
  const absoluteGain = currentValue - totalInvested;
  const absoluteGainPercent =
    totalInvested > 0 ? (absoluteGain / totalInvested) * 100 : 0;

  const rate = solveXirr(flows);

  return {
    totalInvested,
    numberOfInstallments,
    currentValue,
    absoluteGain,
    absoluteGainPercent,
    xirrPercent: rate === null ? null : rate * 100,
  };
}
