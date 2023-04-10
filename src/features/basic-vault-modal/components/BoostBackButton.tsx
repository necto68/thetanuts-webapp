import { links } from "../../shared/constants";
import { ExternalExpander } from "../../index-vault-modal/components";
import { useBasicModalConfig } from "../hooks/useBasicModalConfig";
import { useCallback, useMemo, useState } from "react";
import { getPagePathname } from "../../root/helpers";
import { useVaultModalState } from "../../modal/hooks";
import { NavigateBackButton } from "../../shared/components";

export const BoostBackButton = () => {
  const [ vaultModalState, setVaultModalState ] = useVaultModalState();

  const handleClick = useCallback(() => {
    setVaultModalState({
      ...vaultModalState,
      isShow: true,
      isBoostContentShown: false
    });
  }, [setVaultModalState, vaultModalState]);

  return (
    <NavigateBackButton onClick={handleClick} />
  );
};
