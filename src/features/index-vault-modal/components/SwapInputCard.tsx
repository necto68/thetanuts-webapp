import type { ChangeEvent, FC } from "react";
import { useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import Big from "big.js";

import {
  BaseButton,
  IconContainer,
  SkeletonBox,
} from "../../shared/components";
import { currencyFormatter } from "../../shared/helpers";
import type { NativeToken, Token } from "../types";
import { getLogoBySymbol } from "../../logo/helpers";
import type { ChainId } from "../../wallet/constants";
import { ModalContentType } from "../types";

import { AssetSelector } from "./AssetSelector";
import { PriceImpact } from "./PriceImpact";
import { PriceWarning } from "./PriceWarning";
import { TextWarning } from "./TextWarning";
import {
  Container,
  AssetContainer,
  AssetTitle,
  AssetTitleContainer,
  SwapInput,
  SwapInputContainer,
  SwapInputCardAnimateContainer,
  SwapInputCardContentContainer,
  BalanceContainer,
  BalanceTitlesContainer,
  BalanceTitle,
  InsufficientBalanceTitle,
  PriceContainer,
  PriceValue,
} from "./SwapInputCard.styles";

interface SwapInputCardProps {
  inputValue: string;
  isValueLoading: boolean;
  onInputChange: (value: string) => void;
  isSource?: boolean;
  isFlipped: boolean;
  sourceTokenData?: Token;
  tokenData: Token | undefined;
  isTokenDataLoading: boolean;
  nativeData: NativeToken | undefined;
  isNativeDataLoading: boolean;
  isUseNativeData: boolean;
  onUseNativeDataChange: (value: boolean) => void;
  priceValue: number;
  priceImpactRate?: number;
  isDirectModeBetterThanSwapMode?: boolean;
  isUseDirectMode?: boolean;
  fieldWarning?: string;
  fieldWarningColor?: string;
  disabled?: boolean;
  isShowTitle?: boolean;
  remainderValue?: number;
  vaultChainId?: ChainId;
}

const getBalanceValue = (tokenData: NativeToken | Token | undefined) =>
  tokenData?.balance ? tokenData.balance.round(5).toString() : "N/A";

// eslint-disable-next-line complexity
export const SwapInputCard: FC<SwapInputCardProps> = ({
  inputValue,
  isValueLoading,
  onInputChange,
  isSource = false,
  isFlipped,
  sourceTokenData,
  tokenData,
  isTokenDataLoading,
  nativeData,
  isNativeDataLoading,
  isUseNativeData,
  onUseNativeDataChange,
  priceValue,
  priceImpactRate = 0,
  isDirectModeBetterThanSwapMode = false,
  isUseDirectMode = false,
  fieldWarning,
  fieldWarningColor,
  disabled,
  isShowTitle = true,
  remainderValue = 999_999_999,
  vaultChainId,
  // eslint-disable-next-line sonarjs/cognitive-complexity
}) => {
  const isShowAssetSelector =
    tokenData &&
    nativeData &&
    tokenData.tokenAddress === nativeData.wrappedNativeTokenAddress;

  const currentData = isUseNativeData ? nativeData : tokenData;
  const isDataLoading = isTokenDataLoading || isNativeDataLoading;

  const isShowMaxButton = Boolean(
    isSource && currentData?.balance?.gt(0) && !disabled
  );

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onInputChange(event.target.value);
    },
    [onInputChange]
  );

  const handleMaxButtonClick = useCallback(() => {
    if (currentData?.balance) {
      onInputChange(currentData.balance.toString());
    }
  }, [currentData, onInputChange]);

  const balanceValue = !isTokenDataLoading
    ? getBalanceValue(currentData)
    : ".....";

  const inputValueBig = new Big(inputValue || 0);

  const formattedPrice = currencyFormatter.format(priceValue);

  const isShowInsufficientBalanceTitle = Boolean(
    isSource &&
      currentData?.balance &&
      inputValueBig.gt(0) &&
      inputValueBig.gt(currentData.balance) &&
      !disabled
  );

  const isShowMaxVaultCapReachedTitle = Boolean(
    !isShowInsufficientBalanceTitle &&
      isSource &&
      !isFlipped &&
      inputValueBig.gt(0) &&
      inputValueBig.gt(remainderValue) &&
      contentType !== ModalContentType.withdrawClaim
  );

  const isShowDirectDepositProposal =
    !isSource &&
    !isFlipped &&
    isDirectModeBetterThanSwapMode &&
    !isUseDirectMode;

  const isShowDirectWithdrawProposal =
    !isSource && isFlipped && isDirectModeBetterThanSwapMode;

  const isShowSwapProposal =
    !isDirectModeBetterThanSwapMode &&
    contentType === ModalContentType.withdraw;

  const isPriceImpactError =
    isShowDirectDepositProposal || isShowDirectWithdrawProposal;

  const isShowPriceWarning =
    isShowDirectDepositProposal ||
    isShowDirectWithdrawProposal ||
    isShowMaxVaultCapReachedTitle ||
    isShowSwapProposal;

  const assetLogo = getLogoBySymbol(currentData?.symbol);

  return (
    <Container>
      <BalanceContainer>
        {isShowTitle ? (
          <BalanceTitle>{isSource ? "From" : "To"}</BalanceTitle>
        ) : (
          <span />
        )}
        <BalanceTitlesContainer>
          <AnimatePresence>
            {isShowInsufficientBalanceTitle ? (
              <InsufficientBalanceTitle>Insufficient</InsufficientBalanceTitle>
            ) : null}
          </AnimatePresence>
          <BalanceTitle>{`Wallet Balance: ${balanceValue}`}</BalanceTitle>
        </BalanceTitlesContainer>
      </BalanceContainer>
      <AnimatePresence exitBeforeEnter initial={false}>
        <SwapInputCardAnimateContainer
          disabled={disabled}
          downDirection={isSource ? isFlipped : !isFlipped}
          key={isFlipped.toString()}
        >
          <SwapInputCardContentContainer>
            <SwapInputContainer>
              {isValueLoading ? (
                <SkeletonBox height={25.3} width={120} />
              ) : (
                <SwapInput
                  disabled={disabled}
                  isError={
                    isShowInsufficientBalanceTitle ||
                    isShowMaxVaultCapReachedTitle
                  }
                  onChange={handleInputChange}
                  value={inputValue}
                />
              )}
              {isValueLoading ? (
                <SkeletonBox height={13.8} width={90} />
              ) : (
                <PriceContainer>
                  <PriceValue>{`~${formattedPrice}`}</PriceValue>
                  {!isSource ? (
                    <PriceImpact
                      isError={isPriceImpactError}
                      priceImpactRate={priceImpactRate}
                    />
                  ) : null}
                </PriceContainer>
              )}
            </SwapInputContainer>
            <AssetContainer>
              {isDataLoading ? <SkeletonBox height={20} width={55} /> : null}
              {!isDataLoading && !isShowAssetSelector ? (
                <AssetTitleContainer>
                  <IconContainer height={20} width={20}>
                    {assetLogo}
                  </IconContainer>
                  <AssetTitle>{currentData?.symbol}</AssetTitle>
                </AssetTitleContainer>
              ) : null}
              {!isDataLoading && isShowAssetSelector ? (
                <AssetSelector
                  isUseNativeData={isUseNativeData}
                  nativeData={nativeData}
                  onUseNativeDataChange={onUseNativeDataChange}
                  tokenData={tokenData}
                />
              ) : null}
              {!isDataLoading && isShowMaxButton ? (
                <BaseButton isSmall onClick={handleMaxButtonClick}>
                  MAX
                </BaseButton>
              ) : null}
            </AssetContainer>
          </SwapInputCardContentContainer>
          {isShowPriceWarning ? (
            <PriceWarning
              isShowDirectDepositProposal={isShowDirectDepositProposal}
              isShowDirectWithdrawProposal={isShowDirectWithdrawProposal}
              isShowMaxVaultCapReachedTitle={isShowMaxVaultCapReachedTitle}
              isShowSwapProposal={isShowSwapProposal}
              remainderValue={remainderValue}
              sourceTokenData={sourceTokenData}
              vaultChainId={vaultChainId}
            />
          ) : null}
          {!isShowPriceWarning && fieldWarning ? (
            <TextWarning color={fieldWarningColor} text={fieldWarning} />
          ) : null}
        </SwapInputCardAnimateContainer>
      </AnimatePresence>
    </Container>
  );
};

export type { SwapInputCardProps };
