import { useQuery } from "react-query";

import { QueryType } from "../../shared/types";
import { longVaultsMap } from "../../basic/constants";
import { BasicVaultType } from "../../basic/types";
import { ChainId, chainProvidersMap, chainsMap } from "../../wallet/constants";
import { longOptionClosePositionReaderFetcher } from "../helpers";
import { useWallet } from "../../wallet/hooks";

export const useLongOptionClosePositionReader = (
  basicVaultId: string,
  inputValue: string
) => {
  const { walletAddress } = useWallet();

  const longVaultConfig = longVaultsMap[basicVaultId];

  const { basicVaultType = BasicVaultType.BASIC } = longVaultConfig ?? {};
  const { chainId = ChainId.ETHEREUM, basicVaultAddress = "" } =
    longVaultConfig?.source ?? {};

  const provider = chainProvidersMap[chainId];

  const {
    addresses: { longVaultPositionManagerAddress, quoterAddress },
  } = chainsMap[chainId];

  return useQuery({
    queryKey: [
      QueryType.longOptionClosePositionReader,
      basicVaultId,
      basicVaultType,
      walletAddress,
      inputValue,
    ],

    queryFn: async () =>
      await longOptionClosePositionReaderFetcher(
        basicVaultId,
        basicVaultType,
        basicVaultAddress,
        longVaultPositionManagerAddress,
        quoterAddress,
        walletAddress,
        provider,
        inputValue
      ),

    enabled: basicVaultType === BasicVaultType.LONG,
    staleTime: Number.POSITIVE_INFINITY,
  });
};
