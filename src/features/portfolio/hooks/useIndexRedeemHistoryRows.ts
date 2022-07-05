import { indexVaults } from "../../theta-index/constants";
import { useIndexVaults } from "../../index-vault/hooks";
import type { HistoryTransactionRow } from "../types";

import { useIndexTokensQueries } from "./useIndexTokensQueries";
import { useIndexRedeemHistoryQueries } from "./useIndexRedeemHistoryQueries";

export const useIndexRedeemHistoryRows = (): (
  | HistoryTransactionRow
  | undefined
)[] => {
  const indexVaultsIds = indexVaults.map(({ id }) => id);

  const indexVaultsQueries = useIndexVaults(indexVaultsIds);
  const indexRedeemHistoryQueries =
    useIndexRedeemHistoryQueries(indexVaultsIds);
  const indexTokensQueries = useIndexTokensQueries(indexVaultsIds);

  return indexVaultsQueries.flatMap(({ data }, vaultIndex) => {
    const { data: historyTransactions } = indexRedeemHistoryQueries[vaultIndex];
    const { data: indexTokens } = indexTokensQueries[vaultIndex];

    if (!data || !historyTransactions || !indexTokens) {
      return undefined;
    }

    const { assetSymbol } = data;

    return historyTransactions.map(
      ({ id, type, timestamp, amountOut, chainId }) => {
        const indexToken = indexTokens.find(
          ({ chainId: indexTokenChainId }) => indexTokenChainId === chainId
        );

        const symbol = indexToken?.symbol ?? "";

        return {
          id,
          indexVaultId: data.id,
          type,
          timestamp,
          balance: amountOut,
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
