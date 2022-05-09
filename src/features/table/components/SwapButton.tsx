import type { FC } from "react";
import { useCallback } from "react";

import { useIndexVaultModalState } from "../../index-vault-modal/hooks";
import type { ChainId } from "../../wallet/constants";

import { BaseSwapButton } from "./SwapButton.styles";

interface SwapButtonProps {
  indexVaultId: string;
  chainId?: ChainId;
}

export const SwapButton: FC<SwapButtonProps> = ({ indexVaultId, chainId }) => {
  const [, setModalState] = useIndexVaultModalState();

  const handleButtonClick = useCallback(() => {
    setModalState({ isShow: true, indexVaultId, chainId });
  }, [setModalState, indexVaultId, chainId]);

  return (
    <BaseSwapButton onClick={handleButtonClick} primaryColor="#81E429">
      Swap
    </BaseSwapButton>
  );
};
