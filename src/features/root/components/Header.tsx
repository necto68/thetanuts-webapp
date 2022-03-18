import { ChainSelect, WalletButton } from "../../wallet/components";
import { CircleButton, CircleButtonIconType } from "../../shared/components";
import { AppSidebarLogo } from "../../sidebar/components/AppSidebarLogo";
import { useSidebarState } from "../../sidebar/hooks";

import {
  Container,
  LogoContainer,
  CircleButtonContainer,
  AppSidebarLogoContainer,
  ButtonsContainer,
} from "./Header.styles";

export const Header = () => {
  const { toggleIsShow } = useSidebarState();

  return (
    <Container>
      <LogoContainer>
        <CircleButtonContainer>
          <CircleButton
            iconSize={13}
            iconType={CircleButtonIconType.hamburger}
            onClick={toggleIsShow}
            primaryColor="#FFFFFF"
          />
        </CircleButtonContainer>
        <AppSidebarLogoContainer>
          <AppSidebarLogo />
        </AppSidebarLogoContainer>
        <AppSidebarLogoContainer />
      </LogoContainer>
      <ButtonsContainer>
        <ChainSelect />
        <WalletButton />
      </ButtonsContainer>
    </Container>
  );
};
