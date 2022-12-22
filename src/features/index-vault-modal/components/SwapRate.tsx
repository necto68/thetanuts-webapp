import type { FC } from "react";
import type { ITooltip } from "react-tooltip";
import { useCallback, useEffect, useState } from "react";
import Big from "big.js";

import type { NativeToken, SwapRouterState, Token } from "../types";
import { useSwapRouterState } from "../hooks";
import { InfoIcon, Tooltip } from "../../shared/components";
import { ViceVersa } from "../../shared/icons/ViceVersa";

import {
  InfoContainer,
  InfoTitle,
  InfoTitleContainer,
  InfoValue,
} from "./VaultInfo.styles";

interface SwapRateProps {
  isSourceTokenDataLoading: boolean;
  isTargetTokenDataLoading: boolean;
  sourceTokenData: NativeToken | Token | undefined;
  targetTokenData: NativeToken | Token | undefined;
  title?: string;
  tooltip?: string;
  tooltipPlace?: ITooltip["place"];
  customRates?: (string | undefined)[] | undefined;
  disabled?: boolean;
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
export const SwapRate: FC<SwapRateProps> = ({
  isSourceTokenDataLoading,
  isTargetTokenDataLoading,
  sourceTokenData,
  targetTokenData,
  title = "Rate",
  tooltip,
  tooltipPlace = "top",
  customRates,
  disabled,
}) => {
  const {
    isFlipped,
    isSourceValueLoading,
    isTargetValueLoading,
    sourceValue,
    targetValue,
  } = useSwapRouterState();

  const [isRateFlipped, setIsRateFlipped] = useState(false);

  useEffect(() => {
    setIsRateFlipped(false);
  }, [isFlipped]);

  const handleRateClick = useCallback(() => {
    if (!disabled) {
      setIsRateFlipped(!isRateFlipped);
    }
  }, [isRateFlipped, disabled]);

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

  const rateString = customRates
    ? customRates[isRateFlipped ? 1 : 0] ?? "..."
    : getRateString(rateSourceValue, rateTargetValue, isRateLoading);

  const tooltipTitle = title ? <InfoTitle>{title}</InfoTitle> : <InfoIcon />;
  const noTooltipTitle = title ? <InfoTitle>{title}</InfoTitle> : <ViceVersa />;

  return (
    <InfoContainer onClick={handleRateClick}>
      <InfoTitleContainer>
        {tooltip ? (
          <Tooltip
            content={tooltip}
            id="rate-tooltip"
            place={tooltipPlace}
            root={tooltipTitle}
          />
        ) : (
          noTooltipTitle
        )}
      </InfoTitleContainer>
      <InfoValue
        isAlignRight
        isUnderline={!disabled}
      >{`1 ${rateSourceSymbol} = ${rateString} ${rateTargetSymbol}`}</InfoValue>
    </InfoContainer>
  );
};
