import type { FC } from "react";

import { SkeletonBox } from "./SkeletonBox";
import { Container, MetricTitle, MetricValue } from "./Metric.styles";

interface MetricProps {
  title: string;
  value: string | undefined;
}

export const Metric: FC<MetricProps> = ({ title, value }) => (
  <Container>
    <MetricTitle>{title}</MetricTitle>
    {typeof value === "undefined" ? (
      <SkeletonBox height={25} width={100} />
    ) : (
      <MetricValue>{value}</MetricValue>
    )}
  </Container>
);
