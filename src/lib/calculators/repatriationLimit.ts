// Estimates headroom under the RBI's USD 1 million per financial year facility for
// remittance of assets by NRIs/PIOs (Foreign Exchange Management (Remittance of
// Assets) Regulations, 2016, consolidated in RBI Master Direction No. 13). NRE/FCNR
// account balances represent funds already held in convertible foreign exchange and
// are not subject to this ceiling.
//
// This models only the headroom-tracking arithmetic. It does NOT model: the
// RBI-permission route for amounts above the ceiling (e.g. medical emergency, a
// child's education abroad, buying real estate in the country of residence), the
// separate cap limiting repatriation of residential property sale proceeds to a
// maximum of two properties, or Form 15CA/15CB documentation mechanics (see the
// NRE/NRO & TDS category for that). Verify the current ceiling and any
// account-specific conditions against rbi.org.in and with your bank before relying
// on this.

export const ANNUAL_REPATRIATION_LIMIT_USD = 1_000_000;

export type RepatriationHeadroomInput = {
  accountType: "nro" | "nre_or_fcnr";
  alreadyRepatriatedThisFyUsd: number;
  requestedAmountUsd: number;
};

export type RepatriationHeadroomResult = {
  subjectToAnnualLimit: boolean;
  remainingHeadroomUsd: number | null;
  fitsWithinLimit: boolean;
  amountExceedingLimitUsd: number;
};

export function estimateRepatriationHeadroom(
  input: RepatriationHeadroomInput
): RepatriationHeadroomResult {
  const alreadyRepatriated = Math.max(0, input.alreadyRepatriatedThisFyUsd);
  const requested = Math.max(0, input.requestedAmountUsd);

  if (input.accountType === "nre_or_fcnr") {
    return {
      subjectToAnnualLimit: false,
      remainingHeadroomUsd: null,
      fitsWithinLimit: true,
      amountExceedingLimitUsd: 0,
    };
  }

  const remainingHeadroomUsd = Math.max(
    0,
    ANNUAL_REPATRIATION_LIMIT_USD - alreadyRepatriated
  );
  const amountExceedingLimitUsd = Math.max(
    0,
    requested - remainingHeadroomUsd
  );

  return {
    subjectToAnnualLimit: true,
    remainingHeadroomUsd,
    fitsWithinLimit: amountExceedingLimitUsd === 0,
    amountExceedingLimitUsd,
  };
}
