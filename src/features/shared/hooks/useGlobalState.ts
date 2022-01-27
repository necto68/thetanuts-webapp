import { createGlobalState } from 'react-hooks-global-state';

interface ModalState {
  isShow: boolean;
  vaultAddress: string | null;
}

interface GlobalState {
  modalState: ModalState;
}

export const { useGlobalState } = createGlobalState<GlobalState>({
  modalState: { isShow: false, vaultAddress: null },
});
