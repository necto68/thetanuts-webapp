import type { FC } from "react";
import { useCallback } from "react";

import { useIndexVaultQuery } from "../hooks";
import { useIndexVaultModalState } from "../../index-vault-modal/hooks";

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

  const [, setModalState] = useIndexVaultModalState();

  const handleVaultClick = useCallback(() => {
    setModalState({ isShow: true, tokenSymbol });
  }, [setModalState, tokenSymbol]);

  if (isLoading) {
    return null;
  }

  return (
    <Container onClick={handleVaultClick}>
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
