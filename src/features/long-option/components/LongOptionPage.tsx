import { Header } from "../../theta-index/components";
import { Container } from "../../theta-index/components/ThetaIndexPage.styles";
import { useSetVaultModalState } from "../../modal/hooks";

import { LongOptionLayout } from "./LongOptionLayout";

export const LongOptionPage = () => {
  useSetVaultModalState();

  return (
    <Container>
      <Header />
      <LongOptionLayout />
    </Container>
  );
};
