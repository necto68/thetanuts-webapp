import { Logger } from "ethers/lib/utils";
import type { ErrorCode } from "@ethersproject/logger";

import {
  TransactionErrorMessage,
  TransactionErrorMessageTemplate,
} from "../types";

export const processWalletError = (walletError: unknown) => {
  const { code, data } = walletError as {
    code: number;
    data?: {
      message?: string;
    };
  };

  // userRejectedRequest error
  if (code === 4001) {
    throw new Error("Transaction Cancelled");
  }

  if (
    data?.message?.includes(
      TransactionErrorMessageTemplate.SettlementInProgress
    )
  ) {
    throw new Error(TransactionErrorMessage.SettlementInProgress);
  }

  throw walletError as Error;
};

export const processTransactionError = (transactionError: unknown) => {
  const { code, cancelled } = transactionError as {
    code: ErrorCode | number;
    cancelled: boolean;
  };

  if (
    code === -32_603 ||
    (code === Logger.errors.TRANSACTION_REPLACED && cancelled) ||
    code !== Logger.errors.TRANSACTION_REPLACED
  ) {
    throw transactionError as Error;
  }
};
