import { Header } from "../../theta-index/components";
import { Container } from "../../theta-index/components/ThetaIndexPage.styles";
import { useVaultModalOpen } from "../../modal/hooks";
import { useAnalyticsPageview } from "../../root/hooks";
import { PagePathname } from "../../root/types";

import { DegenLayout } from "./DegenLayout";

export const DegenPage = () => {
  useAnalyticsPageview(PagePathname.degen, "Degen Vaults");

  useVaultModalOpen();

  return (
    <Container>
      <Header />
      <DegenLayout />
    </Container>
  );
};
