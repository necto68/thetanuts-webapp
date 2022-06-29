import type { FC } from "react";

import type { Vault } from "../../index-vault/types";
import { VaultType } from "../../index-vault/types";
import { periodFormatter } from "../../shared/helpers";

import { TitlesContainer } from "./BasicVaultAssetCell.styles";
import { StrategyTitle, PeriodTitle } from "./StrategyCell.styles";

type StrategyCellProps = Pick<Vault, "period" | "type">;

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
