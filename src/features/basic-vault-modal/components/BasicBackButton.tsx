import { useCallback } from "react";

import { useVaultModalState } from "../../modal/hooks";
import { NavigateBackButton } from "../../shared/components";
import { useBasicModalMutations } from "../hooks";

export const BasicBackButton = () => {
  const [vaultModalState, setVaultModalState] = useVaultModalState();
  const { resetMutationHash } = useBasicModalMutations();

  const handleClick = useCallback(() => {
    resetMutationHash();
    setVaultModalState({
      ...vaultModalState,
      isShow: true,
      isBoostContentShown: false,
    });
  }, [resetMutationHash, setVaultModalState, vaultModalState]);

  return <NavigateBackButton onClick={handleClick} />;
};
