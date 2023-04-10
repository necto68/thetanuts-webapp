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
import { MinPositionRequiredMainButton } from "../../modal/components/MinPositionRequiredMainButton";
import { MaxVaultCapReachedMainButton } from "../../modal/components/MaxVaultCapReachedMainButton";
import { LoadingMainButton } from "../../modal/components/LoadingMainButton";
import { ActionMainButton } from "../../modal/components/ActionMainButton";
import { resetMutations } from "../helpers";
import {
  useLongModalConfig,
  useLongModalMutations,
} from "../../long-vault-modal/hooks";
import { BasicVaultType } from "../../basic/types";
import { VaultType } from "../../basic-vault/types";
import { getLongVaultContractsTitle } from "../../table/helpers";

import { SwitchToChainIdMainButton } from "./SwitchToChainIdMainButton";

// eslint-disable-next-line complexity
export const BoostMainButton = () => {
  const { walletChainId, walletProvider, basicVaultChainId, basicVaultQuery } =
    useBasicModalConfig();
  const { longVaultReaderQuery, collateralAssetQuery } = useLongModalConfig();
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
    depositMutation,
    runApproveLpoolAllowance,
    runWrap,
    runBoost,
  } = useBasicModalMutations();
  const {
    approveDelegationMutation,
    openPositionMutation,
    runApproveDelegation,
    runOpenPosition,
  } = useLongModalMutations();

  const { account } = useWallet();

  const { data, isLoading: isBasicVaultQueryLoading } = basicVaultQuery;
  const {
    type = VaultType.CALL,
    basicVaultType = BasicVaultType.BASIC,
    assetSymbol = "",
    collateralSymbol = "",
  } = data ?? {};

  const { data: longVaultReaderData } = longVaultReaderQuery;
  const { borrowAllowance } = longVaultReaderData ?? {};

  const { data: collateralAssetData } = collateralAssetQuery;
  const { availableLeverage = 1 } = collateralAssetData ?? {};

  const isLongVault = basicVaultType === BasicVaultType.LONG;

  const handleResetButtonClick = useCallback(() => {
    const mutations = [
      approveAllowanceMutation,
      wrapMutation,
      depositMutation,
      approveDelegationMutation,
      openPositionMutation,
    ];

    resetMutations(mutations);
  }, [
    approveAllowanceMutation,
    wrapMutation,
    depositMutation,
    approveDelegationMutation,
    openPositionMutation,
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
    isLoading: isDepositLoading,
    isError: isDepositError,
    error: depositError,
  } = depositMutation ?? {};

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

  const isError =
    Boolean(isApproveAllowanceError) ||
    Boolean(isWrapError) ||
    Boolean(isDepositError) ||
    Boolean(isApproveDelegationError) ||
    Boolean(isOpenPositionError);

  const error =
    approveAllowanceError ??
    wrapError ??
    depositError ??
    approveDelegationError ??
    openPositionError;

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
      ? `Approve ${currentTokenData.symbol} for Boost`
      : `Approve ${currentTokenData.symbol} for Boost`;

    return (
      <ActionMainButton onClick={runApproveLpoolAllowance}>{title}</ActionMainButton>
    );
  }

  if (isWrapLoading) {
    return <LoadingMainButton>Wrapping...</LoadingMainButton>;
  }

  if (isDepositLoading) {
    return <LoadingMainButton>Depositing...</LoadingMainButton>;
  }

  if (isOpenPositionLoading) {
    return <LoadingMainButton>Opening Position...</LoadingMainButton>;
  }

  let buttonTitle = "";
  let handleMainButtonClick = null;

  if (isUseNativeData) {
    buttonTitle = currentTokenData
      ? `Wrap ${currentTokenData.symbol} to W${currentTokenData.symbol}`
      : "Wrap";

    handleMainButtonClick = runWrap;
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
  } else {
    buttonTitle = "Enter An Amount";
    handleMainButtonClick = runBoost;
  }

  return isMainButtonDisabled ? (
    <ModalMainButton disabled>{buttonTitle}</ModalMainButton>
  ) : (
    <ModalMainButton
      onClick={handleMainButtonClick}
      primaryColor="#12CC86"
      secondaryColor="#ffffff"
    >
      {"Boost"}
    </ModalMainButton>
  );
};
