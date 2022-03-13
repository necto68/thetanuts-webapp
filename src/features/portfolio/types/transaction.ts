import type Big from "big.js";

import type { ChainId } from "../../wallet/constants";

export enum TransactionType {
  swappedIn = "swappedIn",
  swappedOut = "swappedOut",
  depositedDirectly = "depositedDirectly",
}

export const TransactionTypeTitle = {
  [TransactionType.swappedIn]: "Swapped In",
  [TransactionType.swappedOut]: "Swapped Out",
  [TransactionType.depositedDirectly]: "Deposited Directly",
};

export interface Transaction {
  id: string;
  type: TransactionType;
  timestamp: number;
  amountIn: Big;
  amountOut: Big;
  chainId: ChainId;
}
