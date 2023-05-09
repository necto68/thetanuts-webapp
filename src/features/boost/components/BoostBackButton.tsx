import { useCallback } from "react";

import { useVaultModalState } from "../../modal/hooks";
import { NavigateBackButton } from "../../shared/components";

export const BoostBackButton = () => {
  const [vaultModalState, setVaultModalState] = useVaultModalState();

  const handleClick = useCallback(() => {
    setVaultModalState({
      ...vaultModalState,
      isShow: true,
      isBoostContentShown: false,
    });
  }, [setVaultModalState, vaultModalState]);

  return <NavigateBackButton onClick={handleClick} />;
};
