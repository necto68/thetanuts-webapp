import type Big from "big.js";

export interface BasicVaultReader {
  totalPosition: Big | null;
  currentPosition: Big | null;
  withdrawalPending: Big | null;
  premiumRealized: Big | null;
  queuedExitEpoch: number | null;
}
