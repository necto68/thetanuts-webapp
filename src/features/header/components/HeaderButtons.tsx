import { useWallet } from "../../wallet/hooks/useWallet";

import { ChainSelect, WalletButton } from "../../wallet/components";

// we don't need V0Button currently
// import { SwitchToV0Button } from "./SwitchToV0Button";
import {
  Container,
  ButtonsContainer,

  // SwitchToV0ButtonContainer,
} from "./HeaderButtons.styles";

export const HeaderButtons = () => {
  const { wallet } = useWallet();

  return (
    <Container>
      {/* <SwitchToV0ButtonContainer>
        <SwitchToV0Button />
      </SwitchToV0ButtonContainer> */}
      {wallet ? (
        <ButtonsContainer>
          <ChainSelect />
          <WalletButton />
        </ButtonsContainer>
      ) : (
        <WalletButton />
      )}
    </Container>
  );
};
