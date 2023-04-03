import { useWallet } from "@gimmixorg/use-wallet";
import { useQueries } from "react-query";

import { QueryType } from "../../shared/types";
import { longVaultReaderFetcher } from "../helpers";
import { longVaultsMap } from "../../basic/constants";
import { ChainId, chainProvidersMap, chainsMap } from "../../wallet/constants";
import { BasicVaultType } from "../../basic/types";

export const useLongVaultsReaders = (basicVaultIds: string[]) => {
  const { account = "" } = useWallet();

  const readersConfigs = basicVaultIds.map((basicVaultId) => {
    const basicVaultConfig = longVaultsMap[basicVaultId];

    const {
      basicVaultType = BasicVaultType.BASIC,
      protocolDataProviderAddress = "",
    } = basicVaultConfig ?? {};
    const { chainId = ChainId.ETHEREUM, basicVaultAddress = "" } =
      basicVaultConfig?.source ?? {};

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
          account,
        ],

        queryFn: async () =>
          await longVaultReaderFetcher(
            basicVaultId,
            basicVaultType,
            basicVaultAddress,
            longVaultPositionManagerAddress,
            protocolDataProviderAddress,
            account,
            provider
          ),

        enabled: basicVaultType === BasicVaultType.LONG,
      })
    )
  );
};
