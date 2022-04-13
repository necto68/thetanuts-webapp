import { useQueries } from "react-query";
import { useWallet } from "@gimmixorg/use-wallet";

import { useIndexVaults } from "../../index-vault/hooks";
import { QueryType } from "../../shared/types";
import { chainProvidersMap, chainsMap } from "../../wallet/constants";
import { indexVaultsMap } from "../../theta-index/constants";
import { chainIndexSwapsHistoryFetcher } from "../helpers";
import type { Transaction } from "../types";
import { TransactionType } from "../types";

export const useIndexSwapsHistoryTransactions = (
  indexVaultIds: string[]
): Transaction[][] => {
  const { account = "" } = useWallet();

  const indexVaultsQueries = useIndexVaults(indexVaultIds);

  const indexVaultsChainIds = indexVaultIds.flatMap((indexVaultId) => {
    const indexVaultConfig = indexVaultsMap[indexVaultId];

    if (!indexVaultConfig) {
      return [];
    }

    const sourceChainId = indexVaultConfig.source.chainId;
    const replicationsChainIds = indexVaultConfig.replications.map(
      ({ chainId }) => chainId
    );

    return [sourceChainId].concat(replicationsChainIds);
  });

  const uniqIndexVaultsChainIds = Array.from(new Set(indexVaultsChainIds));

  const chainSwapsHistoryQueries = useQueries(
    uniqIndexVaultsChainIds.map((chainId) => {
      const {
        addresses: { routerAddress },
      } = chainsMap[chainId];
      const provider = chainProvidersMap[chainId];

      return {
        queryKey: [QueryType.chainIndexSwapsHistory, chainId],

        queryFn: async () =>
          await chainIndexSwapsHistoryFetcher(routerAddress, provider, account),
      };
    })
  );

  const chainSwapsHistoryTransactions = chainSwapsHistoryQueries.flatMap(
    ({ data }) => data ?? []
  );

  return indexVaultsQueries.map(({ data }) => {
    if (!data) {
      return [];
    }

    const {
      id: indexVaultId,
      chainId: indexVaultChainId,
      assetTokenAddress,
      indexTokenAddress,
    } = data;
    const tokenConfig = indexVaultsMap[indexVaultId];

    const { replications = [] } = tokenConfig ?? {};

    const indexTokensConfigs = [
      { assetTokenAddress, indexTokenAddress },
    ].concat(
      replications.map((replication) => ({
        assetTokenAddress: replication.assetTokenAddress,
        indexTokenAddress: replication.indexTokenAddress,
      }))
    );

    const filteredSwappedInTransactions = chainSwapsHistoryTransactions.filter(
      (historyTransaction) =>
        indexTokensConfigs.some(
          (indexTokenConfig) =>
            historyTransaction.chainId === indexVaultChainId &&
            historyTransaction.assetIn === indexTokenConfig.assetTokenAddress
        )
    );

    const filteredSwappedOutTransactions = chainSwapsHistoryTransactions.filter(
      (historyTransaction) =>
        indexTokensConfigs.some(
          (indexTokenConfig) =>
            historyTransaction.chainId === indexVaultChainId &&
            historyTransaction.assetIn === indexTokenConfig.indexTokenAddress
        )
    );

    const swappedInTransactions: Transaction[] =
      filteredSwappedInTransactions.map(
        ({ id, amountIn, amountOut, timestamp, chainId }) => ({
          id,
          type: TransactionType.swappedIn,
          amountIn,
          amountOut,
          timestamp,
          chainId,
        })
      );

    const swappedOutTransactions: Transaction[] =
      filteredSwappedOutTransactions.map(
        ({ id, amountIn, amountOut, timestamp, chainId }) => ({
          id,
          type: TransactionType.swappedOut,
          amountIn,
          amountOut,
          timestamp,
          chainId,
        })
      );

    return [...swappedInTransactions, ...swappedOutTransactions];
  });
};
