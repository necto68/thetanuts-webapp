import type Big from "big.js";

import type { ChainId } from "../../wallet/constants";

export enum TransactionType {
  swappedIn = "swappedIn",
  swappedOut = "swappedOut",
  depositedDirectly = "depositedDirectly",
  withdrawnDirectly = "withdrawnDirectly",
  claim = "claim",
}

export const TransactionTypeTitle = {
  [TransactionType.swappedIn]: "Swap",
  [TransactionType.swappedOut]: "Swap",
  [TransactionType.depositedDirectly]: "Deposited Directly",
  [TransactionType.withdrawnDirectly]: "Direct Withdraw",
  [TransactionType.claim]: "Claimed",
};

export interface Transaction {
  id: string;
  type: TransactionType;
  timestamp: number;
  amountIn: Big;
  amountOut: Big;
  chainId: ChainId;
  expectedAmountOut?: Big;
}

export interface SwapTransaction extends Omit<Transaction, "type"> {
  assetIn: string;
  assetOut: string;
}
