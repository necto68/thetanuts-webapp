import type { FC } from "react";

import { IconContainer } from "../../shared/components";
import { currencyFormatter } from "../../shared/helpers";
import { Warning } from "../icons";

import {
  Container,
  PriceImpactTitle,
  PriceTitle,
} from "./SwapInputPrice.styles";

interface SwapInputPriceProps {
  isDirectModeBetterThanSwapMode: boolean;
  isFlipped: boolean;
  isSource: boolean;
  isUseDirectMode: boolean;
  priceImpactRate: number;
  priceValue: number;
}

export const SwapInputPrice: FC<SwapInputPriceProps> = ({
  isDirectModeBetterThanSwapMode,
  isFlipped,
  isSource,
  isUseDirectMode,
  priceImpactRate,
  priceValue,
}) => {
  const formattedPrice = currencyFormatter.format(priceValue);

  const isShowDirectDepositProposal =
    !isSource &&
    !isFlipped &&
    isDirectModeBetterThanSwapMode &&
    !isUseDirectMode;

  const isShowDirectWithdrawProposal =
    !isSource && isFlipped && isDirectModeBetterThanSwapMode;

  const isShowPriceImpact =
    isShowDirectDepositProposal || isShowDirectWithdrawProposal;

  return (
    <Container>
      <PriceTitle>{`~${formattedPrice}`}</PriceTitle>
      {isShowPriceImpact ? (
        <>
          <PriceImpactTitle>{`(${priceImpactRate}%)`}</PriceImpactTitle>
          <IconContainer height={16} width={18}>
            <Warning />
          </IconContainer>
        </>
      ) : null}
    </Container>
  );
};
