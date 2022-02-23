import type { FC } from "react";
import { useCallback } from "react";

import { useIndexVaultModalState } from "../../index-vault-modal/hooks";

import { BaseSwapButton } from "./SwapButton.styles";

interface SwapButtonProps {
  indexVaultId: string;
}

export const SwapButton: FC<SwapButtonProps> = ({ indexVaultId }) => {
  const [, setModalState] = useIndexVaultModalState();

  const handleButtonClick = useCallback(() => {
    setModalState({ isShow: true, indexVaultId });
  }, [setModalState, indexVaultId]);

  return (
    <BaseSwapButton onClick={handleButtonClick} primaryColor="#81E429">
      Swap
    </BaseSwapButton>
  );
};
