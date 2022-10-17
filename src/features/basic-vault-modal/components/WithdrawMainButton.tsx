import { useWallet } from "@gimmixorg/use-wallet";
import { useCallback } from "react";
import Big from "big.js";

import { ModalMainButton } from "../../modal/components/ModalMainButton.styles";
import { useBasicModalMutations, useBasicModalState } from "../hooks";
import { useBasicModalConfig } from "../hooks/useBasicModalConfig";
import { ConnectWalletMainButton } from "../../modal/components/ConnectWalletMainButton";
import { ErrorMainButton } from "../../modal/components/ErrorMainButton";
import { InsufficientBalanceMainButton } from "../../modal/components/InsufficientBalanceMainButton";
import { LoadingMainButton } from "../../modal/components/LoadingMainButton";
import { resetMutations } from "../helpers";
import { BasicVaultType } from "../../basic/types";

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

  const { account } = useWallet();

  const { data, isLoading: isBasicVaultLoading } = basicVaultQuery;
  const { basicVaultType = BasicVaultType.BASIC } = data ?? {};

  const { data: basicVaultReaderData } = basicVaultReaderQuery;
  const { currentPosition = new Big(0), withdrawalPending = new Big(0) } =
    basicVaultReaderData ?? {};

  const handleResetButtonClick = useCallback(() => {
    const mutations = [initWithdrawMutation];

    resetMutations(mutations);
  }, [initWithdrawMutation]);

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

  const isCancelWithdrawOrWithdrawMutationLoading =
    Boolean(isCancelWithdrawLoading) || Boolean(isWithdrawLoading);

  const isError =
    Boolean(isInitWithdrawError) || Boolean(isInitFullWithdrawError);
  const error = initWithdrawError ?? initFullWithdrawError;

  const inputValueBig = new Big(inputValue || 0);

  const currentTokenData = isUseNativeData ? nativeData : tokenData;

  const isMainButtonLoading =
    Boolean(isInitWithdrawLoading) || Boolean(isInitFullWithdrawLoading);

  // for degen vault we need to check if currentPosition is greater > 0 and withdrawalPending === 0
  // for basic vault we need to check if user input is greater than 0
  const isInputValueValid =
    basicVaultType === BasicVaultType.DEGEN
      ? currentPosition?.gt(0) && withdrawalPending?.eq(0)
      : inputValueBig.gt(0);

  const loadingButtonTitle =
    basicVaultType === BasicVaultType.DEGEN
      ? "Initiating Full Withdraw..."
      : "Initiating Withdraw...";

  const buttonTitle =
    basicVaultType === BasicVaultType.DEGEN
      ? "Initiate Full Withdraw"
      : "Initiate Withdraw";

  const handleMainButtonClick =
    basicVaultType === BasicVaultType.DEGEN
      ? runInitFullWithdraw
      : runInitWithdraw;

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
