import type { FC } from "react";

import { periodFormatter } from "../../shared/helpers";
import type { BasicVault } from "../../basic-vault/types";
import { getVaultTypeStrategy } from "../../index-vault/helpers";
import { BasicVaultType } from "../types";
import {
  getDegenVaultTypeTitle,
  getDegenVaultTypeShortName,
} from "../../degen-vault/helpers";

import { TitlesContainer } from "./BasicVaultAssetCell.styles";
import {
  StrategyTitleContainer,
  StrategyTitle,
  PeriodTitle,
} from "./StrategyCell.styles";

type StrategyCellProps = Pick<BasicVault, "basicVaultType" | "period" | "type">;

export const StrategyCell: FC<StrategyCellProps> = ({
  basicVaultType,
  type,
  period,
}) => {
  const strategyTitlesMap = {
    [BasicVaultType.BASIC]: getVaultTypeStrategy(type),
    [BasicVaultType.DEGEN]: getDegenVaultTypeShortName(type),
    [BasicVaultType.WHEEL]: getVaultTypeStrategy(type),
    [BasicVaultType.LONG]: `${getVaultTypeStrategy(type)} LONG`,
  };

  const periodTitlesMap = {
    [BasicVaultType.BASIC]: periodFormatter(period),
    [BasicVaultType.DEGEN]: getDegenVaultTypeTitle(type),
    [BasicVaultType.WHEEL]: periodFormatter(period),
    [BasicVaultType.LONG]: periodFormatter(period),
  };

  const strategyTitle = strategyTitlesMap[basicVaultType];
  const periodTitle = periodTitlesMap[basicVaultType];

  return (
    <TitlesContainer>
      <StrategyTitleContainer>
        <StrategyTitle basicVaultType={basicVaultType}>
          {strategyTitle}
        </StrategyTitle>
        <PeriodTitle>{periodTitle}</PeriodTitle>
      </StrategyTitleContainer>
    </TitlesContainer>
  );
};
