import type { HistoryTransactionRow } from "../types";
import { useBasicVaults } from "../../basic-vault/hooks";
import { TransactionType } from "../types/transaction";
import { VaultType } from "../../basic-vault/types";
import { BasicVaultType } from "../../basic/types";
import { useFilteredBasicVaultsIds } from "../../basic/hooks";
import { basicVaults, degenVaults, wheelVaults } from "../../basic/constants";
import { getVaultModalType } from "../../basic/helpers";

import { useBasicHistoryQueries } from "./useBasicHistoryQueries";

export const useBasicHistoryRows = (): (
  | HistoryTransactionRow
  | undefined
)[] => {
  const basicVaultsArray = basicVaults.concat(degenVaults).concat(wheelVaults);
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

        const rowVaultType = getVaultModalType(basicVaultType);

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
