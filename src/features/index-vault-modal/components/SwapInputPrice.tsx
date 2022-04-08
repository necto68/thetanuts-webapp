import type { FC } from "react";

import { IconContainer } from "../../shared/components";
import { currencyFormatter } from "../../shared/helpers";
import { Warning } from "../icons";
import { useSwapRouterConfig } from "../hooks";
import { chainsMap } from "../../wallet/constants";

import {
  Container,
  ContentContainer,
  PriceTitle,
  PriceImpactTitle,
  WarningTitle,
  WarningLink,
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

  return (
    <Container>
      <ContentContainer>
        <PriceTitle>{`~${formattedPrice}`}</PriceTitle>
        {isShowPriceImpact ? (
          <PriceImpactTitle>{`(${priceImpactRate}%)`}</PriceImpactTitle>
        ) : null}
      </ContentContainer>
      {isShowPriceImpact ? (
        <ContentContainer>
          <IconContainer height={14} width={16}>
            <Warning />
          </IconContainer>
          {isShowDirectDepositProposal ? (
            <WarningTitle>
              High Price Impact! Advise to swap on{" "}
              <WarningLink>{chainTitle}</WarningLink> network for optimal swap.
            </WarningTitle>
          ) : (
            <WarningTitle>
              High Price Impact! Advise to{" "}
              <WarningLink href="https://google.com">contact us</WarningLink>{" "}
              for optimised swap.
            </WarningTitle>
          )}
        </ContentContainer>
      ) : null}
    </Container>
  );
};
