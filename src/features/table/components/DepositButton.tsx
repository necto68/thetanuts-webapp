import type { FC } from "react";

import { VaultModalType } from "../../root/types";

import type { VaultModalButtonProps } from "./VaultModalButton";
import { VaultModalButton } from "./VaultModalButton";

export type DepositButtonProps = Pick<
  VaultModalButtonProps,
  "chainId" | "vaultId" | "vaultType"
>;

export const DepositButton: FC<DepositButtonProps> = ({
  chainId,
  vaultId,
  vaultType,
}) => (
  <VaultModalButton
    borderColor={vaultType === VaultModalType.degen ? "#EB5353" : "#0DDBE8"}
    chainId={chainId}
    vaultId={vaultId}
    vaultType={vaultType}
  >
    Deposit
  </VaultModalButton>
);
