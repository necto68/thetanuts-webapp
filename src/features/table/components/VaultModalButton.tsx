import type { FC } from "react";
import { useCallback } from "react";
import { generatePath } from "react-router-dom";

import { Link } from "../../shared/components";
import { ModalPathname, VaultModalType } from "../../root/types";
import { useVaultModalState } from "../../modal/hooks";
import type { VaultModalState } from "../../shared/hooks";

import { BaseVaultModalButton } from "./VaultModalButton.styles";

export type VaultModalButtonProps = Pick<
  VaultModalState,
  "chainId" | "contentType" | "vaultId" | "vaultType" | "withdrawId"
>;

export const VaultModalButton: FC<VaultModalButtonProps> = ({
  chainId,
  contentType,
  vaultId,
  vaultType,
  withdrawId,
  children,
}) => {
  const [vaultModalState, setVaultModalState] = useVaultModalState();

  const { isRouterModal } = vaultModalState;

  const modalPathname =
    vaultType === VaultModalType.index
      ? ModalPathname.indexVaultModal
      : ModalPathname.basicVaultModal;

  const pathname = generatePath(modalPathname, {
    vaultId,
  });
  const vaultModalRoute = isRouterModal ? { pathname } : {};

  const handleButtonClick = useCallback(() => {
    setVaultModalState({
      isShow: true,
      vaultType,
      vaultId,
      contentType,
      withdrawId,
      chainId,
    });
  }, [
    vaultType,
    vaultId,
    contentType,
    withdrawId,
    chainId,
    setVaultModalState,
  ]);

  return (
    <Link to={vaultModalRoute}>
      <BaseVaultModalButton onClick={handleButtonClick} primaryColor="#81E429">
        {children}
      </BaseVaultModalButton>
    </Link>
  );
};
