import { Header } from "../../theta-index/components";
import { Container } from "../../theta-index/components/ThetaIndexPage.styles";
import { useVaultModalOpen } from "../../modal/hooks";

import { BasicLayout } from "./BasicLayout";

export const BasicPage = () => {
  useVaultModalOpen();

  return (
    <Container>
      <Header />
      <BasicLayout />
    </Container>
  );
};
