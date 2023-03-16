import { Header } from "../../theta-index/components";
import { Container } from "../../theta-index/components/ThetaIndexPage.styles";
import { useVaultModalOpen } from "../../modal/hooks";

import { WheelLayout } from "./WheelLayout";

export const WheelPage = () => {
  useVaultModalOpen();

  return (
    <Container>
      <Header />
      <WheelLayout />
    </Container>
  );
};
