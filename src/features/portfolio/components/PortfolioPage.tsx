import ReactGA from "react-ga4";
import { useEffect } from "react";

import { Header } from "./Header";
import { PortfolioLayout } from "./PortfolioLayout";
import { Container } from "./PortfolioPage.styles";

export const PortfolioPage = () => {
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: "/portfolio",
      title: "Portfolio",
    });
  }, []);

  return (
    <Container>
      <Header />
      <PortfolioLayout />
    </Container>
  );
};
