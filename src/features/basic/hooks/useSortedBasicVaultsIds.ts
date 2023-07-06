import { useWallet } from "../../wallet/hooks/useWallet";
import type { BasicVaultConfig } from "../types";

export const useSortedBasicVaultsIds = (
  basicVaultsArray: BasicVaultConfig[]
) => {
  const { walletChainId } = useWallet();

  const chainId = walletChainId;

  const filteredBasicVaults = Array.from(basicVaultsArray).sort((a, b) => {
    if (a.source.chainId === b.source.chainId) {
      return 0;
    }

    if (chainId === a.source.chainId) {
      return -1;
    }

    if (chainId === b.source.chainId) {
      return 1;
    }

    return 0;
  });

  return filteredBasicVaults.map(({ id }) => id);
};
