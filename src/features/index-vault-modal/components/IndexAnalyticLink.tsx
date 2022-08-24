import { analyticUrl } from "../../shared/constants";
import { useSwapRouterConfig } from "../hooks";

import { ExternalExpander } from "./ExternalExpander";

export const IndexAnalyticLink = () => {
  const { indexVaultQuery } = useSwapRouterConfig();
  const { id = "" } = indexVaultQuery.data ?? {};

  return (
    <ExternalExpander
      title="Analytics and Historical Data"
      to={`${analyticUrl}${id}`}
    />
  );
};
