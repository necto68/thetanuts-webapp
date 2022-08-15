import type { FC } from "react";

import { periodFormatter } from "../../shared/helpers";
import type { BasicVault } from "../../basic-vault/types";
import { getVaultTypeTitle } from "../../index-vault/helpers";

import { TitlesContainer } from "./BasicVaultAssetCell.styles";
import { StrategyTitle, PeriodTitle } from "./StrategyCell.styles";

type StrategyCellProps = Pick<BasicVault, "period" | "type">;

export const StrategyCell: FC<StrategyCellProps> = ({ type, period }) => {
  const strategyTitle = getVaultTypeTitle(type);
  const periodTitle = periodFormatter(period);

  return (
    <TitlesContainer>
      <StrategyTitle type={type}>{strategyTitle}</StrategyTitle>
      <PeriodTitle>{periodTitle}</PeriodTitle>
    </TitlesContainer>
  );
};
