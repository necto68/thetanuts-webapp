import { useWallet } from "../../wallet/hooks/useWallet";
import { ChainSelect, WalletButton } from "../../wallet/components";

import { Container, ButtonsContainer } from "./HeaderButtons.styles";

export const HeaderButtons = () => {
  const { wallet } = useWallet();

  return (
    <Container>
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
