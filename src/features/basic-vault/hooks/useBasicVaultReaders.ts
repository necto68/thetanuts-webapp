import { useWallet } from "../../wallet/hooks/useWallet";
import { useQueries } from "react-query";

import { QueryType } from "../../shared/types";
import { basicVaultReaderFetcher } from "../helpers";
import { basicVaultsMap } from "../../basic/constants";
import { ChainId, chainProvidersMap, chainsMap } from "../../wallet/constants";
import { BasicVaultType } from "../../basic/types";

export const useBasicVaultReaders = (basicVaultIds: string[]) => {
  const { walletAddress } = useWallet();

  return useQueries(
    basicVaultIds.map((basicVaultId) => {
      const basicVaultConfig = basicVaultsMap[basicVaultId];

      const { basicVaultType = BasicVaultType.BASIC } = basicVaultConfig ?? {};
      const { chainId = ChainId.ETHEREUM, basicVaultAddress = "" } =
        basicVaultConfig?.source ?? {};

      const {
        addresses: { basicVaultReaderAddress },
      } = chainsMap[chainId];

      const provider = chainProvidersMap[chainId];

      return {
        queryKey: [
          QueryType.basicVaultReader,
          basicVaultId,
          basicVaultType,
          walletAddress,
        ],

        queryFn: async () =>
          await basicVaultReaderFetcher(
            basicVaultId,
            basicVaultType,
            basicVaultAddress,
            basicVaultReaderAddress,
            walletAddress,
            provider
          ),
      };
    })
  );
};
