import { useRouteMatch } from "react-router-dom";

import { PagePathname } from "../types";

export const useCurrentPagePathname = (): PagePathname => {
  const isBasic = useRouteMatch(PagePathname.basic);
  const isPortfolio = useRouteMatch(PagePathname.portfolio);

  if (isBasic) {
    return PagePathname.basic;
  }

  if (isPortfolio) {
    return PagePathname.portfolio;
  }

  return PagePathname.thetaIndex;
};
