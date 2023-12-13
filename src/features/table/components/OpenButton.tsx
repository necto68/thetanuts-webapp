import type { FC } from "react";

import { TabType } from "../../basic-vault-modal/types";

import type { VaultModalButtonProps } from "./VaultModalButton";
import { VaultModalButton } from "./VaultModalButton";

export type OpenButtonProps = Pick<
  VaultModalButtonProps,
  "chainId" | "vaultId" | "vaultType"
>;

export const OpenButton: FC<OpenButtonProps> = ({
  chainId,
  vaultId,
  vaultType,
}) => (
  <VaultModalButton
    borderColor="#0DDBE8"
    chainId={chainId}
    tabType={TabType.withdraw}
    vaultId={vaultId}
    vaultType={vaultType}
  >
    Close
  </VaultModalButton>
);
