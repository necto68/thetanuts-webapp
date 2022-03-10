import type { FC } from "react";
import Big from "big.js";

import type { NativeToken, Token } from "../types";
import { maxSlippageTolerance } from "../constants";
import { useSwapRouterConfig } from "../hooks";
import { currencyFormatter } from "../../shared/helpers";
import { InfoIcon, Tooltip } from "../../shared/components";

import {
  Container,
  InfoContainer,
  PriceInfoContainer,
  InfoValueContainer,
  InfoValue,
} from "./VaultInfo.styles";

interface VaultInfoProps {
  isFlipped: boolean;
  isSourceTokenDataLoading: boolean;
  isSourceValueLoading: boolean;
  isTargetTokenDataLoading: boolean;
  isTargetValueLoading: boolean;
  isUseDirectMode: boolean;
  sourceTokenData: NativeToken | Token | undefined;
  sourceValue: string;
  targetTokenData: NativeToken | Token | undefined;
  targetValue: string;
}

const getSourceToTargetRatioString = (
  sourceValue: VaultInfoProps["sourceValue"],
  targetValue: VaultInfoProps["targetValue"],
  isRatioLoading: boolean
) => {
  if (isRatioLoading) {
    return ".....";
  }

  if (
    sourceValue &&
    targetValue &&
    new Big(sourceValue).gt(0) &&
    new Big(targetValue).gt(0)
  ) {
    return new Big(targetValue).div(sourceValue).round(5).toString();
  }

  return "N/A";
};

export const VaultInfo: FC<VaultInfoProps> = ({
  isFlipped,
  isSourceTokenDataLoading,
  isSourceValueLoading,
  isTargetTokenDataLoading,
  isTargetValueLoading,
  isUseDirectMode,
  sourceTokenData,
  sourceValue,
  targetTokenData,
  targetValue,
}) => {
  const { indexVaultQuery } = useSwapRouterConfig();
  const { data } = indexVaultQuery;
  const { assetPrice = 0, indexPrice = 0 } = data ?? {};

  const isTokensDataLoading =
    isSourceTokenDataLoading || isTargetTokenDataLoading;
  const isAnyValueLoading = isSourceValueLoading || isTargetValueLoading;
  const isRatioLoading = isTokensDataLoading || isAnyValueLoading;

  const [sourceTokenSymbol, targetTokenSymbol] = [
    sourceTokenData,
    targetTokenData,
  ].map((tokenData) =>
    !isTokensDataLoading && tokenData ? tokenData.symbol : "....."
  );

  const sourceToTargetRatio = getSourceToTargetRatioString(
    sourceValue,
    targetValue,
    isRatioLoading
  );

  const formattedPrice = currencyFormatter.format(
    isFlipped ? indexPrice : assetPrice
  );

  const slippageToleranceValue = maxSlippageTolerance * 100;

  return (
    <Container>
      <PriceInfoContainer>
        <InfoValue
          isUnderline
        >{`1 ${sourceTokenSymbol} = ${sourceToTargetRatio} ${targetTokenSymbol} (${formattedPrice})`}</InfoValue>
      </PriceInfoContainer>
      <InfoContainer>
        <InfoValue>Protocols</InfoValue>
        <InfoValue>
          {isUseDirectMode ? "Direct Deposit" : "Uniswap v2"}
        </InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoValue>Route</InfoValue>
        <InfoValue>{`${sourceTokenSymbol} ➞ ${targetTokenSymbol}`}</InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoValue>Slippage Tolerance</InfoValue>
        <InfoValue>
          {isUseDirectMode ? "N/A" : `${slippageToleranceValue}%`}
        </InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoValueContainer>
          <InfoValue isUnderline>Platform fee</InfoValue>
          <Tooltip
            content={
              'This fee is taken by DEX to perform the swap. The amount displayed in "To" takes into account all fees post settlement.'
            }
            id="platformFee"
            root={<InfoIcon />}
          />
        </InfoValueContainer>
        <InfoValue>{isUseDirectMode ? "0%" : "0.3%"}</InfoValue>
      </InfoContainer>
    </Container>
  );
};
