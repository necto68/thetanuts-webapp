import type { FC } from "react";

import { getFormattedStrikePrices } from "../../basic-vault-modal/helpers";
import { getBasicVaultStatusTitle } from "../../basic-vault/helpers";
import type { BasicVault } from "../../basic-vault/types";
import {
  TitlesContainer,
  Title,
} from "../../basic/components/BasicVaultAssetCell.styles";
import {
  getDegenVaultTypeTitle,
  getDegenVaultTypeShortName,
} from "../../degen-vault/helpers";
import { periodFormatter } from "../../shared/helpers";

import {
  StrategyTitleContainer,
  StrategyShortName,
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

  const strategyShortName = getDegenVaultTypeShortName(type);
  const strategyTitle = getDegenVaultTypeTitle(type);
  const periodTitle = periodFormatter(period);

  return (
    <TitlesContainer>
      <Title>{title}</Title>
      <StrategyTitleContainer>
        <StrategyShortName>{strategyShortName}</StrategyShortName>
        <PeriodTitle>{strategyTitle}</PeriodTitle>
      </StrategyTitleContainer>
      <PeriodTitle>{periodTitle}</PeriodTitle>
    </TitlesContainer>
  );
};
