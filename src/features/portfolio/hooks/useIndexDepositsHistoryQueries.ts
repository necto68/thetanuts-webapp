import { useQueries } from "react-query";
import { useWallet } from "@gimmixorg/use-wallet";

import { indexDepositsHistoryFetcher } from "../helpers";
import { indexVaultsMap } from "../../theta-index/constants";
import { chainsMap, chainProvidersMap } from "../../wallet/constants";
import { useIndexVaults } from "../../index-vault/hooks";

export const useIndexDepositsHistoryQueries = (indexVaultIds: string[]) => {
  const { account = "" } = useWallet();

  const indexVaultsQueries = useIndexVaults(indexVaultIds);

  return useQueries(
    indexVaultsQueries.map(({ data }) => {
      const {
        id = "",
        chainId = 1,
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
          id,
          assetTokenAddress,
          indexTokenAddress,
          indexVaultAddress,
          directDepositorAddress,
          account,
        ],

        queryFn: async () =>
          await indexDepositsHistoryFetcher(
            assetTokenAddress,
            indexTokenAddress,
            indexVaultAddress,
            directDepositorAddress,
            provider,
            account
          ),

        enabled: Boolean(data),
      };
    })
  );
};
