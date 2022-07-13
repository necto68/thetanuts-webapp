import { useWallet } from "@gimmixorg/use-wallet";
import { useQuery } from "react-query";

import { QueryType } from "../../shared/types";
import { basicVaultReaderFetcher } from "../helpers";
import { basicVaultsMap } from "../../basic/constants";
import { ChainId, chainProvidersMap, chainsMap } from "../../wallet/constants";

export const useBasicVaultReader = (basicVaultId: string) => {
  const { account = "" } = useWallet();

  const { chainId = ChainId.ETHEREUM, basicVaultAddress = "" } =
    basicVaultsMap[basicVaultId]?.source ?? {};

  const {
    addresses: { basicVaultReaderAddress },
  } = chainsMap[chainId];

  const provider = chainProvidersMap[chainId];

  return useQuery({
    queryKey: [QueryType.basicVaultReader, basicVaultId, account],

    queryFn: async () =>
      await basicVaultReaderFetcher(
        basicVaultId,
        basicVaultAddress,
        basicVaultReaderAddress,
        account,
        provider
      ),
  });
};
