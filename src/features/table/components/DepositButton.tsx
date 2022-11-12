import type { FC } from "react";

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
  <VaultModalButton chainId={chainId} vaultId={vaultId} vaultType={vaultType}>
    Deposit
  </VaultModalButton>
);
