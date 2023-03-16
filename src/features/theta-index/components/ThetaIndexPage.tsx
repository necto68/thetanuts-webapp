import ReactGA from "react-ga4";
import { useEffect } from "react";

import { useVaultModalOpen } from "../../modal/hooks";

import { Header } from "./Header";
import { ThetaIndexLayout } from "./ThetaIndexLayout";
import { Container } from "./ThetaIndexPage.styles";

export const ThetaIndexPage = () => {
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: "/stronghold",
      title: "Stronghold Vaults",
    });
  }, []);
  useVaultModalOpen();

  return (
    <Container>
      <Header />
      <ThetaIndexLayout />
    </Container>
  );
};
