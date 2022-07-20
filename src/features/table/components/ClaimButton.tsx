import type { FC } from "react";
import { useCallback } from "react";

import { useIndexVaultModalState } from "../../index-vault-modal/hooks";
import type { ChainId } from "../../wallet/constants";
import { ModalContentType } from "../../index-vault-modal/types";

import { BaseClaimButton } from "./ClaimButton.styles";

interface ClaimButtonProps {
  indexVaultId: string;
  chainId?: ChainId;
  withdrawId?: number;
}

export const ClaimButton: FC<ClaimButtonProps> = ({
  indexVaultId,
  chainId,
  withdrawId,
}) => {
  const [, setIndexVaultModalState] = useIndexVaultModalState();

  const handleButtonClick = useCallback(() => {
    setIndexVaultModalState((previousState) => ({
      ...previousState,
      contentType: ModalContentType.withdrawClaim,
      isShow: true,
      indexVaultId,
      withdrawId,
      chainId,
    }));
  }, [indexVaultId, chainId, setIndexVaultModalState, withdrawId]);

  return (
    <BaseClaimButton onClick={handleButtonClick} primaryColor="#81E429">
      Claim
    </BaseClaimButton>
  );
};
