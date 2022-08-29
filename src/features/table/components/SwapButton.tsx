import type { FC } from "react";

import { VaultModalType } from "../../root/types";

import type { VaultModalButtonProps } from "./VaultModalButton";
import { VaultModalButton } from "./VaultModalButton";

type SwapButtonProps = Pick<VaultModalButtonProps, "chainId" | "vaultId">;

export const SwapButton: FC<SwapButtonProps> = ({ chainId, vaultId }) => (
  <VaultModalButton
    chainId={chainId}
    vaultId={vaultId}
    vaultType={VaultModalType.index}
  >
    Swap
  </VaultModalButton>
);
