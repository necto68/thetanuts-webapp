import type Big from "big.js";

export interface BasicVaultReader {
  totalPosition: Big | null;
  currentPosition: Big | null;
  depositPending: Big | null;
  withdrawalPending: Big | null;
  isReadyToWithdraw: boolean;
}
