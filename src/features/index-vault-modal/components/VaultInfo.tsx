import type { FC } from "react";
import { useState } from "react";

import type { NativeToken, Token } from "../types";
import { SectionType } from "../types";
import { useSwapRouterState } from "../hooks";
import { InfoIcon, Tooltip } from "../../shared/components";

import { SlippageTolerance } from "./SlippageTolerance";
import {
  Container,
  InfoContainer,
  InfoSeparator,
  InfoTitle,
  InfoTitleContainer,
  InfoValue,
  Wrapper,
} from "./VaultInfo.styles";
import { SwapRate } from "./SwapRate";
import { Expander } from "./Expander";

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
  const [isOpen, setIsOpen] = useState(false);
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
    <Wrapper>
      <Expander
        isOpen={isOpen}
        maxHeight={215}
        onArrowClick={() => {
          setIsOpen(!isOpen);
        }}
        title={
          <SwapRate
            disabled
            isSourceTokenDataLoading={isSourceTokenDataLoading}
            isTargetTokenDataLoading={isTargetTokenDataLoading}
            sourceTokenData={sourceTokenData}
            targetTokenData={targetTokenData}
            title=""
            tooltip="Swap rate"
            tooltipPlace="right"
          />
        }
        type={SectionType.vaultInfo}
      >
        <Container>
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
            <InfoValue isAlignRight>
              {isUseDirectMode ? "0.0%" : "0.3%"}
            </InfoValue>
          </InfoContainer>
          <InfoContainer>
            <InfoTitle>Slippage Tolerance</InfoTitle>
            {isUseDirectMode ? (
              <InfoValue isAlignRight>N/A</InfoValue>
            ) : (
              <SlippageTolerance />
            )}
          </InfoContainer>
          <InfoSeparator />
          <InfoContainer>
            <InfoTitle>Underlying Asset</InfoTitle>
            <InfoValue isAlignRight>
              {sourceTokenData?.symbol ?? "N/A"}
            </InfoValue>
          </InfoContainer>
          <InfoContainer>
            <InfoTitle>Performance/Management Fee</InfoTitle>
            <InfoValue isAlignRight>0.0%</InfoValue>
          </InfoContainer>
        </Container>
      </Expander>
    </Wrapper>
  );
};
