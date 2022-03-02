import { Metric } from "../../shared/components";

import { PortfolioLayout } from "./PortfolioLayout";
import { Container, MetricsContainer } from "./PortfolioPage.styles";

export const PortfolioPage = () => (
  <Container>
    <MetricsContainer>
      <Metric title="Balance (USD)" value="$461,322.38" />
    </MetricsContainer>
    <PortfolioLayout />
  </Container>
);
