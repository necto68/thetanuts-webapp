import { Header } from "../../theta-index/components";
import { Container } from "../../theta-index/components/ThetaIndexPage.styles";
import { useVaultModalOpen } from "../../modal/hooks";
import { useAnalyticsPageview } from "../../root/hooks";
import { PagePathname } from "../../root/types";

import { BasicLayout } from "./BasicLayout";

export const BasicPage = () => {
  useAnalyticsPageview(PagePathname.basic, "Basic Vaults");

  useVaultModalOpen();

  return (
    <Container>
      <Header />
      <BasicLayout />
    </Container>
  );
};
