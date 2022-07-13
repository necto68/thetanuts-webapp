import type Big from "big.js";

export interface BasicVaultReader {
  currentPosition: Big | null;
  withdrawalPending: Big | null;
  premiumRealized: Big | null;
  queuedExitEpoch: number | null;
}
