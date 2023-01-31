import { links } from "../../shared/constants";
import { ExternalExpander } from "../../index-vault-modal/components";
import { useBasicModalConfig } from "../hooks/useBasicModalConfig";
import { getPagePathname } from "../../root/helpers";
import { useVaultModalState } from "../../modal/hooks";

export const AnalyticLink = () => {
  const [{ vaultType }] = useVaultModalState();
  const { basicVaultQuery } = useBasicModalConfig();

  const { id = "" } = basicVaultQuery.data ?? {};

  const pagePathname = getPagePathname(vaultType);
  const pageRoute = pagePathname.replace("/", "");

  return (
    <ExternalExpander
      title="Analytics and Historical Data"
      to={`${links.analytics}${pageRoute}/${id}`}
    />
  );
};
