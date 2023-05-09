import { useWallet } from "@gimmixorg/use-wallet";
import { useCallback } from "react";
import Big from "big.js";

import { ModalMainButton } from "../../modal/components/ModalMainButton.styles";
import {
  useBasicModalConfig,
  useBasicModalState,
} from "../../basic-vault-modal/hooks";
import { useBoostModalMutations } from "../hooks";
import { ConnectWalletMainButton } from "../../modal/components/ConnectWalletMainButton";
import { ErrorMainButton } from "../../modal/components/ErrorMainButton";
import { InsufficientBalanceMainButton } from "../../modal/components/InsufficientBalanceMainButton";
import { MinPositionRequiredMainButton } from "../../modal/components/MinPositionRequiredMainButton";
import { MaxVaultCapReachedMainButton } from "../../modal/components/MaxVaultCapReachedMainButton";
import { LoadingMainButton } from "../../modal/components/LoadingMainButton";
import { ActionMainButton } from "../../modal/components/ActionMainButton";
import { resetMutations } from "../../basic-vault-modal/helpers";
import { SwitchToChainIdMainButton } from "../../basic-vault-modal/components/SwitchToChainIdMainButton";

// eslint-disable-next-line complexity
export const BoostMainButton = () => {
  const { walletChainId, walletProvider, basicVaultChainId, basicVaultQuery } =
    useBasicModalConfig();
  const {
    inputValue,
    tokenData,
    isTokenDataLoading,
    nativeData,
    isUseNativeData,
    minInputValue,
    maxInputValue,
  } = useBasicModalState();
  const {
    approveLpoolAllowanceMutation,
    boostMutation,
    runApproveLpoolAllowance,
    runBoost,
  } = useBoostModalMutations();

  const { account } = useWallet();

  const { isLoading: isBasicVaultQueryLoading } = basicVaultQuery;

  const handleResetButtonClick = useCallback(() => {
    const mutations = [approveLpoolAllowanceMutation, boostMutation];

    resetMutations(mutations);
  }, [approveLpoolAllowanceMutation, boostMutation]);

  const {
    isLoading: isApproveLpoolAllowanceLoading,
    isError: isApproveLpoolAllowanceError,
    error: approveLpoolAllowanceError,
  } = approveLpoolAllowanceMutation ?? {};

  const {
    isLoading: isBoostLoading,
    isError: isBoostError,
    error: boostError,
  } = boostMutation ?? {};

  const isError =
    Boolean(isApproveLpoolAllowanceError) || Boolean(isBoostError);

  const error = approveLpoolAllowanceError ?? boostError;

  const inputValueBig = new Big(inputValue || 0);

  const currentTokenData = isUseNativeData ? nativeData : tokenData;

  const isNeedApprove =
    currentTokenData?.allowance &&
    inputValueBig.gt(0) &&
    inputValueBig.gt(currentTokenData.allowance);

  const isMainButtonDisabled =
    isTokenDataLoading || !currentTokenData || inputValueBig.lte(0);

  if (!account) {
    return <ConnectWalletMainButton />;
  }

  if (!isBasicVaultQueryLoading && walletChainId !== basicVaultChainId) {
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

  if (minInputValue && inputValueBig.gt(0) && inputValueBig.lt(minInputValue)) {
    return <MinPositionRequiredMainButton />;
  }

  if (maxInputValue && inputValueBig.gt(maxInputValue)) {
    return <MaxVaultCapReachedMainButton />;
  }

  if (isNeedApprove) {
    const title = `Approve ${currentTokenData.symbol} for Boost`;

    return (
      <ActionMainButton onClick={runApproveLpoolAllowance}>
        {title}
      </ActionMainButton>
    );
  }

  if (isApproveLpoolAllowanceLoading) {
    return <LoadingMainButton>Approving...</LoadingMainButton>;
  }

  if (isBoostLoading) {
    return <LoadingMainButton>Boosting...</LoadingMainButton>;
  }

  let buttonTitle = "";
  let handleMainButtonClick = null;
  buttonTitle = "Boost";
  handleMainButtonClick = runBoost;

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
