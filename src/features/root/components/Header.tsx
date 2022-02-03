import { ChainSelect, WalletButton } from "../../wallet/components";

import { HeaderContainer, ButtonsContainer } from "./Header.styles";

export const Header = () => (
  <HeaderContainer>
    <ButtonsContainer>
      <ChainSelect />
      <WalletButton />
    </ButtonsContainer>
  </HeaderContainer>
);
