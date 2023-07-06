import { useQueries } from "react-query";
import { useWallet } from "../../wallet/hooks/useWallet";

import { chainProvidersMap, ChainId } from "../../wallet/constants";
import { QueryType } from "../../shared/types";
import { useBasicVaults } from "../../basic-vault/hooks";
import { basicHistoryFetcher } from "../helpers";
import { BasicVaultType } from "../../basic/types";

export const useBasicHistoryQueries = (basicVaultIds: string[]) => {
  const { walletAddress } = useWallet();

  const basicVaultsQueries = useBasicVaults(basicVaultIds);

  return useQueries(
    basicVaultsQueries.map(({ data }) => {
      const {
        id: basicVaultId = "",
        basicVaultType = BasicVaultType.BASIC,
        chainId = ChainId.ETHEREUM,
        basicVaultAddress = "",
      } = data ?? {};

      const provider = chainProvidersMap[chainId];

      return {
        queryKey: [
          QueryType.basicHistory,
          basicVaultId,
          basicVaultType,
          basicVaultAddress,
          walletAddress,
        ],

        queryFn: async () =>
          await basicHistoryFetcher(
            basicVaultId,
            basicVaultType,
            basicVaultAddress,
            provider,
            walletAddress
          ),

        enabled: Boolean(data),
      };
    })
  );
};
