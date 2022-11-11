import { useWallet } from "@gimmixorg/use-wallet";
import { useCallback } from "react";
import Big from "big.js";

import { ModalMainButton } from "../../modal/components/ModalMainButton.styles";
import {
  useBasicModalConfig,
  useBasicModalState,
  useBasicModalMutations,
} from "../hooks";
import { ConnectWalletMainButton } from "../../modal/components/ConnectWalletMainButton";
import { ErrorMainButton } from "../../modal/components/ErrorMainButton";
import { InsufficientBalanceMainButton } from "../../modal/components/InsufficientBalanceMainButton";
import { LoadingMainButton } from "../../modal/components/LoadingMainButton";
import { resetMutations } from "../helpers";
import { BasicVaultType } from "../../basic/types";
import {
  useLongModalConfig,
  useLongModalMutations,
} from "../../long-vault-modal/hooks";
import {
  loadingButtonTitles,
  buttonTitles,
} from "../constants/withdrawMainButtonTitles";

import { SwitchToChainIdMainButton } from "./SwitchToChainIdMainButton";

// eslint-disable-next-line complexity
export const WithdrawMainButton = () => {
  const {
    walletChainId,
    walletProvider,
    basicVaultChainId,
    basicVaultQuery,
    basicVaultReaderQuery,
  } = useBasicModalConfig();
  const { longVaultReaderQuery } = useLongModalConfig();
  const {
    inputValue,
    tokenData,
    isTokenDataLoading,
    nativeData,
    isUseNativeData,
  } = useBasicModalState();
  const {
    initWithdrawMutation,
    initFullWithdrawMutation,
    cancelWithdrawMutation,
    withdrawMutation,
    runInitWithdraw,
    runInitFullWithdraw,
  } = useBasicModalMutations();
  const { closePositionAndWithdrawMutation, runClosePositionAndWithdraw } =
    useLongModalMutations();

  const { account } = useWallet();

  const { data, isLoading: isBasicVaultLoading } = basicVaultQuery;
  const { basicVaultType = BasicVaultType.BASIC } = data ?? {};

  const { data: basicVaultReaderData } = basicVaultReaderQuery;
  const {
    currentPosition: basicVaultCurrentPosition = new Big(0),
    withdrawalPending = new Big(0),
  } = basicVaultReaderData ?? {};

  const { data: longVaultReaderData } = longVaultReaderQuery;
  const { currentContractsPosition = new Big(0) } = longVaultReaderData ?? {};

  const handleResetButtonClick = useCallback(() => {
    const mutations = [
      initWithdrawMutation,
      initFullWithdrawMutation,
      closePositionAndWithdrawMutation,
    ];

    resetMutations(mutations);
  }, [
    initWithdrawMutation,
    initFullWithdrawMutation,
    closePositionAndWithdrawMutation,
  ]);

  const {
    isLoading: isInitWithdrawLoading,
    isError: isInitWithdrawError,
    error: initWithdrawError,
  } = initWithdrawMutation ?? {};

  const {
    isLoading: isInitFullWithdrawLoading,
    isError: isInitFullWithdrawError,
    error: initFullWithdrawError,
  } = initFullWithdrawMutation ?? {};

  const { isLoading: isCancelWithdrawLoading } = cancelWithdrawMutation ?? {};
  const { isLoading: isWithdrawLoading } = withdrawMutation ?? {};

  const {
    isLoading: isClosePositionAndWithdrawLoading,
    isError: isClosePositionAndWithdrawError,
    error: closePositionAndWithdrawError,
  } = closePositionAndWithdrawMutation ?? {};

  const isCancelWithdrawOrWithdrawMutationLoading =
    Boolean(isCancelWithdrawLoading) || Boolean(isWithdrawLoading);

  const isError =
    Boolean(isInitWithdrawError) ||
    Boolean(isInitFullWithdrawError) ||
    Boolean(isClosePositionAndWithdrawError);
  const error =
    initWithdrawError ?? initFullWithdrawError ?? closePositionAndWithdrawError;

  const inputValueBig = new Big(inputValue || 0);

  const currentTokenData = isUseNativeData ? nativeData : tokenData;

  const isMainButtonLoading =
    Boolean(isInitWithdrawLoading) ||
    Boolean(isInitFullWithdrawLoading) ||
    Boolean(isClosePositionAndWithdrawLoading);

  // for basic vault we need to check if user input is greater than 0
  // for degen vault we need to check if currentPosition is greater > 0 and withdrawalPending === 0
  // for long vault we need to check if currentContractsPosition is greater > 0
  const isValidInputMap = {
    [BasicVaultType.BASIC]: inputValueBig.gt(0),

    [BasicVaultType.DEGEN]:
      basicVaultCurrentPosition?.gt(0) && withdrawalPending?.eq(0),

    [BasicVaultType.LONG]: currentContractsPosition?.gt(0),
  };

  const mainButtonClickHandlers = {
    [BasicVaultType.BASIC]: runInitWithdraw,
    [BasicVaultType.DEGEN]: runInitFullWithdraw,
    [BasicVaultType.LONG]: runClosePositionAndWithdraw,
  };

  const isInputValueValid = isValidInputMap[basicVaultType];
  const loadingButtonTitle = loadingButtonTitles[basicVaultType];
  const buttonTitle = buttonTitles[basicVaultType];
  const handleMainButtonClick = mainButtonClickHandlers[basicVaultType];

  const isMainButtonDisabled =
    isTokenDataLoading ||
    isCancelWithdrawOrWithdrawMutationLoading ||
    !currentTokenData ||
    !isInputValueValid;

  if (!account) {
    return <ConnectWalletMainButton />;
  }

  if (!isBasicVaultLoading && walletChainId !== basicVaultChainId) {
    return (
      <SwitchToChainIdMainButton
        chainId={basicVaultChainId}
        provider={walletProvider}
      />
    );
  }

  if (isError && error) {
    return <ErrorMainButton error={error} onClick={handleResetButtonClick} />;
  }

  if (
    currentTokenData?.balance &&
    inputValueBig.gt(0) &&
    inputValueBig.gt(currentTokenData.balance)
  ) {
    return <InsufficientBalanceMainButton />;
  }

  if (isMainButtonLoading) {
    return <LoadingMainButton>{loadingButtonTitle}</LoadingMainButton>;
  }

  return isMainButtonDisabled ? (
    <ModalMainButton disabled>{buttonTitle}</ModalMainButton>
  ) : (
    <ModalMainButton
      onClick={handleMainButtonClick}
      primaryColor="#12CC86"
      secondaryColor="#ffffff"
    >
      {buttonTitle}
    </ModalMainButton>
  );
};
