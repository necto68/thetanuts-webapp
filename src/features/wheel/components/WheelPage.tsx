import { Header } from "../../theta-index/components";
import { Container } from "../../theta-index/components/ThetaIndexPage.styles";
import { useVaultModalOpen } from "../../modal/hooks";
import { useAnalyticsPageview } from "../../root/hooks";
import { PagePathname } from "../../root/types";

import { WheelLayout } from "./WheelLayout";

export const WheelPage = () => {
  useAnalyticsPageview(PagePathname.wheel, "Wheel Vaults");

  useVaultModalOpen();

  return (
    <Container>
      <Header />
      <WheelLayout />
    </Container>
  );
};
