import type { FC } from "react";

import { TabType } from "../../basic-vault-modal/types";

import type { VaultModalButtonProps } from "./VaultModalButton";
import { VaultModalButton } from "./VaultModalButton";

export type WithdrawButtonProps = Pick<
  VaultModalButtonProps,
  "chainId" | "vaultId" | "vaultType"
>;

export const WithdrawButton: FC<WithdrawButtonProps> = ({
  chainId,
  vaultId,
  vaultType,
}) => (
  <VaultModalButton
    chainId={chainId}
    tabType={TabType.withdraw}
    vaultId={vaultId}
    vaultType={vaultType}
  >
    Withdraw
  </VaultModalButton>
);
