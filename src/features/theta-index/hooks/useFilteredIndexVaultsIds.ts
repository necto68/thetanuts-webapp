import { useConnectWallet } from "@web3-onboard/react";

import { indexVaults } from "../constants";

export const useFilteredIndexVaultsIds = () => {
  const [{ wallet }] = useConnectWallet();
  const currentChainId = Number.parseInt(wallet?.chains[0]?.id ?? "0", 16);

  const chainId = currentChainId;

  const filteredIndexVaults = indexVaults.filter(({ source, replications }) =>
    chainId
      ? source.chainId === chainId ||
        replications.some((replication) => replication.chainId === chainId)
      : true
  );

  return filteredIndexVaults.map(({ id }) => id);
};
