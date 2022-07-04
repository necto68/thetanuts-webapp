import type { FC } from "react";

import { periodFormatter } from "../../shared/helpers";
import type { BasicVault } from "../../basic-vault/types";
import { VaultType } from "../../basic-vault/types";

import { TitlesContainer } from "./BasicVaultAssetCell.styles";
import { StrategyTitle, PeriodTitle } from "./StrategyCell.styles";

type StrategyCellProps = Pick<BasicVault, "period" | "type">;

export const StrategyCell: FC<StrategyCellProps> = ({ type, period }) => {
  const strategyTitle =
    type === VaultType.CALL ? "Covered Call" : "Put Selling";
  const periodTitle = periodFormatter(period);

  return (
    <TitlesContainer>
      <StrategyTitle type={type}>{strategyTitle}</StrategyTitle>
      <PeriodTitle>{periodTitle}</PeriodTitle>
    </TitlesContainer>
  );
};
