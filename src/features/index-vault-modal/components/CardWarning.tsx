import Big from "big.js";
import type { FC } from "react";

import type { NativeToken, Token } from "../types";
import { ModalContentType } from "../types";
import type { ChainId } from "../../wallet/constants";
import { useVaultModalState } from "../../modal/hooks";
import type { VaultModalType } from "../../root/types";

import { PriceWarning } from "./PriceWarning";
import { Container } from "./CardWarning.styles";
import { WarningTitle } from "./TextWarning.styles";

export interface CardWarningProps {
  inputValue: string;
  isSource?: boolean;
  isFlipped: boolean;
  sourceTokenData?: Token;
  tokenData: Token | undefined;
  nativeData: NativeToken | undefined;
  isUseNativeData: boolean;
  vaultType: VaultModalType;
  isDirectModeBetterThanSwapMode?: boolean;
  isUseDirectMode?: boolean;
  disabled?: boolean;
  minInputValue?: number;
  maxInputValue?: number;
  vaultChainId?: ChainId;
  fieldWarning?: string;
}

// eslint-disable-next-line complexity
export const CardWarning: FC<CardWarningProps> = ({
  inputValue,
  isSource = false,
  isFlipped,
  sourceTokenData,
  tokenData,
  nativeData,
  isUseNativeData,
  isDirectModeBetterThanSwapMode = false,
  isUseDirectMode = false,
  disabled,
  minInputValue = 0,
  maxInputValue = Number.MAX_SAFE_INTEGER,
  vaultChainId,
  fieldWarning,
  vaultType,
}) => {
  const [{ contentType }] = useVaultModalState();

  const currentData = isUseNativeData ? nativeData : tokenData;

  const inputValueBig = new Big(inputValue || 0);

  const isShowInsufficientBalanceTitle = Boolean(
    isSource &&
      currentData?.balance &&
      inputValueBig.gt(0) &&
      inputValueBig.gt(currentData.balance) &&
      !disabled
  );

  const isShowMinInputValueTitle = Boolean(
    !isShowInsufficientBalanceTitle &&
      isSource &&
      !isFlipped &&
      inputValueBig.gt(0) &&
      inputValueBig.lt(minInputValue) &&
      contentType !== ModalContentType.withdrawClaim
  );

  const isShowMaxInputValueTitle = Boolean(
    !isShowInsufficientBalanceTitle &&
      isSource &&
      !isFlipped &&
      inputValueBig.gt(0) &&
      inputValueBig.gt(maxInputValue) &&
      contentType !== ModalContentType.withdrawClaim
  );

  const isOnSourceChain = sourceTokenData?.chainId === vaultChainId;

  const isShowDirectDepositProposal =
    !isSource &&
    !isOnSourceChain &&
    isDirectModeBetterThanSwapMode &&
    !isUseDirectMode;

  const isShowSwapProposal =
    !isDirectModeBetterThanSwapMode &&
    contentType === ModalContentType.withdraw;

  const isShowDirectWithdrawProposal =
    !isSource && isFlipped && isDirectModeBetterThanSwapMode && isOnSourceChain;

  const isShowPriceWarning =
    isShowDirectDepositProposal ||
    isShowDirectWithdrawProposal ||
    isShowMinInputValueTitle ||
    isShowMaxInputValueTitle ||
    isShowSwapProposal;

  return isShowPriceWarning || fieldWarning ? (
    <Container>
      <PriceWarning
        isShowDirectDepositProposal={isShowDirectDepositProposal}
        isShowDirectWithdrawProposal={isShowDirectWithdrawProposal}
        isShowMaxInputValueTitle={isShowMaxInputValueTitle}
        isShowMinInputValueTitle={isShowMinInputValueTitle}
        isShowSwapProposal={isShowSwapProposal}
        maxInputValue={maxInputValue}
        minInputValue={minInputValue}
        sourceTokenData={sourceTokenData}
        vaultChainId={vaultChainId}
        vaultType={vaultType}
      />
      <WarningTitle>
        {!isShowPriceWarning && fieldWarning ? fieldWarning : null}
      </WarningTitle>
    </Container>
  ) : null;
};
