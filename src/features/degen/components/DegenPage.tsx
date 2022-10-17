import { Header } from "../../theta-index/components";
import { Container } from "../../theta-index/components/ThetaIndexPage.styles";
import { useVaultModalOpen } from "../../modal/hooks";

import { DegenLayout } from "./DegenLayout";

export const DegenPage = () => {
  useVaultModalOpen();

  return (
    <Container>
      <Header />
      <DegenLayout />
    </Container>
  );
};
