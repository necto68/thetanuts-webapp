import type { FC } from "react";

import type { PercentageYields } from "../../vault/types";

import {
  Container,
  Title,
  ContentContainer,
  YieldContainer,
  YieldValue,
  YieldTitle,
} from "./PercentageYieldsTooltip.styles";

interface PercentageYieldsTooltipProps {
  percentageYields: PercentageYields;
}

export const PercentageYieldsTooltip: FC<PercentageYieldsTooltipProps> = ({
  percentageYields,
}) => {
  const {
    weeklyPercentageYield,
    monthlyPercentageYield,
    annualPercentageRate,
    annualPercentageYield,
  } = percentageYields;

  return (
    <Container>
      <Title>Extrapolated yields</Title>
      <ContentContainer>
        <YieldContainer>
          <YieldValue>{`${weeklyPercentageYield}%`}</YieldValue>
          <YieldTitle>WPY (7-days)</YieldTitle>
        </YieldContainer>
        <YieldContainer>
          <YieldValue>{`${monthlyPercentageYield}%`}</YieldValue>
          <YieldTitle>MPY (monthly)</YieldTitle>
        </YieldContainer>
        <YieldContainer>
          <YieldValue>{`${annualPercentageRate}%`}</YieldValue>
          <YieldTitle>APR (annually)</YieldTitle>
        </YieldContainer>
        <YieldContainer>
          <YieldValue>{`${annualPercentageYield}%`}</YieldValue>
          <YieldTitle>APY (compounded)</YieldTitle>
        </YieldContainer>
      </ContentContainer>
    </Container>
  );
};
