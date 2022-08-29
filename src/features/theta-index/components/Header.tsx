import { HeaderContainer, HeaderButtons } from "../../header/components";
import { useIsMobile } from "../../shared/hooks";

import { Metrics } from "./Metrics";

export const Header = () => {
  const isMobile = useIsMobile();

  return (
    <HeaderContainer>
      <Metrics />
      {isMobile ? null : <HeaderButtons />}
    </HeaderContainer>
  );
};
