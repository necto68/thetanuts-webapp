import { indexVaults } from "../../theta-index/constants";
import { useIndexVaults } from "../../index-vault/hooks";
import type { HistoryTransactionRow } from "../types";
import { TransactionType } from "../types";

import { useIndexSwapsHistoryTransactions } from "./useIndexSwapsHistoryTransactions";

export const useIndexSwapsHistoryRows = (): (
  | HistoryTransactionRow
  | undefined
)[] => {
  const indexVaultsIds = indexVaults.map(({ id }) => id);
  const indexVaultsQueries = useIndexVaults(indexVaultsIds);
  const indexSwapsHistoryTransactions =
    useIndexSwapsHistoryTransactions(indexVaultsIds);

  return indexVaultsQueries.flatMap(({ data }, vaultIndex) => {
    const historyTransactions = indexSwapsHistoryTransactions[vaultIndex];

    if (!data) {
      return undefined;
    }

    const { assetSymbol } = data;

    return historyTransactions.map(
      ({ id, type, timestamp, amountIn, amountOut, chainId }) => ({
        id,
        type,
        timestamp,

        balance:
          type === TransactionType.swappedIn ? amountIn.mul(-1) : amountOut,

        chainId,

        // TODO: add more different vault types
        productType: "THETA-INDEX",
        assetSymbol,
      })
    );
  });
};
