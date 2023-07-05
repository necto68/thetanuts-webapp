import { useConnectWallet } from "@web3-onboard/react";

import type { BasicVaultConfig } from "../types";

export const useSortedBasicVaultsIds = (
  basicVaultsArray: BasicVaultConfig[]
) => {
  const [{ wallet }] = useConnectWallet();
  const currentChainId = Number.parseInt(wallet?.chains[0]?.id ?? "0", 16);

  const chainId = currentChainId;

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
