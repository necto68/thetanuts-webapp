import { useVaultModalOpen } from "../../modal/hooks";

import { Header } from "./Header";
import { ThetaIndexLayout } from "./ThetaIndexLayout";
import { Container } from "./ThetaIndexPage.styles";

export const ThetaIndexPage = () => {
  useVaultModalOpen();

  return (
    <Container>
      <Header />
      <ThetaIndexLayout />
    </Container>
  );
};
