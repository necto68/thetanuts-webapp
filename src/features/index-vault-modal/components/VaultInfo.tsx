import type { FC } from "react";

import type { Token, NativeToken } from "../types";
import { useSwapRouterState } from "../hooks";
import { InfoIcon, Tooltip } from "../../shared/components";

import { SlippageTolerance } from "./SlippageTolerance";
import {
  Container,
  InfoContainer,
  InfoTitleContainer,
  InfoTitle,
  InfoValue,
} from "./VaultInfo.styles";
import { SwapRate } from "./SwapRate";

interface VaultInfoProps {
  isSourceTokenDataLoading: boolean;
  isTargetTokenDataLoading: boolean;
  sourceTokenData: NativeToken | Token | undefined;
  targetTokenData: NativeToken | Token | undefined;
}

export const VaultInfo: FC<VaultInfoProps> = ({
  isSourceTokenDataLoading,
  isTargetTokenDataLoading,
  sourceTokenData,
  targetTokenData,
}) => {
  const { isUseDirectMode } = useSwapRouterState();

  const isTokensDataLoading =
    isSourceTokenDataLoading || isTargetTokenDataLoading;

  // symbols
  const [sourceTokenSymbol, targetTokenSymbol] = [
    sourceTokenData,
    targetTokenData,
  ].map((tokenData) =>
    !isTokensDataLoading && tokenData ? tokenData.symbol : "....."
  );

  return (
    <Container>
      <SwapRate
        isSourceTokenDataLoading={isSourceTokenDataLoading}
        isTargetTokenDataLoading={isTargetTokenDataLoading}
        sourceTokenData={sourceTokenData}
        targetTokenData={targetTokenData}
      />
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
