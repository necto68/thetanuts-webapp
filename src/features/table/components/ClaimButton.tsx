import type { FC } from "react";
import { useCallback } from "react";

import { useIndexVaultModalState } from "../../index-vault-modal/hooks";
import type { ChainId } from "../../wallet/constants";
import { BaseButton } from "../../shared/components";
import { ModalContentType } from "../../index-vault-modal/types/modalContentType";

interface SwapButtonProps {
  indexVaultId: string;
  chainId?: ChainId;
}

export const ClaimButton: FC<SwapButtonProps> = ({ indexVaultId, chainId }) => {
  const [, setIndexVaultModalState] = useIndexVaultModalState();

  const handleButtonClick = useCallback(() => {
    setIndexVaultModalState((previousState) => ({
      ...previousState,
      isShow: true,
      indexVaultId,
      contentType: ModalContentType.withdrawClaim,
      withdrawId: 1,
      chainId,
    }));
  }, [indexVaultId, chainId, setIndexVaultModalState]);

  return <BaseButton onClick={handleButtonClick}>Claim</BaseButton>;
};
