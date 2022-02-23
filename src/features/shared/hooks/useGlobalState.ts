import { createGlobalState } from "react-hooks-global-state";

interface ModalState {
  isShow: boolean;
  vaultAddress: string | null;
}

interface IndexVaultModalState {
  isShow: boolean;
  indexVaultId: string;
}

interface GlobalState {
  modalState: ModalState;
  indexVaultModalState: IndexVaultModalState;
}

export const { useGlobalState } = createGlobalState<GlobalState>({
  modalState: { isShow: false, vaultAddress: null },
  indexVaultModalState: { isShow: false, indexVaultId: "" },
});
