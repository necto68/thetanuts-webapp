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

export const Header = () => {
  const indexVaultsIds = indexVaults.map(({ id }) => id);
  const indexVaultsQueries = useIndexVaults(indexVaultsIds);
  const indexTokensQueries = useIndexTokensQueries(indexVaultsIds);

  const balances = indexVaultsQueries.flatMap(({ data }, vaultIndex) => {
    const { data: indexTokens } = indexTokensQueries[vaultIndex];

    if (!data || !indexTokens) {
      return 0;
    }

    const { indexPrice } = data;

    return indexTokens.map(
      (token) => token.balance?.mul(indexPrice).toNumber() ?? 0
    );
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
      <HeaderButtons />
    </HeaderContainer>
  );
};
