import { Header } from "../../theta-index/components";
import { Container } from "../../theta-index/components/ThetaIndexPage.styles";
import { useVaultModalOpen } from "../../modal/hooks";

import { LongLayout } from "./LongLayout";

export const LongPage = () => {
  useVaultModalOpen();

  return (
    <Container>
      <Header />
      <LongLayout />
    </Container>
  );
};
