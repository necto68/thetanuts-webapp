import { useIndexVaultModalOpen } from "../hooks";

import { Header } from "./Header";
import { ThetaIndexLayout } from "./ThetaIndexLayout";
import { Container } from "./ThetaIndexPage.styles";

export const ThetaIndexPage = () => {
  useIndexVaultModalOpen();

  return (
    <Container>
      <Header />
      <ThetaIndexLayout />
    </Container>
  );
};
