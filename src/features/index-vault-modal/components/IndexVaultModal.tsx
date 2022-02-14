import { Header } from "./Header";
import { SwapDisplay } from "./SwapDisplay";
import { Container } from "./IndexVaultModal.styles";
import { InformationDisplay } from "./InformationDisplay";
import { SwapButton } from "./SwapButton";
import { ExpandButton } from "./ExpandButton";

export const IndexVaultModal = () => (
  <Container>
    <Header />
    <SwapDisplay />
    <InformationDisplay />
    <SwapButton>Swap</SwapButton>
    <ExpandButton>Consolidated APY% = 40.97%</ExpandButton>
    <ExpandButton>Index Information</ExpandButton>
  </Container>
);
