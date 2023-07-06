import { useWallet } from "../../wallet/hooks/useWallet";

import { PortfolioTabs } from "./PortfolioTabs";
import {
  Container,
  TitleContainer,
  Title,
  Description,
} from "./PortfolioLayout.styles";

export const PortfolioLayout = () => {
  const { wallet } = useWallet();

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
