import {
  Container,
  SubTitle,
  PriceTitle,
  PriceContainer,
} from "./AssetHeader.styles";
import { PNLContainer } from "./ChartHeader.styles";

export const ChartHeader = () => (
  <Container>
    <PNLContainer>
      <PriceContainer>
        <SubTitle>Expected Price</SubTitle>
        <PriceTitle>$XX.XX</PriceTitle>
      </PriceContainer>
      <PriceContainer>
        <SubTitle>Your Estimated PNL (Excluding Fees)</SubTitle>
        <PriceTitle>$XX.XX</PriceTitle>
      </PriceContainer>
    </PNLContainer>
    <SubTitle>Hover over the chart to calculate the estimated PNL</SubTitle>
  </Container>
);
