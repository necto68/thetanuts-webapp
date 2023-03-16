import { useAnalyticsPageview } from "../../root/hooks";
import { PagePathname } from "../../root/types";

import { Header } from "./Header";
import { PortfolioLayout } from "./PortfolioLayout";
import { Container } from "./PortfolioPage.styles";

export const PortfolioPage = () => {
  useAnalyticsPageview(PagePathname.portfolio, "Portfolio");

  return (
    <Container>
      <Header />
      <PortfolioLayout />
    </Container>
  );
};
