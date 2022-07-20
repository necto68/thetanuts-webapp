import type { FC } from "react";
import { useCallback } from "react";
import { generatePath } from "react-router-dom";

import type { ChainId } from "../../wallet/constants";
import { Link } from "../../shared/components";
import { ModalPathname, VaultModalType } from "../../root/types";
import { useVaultModalState } from "../../modal/hooks";

import { BaseVaultModalButton } from "./VaultModalButton.styles";

interface VaultModalButtonProps {
  vaultType: VaultModalType;
  vaultId: string;
  chainId?: ChainId;
}

export const VaultModalButton: FC<VaultModalButtonProps> = ({
  vaultType,
  vaultId,
  chainId,
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
    setVaultModalState((previousState) => ({
      ...previousState,
      isShow: true,
      vaultType,
      vaultId,
      chainId,
    }));
  }, [vaultType, vaultId, chainId, setVaultModalState]);

  return (
    <Link to={vaultModalRoute}>
      <BaseVaultModalButton onClick={handleButtonClick} primaryColor="#81E429">
        {children}
      </BaseVaultModalButton>
    </Link>
  );
};
