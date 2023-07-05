import { useConnectWallet } from "@web3-onboard/react";

import type { BasicVaultConfig } from "../types";

export const useFilteredBasicVaultsIds = (
  basicVaultsArray: BasicVaultConfig[]
) => {
  const [{ wallet }] = useConnectWallet();
  const currentChainId = Number.parseInt(wallet?.chains[0]?.id ?? "0", 16);

  const chainId = currentChainId;

  const filteredBasicVaults = basicVaultsArray.filter(({ source }) =>
    chainId ? source.chainId === chainId : true
  );

  return filteredBasicVaults.map(({ id }) => id);
};
