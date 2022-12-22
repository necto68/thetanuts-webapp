import { useWallet } from "@gimmixorg/use-wallet";

import type { BasicVaultConfig } from "../types";

export const useSortedBasicVaultsIds = (
  basicVaultsArray: BasicVaultConfig[]
) => {
  const { network } = useWallet();
  const chainId = network?.chainId;

  const filteredBasicVaults = Array.from(basicVaultsArray).sort((a, b) => {
    if (chainId && a.source.chainId === b.source.chainId) {
      return 0;
    }

    if (chainId && chainId === a.source.chainId) {
      return -1;
    }

    if (chainId && chainId === b.source.chainId) {
      return 1;
    }

    return 0;
  });

  return filteredBasicVaults.map(({ id }) => id);
};
