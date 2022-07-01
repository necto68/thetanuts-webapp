import { Logger } from "ethers/lib/utils";
import type { ErrorCode } from "@ethersproject/logger";

export const processWalletError = (walletError: unknown) => {
  const { code } = walletError as {
    code: number;
  };

  // userRejectedRequest error
  if (code === 4001) {
    throw new Error("Transaction Cancelled");
  }

  throw walletError as Error;
};

export const processTransactionError = (transactionError: unknown) => {
  const { code, cancelled } = transactionError as {
    code: ErrorCode;
    cancelled: boolean;
  };

  if (
    (code === Logger.errors.TRANSACTION_REPLACED && cancelled) ||
    code !== Logger.errors.TRANSACTION_REPLACED
  ) {
    throw transactionError as Error;
  }
};
