import { createGlobalState } from "react-hooks-global-state";

import type { ChainId } from "../../wallet/constants";
import { ModalContentType } from "../../index-vault-modal/types/modalContentType";

interface ModalState {
  isShow: boolean;
  vaultAddress: string | null;
}

export interface IndexVaultModalState {
  isShow: boolean;
  indexVaultId: string;
  chainId?: ChainId | null | undefined;
  isRouterModal?: boolean;
  contentType?: ModalContentType;
  withdrawId?: number;
}

export interface GlobalState {
  modalState: ModalState;
  indexVaultModalState: IndexVaultModalState;
}

export const { useGlobalState } = createGlobalState<GlobalState>({
  modalState: { isShow: false, vaultAddress: null },

  indexVaultModalState: {
    isShow: false,
    indexVaultId: "",
    contentType: ModalContentType.swap,
  },
});
