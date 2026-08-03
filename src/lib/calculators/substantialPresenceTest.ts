// US Substantial Presence Test (IRC §7701(b)(3)).
// Figures (31-day floor, 183-day threshold, 1/3 and 1/6 weights) are fixed
// by statute, not estimates — but this calculator does not account for
// exempt individuals (certain F/J/M/Q visa holders), the closer-connection
// exception, or days that don't count as US presence. Verify against
// irs.gov before relying on the result.

export type SubstantialPresenceInput = {
  currentYearDays: number;
  priorYearDays: number;
  yearBeforePriorDays: number;
};

export type SubstantialPresenceResult = {
  weightedTotal: number;
  meetsCurrentYearMinimum: boolean;
  meetsSubstantialPresenceTest: boolean;
};

const CURRENT_YEAR_MINIMUM_DAYS = 31;
const SUBSTANTIAL_PRESENCE_THRESHOLD = 183;
const PRIOR_YEAR_WEIGHT = 1 / 3;
const YEAR_BEFORE_PRIOR_WEIGHT = 1 / 6;

export function calculateSubstantialPresence(
  input: SubstantialPresenceInput
): SubstantialPresenceResult {
  const currentYearDays = Math.max(0, input.currentYearDays);
  const priorYearDays = Math.max(0, input.priorYearDays);
  const yearBeforePriorDays = Math.max(0, input.yearBeforePriorDays);

  const weightedTotal =
    currentYearDays +
    priorYearDays * PRIOR_YEAR_WEIGHT +
    yearBeforePriorDays * YEAR_BEFORE_PRIOR_WEIGHT;

  const meetsCurrentYearMinimum = currentYearDays >= CURRENT_YEAR_MINIMUM_DAYS;
  const meetsSubstantialPresenceTest =
    meetsCurrentYearMinimum && weightedTotal >= SUBSTANTIAL_PRESENCE_THRESHOLD;

  return {
    weightedTotal,
    meetsCurrentYearMinimum,
    meetsSubstantialPresenceTest,
  };
}
