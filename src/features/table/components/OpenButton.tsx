import type { FC } from "react";

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
    vaultId={vaultId}
    vaultType={vaultType}
  >
    Open
  </VaultModalButton>
);
