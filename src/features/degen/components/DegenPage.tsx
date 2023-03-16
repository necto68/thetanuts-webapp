import ReactGA from "react-ga4";
import { useEffect } from "react";

import { Header } from "../../theta-index/components";
import { Container } from "../../theta-index/components/ThetaIndexPage.styles";
import { useVaultModalOpen } from "../../modal/hooks";

import { DegenLayout } from "./DegenLayout";

export const DegenPage = () => {
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: "/degen-vault",
      title: "Degen Vaults",
    });
  }, []);
  useVaultModalOpen();

  return (
    <Container>
      <Header />
      <DegenLayout />
    </Container>
  );
};
