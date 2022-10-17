import type { FC } from "react";

import { periodFormatter } from "../../shared/helpers";
import type { BasicVault } from "../../basic-vault/types";
import { getVaultTypeStrategy } from "../../index-vault/helpers";
import { getFormattedStrikePrices } from "../../basic-vault-modal/helpers";
import { getBasicVaultStatusTitle } from "../../basic-vault/helpers";

import { TitlesContainer, Title } from "./BasicVaultAssetCell.styles";
import {
  StrategyTitleContainer,
  StrategyTitle,
  PeriodTitle,
} from "./StrategyCell.styles";

type StrategyCellProps = Pick<
  BasicVault,
  | "isAllowInteractions"
  | "isExpired"
  | "isSettled"
  | "period"
  | "strikePrices"
  | "type"
>;

export const StrategyCell: FC<StrategyCellProps> = ({
  type,
  period,
  strikePrices,
  isSettled,
  isExpired,
  isAllowInteractions,
}) => {
  const basicVaultStatusTitle = getBasicVaultStatusTitle(
    isSettled,
    isExpired,
    isAllowInteractions
  );

  const formattedStrikePrices = getFormattedStrikePrices(
    type,
    strikePrices,
    isSettled,
    isExpired,
    isAllowInteractions
  );

  const title = basicVaultStatusTitle ? "-" : formattedStrikePrices;

  const strategyTitle = getVaultTypeStrategy(type);
  const periodTitle = periodFormatter(period);

  return (
    <TitlesContainer>
      <Title>{title}</Title>
      <StrategyTitleContainer>
        <StrategyTitle type={type}>{strategyTitle}</StrategyTitle>
        <PeriodTitle>{periodTitle}</PeriodTitle>
      </StrategyTitleContainer>
    </TitlesContainer>
  );
};
