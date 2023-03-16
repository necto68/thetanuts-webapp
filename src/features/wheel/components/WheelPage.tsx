import ReactGA from "react-ga4";
import { useEffect } from "react";

import { Header } from "../../theta-index/components";
import { Container } from "../../theta-index/components/ThetaIndexPage.styles";
import { useVaultModalOpen } from "../../modal/hooks";

import { WheelLayout } from "./WheelLayout";

export const WheelPage = () => {
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: "/wheel-vault",
      title: "Wheel Vaults",
    });
  }, []);
  useVaultModalOpen();

  return (
    <Container>
      <Header />
      <WheelLayout />
    </Container>
  );
};
