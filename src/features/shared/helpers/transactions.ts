import { Logger } from "ethers/lib/utils";
import type { ErrorCode } from "@ethersproject/logger";

import {
  TransactionErrorMessage,
  TransactionErrorMessageTemplate,
} from "../types";

export const processWalletError = (
  walletError: unknown,
  stateError?: unknown
) => {
  const { code } = walletError as {
    code: number;
  };

  if (
    JSON.stringify(walletError).includes("execution reverted: 5") &&
    stateError === "boost"
  ) {
    throw new Error(TransactionErrorMessage.notEnoughLiquidityForUnboost);
  }

  // userRejectedRequest error
  if (code === 4001) {
    throw new Error("Transaction Cancelled");
  }

  if (
    JSON.stringify(walletError).includes(
      TransactionErrorMessageTemplate.settlementInProgress
    )
  ) {
    throw new Error(TransactionErrorMessage.settlementInProgress);
  }

  throw walletError as Error;
};

export const processTransactionError = (transactionError: unknown) => {
  const { code, cancelled } = transactionError as {
    code: ErrorCode | number;
    cancelled: boolean;
  };

  if (
    JSON.stringify(transactionError).includes(
      TransactionErrorMessageTemplate.replacementTxnUnderpriced
    )
  ) {
    throw new Error(TransactionErrorMessage.replacementTxnUnderpriced);
  }

  if (
    code === -32_603 ||
    (code === Logger.errors.TRANSACTION_REPLACED && cancelled) ||
    code !== Logger.errors.TRANSACTION_REPLACED
  ) {
    throw transactionError as Error;
  }
};
