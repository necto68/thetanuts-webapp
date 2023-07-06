import { useQueries } from "react-query";

import { useWallet } from "../../wallet/hooks/useWallet";
import { QueryType } from "../../shared/types";
import { longVaultReaderFetcher } from "../helpers";
import { longVaultsMap } from "../../basic/constants";
import { ChainId, chainProvidersMap, chainsMap } from "../../wallet/constants";
import { BasicVaultType } from "../../basic/types";

export const useLongVaultsReaders = (basicVaultIds: string[]) => {
  const { walletAddress } = useWallet();

  const readersConfigs = basicVaultIds.map((basicVaultId) => {
    const longVaultConfig = longVaultsMap[basicVaultId];

    const {
      basicVaultType = BasicVaultType.BASIC,
      protocolDataProviderAddress = "",
    } = longVaultConfig ?? {};
    const { chainId = ChainId.ETHEREUM, basicVaultAddress = "" } =
      longVaultConfig?.source ?? {};

    const {
      addresses: { longVaultPositionManagerAddress },
    } = chainsMap[chainId];

    const provider = chainProvidersMap[chainId];

    return {
      basicVaultId,
      basicVaultType,
      basicVaultAddress,
      longVaultPositionManagerAddress,
      protocolDataProviderAddress,
      provider,
    };
  });

  return useQueries(
    readersConfigs.map(
      ({
        basicVaultId,
        basicVaultType,
        basicVaultAddress,
        longVaultPositionManagerAddress,
        protocolDataProviderAddress,
        provider,
      }) => ({
        queryKey: [
          QueryType.longVaultReader,
          basicVaultId,
          basicVaultType,
          walletAddress,
        ],

        queryFn: async () =>
          await longVaultReaderFetcher(
            basicVaultId,
            basicVaultType,
            basicVaultAddress,
            longVaultPositionManagerAddress,
            protocolDataProviderAddress,
            walletAddress,
            provider
          ),

        enabled: basicVaultType === BasicVaultType.LONG,
      })
    )
  );
};
