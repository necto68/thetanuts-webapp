import type { FC } from "react";

import { useIndexVaultQuery } from "../hooks";

import {
  Container,
  Header,
  TypeTitle,
  AssetTitle,
  Content,
  APYContainer,
  TVLContainer,
  DataTitle,
  DataValue,
  SwapTitle,
} from "./IndexVault.styles";

interface IndexVaultProps {
  tokenSymbol: string;
}

export const IndexVault: FC<IndexVaultProps> = ({ tokenSymbol }) => {
  const { isLoading } = useIndexVaultQuery(tokenSymbol);

  if (isLoading) {
    return null;
  }

  return (
    <Container>
      <Header>
        <TypeTitle>Put</TypeTitle>
        <AssetTitle>BTC-C</AssetTitle>
      </Header>
      <Content>
        <APYContainer>
          <DataTitle>APY</DataTitle>
          <DataValue>43.15 %</DataValue>
        </APYContainer>
        <TVLContainer>
          <DataTitle>TVL</DataTitle>
          <DataValue>792.4 M</DataValue>
        </TVLContainer>
      </Content>
      <SwapTitle>Swap</SwapTitle>
    </Container>
  );
};
