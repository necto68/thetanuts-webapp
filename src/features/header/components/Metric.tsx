import type { FC } from "react";

import { SkeletonBox } from "../../shared/components";

import {
  Container,
  MetricTitleContainer,
  MetricValueContainer,
  MetricTitle,
  MetricValue,
} from "./Metric.styles";

interface MetricProps {
  title: string;
  value: string | undefined;
}

export const Metric: FC<MetricProps> = ({ title, value }) => (
  <Container>
    <MetricTitleContainer>
      <MetricTitle>{title}</MetricTitle>
    </MetricTitleContainer>
    <MetricValueContainer>
      {typeof value === "undefined" ? (
        <SkeletonBox height={25} width={100} />
      ) : (
        <MetricValue>{value}</MetricValue>
      )}
    </MetricValueContainer>
  </Container>
);
