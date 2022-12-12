import { useIndexVaults } from "../../index-vault/hooks";
import type { HistoryTransactionRow } from "../types";
import { VaultModalType } from "../../root/types";
import { useFilteredIndexVaultsIds } from "../../theta-index/hooks";

import { useIndexDepositsHistoryQueries } from "./useIndexDepositsHistoryQueries";
import { useIndexTokensQueries } from "./useIndexTokensQueries";

export const useIndexDepositsHistoryRows = (): (
  | HistoryTransactionRow
  | undefined
)[] => {
  const filteredIndexVaultsIds = useFilteredIndexVaultsIds();

  const indexVaultsQueries = useIndexVaults(filteredIndexVaultsIds);
  const indexDepositsHistoryQueries = useIndexDepositsHistoryQueries(
    filteredIndexVaultsIds
  );
  const indexTokensQueries = useIndexTokensQueries(filteredIndexVaultsIds);

  return indexVaultsQueries.flatMap(({ data }, vaultIndex) => {
    const { data: historyTransactions } =
      indexDepositsHistoryQueries[vaultIndex];
    const { data: indexTokens } = indexTokensQueries[vaultIndex];

    if (!data || !historyTransactions || !indexTokens) {
      return undefined;
    }

    const { type: strategyType, assetSymbol, collateralSymbol } = data;

    return historyTransactions.map(
      ({ id, type, timestamp, amountIn, chainId }) => {
        const indexToken = indexTokens.find(
          ({ chainId: indexTokenChainId }) => indexTokenChainId === chainId
        );

        const symbol = indexToken?.symbol ?? "";

        return {
          id,
          type,
          timestamp,
          balance: amountIn.mul(-1),
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
