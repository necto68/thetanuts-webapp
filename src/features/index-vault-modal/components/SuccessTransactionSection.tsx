import type { FC } from "react";

import { BaseButton } from "../../shared/components";

import {
  Container,
  ContentContainer,
  SwapTitle,
  RatioTitle,
} from "./SuccessTransactionSection.styles";

export const SuccessTransactionSection: FC = () => (
  <Container>
    <ContentContainer>
      <SwapTitle>Swap Successful</SwapTitle>
      <RatioTitle>
        <b>1 ETH</b> to <b>1.95317 indexETH</b>
      </RatioTitle>
    </ContentContainer>
    <BaseButton primaryColor="#5D5D5D">Close</BaseButton>
  </Container>
);
