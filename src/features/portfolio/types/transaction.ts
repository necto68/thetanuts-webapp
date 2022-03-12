import type Big from "big.js";

import type { ChainId } from "../../wallet/constants";

export enum TransactionType {
  swappedIn = "swappedIn",
  swappedOut = "swappedOut",
}

export interface Transaction {
  id: string;
  type: TransactionType;
  timestamp: number;
  amountIn: Big;
  amountOut: Big;
  chainId: ChainId;
}
