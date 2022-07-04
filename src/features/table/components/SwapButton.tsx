import type { FC } from "react";
import { useCallback } from "react";
import { generatePath } from "react-router-dom";

import { useIndexVaultModalState } from "../../index-vault-modal/hooks";
import type { ChainId } from "../../wallet/constants";
import { Link } from "../../shared/components";
import { ModalPathname } from "../../root/types";

import { BaseSwapButton } from "./SwapButton.styles";

interface SwapButtonProps {
  indexVaultId: string;
  chainId?: ChainId;
}

export const SwapButton: FC<SwapButtonProps> = ({ indexVaultId, chainId }) => {
  const [indexVaultModalState, setIndexVaultModalState] =
    useIndexVaultModalState();

  const { isRouterModal } = indexVaultModalState;
  const pathname = generatePath(ModalPathname.indexVaultModal, {
    vaultId: indexVaultId,
  });
  const indexVaultRoute = isRouterModal ? { pathname } : {};

  const handleButtonClick = useCallback(() => {
    setIndexVaultModalState({
      ...indexVaultModalState,
      isShow: true,
      indexVaultId,
      chainId,
    });
  }, [indexVaultId, chainId, indexVaultModalState, setIndexVaultModalState]);

  return (
    <Link to={indexVaultRoute}>
      <BaseSwapButton onClick={handleButtonClick} primaryColor="#81E429">
        Swap
      </BaseSwapButton>
    </Link>
  );
};
