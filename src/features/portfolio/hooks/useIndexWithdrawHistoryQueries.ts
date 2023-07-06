import { useQueries } from "react-query";

import { useWallet } from "../../wallet/hooks/useWallet";
import { indexVaultsMap } from "../../theta-index/constants";
import { chainsMap, chainProvidersMap, ChainId } from "../../wallet/constants";
import { useIndexVaults } from "../../index-vault/hooks";
import { QueryType } from "../../shared/types";
import { indexWithdrawHistoryFetcher } from "../helpers/indexWithdrawHistoryFetcher";

export const useIndexWithdrawHistoryQueries = (indexVaultIds: string[]) => {
  const { walletAddress } = useWallet();

  const indexVaultsQueries = useIndexVaults(indexVaultIds);

  return useQueries(
    indexVaultsQueries.map(({ data }) => {
      const {
        id = "",
        chainId = ChainId.ETHEREUM,
        assetTokenAddress = "",
        indexTokenAddress = "",
      } = data ?? {};

      const tokenConfig = indexVaultsMap[id];

      const {
        source: { indexVaultAddress = "" },
      } = tokenConfig ?? { source: {} };

      const { directWithdrawalAddress } = chainsMap[chainId].addresses;
      const provider = chainProvidersMap[chainId];

      return {
        queryKey: [
          QueryType.indexWithdrawalsHistory,
          id,
          assetTokenAddress,
          indexTokenAddress,
          indexVaultAddress,
          directWithdrawalAddress,
          walletAddress,
        ],

        queryFn: async () =>
          await indexWithdrawHistoryFetcher(
            assetTokenAddress,
            indexTokenAddress,
            indexVaultAddress,
            directWithdrawalAddress,
            provider,
            walletAddress
          ),

        enabled: Boolean(data),
      };
    })
  );
};
