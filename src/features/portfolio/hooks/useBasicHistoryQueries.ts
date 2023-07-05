import { useQueries } from "react-query";
import { useConnectWallet } from "@web3-onboard/react";

import { chainProvidersMap, ChainId } from "../../wallet/constants";
import { QueryType } from "../../shared/types";
import { useBasicVaults } from "../../basic-vault/hooks";
import { basicHistoryFetcher } from "../helpers";
import { BasicVaultType } from "../../basic/types";

export const useBasicHistoryQueries = (basicVaultIds: string[]) => {
  const [{ wallet }] = useConnectWallet();
  const walletAddress = wallet?.accounts[0]?.address ?? "";

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
