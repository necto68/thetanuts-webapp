import type { FC } from "react";

import { VaultModalType } from "../../root/types";

import type { VaultModalButtonProps } from "./VaultModalButton";
import { VaultModalButton } from "./VaultModalButton";

type DepositButtonProps = Pick<VaultModalButtonProps, "chainId" | "vaultId">;

export const DepositButton: FC<DepositButtonProps> = ({ chainId, vaultId }) => (
  <VaultModalButton
    borderColor="#0DDBE8"
    chainId={chainId}
    vaultId={vaultId}
    vaultType={VaultModalType.basic}
  >
    Deposit
  </VaultModalButton>
);
