import type { FC } from "react";

import { IconContainer, Tooltip } from "../../shared/components";
import { currencyFormatter } from "../../shared/helpers";
import { Warning } from "../icons";
import { useSwapRouterConfig } from "../hooks";
import { chainsMap } from "../../wallet/constants";

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

// eslint-disable-next-line complexity
export const SwapInputPrice: FC<SwapInputPriceProps> = ({
  isDirectModeBetterThanSwapMode,
  isFlipped,
  isSource,
  isUseDirectMode,
  priceImpactRate,
  priceValue,
}) => {
  const { indexVaultQuery } = useSwapRouterConfig();
  const { data } = indexVaultQuery;
  const { chainId = null } = data ?? {};

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

  const chainTitle = chainId ? chainsMap[chainId].title : "";
  const tooltipContent = isShowDirectDepositProposal
    ? `High Price Impact! Advise to deposit on ${chainTitle} for better pricing`
    : "High Price Impact! Advise to contact us for optimised withdrawal.";

  return (
    <Container>
      <PriceTitle>{`~${formattedPrice}`}</PriceTitle>
      {isShowPriceImpact ? (
        <>
          <PriceImpactTitle>{`(${priceImpactRate}%)`}</PriceImpactTitle>
          <Tooltip
            content={tooltipContent}
            id="priceImpactWarning"
            root={
              <IconContainer height={16} width={18}>
                <Warning />
              </IconContainer>
            }
          />
        </>
      ) : null}
    </Container>
  );
};
