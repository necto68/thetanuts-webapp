import { Metric } from "../../shared/components";
import { indexVaults } from "../../theta-index/constants";
import { useIndexVaults } from "../../index-vault/hooks/useIndexVaults";
import { useIndexTokensQueries } from "../hooks";
import { currencyFormatter } from "../../shared/helpers";

import { Container, MetricsContainer } from "./PortfolioPage.styles";
import { PortfolioLayout } from "./PortfolioLayout";

export const PortfolioPage = () => {
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
    <Container>
      <MetricsContainer>
        <Metric title="Balance (USD)" value={formattedBalance} />
      </MetricsContainer>
      <PortfolioLayout />
    </Container>
  );
};
