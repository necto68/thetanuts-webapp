import { indexVaults } from "../../theta-index/constants";
import { useIndexVaults } from "../../index-vault/hooks";
import type { IndexTokenRow } from "../types";

import { useIndexTokensQueries } from "./useIndexTokensQueries";

export const useIndexPositionsRows = (): (IndexTokenRow | undefined)[] => {
  const indexVaultsIds = indexVaults.map(({ id }) => id);
  const indexVaultsQueries = useIndexVaults(indexVaultsIds);
  const indexTokensQueries = useIndexTokensQueries(indexVaultsIds);

  return indexVaultsQueries.flatMap(({ data }, vaultIndex) => {
    const { data: indexTokens } = indexTokensQueries[vaultIndex];

    if (!data || !indexTokens) {
      return undefined;
    }

    const {
      id,
      assetSymbol,
      indexPrice,
      totalPercentageYields: { annualPercentageYield },
      supportedChainIds,
    } = data;

    return indexTokens.map(({ symbol, balance, tokenAddress }, index) => ({
      id,

      // TODO: add more different vault types
      vaultType: "THETA-INDEX",
      assetSymbol,
      indexPrice,
      annualPercentageYield,
      symbol,
      balance,
      tokenAddress,
      chainId: supportedChainIds[index],
    }));
  });
};
