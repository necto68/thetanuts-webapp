import { useQueries } from "react-query";
import { useWallet } from "@gimmixorg/use-wallet";

import { chainProvidersMap, ChainId } from "../../wallet/constants";
import { QueryType } from "../../shared/types";
import { useBasicVaults } from "../../basic-vault/hooks";
import { basicHistoryFetcher } from "../helpers";

export const useBasicHistoryQueries = (basicVaultIds: string[]) => {
  const { account = "" } = useWallet();

  const basicVaultsQueries = useBasicVaults(basicVaultIds);

  return useQueries(
    basicVaultsQueries.map(({ data }) => {
      const {
        id: basicVaultId = "",
        chainId = ChainId.ETHEREUM,
        basicVaultAddress = "",
      } = data ?? {};

      const provider = chainProvidersMap[chainId];

      return {
        queryKey: [
          QueryType.basicHistory,
          basicVaultId,
          basicVaultAddress,
          account,
        ],

        queryFn: async () =>
          await basicHistoryFetcher(
            basicVaultId,
            basicVaultAddress,
            provider,
            account
          ),

        enabled: Boolean(data),
      };
    })
  );
};
