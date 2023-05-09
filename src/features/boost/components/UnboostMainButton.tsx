import { useWallet } from "@gimmixorg/use-wallet";
import Big from "big.js";
import { useCallback } from "react";

import { ModalMainButton } from "../../modal/components/ModalMainButton.styles";
import {
  useBasicModalConfig,
  useBasicModalState,
} from "../../basic-vault-modal/hooks";
import { useBoostModalMutations } from "../hooks";
import { ConnectWalletMainButton } from "../../modal/components/ConnectWalletMainButton";
import { InsufficientBalanceMainButton } from "../../modal/components/InsufficientBalanceMainButton";
import { SwitchToChainIdMainButton } from "../../basic-vault-modal/components/SwitchToChainIdMainButton";
import { LoadingMainButton } from "../../modal/components/LoadingMainButton";
import { ErrorMainButton } from "../../modal/components/ErrorMainButton";
import { resetMutations } from "../../basic-vault-modal/helpers";

// eslint-disable-next-line complexity
export const UnboostMainButton = () => {
  const { walletChainId, walletProvider, basicVaultChainId, basicVaultQuery } =
    useBasicModalConfig();
  const {
    inputValue,
    tokenData,
    isTokenDataLoading,
    nativeData,
    isUseNativeData,
  } = useBasicModalState();
  const { unboostMutation, runUnboost } = useBoostModalMutations();

  const { account } = useWallet();

  const { isLoading: isBasicVaultLoading } = basicVaultQuery;

  const handleResetButtonClick = useCallback(() => {
    const mutations = [unboostMutation];

    resetMutations(mutations);
  }, [unboostMutation]);

  const {
    isLoading: isUnboostLoading,
    isError: isUnboostError,
    error: unboostError,
  } = unboostMutation ?? {};

  const isError = Boolean(isUnboostError);

  const error = unboostError;

  const inputValueBig = new Big(inputValue || 0);

  const currentTokenData = isUseNativeData ? nativeData : tokenData;

  const isInputValueValid = inputValueBig.gt(0);
  const handleMainButtonClick = runUnboost;

  const isMainButtonDisabled =
    isTokenDataLoading || !currentTokenData || !isInputValueValid;

  if (isError && error) {
    return <ErrorMainButton error={error} onClick={handleResetButtonClick} />;
  }

  if (isUnboostLoading) {
    return <LoadingMainButton>Unboosting...</LoadingMainButton>;
  }

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

  if (
    currentTokenData?.balance &&
    inputValueBig.gt(0) &&
    inputValueBig.gt(currentTokenData.balance)
  ) {
    return <InsufficientBalanceMainButton />;
  }

  return isMainButtonDisabled ? (
    <ModalMainButton disabled>Enter An Amount</ModalMainButton>
  ) : (
    <ModalMainButton
      onClick={handleMainButtonClick}
      primaryColor="#12CC86"
      secondaryColor="#ffffff"
    >
      Unboost
    </ModalMainButton>
  );
};
