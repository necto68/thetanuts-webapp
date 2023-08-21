import { useCallback } from "react";

import { useVaultModalState } from "../../modal/hooks";
import { NavigateBackButton } from "../../shared/components";
import { useBoostModalMutations } from "../hooks";

export const BoostBackButton = () => {
  const [vaultModalState, setVaultModalState] = useVaultModalState();
  const { resetBoostHash } = useBoostModalMutations();
  const { isBoostContentShown } = vaultModalState;

  const handleClick = useCallback(() => {
    if (isBoostContentShown) {
      resetBoostHash();
    }
    setVaultModalState({
      ...vaultModalState,
      isShow: true,
      isBoostContentShown: false,
    });
  }, [
    isBoostContentShown,
    resetBoostHash,
    setVaultModalState,
    vaultModalState,
  ]);

  return <NavigateBackButton onClick={handleClick} />;
};
