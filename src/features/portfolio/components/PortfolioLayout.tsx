import { useConnectWallet } from "@web3-onboard/react";

import { PortfolioTabs } from "./PortfolioTabs";
import {
  Container,
  TitleContainer,
  Title,
  Description,
} from "./PortfolioLayout.styles";

export const PortfolioLayout = () => {
  const [{ wallet }, connect, disconnect] = useConnectWallet();
  const walletAddress = wallet?.accounts[0]?.address ?? "";

  return (
    <Container>
      <TitleContainer>
        <Title>Portfolio</Title>
      </TitleContainer>
      {wallet ? (
        <PortfolioTabs />
      ) : (
        <TitleContainer>
          <Description>Please, connect wallet</Description>
        </TitleContainer>
      )}
    </Container>
  );
};
