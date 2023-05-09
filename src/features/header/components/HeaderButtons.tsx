import { useWallet } from "@gimmixorg/use-wallet";

import { ChainSelect, WalletButton } from "../../wallet/components";

import { Container, ButtonsContainer } from "./HeaderButtons.styles";

export const HeaderButtons = () => {
  const { network } = useWallet();

  return (
    <Container>
      {network ? (
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
