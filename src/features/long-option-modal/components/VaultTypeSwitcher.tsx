import { useCallback } from "react";
import { generatePath, useHistory } from "react-router-dom";

import { typeGroups } from "../constants";
import { useBasicModalConfig } from "../../basic-vault-modal/hooks";
import { VaultType } from "../../basic-vault/types";
import { ModalPathname } from "../../root/types";

import { Switcher } from "./Switcher";

export const VaultTypeSwitcher = () => {
  const routerHistory = useHistory();
  const { basicVaultQuery } = useBasicModalConfig();

  const { data } = basicVaultQuery;
  const { id = "", type = VaultType.CALL } = data ?? {};

  const typeGroup = typeGroups.find(
    (group) => type !== VaultType.CONDOR && group[type] === id
  );

  const onTabButtonClick = useCallback(
    (vaultType: VaultType) => {
      const vaultId =
        typeGroup && vaultType !== VaultType.CONDOR ? typeGroup[vaultType] : "";

      const pathname = generatePath(ModalPathname.longTradeVaultModal, {
        vaultId,
      });

      routerHistory.push({ pathname });
    },
    [typeGroup, routerHistory]
  );

  if (!typeGroup) {
    return null;
  }

  return (
    <Switcher currentVaultType={type} onTabButtonClick={onTabButtonClick} />
  );
};
