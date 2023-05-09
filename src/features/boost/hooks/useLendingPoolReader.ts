import { useWallet } from "@gimmixorg/use-wallet";
import { useQuery } from "react-query";

import { QueryType } from "../../shared/types";
import { lendingPoolReaderFetcher } from "../../basic-vault/helpers";
import { basicVaultsMap } from "../../basic/constants";
import { ChainId, chainProvidersMap } from "../../wallet/constants";
import { BasicVaultType } from "../../basic/types";
import { lendingPoolAddresses } from "../constants";

export const useLendingPoolReader = (basicVaultId: string) => {
  const { account = "" } = useWallet();

  const basicVaultConfig = basicVaultsMap[basicVaultId];

  const { basicVaultType = BasicVaultType.BASIC } = basicVaultConfig ?? {};
  const { chainId = ChainId.ETHEREUM, basicVaultAddress = "" } =
    basicVaultConfig?.source ?? {};

  const provider = chainProvidersMap[chainId];

  return useQuery({
    queryKey: [
      QueryType.lendingPoolReader,
      basicVaultId,
      basicVaultType,
      account,
    ],

    queryFn: async () =>
      await lendingPoolReaderFetcher(
        lendingPoolAddresses[chainId],
        basicVaultId,
        basicVaultAddress,
        account,
        provider
      ),
  });
};
