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
import { MinPositionRequiredMainButton } from "../../modal/components/MinPositionRequiredMainButton";
import { MaxVaultCapReachedMainButton } from "../../modal/components/MaxVaultCapReachedMainButton";
import { LoadingMainButton } from "../../modal/components/LoadingMainButton";
import { ActionMainButton } from "../../modal/components/ActionMainButton";
import { resetMutations } from "../helpers";
import {
  useLongModalConfig,
  useLongModalMutations,
} from "../../long-vault-modal/hooks";
import { useLongOptionModalConfig } from "../../long-option-modal/hooks";
import { BasicVaultType } from "../../basic/types";
import { VaultType } from "../../basic-vault/types";
import { getLongVaultContractsTitle } from "../../table/helpers";
import { useVaultModalState } from "../../modal/hooks";
import { VaultModalType } from "../../root/types";
import { ModalContentType } from "../../index-vault-modal/types";
import { useWallet } from "../../wallet/hooks";
import { PriceItmMainButton } from "../../modal/components/PriceItmMainButton";
import { VaultStatus } from "../types";
import { getVaultStatus } from "../../degen-vault-modal/helpers/utils";

import { SwitchToChainIdMainButton } from "./SwitchToChainIdMainButton";

// eslint-disable-next-line complexity
export const DepositMainButton = () => {
  const [{ vaultType }, setVaultModalState] = useVaultModalState();
  const { walletChainId, walletProvider, basicVaultChainId, basicVaultQuery } =
    useBasicModalConfig();
  const { longVaultReaderQuery, collateralAssetQuery } = useLongModalConfig();
  const { longOptionReaderQuery } = useLongOptionModalConfig();
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
    approveAllowanceMutation,
    wrapMutation,
    directDepositMutation,
    depositAndQueueMutation,
    runApproveAllowance,
    runWrap,
    runDirectDeposit,
    runDepositAndQueue,
  } = useBasicModalMutations();
  const {
    approveDelegationMutation,
    openPositionMutation,
    openPositionImmediatelyMutation,
    runApproveDelegation,
    runOpenPosition,
    runOpenPositionImmediately,
  } = useLongModalMutations();

  const { wallet } = useWallet();

  const { data, isLoading: isBasicVaultLoading } = basicVaultQuery;
  const {
    type = VaultType.CALL,
    basicVaultType = BasicVaultType.BASIC,
    assetSymbol = "",
    collateralSymbol = "",
    assetPrice = 0,
    strikePrices = [0],
    minDepositorValue = new Big(0),
    isSettled = false,
    isExpired = false,
    isAllowInteractions = false,
    isSupportDepositor = false,
  } = data ?? {};

  const { data: longVaultReaderData } = longVaultReaderQuery;
  const { borrowAllowance } = longVaultReaderData ?? {};

  const { data: collateralAssetData } = collateralAssetQuery;
  const { availableLeverage = 1 } = collateralAssetData ?? {};

  const { data: longOptionReaderData } = longOptionReaderQuery;
  const { contractsToBorrow = null } = longOptionReaderData ?? {};

  const vaultStatus = getVaultStatus(isSettled, isExpired, isAllowInteractions);
  const isActiveEpochStatus = vaultStatus === VaultStatus.ACTIVE_EPOCH;

  const isLongVault = basicVaultType === BasicVaultType.LONG;
  const isLongOptionModal = vaultType === VaultModalType.longTrade;
  const isLongOptionPositionModal = vaultType === VaultModalType.longPosition;

  const handleResetButtonClick = useCallback(() => {
    const mutations = [
      approveAllowanceMutation,
      wrapMutation,
      directDepositMutation,
      depositAndQueueMutation,
      approveDelegationMutation,
      openPositionMutation,
      openPositionImmediatelyMutation,
    ];

    resetMutations(mutations);
  }, [
    approveAllowanceMutation,
    wrapMutation,
    directDepositMutation,
    depositAndQueueMutation,
    approveDelegationMutation,
    openPositionMutation,
    openPositionImmediatelyMutation,
  ]);

  const {
    isLoading: isApproveAllowanceLoading,
    isError: isApproveAllowanceError,
    error: approveAllowanceError,
  } = approveAllowanceMutation ?? {};

  const {
    isLoading: isWrapLoading,
    isError: isWrapError,
    error: wrapError,
  } = wrapMutation ?? {};

  const {
    isLoading: isDirectDepositLoading,
    isError: isDirectDepositError,
    error: directDepositError,
  } = directDepositMutation ?? {};

  const {
    isLoading: isDepositAndQueueLoading,
    isError: isDepositAndQueueError,
    error: depositAndQueueError,
  } = depositAndQueueMutation ?? {};

  const {
    isLoading: isApproveDelegationLoading,
    isError: isApproveDelegationError,
    error: approveDelegationError,
  } = approveDelegationMutation ?? {};

  const {
    isLoading: isOpenPositionLoading,
    isError: isOpenPositionError,
    error: openPositionError,
  } = openPositionMutation ?? {};

  const {
    isLoading: isOpenPositionImmediatelyLoading,
    isError: isOpenPositionImmediatelyError,
    error: openPositionImmediatelyError,
  } = openPositionImmediatelyMutation ?? {};

  const isError =
    Boolean(isApproveAllowanceError) ||
    Boolean(isWrapError) ||
    Boolean(isDirectDepositError) ||
    Boolean(isDepositAndQueueError) ||
    Boolean(isApproveDelegationError) ||
    Boolean(isOpenPositionError) ||
    Boolean(isOpenPositionImmediatelyError);

  const error =
    approveAllowanceError ??
    wrapError ??
    directDepositError ??
    depositAndQueueError ??
    approveDelegationError ??
    openPositionError ??
    openPositionImmediatelyError;

  const inputValueBig = new Big(inputValue || 0);

  const currentTokenData = isUseNativeData ? nativeData : tokenData;

  const isNeedApprove =
    currentTokenData?.allowance &&
    inputValueBig.gt(0) &&
    inputValueBig.gt(currentTokenData.allowance);

  const isNeedLongVaultDelegationApprove =
    isLongVault &&
    borrowAllowance &&
    inputValueBig.gt(0) &&
    inputValueBig.gt(borrowAllowance);

  const isApproveLoading =
    Boolean(isApproveAllowanceLoading) || Boolean(isApproveDelegationLoading);

  const isLongOptionMainButtonDisabled =
    (isLongOptionModal || isLongOptionPositionModal) && !contractsToBorrow;
  const isInputNotReady =
    isTokenDataLoading || !currentTokenData || inputValueBig.lte(0);
  const isMainButtonDisabled =
    isInputNotReady || isLongOptionMainButtonDisabled;

  const isPriceITM =
    (type === VaultType.CALL && strikePrices[0] < assetPrice) ||
    (type === VaultType.PUT && strikePrices[0] > assetPrice);

  const isShowPriceITMError =
    isActiveEpochStatus &&
    basicVaultType === BasicVaultType.BASIC &&
    (isSupportDepositor ? inputValueBig.lt(minDepositorValue) : true) &&
    isPriceITM;

  if (!wallet) {
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

  if (isShowPriceITMError) {
    return <PriceItmMainButton />;
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

  if (isApproveLoading && currentTokenData) {
    return (
      <LoadingMainButton>{`Approving ${currentTokenData.symbol}...`}</LoadingMainButton>
    );
  }

  if (isNeedLongVaultDelegationApprove) {
    return (
      <ActionMainButton onClick={runApproveDelegation}>
        Approve Delegation
      </ActionMainButton>
    );
  }

  if (isNeedApprove) {
    const title = isLongVault
      ? `Approve ${currentTokenData.symbol} for Open Position`
      : `Approve ${currentTokenData.symbol} for Deposit`;

    return (
      <ActionMainButton onClick={runApproveAllowance}>{title}</ActionMainButton>
    );
  }

  if (isWrapLoading) {
    return <LoadingMainButton>Wrapping...</LoadingMainButton>;
  }

  if (isDirectDepositLoading || isDepositAndQueueLoading) {
    return <LoadingMainButton>Depositing...</LoadingMainButton>;
  }

  if (isOpenPositionLoading || isOpenPositionImmediatelyLoading) {
    return <LoadingMainButton>Opening Position...</LoadingMainButton>;
  }

  if (
    (isLongOptionPositionModal || isLongOptionModal) &&
    !contractsToBorrow &&
    !isInputNotReady
  ) {
    return <LoadingMainButton>Bid...</LoadingMainButton>;
  }

  let buttonTitle = "";
  let handleMainButtonClick = null;

  if (isUseNativeData) {
    buttonTitle = currentTokenData
      ? `Wrap ${currentTokenData.symbol} to W${currentTokenData.symbol}`
      : "Wrap";

    handleMainButtonClick = runWrap;
  } else if (isLongOptionPositionModal || isLongOptionModal) {
    // need to show loading while we are fetching current contractsToBorrow
    const loadingPlaceholder = ".....";

    const longValue = contractsToBorrow
      ? contractsToBorrow.toFixed(2)
      : loadingPlaceholder;

    const contractsTitle = getLongVaultContractsTitle(
      type,
      assetSymbol,
      collateralSymbol
    );

    buttonTitle = inputValueBig.gt(0)
      ? `Bid ${longValue} ${contractsTitle}`
      : "Bid";

    const showOpenLongOptionPositionModal = () => {
      setVaultModalState((previousState) => ({
        ...previousState,
        vaultType: VaultModalType.longPosition,
        contentType: ModalContentType.openLongOptionPosition,
        isShow: true,
        isRouterModal: false,
        defaultInputValue: inputValue,
      }));
    };

    handleMainButtonClick = isLongOptionPositionModal
      ? runOpenPositionImmediately
      : showOpenLongOptionPositionModal;
  } else if (isLongVault) {
    const longValue = inputValueBig.mul(availableLeverage).toFixed(2);

    const contractsTitle = getLongVaultContractsTitle(
      type,
      assetSymbol,
      collateralSymbol
    );

    buttonTitle = inputValueBig.gt(0)
      ? `Open Position: Long ${longValue} ${contractsTitle} Contracts`
      : "Open Position";

    handleMainButtonClick = runOpenPosition;
  } else if (isSupportDepositor && inputValueBig.gte(minDepositorValue)) {
    buttonTitle = "Deposit and Queue";
    handleMainButtonClick = runDepositAndQueue;
  } else {
    buttonTitle = "Direct Deposit";
    handleMainButtonClick = runDirectDeposit;
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
