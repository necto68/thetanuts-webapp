import { Header } from "../../theta-index/components";
import { Container } from "../../theta-index/components/ThetaIndexPage.styles";
import { useVaultModalOpen } from "../../modal/hooks";
import { useAnalyticsPageview } from "../../root/hooks";
import { PagePathname } from "../../root/types";

import { LongLayout } from "./LongLayout";

export const LongPage = () => {
  useAnalyticsPageview(PagePathname.long, "Long Vaults");

  useVaultModalOpen();

  return (
    <Container>
      <Header />
      <LongLayout />
    </Container>
  );
};
