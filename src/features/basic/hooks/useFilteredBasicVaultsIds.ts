import { useWallet } from "../../wallet/hooks/useWallet";
import type { BasicVaultConfig } from "../types";

export const useFilteredBasicVaultsIds = (
  basicVaultsArray: BasicVaultConfig[]
) => {
  const { walletChainId } = useWallet();

  const filteredBasicVaults = basicVaultsArray.filter(
    ({ source }) => source.chainId === walletChainId
  );

  return filteredBasicVaults.map(({ id }) => id);
};
