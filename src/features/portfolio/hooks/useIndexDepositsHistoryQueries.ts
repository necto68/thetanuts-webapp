import { useQueries } from "react-query";
import { useConnectWallet } from "@web3-onboard/react";

import { indexDepositsHistoryFetcher } from "../helpers";
import { indexVaultsMap } from "../../theta-index/constants";
import { chainsMap, chainProvidersMap, ChainId } from "../../wallet/constants";
import { useIndexVaults } from "../../index-vault/hooks";
import { QueryType } from "../../shared/types";

export const useIndexDepositsHistoryQueries = (indexVaultIds: string[]) => {
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

      const { directDepositorAddress } = chainsMap[chainId].addresses;
      const provider = chainProvidersMap[chainId];

      return {
        queryKey: [
          QueryType.indexDepositsHistory,
          id,
          assetTokenAddress,
          indexTokenAddress,
          indexVaultAddress,
          directDepositorAddress,
          walletAddress,
        ],

        queryFn: async () =>
          await indexDepositsHistoryFetcher(
            assetTokenAddress,
            indexTokenAddress,
            indexVaultAddress,
            directDepositorAddress,
            provider,
            walletAddress
          ),

        enabled: Boolean(data),
      };
    })
  );
};
