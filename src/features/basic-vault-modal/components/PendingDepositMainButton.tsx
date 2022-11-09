import { useCallback } from "react";
import { useWallet } from "@gimmixorg/use-wallet";
import Big from "big.js";

import { ErrorMainButton } from "../../modal/components/ErrorMainButton";
import { ModalMainButton } from "../../modal/components/ModalMainButton.styles";
import { useBasicModalMutations, useBasicModalState } from "../hooks";
import { useBasicModalConfig } from "../hooks/useBasicModalConfig";
import { LoadingMainButton } from "../../modal/components/LoadingMainButton";
import { resetMutations } from "../helpers";
import {
  useLongModalConfig,
  useLongModalMutations,
} from "../../long-vault-modal/hooks";
import { BasicVaultType } from "../../basic/types";
import {
  loadingButtonTitles,
  buttonTitles,
} from "../constants/pendingDepositMainButtonTitles";

// eslint-disable-next-line complexity
export const PendingDepositMainButton = () => {
  const {
    walletChainId,
    basicVaultChainId,
    basicVaultQuery,
    basicVaultReaderQuery,
  } = useBasicModalConfig();
  const { longVaultReaderQuery } = useLongModalConfig();
  const { tokenData } = useBasicModalState();
  const { depositMutation, cancelDepositMutation, runCancelDeposit } =
    useBasicModalMutations();
  const {
    openPositionMutation,
    cancelPendingPositionMutation,
    runCancelPendingPosition,
  } = useLongModalMutations();

  const { account } = useWallet();

  const handleResetButtonClick = useCallback(() => {
    const mutations = [cancelDepositMutation, cancelPendingPositionMutation];

    resetMutations(mutations);
  }, [cancelDepositMutation, cancelPendingPositionMutation]);

  const { isLoading: isDepositLoading } = depositMutation ?? {};
  const { isLoading: isOpenPositionLoading } = openPositionMutation ?? {};

  const {
    isLoading: isCancelDepositLoading,
    isError: isCancelDepositError,
    error: cancelDepositError,
  } = cancelDepositMutation ?? {};

  const {
    isLoading: isCancelPendingPositionLoading,
    isError: isCancelPendingPositionError,
    error: cancelPendingPositionError,
  } = cancelPendingPositionMutation ?? {};

  const isError =
    Boolean(isCancelDepositError) || Boolean(isCancelPendingPositionError);
  const error = cancelDepositError ?? cancelPendingPositionError;

  const { data, isLoading: isBasicVaultLoading } = basicVaultQuery;
  const { data: basicVaultReaderData } = basicVaultReaderQuery;
  const { data: longVaultReaderData } = longVaultReaderQuery;

  const { basicVaultType = BasicVaultType.BASIC } = data ?? {};
  const { depositPending = new Big(0) } = basicVaultReaderData ?? {};
  const { borrowPending = new Big(0) } = longVaultReaderData ?? {};

  const isShowForVaults = {
    [BasicVaultType.BASIC]: Boolean(depositPending?.gt(0)),
    [BasicVaultType.DEGEN]: Boolean(depositPending?.gt(0)),
    [BasicVaultType.LONG]: Boolean(borrowPending?.gt(0)),
  };

  const mainButtonClickHandlers = {
    [BasicVaultType.BASIC]: runCancelDeposit,
    [BasicVaultType.DEGEN]: runCancelDeposit,
    [BasicVaultType.LONG]: runCancelPendingPosition,
  };

  const loadingButtonTitle = loadingButtonTitles[basicVaultType];
  const buttonTitle = buttonTitles[basicVaultType];
  const handleMainButtonClick = mainButtonClickHandlers[basicVaultType];

  const isShow =
    account &&
    walletChainId === basicVaultChainId &&
    !isBasicVaultLoading &&
    tokenData &&
    isShowForVaults[basicVaultType];

  if (!isShow) {
    return null;
  }

  if (isError && error) {
    return <ErrorMainButton error={error} onClick={handleResetButtonClick} />;
  }

  if (isCancelDepositLoading || isCancelPendingPositionLoading) {
    return <LoadingMainButton>{loadingButtonTitle}</LoadingMainButton>;
  }

  if (isDepositLoading || isOpenPositionLoading) {
    return <ModalMainButton disabled>{buttonTitle}</ModalMainButton>;
  }

  return (
    <ModalMainButton
      onClick={handleMainButtonClick}
      primaryColor="#EB5853"
      secondaryColor="#ffffff"
    >
      {buttonTitle}
    </ModalMainButton>
  );
};
