import type { FC } from "react";
import Big from "big.js";

import type { NativeToken, Token } from "../types";
import { maxSlippageTolerance } from "../constants";
import {Tooltip} from '../../shared/components/Tooltip' 

import {
  Container,
  InfoContainer,
  PriceInfoContainer,
  InfoValue,
  TooltipContainer
} from "./VaultInfo.styles";

interface VaultInfoProps {
  isSourceTokenDataLoading: boolean;
  isSourceValueLoading: boolean;
  isTargetTokenDataLoading: boolean;
  isTargetValueLoading: boolean;
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
  isSourceTokenDataLoading,
  isSourceValueLoading,
  isTargetTokenDataLoading,
  isTargetValueLoading,
  sourceTokenData,
  sourceValue,
  targetTokenData,
  targetValue,
}) => {
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

  const slippageToleranceValue = maxSlippageTolerance * 100;

  return (
    <Container>
      <PriceInfoContainer>
        <InfoValue
          isUnderline
        >{`1 ${sourceTokenSymbol} = ${sourceToTargetRatio} ${targetTokenSymbol} ($2,000)`}</InfoValue>
      </PriceInfoContainer>
      <InfoContainer>
        <InfoValue>Protocols</InfoValue>
        <InfoValue>Uniswap v2</InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoValue>Route</InfoValue>
        <InfoValue>{`${sourceTokenSymbol} ➞ ${targetTokenSymbol}`}</InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoValue>Slippage Tolerance</InfoValue>
        <InfoValue>{`${slippageToleranceValue}%`}</InfoValue>
      </InfoContainer>
      <InfoContainer>
        <TooltipContainer>
          <InfoValue isUnderline>Index Value</InfoValue>
          <Tooltip
          type="popup"
          toolTipId="popupPlatformFeeTooltip" 
          data='This fee is taken by DEX to perform the swap. The amount displayed in "Receive" takes into account all fees post settlements.'  />
        </TooltipContainer>
        
        <InfoValue>0.3%</InfoValue>
      </InfoContainer>
    </Container>
  );
};
