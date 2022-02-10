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
    <SwapButton whileHover={{scale: 1.02, boxShadow: `0 0 10px white`,}} whileTap={{scale: 0.97,boxShadow: `0 0 0px white`, opacity: 0.8,}}>Swap</SwapButton>
    <ExpandButton>Consolidated APY% = 40.97%</ExpandButton>
    <ExpandButton>Index Information</ExpandButton>

  </Container>
);
