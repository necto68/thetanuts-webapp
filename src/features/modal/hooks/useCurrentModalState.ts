import { useDisclaimerModalState } from "../../disclaimer-modal/hooks";
import { DisclaimerModal } from "../../disclaimer-modal/components";
import { IndexVaultModal } from "../../index-vault-modal/components";
import { BasicVaultModal } from "../../basic-vault-modal/components";
import { DegenVaultModal } from "../../degen-vault-modal/components";
import { WheelVaultModal } from "../../wheel-vault-modal/components";
import { LongVaultModal } from "../../long-vault-modal/components";
import { LongOptionPositionModal } from "../../long-option-position-modal/components";
import type { CurrentModalState } from "../types";
import { VaultModalType } from "../../root/types";

import { useVaultModalState } from "./useVaultModalState";
import { useVaultModalClose } from "./useVaultModalClose";

const defaultModalClose = () => undefined;

const modalComponents = {
  [VaultModalType.index]: IndexVaultModal,
  [VaultModalType.basic]: BasicVaultModal,
  [VaultModalType.degen]: DegenVaultModal,
  [VaultModalType.wheel]: WheelVaultModal,
  [VaultModalType.long]: LongVaultModal,
  [VaultModalType.longTrade]: null,
  [VaultModalType.longPosition]: LongOptionPositionModal,
};

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
    const modalComponent = modalComponents[vaultType];

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
