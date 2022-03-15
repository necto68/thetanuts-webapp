import { indexVaults } from "../../theta-index/constants";
import { useIndexVaults } from "../../index-vault/hooks";
import type { HistoryTransactionRow } from "../types";

import { useIndexDepositsHistoryQueries } from "./useIndexDepositsHistoryQueries";

export const useIndexDepositsHistoryRows = (): (
  | HistoryTransactionRow
  | undefined
)[] => {
  const indexVaultsIds = indexVaults.map(({ id }) => id);
  const indexVaultsQueries = useIndexVaults(indexVaultsIds);
  const indexDepositsHistoryQueries =
    useIndexDepositsHistoryQueries(indexVaultsIds);

  return indexVaultsQueries.flatMap(({ data }, vaultIndex) => {
    const { data: historyTransactions } =
      indexDepositsHistoryQueries[vaultIndex];

    if (!data || !historyTransactions) {
      return undefined;
    }

    const { type: indexVaultType, assetSymbol } = data;

    return historyTransactions.map(
      ({ id, type, timestamp, amountIn, chainId }) => ({
        id,
        type,
        timestamp,
        balance: amountIn.mul(-1),
        chainId,

        // TODO: add more different vault types
        vaultType: "THETA-INDEX",
        indexVaultType,
        assetSymbol,
      })
    );
  });
};
