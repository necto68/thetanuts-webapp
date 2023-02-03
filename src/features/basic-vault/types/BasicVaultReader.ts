import type Big from "big.js";

export interface BasicVaultReader {
  lpBalance: Big | null;
  totalPosition: Big | null;
  currentPosition: Big | null;
  depositPending: Big | null;
  withdrawalPending: Big | null;
  isReadyToWithdraw: boolean;
}
