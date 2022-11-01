import { useWallet } from "@gimmixorg/use-wallet";
import { useQueries } from "react-query";

import { QueryType } from "../../shared/types";
import { lendingMarketVaultReaderFetcher } from "../helpers";
import { basicVaultsMap } from "../../basic/constants";
import { ChainId, chainProvidersMap, chainsMap } from "../../wallet/constants";
import { BasicVaultType } from "../../basic/types";

export const useLendingMarketVaultsReaders = (basicVaultIds: string[]) => {
  const { account = "" } = useWallet();

  const readersConfigs = basicVaultIds.map((basicVaultId) => {
    const basicVaultConfig = basicVaultsMap[basicVaultId];

    const { basicVaultType = BasicVaultType.BASIC } = basicVaultConfig ?? {};
    const { chainId = ChainId.ETHEREUM, basicVaultAddress = "" } =
      basicVaultConfig?.source ?? {};

    const {
      addresses: { lendingMarketPositionManagerAddress },
    } = chainsMap[chainId];

    const provider = chainProvidersMap[chainId];

    return {
      basicVaultId,
      basicVaultType,
      basicVaultAddress,
      lendingMarketPositionManagerAddress,
      provider,
    };
  });

  return useQueries(
    readersConfigs.map(
      ({
        basicVaultId,
        basicVaultType,
        basicVaultAddress,
        lendingMarketPositionManagerAddress,
        provider,
      }) => ({
        queryKey: [
          QueryType.lendingMarketVaultReader,
          basicVaultId,
          basicVaultType,
          account,
        ],

        queryFn: async () =>
          await lendingMarketVaultReaderFetcher(
            basicVaultId,
            basicVaultType,
            basicVaultAddress,
            lendingMarketPositionManagerAddress,
            account,
            provider
          ),

        enabled: basicVaultType === BasicVaultType.LENDING_MARKET,
      })
    )
  );
};
