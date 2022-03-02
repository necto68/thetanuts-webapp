import { PortfolioTable } from "./PortfolioTable";
import {
  Container,
  Title,
  TitleContainer,
  TabsContainer,
} from "./PortfolioLayout.styles";

export const PortfolioLayout = () => (
  <Container>
    <TitleContainer>
      <Title>Portfolio</Title>
    </TitleContainer>
    <TabsContainer>
      <PortfolioTable />
    </TabsContainer>
  </Container>
);
