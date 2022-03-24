import { AppSidebarLogo } from "../../sidebar/components";
import { CircleButton, CircleButtonIconType } from "../../shared/components";
import { useSidebarState } from "../../sidebar/hooks";

import { Container } from "./MobileHeader.styles";

export const MobileHeader = () => {
  const { toggleIsShow } = useSidebarState();

  return (
    <Container>
      <AppSidebarLogo />
      <CircleButton
        iconSize={13}
        iconType={CircleButtonIconType.hamburger}
        onClick={toggleIsShow}
        primaryColor="#FFFFFF"
      />
    </Container>
  );
};
