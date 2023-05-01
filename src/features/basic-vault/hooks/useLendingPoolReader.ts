import { useWallet } from "@gimmixorg/use-wallet";
import { useQuery } from "react-query";

import { QueryType } from "../../shared/types";
import { lendingPoolReaderFetcher } from "../helpers";
import { basicVaultsMap } from "../../basic/constants";
import { ChainId, chainProvidersMap } from "../../wallet/constants";
import { BasicVaultType } from "../../basic/types";
import { LPOOL_ADDRESS } from "../../basic-vault-modal/constants";

export const useLendingPoolReader = (basicVaultId: string) => {
  const { account = "" } = useWallet();

  const basicVaultConfig = basicVaultsMap[basicVaultId];

  const { basicVaultType = BasicVaultType.BASIC } = basicVaultConfig ?? {};
  const { chainId = ChainId.ETHEREUM, basicVaultAddress = "" } =
    basicVaultConfig?.source ?? {};

  const provider = chainProvidersMap[chainId];

  return useQuery({
    queryKey: [
      LPOOL_ADDRESS,
      QueryType.basicVaultReader,
      basicVaultId,
      basicVaultType,
      account,
    ],

    queryFn: async () =>
      await lendingPoolReaderFetcher(
        LPOOL_ADDRESS,
        basicVaultId,
        basicVaultAddress,
        account,
        provider
      ),
  });
};
