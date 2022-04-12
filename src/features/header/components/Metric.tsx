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
  value: string;
  isLoading?: boolean;
}

export const Metric: FC<MetricProps> = ({ title, value, isLoading }) => (
  <Container>
    <MetricTitleContainer>
      <MetricTitle>{title}</MetricTitle>
    </MetricTitleContainer>
    <MetricValueContainer>
      {isLoading ? (
        <SkeletonBox height={25} width={90} />
      ) : (
        <MetricValue>{value}</MetricValue>
      )}
    </MetricValueContainer>
  </Container>
);
