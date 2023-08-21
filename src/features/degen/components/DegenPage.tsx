import { Header } from "../../theta-index/components";
import { Container } from "../../theta-index/components/ThetaIndexPage.styles";
import { useSetVaultModalState } from "../../modal/hooks";
import { useAnalyticsPageview } from "../../root/hooks";
import { PagePathname } from "../../root/types";

import { DegenLayout } from "./DegenLayout";

export const DegenPage = () => {
  useAnalyticsPageview(PagePathname.degen, "Degen Vaults");

  useSetVaultModalState();

  return (
    <Container>
      <Header />
      <DegenLayout />
    </Container>
  );
};
