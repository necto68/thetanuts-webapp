import { useEffect } from "react";
import ReactGA from "react-ga4";

import type { PagePathname } from "../types/PagePathname";

export const useAnalyticsPageview = (pathname: PagePathname, title: string) => {
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: pathname,
      title,
    });
  }, [pathname, title]);
};
