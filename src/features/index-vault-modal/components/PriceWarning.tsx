import type { FC } from "react";

import { IconContainer } from "../../shared/components";
import { chainsMap } from "../../wallet/constants";
import { Warning } from "../icons";
import { useSwapRouterConfig } from "../hooks";

import { Container, WarningTitle, WarningLink } from "./PriceWarning.styles";

interface PriceWarningProps {
  isShowDirectDepositProposal: boolean;
  isShowDirectWithdrawProposal: boolean;
  isShowMaxVaultCapReachedTitle: boolean;
}

export const PriceWarning: FC<PriceWarningProps> = ({
  isShowDirectDepositProposal,
  isShowDirectWithdrawProposal,
  isShowMaxVaultCapReachedTitle = true,
}) => {
  const { indexVaultQuery } = useSwapRouterConfig();
  const { data } = indexVaultQuery;
  const {
    chainId = null,
    totalRemainder = Number.POSITIVE_INFINITY,
    assetSymbol = "",
  } = data ?? {};

  const chainTitle = chainId ? chainsMap[chainId].title : "";

  return (
    <Container>
      <IconContainer height={14} width={16}>
        <Warning />
      </IconContainer>
      {isShowDirectDepositProposal ? (
        <WarningTitle>
          High Price Impact!{" "}
          <WarningLink
            href="https://portalbridge.com/#/transfer"
            target="_blank"
          >
            Click here
          </WarningLink>{" "}
          to bridge to <WarningLink>{`${chainTitle} network`}</WarningLink> for
          optimal swap.
        </WarningTitle>
      ) : null}
      {isShowDirectWithdrawProposal ? (
        <WarningTitle>
          High Price Impact! Advise to{" "}
          <WarningLink href="https://t.me/officialThetanutsFinance">
            contact us
          </WarningLink>{" "}
          for optimised swap.
        </WarningTitle>
      ) : null}
      {isShowMaxVaultCapReachedTitle ? (
        <WarningTitle>
          You can only deposit{" "}
          <WarningLink>
            {totalRemainder} {assetSymbol}
          </WarningLink>
          . If you want to swap more - please{" "}
          <WarningLink href="https://t.me/officialThetanutsFinance">
            contact us
          </WarningLink>
          .
        </WarningTitle>
      ) : null}
    </Container>
  );
};
