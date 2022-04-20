import type { FC } from "react";
import Big from "big.js";
import { useCallback, useEffect, useState } from "react";

import type { SwapRouterState, Token, NativeToken } from "../types";
import { useSwapRouterConfig, useSwapRouterState } from "../hooks";
import { currencyFormatter } from "../../shared/helpers";
import { InfoIcon, Tooltip } from "../../shared/components";

import { SlippageTolerance } from "./SlippageTolerance";
import {
  Container,
  InfoContainer,
  InfoTitleContainer,
  InfoTitle,
  InfoValue,
} from "./VaultInfo.styles";

interface VaultInfoProps {
  isSourceTokenDataLoading: boolean;
  isTargetTokenDataLoading: boolean;
  sourceTokenData: NativeToken | Token | undefined;
  targetTokenData: NativeToken | Token | undefined;
}

const getRateString = (
  rateSourceValue: SwapRouterState["sourceValue"],
  rateTargetValue: SwapRouterState["targetValue"],
  isRateLoading: boolean
) => {
  if (isRateLoading) {
    return ".....";
  }

  if (
    rateSourceValue &&
    rateTargetValue &&
    new Big(rateSourceValue).gt(0) &&
    new Big(rateTargetValue).gt(0)
  ) {
    return new Big(rateTargetValue).div(rateSourceValue).round(5).toString();
  }

  return "N/A";
};

// eslint-disable-next-line complexity
export const VaultInfo: FC<VaultInfoProps> = ({
  isSourceTokenDataLoading,
  isTargetTokenDataLoading,
  sourceTokenData,
  targetTokenData,
  // eslint-disable-next-line sonarjs/cognitive-complexity
}) => {
  const { indexVaultQuery } = useSwapRouterConfig();

  const {
    isFlipped,
    isSourceValueLoading,
    isTargetValueLoading,
    isUseDirectMode,
    sourceValue,
    targetValue,
  } = useSwapRouterState();

  const [isRateFlipped, setIsRateFlipped] = useState(false);

  useEffect(() => {
    setIsRateFlipped(false);
  }, [isFlipped]);

  const handleRateClick = useCallback(() => {
    setIsRateFlipped(!isRateFlipped);
  }, [isRateFlipped]);

  const { data } = indexVaultQuery;
  const { assetPrice = 0, indexPrice = 0 } = data ?? {};

  const isTokensDataLoading =
    isSourceTokenDataLoading || isTargetTokenDataLoading;
  const isAnyValueLoading = isSourceValueLoading || isTargetValueLoading;
  const isRateLoading = isTokensDataLoading || isAnyValueLoading;

  // symbols
  const [sourceTokenSymbol, targetTokenSymbol] = [
    sourceTokenData,
    targetTokenData,
  ].map((tokenData) =>
    !isTokensDataLoading && tokenData ? tokenData.symbol : "....."
  );

  const [rateSourceSymbol, rateTargetSymbol] = isRateFlipped
    ? [targetTokenSymbol, sourceTokenSymbol]
    : [sourceTokenSymbol, targetTokenSymbol];

  // rate
  const [rateSourceValue, rateTargetValue] = isRateFlipped
    ? [targetValue, sourceValue]
    : [sourceValue, targetValue];

  const rateString = getRateString(
    rateSourceValue,
    rateTargetValue,
    isRateLoading
  );

  // token price
  const [sourceTokenPrice, targetTokenPrice] = isFlipped
    ? [indexPrice, assetPrice]
    : [assetPrice, indexPrice];

  const formattedPrice = currencyFormatter.format(
    isRateFlipped ? targetTokenPrice : sourceTokenPrice
  );

  return (
    <Container>
      <InfoContainer>
        <InfoTitle>Rate ↔</InfoTitle>
        <InfoValue
          isAlignRight
          isUnderline
          onClick={handleRateClick}
        >{`1 ${rateSourceSymbol} = ${rateString} ${rateTargetSymbol} (${formattedPrice})`}</InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoTitle>Protocol</InfoTitle>
        <InfoValue isAlignRight>
          {isUseDirectMode ? "Direct Deposit" : "Uniswap v2"}
        </InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoTitle>Route</InfoTitle>
        <InfoValue
          isAlignRight
        >{`${sourceTokenSymbol} ➞ ${targetTokenSymbol}`}</InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoTitleContainer>
          <InfoTitle>Protocol fee</InfoTitle>
          <Tooltip
            content="The protocol receives swap fees conducted between the stronghold tokens and the underlying assets."
            id="protocolFee"
            root={<InfoIcon />}
          />
        </InfoTitleContainer>
        <InfoValue isAlignRight>{isUseDirectMode ? "0.0%" : "0.3%"}</InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoTitle>Slippage Tolerance</InfoTitle>
        {isUseDirectMode ? (
          <InfoValue isAlignRight>N/A</InfoValue>
        ) : (
          <SlippageTolerance />
        )}
      </InfoContainer>
      <InfoContainer>
        <InfoTitle>Management Fee</InfoTitle>
        <InfoValue isAlignRight>0.0%</InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoTitle>Performance Fee</InfoTitle>
        <InfoValue isAlignRight>0.0%</InfoValue>
      </InfoContainer>
    </Container>
  );
};
