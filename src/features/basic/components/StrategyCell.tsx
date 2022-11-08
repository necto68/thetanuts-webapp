import type { FC } from "react";

import { periodFormatter } from "../../shared/helpers";
import type { BasicVault } from "../../basic-vault/types";
import { getVaultTypeStrategy } from "../../index-vault/helpers";

import { TitlesContainer } from "./BasicVaultAssetCell.styles";
import {
  StrategyTitleContainer,
  StrategyTitle,
  PeriodTitle,
} from "./StrategyCell.styles";

type StrategyCellProps = Pick<BasicVault, "period" | "type">;

export const StrategyCell: FC<StrategyCellProps> = ({ type, period }) => {
  const strategyTitle = getVaultTypeStrategy(type);
  const periodTitle = periodFormatter(period);

  return (
    <TitlesContainer>
      <StrategyTitleContainer>
        <StrategyTitle type={type}>{strategyTitle}</StrategyTitle>
        <PeriodTitle>{periodTitle}</PeriodTitle>
      </StrategyTitleContainer>
    </TitlesContainer>
  );
};
