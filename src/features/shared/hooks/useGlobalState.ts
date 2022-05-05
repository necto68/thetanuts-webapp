import { createGlobalState } from "react-hooks-global-state";

import type { ChainId } from "../../wallet/constants";

interface ModalState {
  isShow: boolean;
  vaultAddress: string | null;
}

interface IndexVaultModalState {
  isShow: boolean;
  indexVaultId: string;
  chainId?: ChainId | null;
}

interface GlobalState {
  modalState: ModalState;
  indexVaultModalState: IndexVaultModalState;
}

export const { useGlobalState } = createGlobalState<GlobalState>({
  modalState: { isShow: false, vaultAddress: null },
  indexVaultModalState: { isShow: false, indexVaultId: "" },
});
