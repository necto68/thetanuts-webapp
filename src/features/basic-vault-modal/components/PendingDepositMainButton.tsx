import { useCallback } from "react";
import { useWallet } from "@gimmixorg/use-wallet";
import Big from "big.js";

import { ErrorMainButton } from "../../modal/components/ErrorMainButton";
import { ModalMainButton } from "../../modal/components/ModalMainButton.styles";
import { useBasicModalMutations, useBasicModalState } from "../hooks";
import { useBasicModalConfig } from "../hooks/useBasicModalConfig";
import { LoadingMainButton } from "../../modal/components/LoadingMainButton";
import { resetMutations } from "../helpers";

// eslint-disable-next-line complexity
export const PendingDepositMainButton = () => {
  const {
    walletChainId,
    basicVaultChainId,
    basicVaultQuery,
    basicVaultReaderQuery,
  } = useBasicModalConfig();
  const { tokenData } = useBasicModalState();
  const { depositMutation, cancelDepositMutation, runCancelDeposit } =
    useBasicModalMutations();

  const { account } = useWallet();

  const handleResetButtonClick = useCallback(() => {
    const mutations = [cancelDepositMutation];

    resetMutations(mutations);
  }, [cancelDepositMutation]);

  const { isLoading: isDepositLoading } = depositMutation ?? {};

  const {
    isLoading: isCancelDepositLoading,
    isError: isCancelDepositError,
    error: cancelDepositError,
  } = cancelDepositMutation ?? {};

  const isError = Boolean(isCancelDepositError);
  const error = cancelDepositError;

  const { isLoading: isBasicVaultLoading } = basicVaultQuery;
  const { data } = basicVaultReaderQuery;

  const { depositPending = new Big(0) } = data ?? {};

  const isShow =
    account &&
    walletChainId === basicVaultChainId &&
    !isBasicVaultLoading &&
    tokenData &&
    depositPending &&
    depositPending.gt(0);

  if (!isShow) {
    return null;
  }

  if (isError && error) {
    return <ErrorMainButton error={error} onClick={handleResetButtonClick} />;
  }

  if (isCancelDepositLoading) {
    return <LoadingMainButton>Canceling...</LoadingMainButton>;
  }

  if (isDepositLoading) {
    return <ModalMainButton disabled>Cancel Deposit</ModalMainButton>;
  }

  return (
    <ModalMainButton
      onClick={runCancelDeposit}
      primaryColor="#EB5853"
      secondaryColor="#ffffff"
    >
      Cancel Deposit
    </ModalMainButton>
  );
};
