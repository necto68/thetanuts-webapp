import type { ChainId } from "../../wallet/constants";
import { chainProvidersMap, chainsMap } from "../../wallet/constants";
import { queryClient } from "../../shared/helpers";
import { indexVaults } from "../../theta-index/constants";
import type { Transaction } from "../types";

import { pairHistoryFetcher } from "./pairHistoryFetcher";

export const indexPairsHistoryFetcher = async (
  indexVaultId: string,
  assetTokenAddress: string,
  indexTokenAddress: string,
  account: string
): Promise<Transaction[]> => {
  if (!account) {
    return [];
  }

  const tokenConfig = indexVaults.find(({ id }) => id === indexVaultId);
  const {
    replications = [],
    source: { chainId = 0 as ChainId },
  } = tokenConfig ?? { source: {} };

  const indexPairsConfigs = [
    { chainId, assetTokenAddress, indexTokenAddress },
  ].concat(
    replications.map((replication) => ({
      chainId: replication.chainId,
      assetTokenAddress: replication.assetTokenAddress,
      indexTokenAddress: replication.indexTokenAddress,
    }))
  );

  const historyTransactions = await Promise.all(
    indexPairsConfigs.map(
      // eslint-disable-next-line @typescript-eslint/promise-function-async
      (indexPairConfig) => {
        const replicatedProvider = chainProvidersMap[indexPairConfig.chainId];
        const replicatedRouterAddress =
          chainsMap[indexPairConfig.chainId].addresses.routerAddress;

        const queryKey = [
          indexPairConfig.assetTokenAddress,
          indexPairConfig.indexTokenAddress,
          replicatedRouterAddress,
          account,
        ];

        return queryClient.fetchQuery(
          queryKey,
          // eslint-disable-next-line @typescript-eslint/promise-function-async
          () =>
            pairHistoryFetcher(
              indexPairConfig.assetTokenAddress,
              indexPairConfig.indexTokenAddress,
              replicatedRouterAddress,
              replicatedProvider,
              account
            )
        );
      }
    )
  );

  return historyTransactions.flat();
};
