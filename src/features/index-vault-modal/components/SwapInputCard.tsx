import type { ChangeEvent, FC } from "react";
import { useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import Big from "big.js";

import { IconContainer, SkeletonBox } from "../../shared/components";
import type { NativeToken, Token } from "../types";
import { getLogoBySymbol } from "../../logo/helpers";

import { AssetSelector } from "./AssetSelector";
import { SwapInputPrice } from "./SwapInputPrice";
import {
  Container,
  AssetContainer,
  AssetTitle,
  AssetTitleContainer,
  MaxButton,
  SwapInput,
  SwapInputContainer,
  SwapInputCardAnimateContainer,
  BalanceContainer,
  BalanceTitlesContainer,
  BalanceTitle,
  InsufficientBalanceTitle,
} from "./SwapInputCard.styles";

interface SwapInputCardProps {
  inputValue: string;
  isValueLoading: boolean;
  onInputChange: (value: string) => void;
  isSource?: boolean;
  isFlipped: boolean;
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
  // eslint-disable-next-line sonarjs/cognitive-complexity
}) => {
  const isShowAssetSelector =
    tokenData &&
    nativeData &&
    tokenData.tokenAddress === nativeData.wrappedNativeTokenAddress;

  const currentData = isUseNativeData ? nativeData : tokenData;
  const isDataLoading = isTokenDataLoading || isNativeDataLoading;

  const isShowMaxButton = Boolean(isSource && currentData?.balance?.gt(0));

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

  const isShowInsufficientBalanceTitle = Boolean(
    isSource &&
      currentData?.balance &&
      inputValueBig.gt(0) &&
      inputValueBig.gt(currentData.balance)
  );

  const assetLogo = getLogoBySymbol(currentData?.symbol);

  return (
    <Container>
      <BalanceContainer>
        <BalanceTitle>{isSource ? "From" : "To"}</BalanceTitle>
        <BalanceTitlesContainer>
          <AnimatePresence>
            {isShowInsufficientBalanceTitle ? (
              <InsufficientBalanceTitle>Insufficient</InsufficientBalanceTitle>
            ) : null}
          </AnimatePresence>
          <BalanceTitle>{`Balance: ${balanceValue}`}</BalanceTitle>
        </BalanceTitlesContainer>
      </BalanceContainer>
      <AnimatePresence exitBeforeEnter initial={false}>
        <SwapInputCardAnimateContainer
          downDirection={isSource ? isFlipped : !isFlipped}
          key={isFlipped.toString()}
        >
          <SwapInputContainer>
            {isValueLoading ? (
              <SkeletonBox height={34.2} width={200} />
            ) : (
              <SwapInput
                isError={isShowInsufficientBalanceTitle}
                onChange={handleInputChange}
                value={inputValue}
              />
            )}
            {isValueLoading ? (
              <SkeletonBox height={16} width={100} />
            ) : (
              <SwapInputPrice
                isDirectModeBetterThanSwapMode={isDirectModeBetterThanSwapMode}
                isFlipped={isFlipped}
                isSource={isSource}
                isUseDirectMode={isUseDirectMode}
                priceImpactRate={priceImpactRate}
                priceValue={priceValue}
              />
            )}
          </SwapInputContainer>
          <AssetContainer>
            {isDataLoading ? <SkeletonBox height={30} width={55} /> : null}
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
              <MaxButton onClick={handleMaxButtonClick}>MAX</MaxButton>
            ) : null}
          </AssetContainer>
        </SwapInputCardAnimateContainer>
      </AnimatePresence>
    </Container>
  );
};

export type { SwapInputCardProps };
