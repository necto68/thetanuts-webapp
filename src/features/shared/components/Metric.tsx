import type { FC } from "react";

import { Container, MetricTitle, MetricValue } from "./Metric.styles";

interface MetricProps {
  title: string;
  value: string;
}

export const Metric: FC<MetricProps> = ({ title, value }) => (
  <Container>
    <MetricTitle>{title}</MetricTitle>
    <MetricValue>{value}</MetricValue>
  </Container>
);
