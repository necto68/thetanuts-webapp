import { AppSidebarLogo } from "../../sidebar/components";
import { CircleButton, CircleButtonIconType } from "../../shared/components";
import { useSidebarState } from "../../sidebar/hooks";
import { HeaderButtons } from "../../header/components";
import { useIsMobile } from "../../shared/hooks";

import { Container, HeaderButtonContainer } from "./MobileHeader.styles";

export const MobileHeader = () => {
  const { toggleIsShow } = useSidebarState();
  const isMobile = useIsMobile();

  return (
    <Container>
      <AppSidebarLogo />
      <HeaderButtonContainer>
        {isMobile ? <HeaderButtons /> : null}
        <CircleButton
          iconSize={13}
          iconType={CircleButtonIconType.hamburger}
          onClick={toggleIsShow}
          primaryColor="#FFFFFF"
        />
      </HeaderButtonContainer>
    </Container>
  );
};
