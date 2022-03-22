import { ChainSelect, WalletButton } from "../../wallet/components";
import { CircleButton, CircleButtonIconType } from "../../shared/components";
import { AppSidebarLogo } from "../../sidebar/components/AppSidebarLogo";
import { useSidebarState } from "../../sidebar/hooks";

import { Container, LogoContainer, ButtonsContainer } from "./Header.styles";

export const Header = () => {
  const { toggleIsShow } = useSidebarState();

  return (
    <Container>
      <LogoContainer>
        <AppSidebarLogo />
        <CircleButton
          iconSize={13}
          iconType={CircleButtonIconType.hamburger}
          onClick={toggleIsShow}
          primaryColor="#FFFFFF"
        />
      </LogoContainer>
      <ButtonsContainer>
        <ChainSelect />
        <WalletButton />
      </ButtonsContainer>
    </Container>
  );
};
