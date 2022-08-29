import { useWallet } from "@gimmixorg/use-wallet";

import { PortfolioTabs } from "./PortfolioTabs";
import {
  Container,
  TitleContainer,
  Title,
  Description,
} from "./PortfolioLayout.styles";

export const PortfolioLayout = () => {
  const { account } = useWallet();

  return (
    <Container>
      <TitleContainer>
        <Title>Portfolio</Title>
      </TitleContainer>
      {account ? (
        <PortfolioTabs />
      ) : (
        <TitleContainer>
          <Description>Please, connect wallet</Description>
        </TitleContainer>
      )}
    </Container>
  );
};
