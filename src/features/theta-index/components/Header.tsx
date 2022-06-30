import { HeaderContainer, HeaderButtons } from "../../header/components";
import { useScreens } from "../../shared/hooks";

import { Metrics } from "./Metrics";

export const Header = () => {
  const isMobile = useScreens();

  return (
    <HeaderContainer>
      <Metrics />
      {isMobile ? null : <HeaderButtons />}
    </HeaderContainer>
  );
};
