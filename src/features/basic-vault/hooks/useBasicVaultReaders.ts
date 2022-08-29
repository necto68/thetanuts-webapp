import { useWallet } from "@gimmixorg/use-wallet";
import { useQueries } from "react-query";

import { QueryType } from "../../shared/types";
import { basicVaultReaderFetcher } from "../helpers";
import { basicVaultsMap } from "../../basic/constants";
import { ChainId, chainProvidersMap, chainsMap } from "../../wallet/constants";

export const useBasicVaultReaders = (basicVaultIds: string[]) => {
  const { account = "" } = useWallet();

  return useQueries(
    basicVaultIds.map((basicVaultId) => {
      const { chainId = ChainId.ETHEREUM, basicVaultAddress = "" } =
        basicVaultsMap[basicVaultId]?.source ?? {};

      const {
        addresses: { basicVaultReaderAddress },
      } = chainsMap[chainId];

      const provider = chainProvidersMap[chainId];

      return {
        queryKey: [QueryType.basicVaultReader, basicVaultId, account],

        queryFn: async () =>
          await basicVaultReaderFetcher(
            basicVaultId,
            basicVaultAddress,
            basicVaultReaderAddress,
            account,
            provider
          ),
      };
    })
  );
};
