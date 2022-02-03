import { createGlobalState } from "react-hooks-global-state";

interface ModalState {
  isShow: boolean;
  vaultAddress: string | null;
}

interface IndexVaultModalState {
  isShow: boolean;
  tokenSymbol: string | null;
}

interface GlobalState {
  modalState: ModalState;
  indexVaultModalState: IndexVaultModalState;
}

export const { useGlobalState } = createGlobalState<GlobalState>({
  modalState: { isShow: false, vaultAddress: null },
  indexVaultModalState: { isShow: false, tokenSymbol: null },
});
