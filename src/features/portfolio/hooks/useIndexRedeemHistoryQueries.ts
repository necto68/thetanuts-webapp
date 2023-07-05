import { useQueries } from "react-query";
import { useConnectWallet } from "@web3-onboard/react";

import { indexVaultsMap } from "../../theta-index/constants";
import { chainsMap, chainProvidersMap, ChainId } from "../../wallet/constants";
import { useIndexVaults } from "../../index-vault/hooks";
import { QueryType } from "../../shared/types";
import { indexRedeemHistoryFetcher } from "../helpers/indexRedeemHistoryFetcher";

export const useIndexRedeemHistoryQueries = (indexVaultIds: string[]) => {
  const [{ wallet }] = useConnectWallet();
  const walletAddress = wallet?.accounts[0]?.address ?? "";

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
          QueryType.indexRedeemsHistory,
          id,
          assetTokenAddress,
          indexTokenAddress,
          indexVaultAddress,
          directWithdrawalAddress,
          walletAddress,
        ],

        queryFn: async () =>
          await indexRedeemHistoryFetcher(
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
