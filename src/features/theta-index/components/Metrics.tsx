import { Metric } from "../../shared/components";

import { Container } from "./Metrics.styles";

export const Metrics = () => (
  <Container>
    <Metric title="TVL" value="$1,000,000.00" />
    <Metric title="Notional Sold" value="$1,000,000.00" />
    <Metric title="Premium Earned" value="$1,000,000.00" />
  </Container>
);
