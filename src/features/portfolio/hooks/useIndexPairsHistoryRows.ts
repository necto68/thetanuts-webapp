import { indexVaults } from "../../theta-index/constants";
import { useIndexVaults } from "../../index-vault/hooks";
import type { HistoryTransactionRow } from "../types";
import { TransactionType } from "../types";

import { useIndexPairsHistoryQueries } from "./useIndexPairsHistoryQueries";

export const useIndexPairsHistoryRows = (): (
  | HistoryTransactionRow
  | undefined
)[] => {
  const indexVaultsIds = indexVaults.map(({ id }) => id);
  const indexVaultsQueries = useIndexVaults(indexVaultsIds);
  const indexPairsHistoryQueries = useIndexPairsHistoryQueries(indexVaultsIds);

  return indexVaultsQueries.flatMap(({ data }, vaultIndex) => {
    const { data: historyTransactions } = indexPairsHistoryQueries[vaultIndex];

    if (!data || !historyTransactions) {
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
