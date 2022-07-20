import { createGlobalState } from "react-hooks-global-state";

import type { ChainId } from "../../wallet/constants";
import { VaultModalType } from "../../root/types";
import type { ModalContentType } from "../../index-vault-modal/types";

export interface VaultModalState {
  isShow: boolean;
  vaultType: VaultModalType;
  vaultId: string;
  chainId?: ChainId | null | undefined;
  isRouterModal?: boolean;
  contentType?: ModalContentType;
  withdrawId?: number;
}

export interface GlobalState {
  vaultModalState: VaultModalState;
}

export const { useGlobalState } = createGlobalState<GlobalState>({
  vaultModalState: {
    isShow: false,
    vaultType: VaultModalType.index,
    vaultId: "",
  },
});
