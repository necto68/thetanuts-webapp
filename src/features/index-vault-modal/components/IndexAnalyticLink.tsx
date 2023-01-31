import { PagePathname } from "../../root/types";
import { links } from "../../shared/constants";
import { useSwapRouterConfig } from "../hooks";

import { ExternalExpander } from "./ExternalExpander";

export const IndexAnalyticLink = () => {
  const { indexVaultQuery } = useSwapRouterConfig();
  const { id = "" } = indexVaultQuery.data ?? {};

  const pagePathname = PagePathname.thetaIndex;
  const pageRoute = pagePathname.replace("/", "");

  return (
    <ExternalExpander
      title="Analytics and Historical Data"
      to={`${links.analytics}${pageRoute}/${id}`}
    />
  );
};
