import { useCallback } from "react";

import { ModalContentType } from "../../index-vault-modal/types";
import { useVaultModalState } from "../../modal/hooks";
import { VaultModalType } from "../../root/types";
import { BaseVaultModalButton } from "../../table/components/VaultModalButton.styles";

export const ClosePositionButton = () => {
  const [, setVaultModalState] = useVaultModalState();

  const handleButtonClick = useCallback(() => {
    setVaultModalState((previousState) => ({
      ...previousState,
      vaultType: VaultModalType.longPosition,
      contentType: ModalContentType.closeLongOptionPosition,
      isShow: true,
      isRouterModal: false,
    }));
  }, [setVaultModalState]);

  return (
    <BaseVaultModalButton onClick={handleButtonClick}>
      Close
    </BaseVaultModalButton>
  );
};
