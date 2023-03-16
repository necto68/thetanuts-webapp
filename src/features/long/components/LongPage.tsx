import ReactGA from "react-ga4";
import { useEffect } from "react";

import { Header } from "../../theta-index/components";
import { Container } from "../../theta-index/components/ThetaIndexPage.styles";
import { useVaultModalOpen } from "../../modal/hooks";

import { LongLayout } from "./LongLayout";

export const LongPage = () => {
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: "/long-vault",
      title: "Long Vaults",
    });
  }, []);
  useVaultModalOpen();

  return (
    <Container>
      <Header />
      <LongLayout />
    </Container>
  );
};
