import { indexVaults } from "../../theta-index/constants";
import { useIndexVaults } from "../../index-vault/hooks";
import type { HistoryTransactionRow } from "../types";
import { TransactionType } from "../types";

import { useIndexSwapsHistoryTransactions } from "./useIndexSwapsHistoryTransactions";
import { useIndexTokensQueries } from "./useIndexTokensQueries";

export const useIndexSwapsHistoryRows = (): (
  | HistoryTransactionRow
  | undefined
)[] => {
  const indexVaultsIds = indexVaults.map(({ id }) => id);

  const indexVaultsQueries = useIndexVaults(indexVaultsIds);
  const indexSwapsHistoryTransactions =
    useIndexSwapsHistoryTransactions(indexVaultsIds);
  const indexTokensQueries = useIndexTokensQueries(indexVaultsIds);

  return indexVaultsQueries.flatMap(({ data }, vaultIndex) => {
    const historyTransactions = indexSwapsHistoryTransactions[vaultIndex];
    const { data: indexTokens } = indexTokensQueries[vaultIndex];

    if (!data || !indexTokens) {
      return undefined;
    }

    const { assetSymbol } = data;

    return historyTransactions.map(
      ({ id, type, timestamp, amountIn, amountOut, chainId }) => {
        const indexToken = indexTokens.find(
          ({ chainId: indexTokenChainId }) => indexTokenChainId === chainId
        );

        const symbol = indexToken?.symbol ?? "";

        return {
          id,
          type,
          timestamp,

          balance:
            type === TransactionType.swappedIn ? amountIn.mul(-1) : amountOut,

          chainId,

          // TODO: add more different vault types
          productType: "THETA-INDEX",
          assetSymbol,
          symbol,
        };
      }
    );
  });
};