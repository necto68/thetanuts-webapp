import { useQueries } from "react-query";

import { useWallet } from "../../wallet/hooks/useWallet";
import { QueryType } from "../../shared/types";
import { longVaultReaderFetcher } from "../helpers";
import { basicVaultsMap } from "../../basic/constants";
import { ChainId, chainProvidersMap, chainsMap } from "../../wallet/constants";
import { BasicVaultType } from "../../basic/types";

export const useLongVaultsReaders = (basicVaultIds: string[]) => {
  const { walletAddress } = useWallet();

  const readersConfigs = basicVaultIds.map((basicVaultId) => {
    const basicVaultConfig = basicVaultsMap[basicVaultId];

    const { basicVaultType = BasicVaultType.BASIC } = basicVaultConfig ?? {};
    const { chainId = ChainId.ETHEREUM, basicVaultAddress = "" } =
      basicVaultConfig?.source ?? {};

    const {
      addresses: {
        longVaultPositionManagerAddress,
        longVaultProtocolDataProviderAddress,
      },
    } = chainsMap[chainId];

    const provider = chainProvidersMap[chainId];

    return {
      basicVaultId,
      basicVaultType,
      basicVaultAddress,
      longVaultPositionManagerAddress,
      longVaultProtocolDataProviderAddress,
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
        longVaultProtocolDataProviderAddress,
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
            longVaultProtocolDataProviderAddress,
            walletAddress,
            provider
          ),

        enabled: basicVaultType === BasicVaultType.LONG,
      })
    )
  );
};
