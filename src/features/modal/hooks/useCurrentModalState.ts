import { useDisclaimerModalState } from "../../disclaimer-modal/hooks";
import { DisclaimerModal } from "../../disclaimer-modal/components";
import { IndexVaultModal } from "../../index-vault-modal/components";
import { BasicVaultModal } from "../../basic-vault-modal/components";
import type { CurrentModalState } from "../types";
import { VaultModalType } from "../../root/types";

import { useVaultModalState } from "./useVaultModalState";
import { useVaultModalClose } from "./useVaultModalClose";

const defaultModalClose = () => undefined;

export const useCurrentModalState = (): CurrentModalState => {
  const [{ isShow: isShowDisclaimerModal }] = useDisclaimerModalState();
  const [{ isShow: isShowVaultModal, vaultType }] = useVaultModalState();

  const handleVaultModalClose = useVaultModalClose();

  if (isShowDisclaimerModal) {
    return {
      modalComponent: DisclaimerModal,
      handleClose: defaultModalClose,
    };
  }

  if (isShowVaultModal) {
    const modalComponent =
      vaultType === VaultModalType.index ? IndexVaultModal : BasicVaultModal;

    return {
      modalComponent,
      handleClose: handleVaultModalClose,
    };
  }

  return {
    modalComponent: null,
    handleClose: defaultModalClose,
  };
};
