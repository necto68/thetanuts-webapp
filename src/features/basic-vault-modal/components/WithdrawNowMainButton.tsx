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
import { BasicVaultType } from "../../basic/types";
import { useLongModalConfig } from "../../long-vault-modal/hooks";

import { SwitchToChainIdMainButton } from "./SwitchToChainIdMainButton";

// eslint-disable-next-line complexity
export const WithdrawNowMainButton = () => {
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
  const { cancelWithdrawMutation, withdrawMutation } = useBasicModalMutations();

  const { account } = useWallet();

  const { data, isLoading: isBasicVaultLoading } = basicVaultQuery;
  const { basicVaultType = BasicVaultType.BASIC } = data ?? {};
  const { basicVaultAddress = "" } = data ?? {};

  const { data: basicVaultReaderData } = basicVaultReaderQuery;
  const {
    currentPosition: basicVaultCurrentPosition = new Big(0),
    withdrawalPending = new Big(0),
  } = basicVaultReaderData ?? {};

  const { data: longVaultReaderData } = longVaultReaderQuery;
  const { currentContractsPosition = new Big(0) } = longVaultReaderData ?? {};

  const { isLoading: isCancelWithdrawLoading } = cancelWithdrawMutation ?? {};
  const { isLoading: isWithdrawLoading } = withdrawMutation ?? {};

  const isCancelWithdrawOrWithdrawMutationLoading =
    Boolean(isCancelWithdrawLoading) || Boolean(isWithdrawLoading);

  const inputValueBig = new Big(inputValue || 0);

  const currentTokenData = isUseNativeData ? nativeData : tokenData;

  // for basic vault we need to check if user input is greater than 0
  // for degen vault we need to check if currentPosition is greater > 0 and withdrawalPending === 0
  // for long vault we need to check if currentContractsPosition is greater > 0
  const isValidInputMap = {
    [BasicVaultType.BASIC]: inputValueBig.gt(0),

    [BasicVaultType.DEGEN]:
      basicVaultCurrentPosition?.gt(0) && withdrawalPending?.eq(0),

    [BasicVaultType.WHEEL]: inputValueBig.gt(0),

    [BasicVaultType.LONG]: currentContractsPosition?.gt(0),
  };

  const isInputValueValid = isValidInputMap[basicVaultType];
  const buttonTitle = "Withdraw Now";
  const handleMainButtonClick = useCallback(() => {
    window.open(
      `https://app.uniswap.org/#/swap?inputCurrency=${basicVaultAddress}`,
      "_blank"
    );
  }, [basicVaultAddress]);

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
