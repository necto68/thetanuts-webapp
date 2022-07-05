import { indexVaults } from "../../theta-index/constants";
import { useIndexVaults } from "../../index-vault/hooks";
import type { HistoryTransactionRow } from "../types";

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

    const { assetSymbol } = data;

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
          action: "",

          // TODO: add more different vault types
          productType: "THETA-INDEX",
          assetSymbol,
          symbol,
        };
      }
    );
  });
};
