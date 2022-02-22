import type { ChangeEvent, FC } from "react";
import { useCallback } from "react";
import { AnimatePresence } from "framer-motion";

import { SkeletonBox } from "../../shared/components";
import type { NativeToken, Token } from "../types";

import {
  Container,
  AssetContainer,
  AssetTitle,
  AssetArrow,
  MaxButton,
  PriceTitle,
  SwapInput,
  SwapInputContainer,
  SwapInputCardAnimateContainer,
  BalanceContainer,
  BalanceTitle,
  SwitchAssetButton,
  SwitchAssetContainer,
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

  const handleSwitchAssetButtonClick = useCallback(() => {
    onUseNativeDataChange(!isUseNativeData);
  }, [onUseNativeDataChange, isUseNativeData]);

  const balanceValue = !isTokenDataLoading
    ? getBalanceValue(currentData)
    : ".....";

  return (
    <Container>
      <BalanceContainer>
        <BalanceTitle>{isSource ? "Pay" : "Receive"}</BalanceTitle>
        <BalanceTitle>{`Balance: ${balanceValue}`}</BalanceTitle>
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
              <SwapInput onChange={handleInputChange} value={inputValue} />
            )}
            <PriceTitle>~$2,900</PriceTitle>
          </SwapInputContainer>
          <AssetContainer>
            {isDataLoading ? <SkeletonBox height={30} width={55} /> : null}
            {!isDataLoading && !isShowAssetSelector ? (
              <AssetTitle>{currentData?.symbol}</AssetTitle>
            ) : null}
            {!isDataLoading && isShowAssetSelector ? (
              <SwitchAssetButton onClick={handleSwitchAssetButtonClick}>
                <SwitchAssetContainer>
                  <AssetTitle isSelected={isUseNativeData}>
                    {nativeData.symbol}
                  </AssetTitle>
                  <AssetArrow isRotated={isUseNativeData}>➞</AssetArrow>
                  <AssetTitle isSelected={!isUseNativeData}>
                    {tokenData.symbol}
                  </AssetTitle>
                </SwitchAssetContainer>
              </SwitchAssetButton>
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
