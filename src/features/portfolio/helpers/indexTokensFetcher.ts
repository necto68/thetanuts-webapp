import type { ChainId } from "../../wallet/constants";
import { chainProvidersMap, chainsMap } from "../../wallet/constants";
import { queryClient } from "../../shared/helpers";
import { tokenFetcher } from "../../index-vault-modal/helpers";
import { indexVaults } from "../../theta-index/constants";
import type { Token } from "../../index-vault-modal/types";

export const indexTokensFetcher = async (
  indexVaultId: string,
  indexTokenAddress: string,
  account: string
): Promise<Token[]> => {
  const tokenConfig = indexVaults.find(({ id }) => id === indexVaultId);
  const {
    replications = [],
    source: { chainId = 0 as ChainId },
  } = tokenConfig ?? { source: {} };

  const indexTokensConfigs = [{ chainId, indexTokenAddress }].concat(
    replications.map((replication) => ({
      chainId: replication.chainId,
      indexTokenAddress: replication.indexTokenAddress,
    }))
  );

  return await Promise.all(
    indexTokensConfigs.map(
      // eslint-disable-next-line @typescript-eslint/promise-function-async
      (indexTokenConfig) => {
        const replicatedProvider = chainProvidersMap[indexTokenConfig.chainId];
        const replicatedRouterAddress =
          chainsMap[indexTokenConfig.chainId].addresses.routerAddress;

        const queryKey = [
          indexTokenConfig.indexTokenAddress,
          replicatedRouterAddress,
          account,
        ];

        return queryClient.fetchQuery(
          queryKey,
          // eslint-disable-next-line @typescript-eslint/promise-function-async
          () =>
            tokenFetcher(
              indexTokenConfig.indexTokenAddress,
              replicatedRouterAddress,
              replicatedProvider,
              account
            )
        );
      }
    )
  );
};
