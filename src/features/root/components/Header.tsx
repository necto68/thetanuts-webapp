import { BaseButton } from "../../shared/components";
import { ChainSelect, WalletButton } from "../../wallet/components";

import { HeaderContainer, ButtonsContainer } from "./Header.styles";

export const Header = () => (
  <HeaderContainer>
    <ButtonsContainer>
      <BaseButton>Claim</BaseButton>
      <BaseButton>Rewards</BaseButton>
    </ButtonsContainer>
    <ButtonsContainer>
      <ChainSelect />
      <WalletButton />
    </ButtonsContainer>
  </HeaderContainer>
);
