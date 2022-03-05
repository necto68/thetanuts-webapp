import type { ChangeEvent, FC } from "react";
import { useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import Big from "big.js";

import { SkeletonBox } from "../../shared/components";
import type { NativeToken, Token } from "../types";

import { AssetSelector } from "./AssetSelector";
import {
  Container,
  AssetContainer,
  AssetTitle,
  MaxButton,
  PriceTitle,
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
  // eslint-disable-next-line sonarjs/cognitive-complexity
}) => {
  // const isShowAssetSelector = true;

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
            <PriceTitle>~$2,900</PriceTitle>
          </SwapInputContainer>
          <AssetContainer>
            {isDataLoading ? <SkeletonBox height={30} width={55} /> : null}
            {!isDataLoading && !isShowAssetSelector ? (
              <AssetTitle>{currentData?.symbol}</AssetTitle>
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
