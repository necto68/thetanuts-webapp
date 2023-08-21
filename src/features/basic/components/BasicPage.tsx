import { Header } from "../../theta-index/components";
import { Container } from "../../theta-index/components/ThetaIndexPage.styles";
import { useSetVaultModalState } from "../../modal/hooks";
import { useAnalyticsPageview } from "../../root/hooks";
import { PagePathname } from "../../root/types";

import { BasicLayout } from "./BasicLayout";

export const BasicPage = () => {
  useAnalyticsPageview(PagePathname.basic, "Basic Vaults");

  useSetVaultModalState();

  return (
    <Container>
      <Header />
      <BasicLayout />
    </Container>
  );
};
