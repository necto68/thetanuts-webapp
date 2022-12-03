import { useWallet } from "@gimmixorg/use-wallet";

import type { BasicVaultConfig } from "../types";

export const useFilteredBasicVaultsIds = (
  basicVaultsArray: BasicVaultConfig[]
) => {
  const { network } = useWallet();
  const chainId = network?.chainId;

  const filteredBasicVaults = basicVaultsArray.filter(({ source }) =>
    chainId ? source.chainId === chainId : true
  );

  return filteredBasicVaults.map(({ id }) => id);
};
