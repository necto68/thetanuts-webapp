import { useQueries } from "react-query";
import { useWallet } from "@gimmixorg/use-wallet";
import { useMemo } from "react";

import { ChainId } from "../../wallet/constants";
import { vaultsMap } from "../constants";
import { vaultFetcher } from "../helpers";
import type { Vault } from "../types";

export const useVaults = (): Vault[] => {
  const { account, network, provider } = useWallet();
  const chainId = network?.chainId ?? ChainId.ETHEREUM;
  const localVaults = vaultsMap[chainId]?.vaults ?? [];

  const queries = useQueries(
    localVaults.map((vault) => ({
      queryKey: [vault.address, chainId],
      queryFn: async () => await vaultFetcher(vault.address, chainId, provider),
      placeholderData: vault,
      enabled: Boolean(account && provider),
    }))
  );

  return useMemo(() => queries.map(({ data }) => data as Vault), [queries]);
};
