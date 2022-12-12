import type { HistoryTransactionRow } from "../types";
import { useBasicVaults } from "../../basic-vault/hooks";
import { VaultModalType } from "../../root/types";
import { TransactionType } from "../types/transaction";
import { VaultType } from "../../basic-vault/types";
import { BasicVaultType } from "../../basic/types";
import { useFilteredBasicVaultsIds } from "../../basic/hooks";
import { basicVaults, degenVaults } from "../../basic/constants";

import { useBasicHistoryQueries } from "./useBasicHistoryQueries";

export const useBasicHistoryRows = (): (
  | HistoryTransactionRow
  | undefined
)[] => {
  const basicVaultsArray = basicVaults.concat(degenVaults);
  const filteredBasicVaultsIds = useFilteredBasicVaultsIds(basicVaultsArray);

  const basicVaultsQueries = useBasicVaults(filteredBasicVaultsIds);
  const basicHistoryQueries = useBasicHistoryQueries(filteredBasicVaultsIds);

  return basicVaultsQueries.flatMap(({ data }, vaultIndex) => {
    const { data: historyTransactions } = basicHistoryQueries[vaultIndex];

    if (!data || !historyTransactions) {
      return undefined;
    }

    const {
      basicVaultType,
      type: strategyType,
      assetSymbol,
      collateralSymbol,
    } = data;

    const isDegen = basicVaultType === BasicVaultType.DEGEN;

    return historyTransactions.map(
      ({ id, type, timestamp, amountIn, amountOut, chainId }) => {
        const balance =
          type === TransactionType.deposited ? amountIn.mul(-1) : amountOut;

        const symbol =
          isDegen || strategyType === VaultType.PUT
            ? collateralSymbol
            : assetSymbol;

        const rowVaultType = isDegen
          ? VaultModalType.degen
          : VaultModalType.basic;

        return {
          id,
          type,
          timestamp,
          balance,
          chainId,
          vaultType: rowVaultType,
          strategyType,
          assetSymbol,
          collateralSymbol,
          symbol,
        };
      }
    );
  });
};
