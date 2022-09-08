import type { HistoryTransactionRow } from "../types";
import { basicVaults } from "../../basic/constants";
import { useBasicVaults } from "../../basic-vault/hooks";
import { VaultModalType } from "../../root/types";
import { TransactionType } from "../types/transaction";
import { VaultType } from "../../basic-vault/types";

import { useBasicHistoryQueries } from "./useBasicHistoryQueries";

export const useBasicHistoryRows = (): (
  | HistoryTransactionRow
  | undefined
)[] => {
  const basicVaultsIds = basicVaults.map(({ id }) => id);

  const basicVaultsQueries = useBasicVaults(basicVaultsIds);
  const basicHistoryQueries = useBasicHistoryQueries(basicVaultsIds);

  return basicVaultsQueries.flatMap(({ data }, vaultIndex) => {
    const { data: historyTransactions } = basicHistoryQueries[vaultIndex];

    if (!data || !historyTransactions) {
      return undefined;
    }

    const { type: vaultType } = data;

    return historyTransactions.map(
      ({ id, type, timestamp, amountIn, amountOut, chainId }) => {
        const { assetSymbol: symbol, collateralSymbol } = data;

        const balance =
          type === TransactionType.deposited ? amountIn.mul(-1) : amountOut;

        const assetSymbol =
          vaultType === VaultType.PUT ? collateralSymbol : symbol;

        const rowVaultType = VaultModalType.basic;

        // TODO: check assetSymbol and symbol for PUT vaults
        return {
          id,
          type,
          timestamp,
          balance,
          chainId,
          vaultType: rowVaultType,
          assetSymbol,
          symbol,
        };
      }
    );
  });
};
