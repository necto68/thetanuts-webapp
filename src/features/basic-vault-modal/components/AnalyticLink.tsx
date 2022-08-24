import { analyticUrl } from "../../shared/constants";
import { ExternalExpander } from "../../index-vault-modal/components";
import { useBasicModalConfig } from "../hooks/useBasicModalConfig";

export const AnalyticLink = () => {
  const { basicVaultQuery } = useBasicModalConfig();
  const { id = "" } = basicVaultQuery.data ?? {};

  return (
    <ExternalExpander
      title="Analytics and Historical Data"
      to={`${analyticUrl}${id}`}
    />
  );
};
