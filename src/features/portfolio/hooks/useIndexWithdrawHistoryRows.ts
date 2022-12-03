import { useIndexVaults } from "../../index-vault/hooks";
import type { HistoryTransactionRow } from "../types";
import { VaultModalType } from "../../root/types";
import { useFilteredIndexVaultsIds } from "../../theta-index/hooks";

import { useIndexTokensQueries } from "./useIndexTokensQueries";
import { useIndexWithdrawHistoryQueries } from "./useIndexWithdrawHistoryQueries";

export const useIndexWithdrawHistoryRows = (): (
  | HistoryTransactionRow
  | undefined
)[] => {
  const filteredIndexVaultsIds = useFilteredIndexVaultsIds();

  const indexVaultsQueries = useIndexVaults(filteredIndexVaultsIds);
  const indexWithdrawHistoryQueries = useIndexWithdrawHistoryQueries(
    filteredIndexVaultsIds
  );
  const indexTokensQueries = useIndexTokensQueries(filteredIndexVaultsIds);

  return indexVaultsQueries.flatMap(({ data }, vaultIndex) => {
    const { data: historyTransactions } =
      indexWithdrawHistoryQueries[vaultIndex];
    const { data: indexTokens } = indexTokensQueries[vaultIndex];

    if (!data || !historyTransactions || !indexTokens) {
      return undefined;
    }

    const { type: strategyType, assetSymbol, collateralSymbol } = data;

    return historyTransactions.map(
      ({ id, type, timestamp, amountOut, chainId }) => {
        const indexToken = indexTokens.find(
          ({ chainId: indexTokenChainId }) => indexTokenChainId === chainId
        );

        const symbol = indexToken?.symbol ?? "";

        return {
          id,
          type,
          timestamp,
          balance: amountOut,
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
