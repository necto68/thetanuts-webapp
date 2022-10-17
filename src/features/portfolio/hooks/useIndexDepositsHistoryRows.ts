import { indexVaults } from "../../theta-index/constants";
import { useIndexVaults } from "../../index-vault/hooks";
import type { HistoryTransactionRow } from "../types";
import { VaultModalType } from "../../root/types";

import { useIndexDepositsHistoryQueries } from "./useIndexDepositsHistoryQueries";
import { useIndexTokensQueries } from "./useIndexTokensQueries";

export const useIndexDepositsHistoryRows = (): (
  | HistoryTransactionRow
  | undefined
)[] => {
  const indexVaultsIds = indexVaults.map(({ id }) => id);

  const indexVaultsQueries = useIndexVaults(indexVaultsIds);
  const indexDepositsHistoryQueries =
    useIndexDepositsHistoryQueries(indexVaultsIds);
  const indexTokensQueries = useIndexTokensQueries(indexVaultsIds);

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
