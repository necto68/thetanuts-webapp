import { useIndexVaults } from "../../index-vault/hooks";
import type { HistoryTransactionRow } from "../types";
import { TransactionType } from "../types";
import { VaultModalType } from "../../root/types";
import { useFilteredIndexVaultsIds } from "../../theta-index/hooks";

import { useIndexSwapsHistoryTransactions } from "./useIndexSwapsHistoryTransactions";
import { useIndexTokensQueries } from "./useIndexTokensQueries";

export const useIndexSwapsHistoryRows = (): (
  | HistoryTransactionRow
  | undefined
)[] => {
  const filteredIndexVaultsIds = useFilteredIndexVaultsIds();

  const indexVaultsQueries = useIndexVaults(filteredIndexVaultsIds);
  const indexSwapsHistoryTransactions = useIndexSwapsHistoryTransactions(
    filteredIndexVaultsIds
  );
  const indexTokensQueries = useIndexTokensQueries(filteredIndexVaultsIds);

  return indexVaultsQueries.flatMap(({ data }, vaultIndex) => {
    const historyTransactions = indexSwapsHistoryTransactions[vaultIndex];
    const { data: indexTokens } = indexTokensQueries[vaultIndex];

    if (!data || !indexTokens) {
      return undefined;
    }

    const { type: strategyType, assetSymbol, collateralSymbol } = data;

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
          vaultType: VaultModalType.index,
          strategyType,
          assetSymbol,
          collateralSymbol,
          symbol,
        };
      }
    );
  });
};
