import { useWallet } from "@gimmixorg/use-wallet";
import { useQuery } from "react-query";

import { QueryType } from "../../shared/types";
import { longVaultsMap } from "../../basic/constants";
import { BasicVaultType } from "../../basic/types";
import { ChainId, chainProvidersMap, chainsMap } from "../../wallet/constants";
import { longOptionReaderFetcher } from "../helpers";

export const useLongOptionReader = (
  basicVaultId: string,
  inputValue: string
) => {
  const { account = "" } = useWallet();

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
      QueryType.longOptionReader,
      basicVaultId,
      basicVaultType,
      account,
      inputValue,
    ],

    queryFn: async () =>
      await longOptionReaderFetcher(
        basicVaultId,
        basicVaultType,
        basicVaultAddress,
        longVaultPositionManagerAddress,
        quoterAddress,
        account,
        provider,
        inputValue
      ),

    enabled: basicVaultType === BasicVaultType.LONG,
  });
};
