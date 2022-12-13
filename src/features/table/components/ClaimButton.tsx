import type { FC } from "react";

import { ModalContentType } from "../../index-vault-modal/types";
import { VaultModalType } from "../../root/types";

import type { VaultModalButtonProps } from "./VaultModalButton";
import { VaultModalButton } from "./VaultModalButton";

type ClaimButtonProps = Pick<
  VaultModalButtonProps,
  "chainId" | "disabled" | "vaultId" | "withdrawId"
>;

export const ClaimButton: FC<ClaimButtonProps> = ({
  vaultId,
  chainId,
  withdrawId,
  disabled,
}) => (
  <VaultModalButton
    chainId={chainId}
    contentType={ModalContentType.withdrawClaim}
    disabled={disabled}
    vaultId={vaultId}
    vaultType={VaultModalType.index}
    withdrawId={withdrawId}
  >
    Claim
  </VaultModalButton>
);
