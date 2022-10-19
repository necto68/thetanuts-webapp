import { Header } from "../../theta-index/components";
import { Container } from "../../theta-index/components/ThetaIndexPage.styles";
import { useVaultModalOpen } from "../../modal/hooks";

import { LendingMarketLayout } from "./LendingMarketLayout";

export const LendingMarketPage = () => {
  useVaultModalOpen();

  return (
    <Container>
      <Header />
      <LendingMarketLayout />
    </Container>
  );
};
