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
        <Description>
          Please take note your positions or transaction history in Thetanuts
          Basic is not recorded in Thetanuts Stronghold Portfolio page.
        </Description>
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
