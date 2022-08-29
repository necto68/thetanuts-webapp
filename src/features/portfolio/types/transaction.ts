import type Big from "big.js";

import type { ChainId } from "../../wallet/constants";

export enum TransactionType {
  swappedIn = "swappedIn",
  swappedOut = "swappedOut",
  depositedDirectly = "depositedDirectly",
  withdrawnDirectly = "withdrawnDirectly",
  claimed = "claimed",

  // basic vaults
  deposited = "deposited",
  initiatedWithdrawal = "initiatedWithdrawal",
  canceledWithdrawal = "canceledWithdrawal",
}

export const TransactionTypeTitle = {
  [TransactionType.swappedIn]: "Swapped",
  [TransactionType.swappedOut]: "Swapped",
  [TransactionType.depositedDirectly]: "Deposited Directly",
  [TransactionType.withdrawnDirectly]: "Withdrawn Directly",
  [TransactionType.claimed]: "Claimed",
  [TransactionType.deposited]: "Deposited",
  [TransactionType.initiatedWithdrawal]: "Initiated Withdrawal",
  [TransactionType.canceledWithdrawal]: "Canceled Withdrawal",
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
