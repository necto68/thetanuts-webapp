import type { FC } from "react";

import type { BasicVault } from "../../basic-vault/types";
import { TitlesContainer } from "../../basic/components/BasicVaultAssetCell.styles";
import {
  getDegenVaultTypeTitle,
  getDegenVaultTypeShortName,
} from "../../degen-vault/helpers";

import {
  StrategyTitleContainer,
  StrategyShortName,
  PeriodTitle,
} from "./StrategyCell.styles";

type StrategyCellProps = Pick<BasicVault, "type">;

export const StrategyCell: FC<StrategyCellProps> = ({ type }) => {
  const strategyShortName = getDegenVaultTypeShortName(type);
  const strategyTitle = getDegenVaultTypeTitle(type);

  return (
    <TitlesContainer>
      <StrategyTitleContainer>
        <StrategyShortName>{strategyShortName}</StrategyShortName>
        <PeriodTitle>{strategyTitle}</PeriodTitle>
      </StrategyTitleContainer>
    </TitlesContainer>
  );
};
