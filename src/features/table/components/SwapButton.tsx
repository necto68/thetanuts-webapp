import type { FC } from "react";
import { useCallback } from "react";
import { generatePath } from "react-router-dom";

import type { ChainId } from "../../wallet/constants";
import { Link } from "../../shared/components";
import { ModalPathname, VaultModalType } from "../../root/types";
import { useVaultModalState } from "../../modal/hooks";

import { BaseSwapButton } from "./SwapButton.styles";

interface SwapButtonProps {
  indexVaultId: string;
  chainId?: ChainId;
}

export const SwapButton: FC<SwapButtonProps> = ({
  indexVaultId: vaultId,
  chainId,
}) => {
  const [vaultModalState, setVaultModalState] = useVaultModalState();

  const { isRouterModal } = vaultModalState;
  const pathname = generatePath(ModalPathname.indexVaultModal, {
    vaultId,
  });
  const indexVaultRoute = isRouterModal ? { pathname } : {};

  const handleButtonClick = useCallback(() => {
    setVaultModalState((previousState) => ({
      ...previousState,
      isShow: true,
      vaultType: VaultModalType.index,
      vaultId,
      chainId,
    }));
  }, [vaultId, chainId, setVaultModalState]);

  return (
    <Link to={indexVaultRoute}>
      <BaseSwapButton onClick={handleButtonClick} primaryColor="#81E429">
        Swap
      </BaseSwapButton>
    </Link>
  );
};
