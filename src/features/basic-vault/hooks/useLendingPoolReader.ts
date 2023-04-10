import { useWallet } from "@gimmixorg/use-wallet";
import { useQuery } from "react-query";

import { QueryType } from "../../shared/types";
import { lendingPoolReaderFetcher } from "../helpers";
import { basicVaultsMap } from "../../basic/constants";
import { ChainId, chainProvidersMap, chainsMap } from "../../wallet/constants";
import { BasicVaultType } from "../../basic/types";

export const useLendingPoolReader = (basicVaultId: string) => {
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
      '0x7f36BC14e5B5c9C712c9B738563a57a784DD4D93',
      QueryType.basicVaultReader,
      basicVaultId,
      basicVaultType,
      account,
    ],

    queryFn: async () =>
      await lendingPoolReaderFetcher(
        '0x7f36BC14e5B5c9C712c9B738563a57a784DD4D93',
        basicVaultId,
        basicVaultAddress,
        account,
        provider
      ),
  });
};
