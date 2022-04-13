import type { FC } from "react";

import { IconContainer } from "../../shared/components";
import { chainsMap } from "../../wallet/constants";
import { Warning } from "../icons";
import { useSwapRouterConfig } from "../hooks";

import { Container, WarningTitle, WarningLink } from "./PriceWarning.styles";

interface PriceWarningProps {
  isShowDirectDepositProposal: boolean;
  isShowDirectWithdrawProposal: boolean;
}

export const PriceWarning: FC<PriceWarningProps> = ({
  isShowDirectDepositProposal,
  isShowDirectWithdrawProposal,
}) => {
  const { indexVaultQuery } = useSwapRouterConfig();
  const { data } = indexVaultQuery;
  const { chainId = null } = data ?? {};

  const chainTitle = chainId ? chainsMap[chainId].title : "";

  return (
    <Container>
      <IconContainer height={14} width={16}>
        <Warning />
      </IconContainer>
      {isShowDirectDepositProposal ? (
        <WarningTitle>
          High Price Impact! Advise to swap on{" "}
          <WarningLink>{chainTitle}</WarningLink> network for optimal swap.
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
    </Container>
  );
};
