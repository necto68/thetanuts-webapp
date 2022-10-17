import { useWallet } from "@gimmixorg/use-wallet";
import { useQuery } from "react-query";

import { QueryType } from "../../shared/types";
import { basicVaultReaderFetcher } from "../helpers";
import { basicVaultsMap } from "../../basic/constants";
import { ChainId, chainProvidersMap, chainsMap } from "../../wallet/constants";
import { BasicVaultType } from "../../basic/types";

export const useBasicVaultReader = (basicVaultId: string) => {
  const { account = "" } = useWallet();

  const basicVaultConfig = basicVaultsMap[basicVaultId];

  const { basicVaultType = BasicVaultType.BASIC } = basicVaultConfig ?? {};
  const { chainId = ChainId.ETHEREUM, basicVaultAddress = "" } =
    basicVaultConfig?.source ?? {};

  const {
    addresses: { basicVaultReaderAddress },
  } = chainsMap[chainId];

  const provider = chainProvidersMap[chainId];

  return useQuery({
    queryKey: [
      QueryType.basicVaultReader,
      basicVaultId,
      basicVaultType,
      account,
    ],

    queryFn: async () =>
      await basicVaultReaderFetcher(
        basicVaultId,
        basicVaultType,
        basicVaultAddress,
        basicVaultReaderAddress,
        account,
        provider
      ),
  });
};
