import { useWallet } from "@gimmixorg/use-wallet";

import type { BasicVaultConfig } from "../types";

export const useSortedBasicVaultsIds = (
  basicVaultsArray: BasicVaultConfig[]
) => {
  const { network } = useWallet();
  const chainId = network?.chainId;

  const filteredBasicVaults = Array.from(basicVaultsArray).sort(
    ({ source }) => {
      if (chainId) {
        return source.chainId === chainId ? -1 : 1;
      }

      return 0;
    }
  );

  return filteredBasicVaults.map(({ id }) => id);
};
