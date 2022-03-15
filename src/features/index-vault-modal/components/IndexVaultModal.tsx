import { Header } from "./Header";
import { SwapSection } from "./SwapSection";
import { ExpandersSection } from "./ExpandersSection";
import { Container, ContentContainer } from "./IndexVaultModal.styles";

export const IndexVaultModal = () => (
  <Container>
    <Header />
    <ContentContainer>
      <SwapSection />
      <ExpandersSection />
    </ContentContainer>
  </Container>
);
