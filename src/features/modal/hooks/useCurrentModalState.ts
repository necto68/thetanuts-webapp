import { useCallback } from "react";

import { useDisclaimerModalState } from "../../disclaimer-modal/hooks";
import { useIndexVaultModalState } from "../../index-vault-modal/hooks";
import { DisclaimerModal } from "../../disclaimer-modal/components";
import { IndexVaultModal } from "../../index-vault-modal/components";
import type { CurrentModalState } from "../types";

const defaultModalClose = () => undefined;

export const useCurrentModalState = (): CurrentModalState => {
  const [{ isShow: isShowDisclaimerModal }] = useDisclaimerModalState();
  const [{ isShow: isShowIndexVaultModal }, setIndexVaultModalState] =
    useIndexVaultModalState();

  const handleIndexModalClose = useCallback(() => {
    setIndexVaultModalState((previousState) => ({
      ...previousState,
      isShow: false,
    }));
  }, [setIndexVaultModalState]);

  if (isShowDisclaimerModal) {
    return {
      modalComponent: DisclaimerModal,
      handleClose: defaultModalClose,
    };
  }

  if (isShowIndexVaultModal) {
    return {
      modalComponent: IndexVaultModal,
      handleClose: handleIndexModalClose,
    };
  }

  return {
    modalComponent: null,
    handleClose: defaultModalClose,
  };
};
