import type { Provider } from "@ethersproject/providers";

import { IndexVaultAbi__factory as IndexVaultAbiFactory } from "../../contracts/types";

export const indexVaultFetcher = async (
  indexVaultAddress: string,
  provider: Provider
) => {
  const indexVaultContract = IndexVaultAbiFactory.connect(
    indexVaultAddress,
    provider
  );

  const name = await indexVaultContract.name();
  const symbol = await indexVaultContract.symbol();

  return {
    name,
    symbol,
  };
};
