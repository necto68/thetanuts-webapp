import { ChainSelect, WalletButton } from "../../wallet/components";
import { chains } from "../../wallet/constants/chains";

import { HeaderContainer, ButtonsContainer } from "./Header.styles";

export const Header = () => (
  <HeaderContainer>
    <ButtonsContainer>
      <ChainSelect selectedChains={chains} />
      <WalletButton />
    </ButtonsContainer>
  </HeaderContainer>
);
