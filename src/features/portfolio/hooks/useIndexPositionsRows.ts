import { indexVaults } from "../../theta-index/constants";
import { useIndexVaults } from "../../index-vault/hooks";
import type { IndexVaultRow } from "../types";
import { useUnclaimedBalanceQueries } from "../../index-vault-modal/hooks";
import { ChainId } from "../../wallet/constants";
import { VaultModalType } from "../../root/types";

import { useIndexTokensQueries } from "./useIndexTokensQueries";

export const useIndexPositionsRows = (): (IndexVaultRow | undefined)[] => {
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
      type,
      assetSymbol,
      collateralSymbol,
      middleIndexPriceByChainId,
      totalPercentageYields: { annualPercentageYield },
    } = data;

    return indexTokens.map(({ symbol, balance, tokenAddress, chainId }) => ({
      id,
      vaultType: VaultModalType.index,
      type,
      assetSymbol,
      collateralSymbol,
      assetPrice: middleIndexPriceByChainId[chainId] ?? 0,
      annualPercentageYield,
      symbol,
      balance,
      chainId,
      unclaimed: unclaimed?.[tokenAddress] ?? false,
      withdrawId: withdrawId ?? 0,
    }));
  });
};
