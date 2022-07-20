import { indexVaults } from "../../theta-index/constants";
import { useIndexVaults } from "../../index-vault/hooks";
import type { IndexTokenRow } from "../types";
import { useUnclaimedBalanceQueries } from "../../index-vault-modal/hooks";
import { ChainId } from "../../wallet/constants";

import { useIndexTokensQueries } from "./useIndexTokensQueries";

export const useIndexPositionsRows = (): (IndexTokenRow | undefined)[] => {
  const indexVaultsIds = indexVaults.map(({ id }) => id);
  const indexVaultsQueries = useIndexVaults(indexVaultsIds);
  const indexTokensQueries = useIndexTokensQueries(indexVaultsIds);
  const chainIds = indexVaultsQueries.map(
    ({ data }) => data?.chainId ?? ChainId.ETHEREUM
  );
  const unclaimedBalanceQueries = useUnclaimedBalanceQueries(chainIds);

  return indexVaultsQueries.flatMap(({ data }, vaultIndex) => {
    const { data: indexTokens } = indexTokensQueries[vaultIndex];

    if (!data || !indexTokens) {
      return undefined;
    }

    const { data: unclaimedByIndexToken } = unclaimedBalanceQueries[vaultIndex];
    const [unclaimed, withdrawId] = unclaimedByIndexToken ?? [];

    const {
      id,
      assetSymbol,
      middleIndexPriceByChainId,
      totalPercentageYields: { annualPercentageYield },
    } = data;

    return indexTokens.map(({ symbol, balance, tokenAddress, chainId }) => ({
      id,

      // TODO: add more different vault types
      productType: "THETA-INDEX",
      assetSymbol,
      middleIndexPrice: middleIndexPriceByChainId[chainId] ?? 0,
      annualPercentageYield,
      symbol,
      balance,
      tokenAddress,
      chainId,
      unclaimed: unclaimed?.[tokenAddress] ?? false,
      withdrawId: withdrawId ?? 0,
    }));
  });
};
