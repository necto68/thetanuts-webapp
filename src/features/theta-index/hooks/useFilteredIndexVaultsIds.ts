import { useWallet } from "@gimmixorg/use-wallet";

import { indexVaults } from "../constants";

export const useFilteredIndexVaultsIds = () => {
  const { network } = useWallet();
  const chainId = network?.chainId;

  const filteredIndexVaults = indexVaults.filter(({ source }) =>
    chainId ? source.chainId === chainId : true
  );

  return filteredIndexVaults.map(({ id }) => id);
};
