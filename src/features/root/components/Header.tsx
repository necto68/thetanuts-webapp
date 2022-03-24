import { useWallet } from "@gimmixorg/use-wallet";

import { ChainSelect, WalletButton } from "../../wallet/components";

import { Container, ButtonsContainer } from "./Header.styles";

export const Header = () => {
  const { network } = useWallet();

  if (!network) {
    return (
      <Container>
        <WalletButton />
      </Container>
    );
  }

  return (
    <Container>
      <ButtonsContainer>
        <ChainSelect />
        <WalletButton />
      </ButtonsContainer>
    </Container>
  );
};
