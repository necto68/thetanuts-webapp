import { Container, Metric, MetricTitle, MetricValue } from "./Metrics.styles";

export const Metrics = () => (
  <Container>
    <Metric>
      <MetricTitle>TVL</MetricTitle>
      <MetricValue>$ 1,000,000</MetricValue>
    </Metric>
    <Metric>
      <MetricTitle>Notional Sold</MetricTitle>
      <MetricValue>$ 1,000,000</MetricValue>
    </Metric>
    <Metric>
      <MetricTitle>Premium Earned</MetricTitle>
      <MetricValue>$ 1,000,000</MetricValue>
    </Metric>
  </Container>
);
