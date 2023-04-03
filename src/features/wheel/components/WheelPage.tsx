import { Header } from "../../theta-index/components";
import { Container } from "../../theta-index/components/ThetaIndexPage.styles";
import { useSetVaultModalState } from "../../modal/hooks";
import { useAnalyticsPageview } from "../../root/hooks";
import { PagePathname } from "../../root/types";

import { WheelLayout } from "./WheelLayout";

export const WheelPage = () => {
  useAnalyticsPageview(PagePathname.wheel, "Wheel Vaults");

  useSetVaultModalState();

  return (
    <Container>
      <Header />
      <WheelLayout />
    </Container>
  );
};
