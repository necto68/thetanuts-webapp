import { useCallback } from "react";

import { useDisclaimerModalState } from "../../disclaimer-modal/hooks";
import { DisclaimerModal } from "../../disclaimer-modal/components";
import { IndexVaultModal } from "../../index-vault-modal/components";
import { BasicVaultModal } from "../../basic-vault-modal/components";
import type { CurrentModalState } from "../types";
import { VaultModalType } from "../../root/types";

import { useVaultModalState } from "./useVaultModalState";

const defaultModalClose = () => undefined;

export const useCurrentModalState = (): CurrentModalState => {
  const [{ isShow: isShowDisclaimerModal }] = useDisclaimerModalState();
  const [{ isShow: isShowVaultModal, vaultType }, setVaultModalState] =
    useVaultModalState();

  const handleIndexModalClose = useCallback(() => {
    setVaultModalState((previousState) => ({
      ...previousState,
      isShow: false,
    }));
  }, [setVaultModalState]);

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
      handleClose: handleIndexModalClose,
    };
  }

  return {
    modalComponent: null,
    handleClose: defaultModalClose,
  };
};
