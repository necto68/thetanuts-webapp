import { createGlobalState } from "react-hooks-global-state";

import type { ChainId } from "../../wallet/constants";
import { VaultModalType } from "../../root/types";
import type { ModalContentType } from "../../index-vault-modal/types";
import { TabType } from "../../basic-vault-modal/types";

export interface VaultModalState {
  isShow: boolean;
  vaultType: VaultModalType;
  tabType: TabType;
  vaultId: string;
  chainId?: ChainId | null | undefined;
  isRouterModal?: boolean;
  contentType?: ModalContentType;
  withdrawId?: number;
  isBoostContentShown: boolean;
}

export interface GlobalState {
  vaultModalState: VaultModalState;
}

export const { useGlobalState } = createGlobalState<GlobalState>({
  vaultModalState: {
    isShow: false,
    vaultType: VaultModalType.index,
    tabType: TabType.deposit,
    vaultId: "",
    isBoostContentShown: false,
  },
});
