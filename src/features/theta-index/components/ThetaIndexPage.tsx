import { useVaultModalOpen } from "../../modal/hooks";
import { useAnalyticsPageview } from "../../root/hooks";
import { PagePathname } from "../../root/types";

import { Header } from "./Header";
import { ThetaIndexLayout } from "./ThetaIndexLayout";
import { Container } from "./ThetaIndexPage.styles";

export const ThetaIndexPage = () => {
  useAnalyticsPageview(PagePathname.thetaIndex, "Stronghold Vaults");

  useVaultModalOpen();

  return (
    <Container>
      <Header />
      <ThetaIndexLayout />
    </Container>
  );
};
