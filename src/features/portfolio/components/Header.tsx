import { indexVaults } from "../../theta-index/constants";
import { useIndexVaults } from "../../index-vault/hooks";
import { useIndexTokensQueries } from "../hooks";
import { currencyFormatter } from "../../shared/helpers";
import {
  HeaderContainer,
  MetricsContainer,
  Metric,
  HeaderButtons,
} from "../../header/components";
import { useIsMobile } from "../../shared/hooks";

export const Header = () => {
  const isMobile = useIsMobile();
  const indexVaultsIds = indexVaults.map(({ id }) => id);
  const indexVaultsQueries = useIndexVaults(indexVaultsIds);
  const indexTokensQueries = useIndexTokensQueries(indexVaultsIds);

  const balances = indexVaultsQueries.flatMap(({ data }, vaultIndex) => {
    const { data: indexTokens } = indexTokensQueries[vaultIndex];

    if (!data || !indexTokens) {
      return 0;
    }

    const { middleIndexPriceByChainId } = data;

    return indexTokens.map(({ chainId, balance }) => {
      const middleIndexPrice = middleIndexPriceByChainId[chainId];

      if (balance && middleIndexPrice) {
        return balance.mul(middleIndexPrice).toNumber();
      }

      return 0;
    });
  });

  const totalBalance = balances.reduce(
    (accumulator, current) => accumulator + current,
    0
  );

  const formattedBalance = currencyFormatter.format(totalBalance);

  return (
    <HeaderContainer>
      <MetricsContainer>
        <Metric title="Balance (USD)" value={formattedBalance} />
      </MetricsContainer>
      {!isMobile ? <HeaderButtons /> : null}
    </HeaderContainer>
  );
};
