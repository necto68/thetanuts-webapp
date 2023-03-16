import ReactGA from "react-ga4";
import { useEffect } from "react";

import { Header } from "../../theta-index/components";
import { Container } from "../../theta-index/components/ThetaIndexPage.styles";
import { useVaultModalOpen } from "../../modal/hooks";

import { BasicLayout } from "./BasicLayout";

export const BasicPage = () => {
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: "/basic-vault",
      title: "Basic Vaults",
    });
  }, []);
  useVaultModalOpen();

  return (
    <Container>
      <Header />
      <BasicLayout />
    </Container>
  );
};
