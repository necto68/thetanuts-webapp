import { Logger } from "ethers/lib/utils";
import type { ContractTransaction } from "ethers";
import type { ErrorCode } from "@ethersproject/logger";

export const processTransaction = async (transaction: ContractTransaction) => {
  try {
    await transaction.wait();
  } catch (error) {
    const { code, cancelled } = error as {
      code: ErrorCode;
      cancelled: boolean;
    };

    if (
      (code === Logger.errors.TRANSACTION_REPLACED && cancelled) ||
      code !== Logger.errors.TRANSACTION_REPLACED
    ) {
      throw error as Error;
    }
  }
};
