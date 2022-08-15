import type { FC } from "react";

import type { BasicVault } from "../../basic-vault/types";
import { RiskLevel } from "../../basic-vault/types";
import { CellValue } from "../../table/components";

import {
  LowRiskLevelCellValue,
  MediumRiskLevelCellValue,
  HighRiskLevelCellValue,
} from "./RiskLevelCell.styles";

type RiskLevelCellProps = Pick<BasicVault, "riskLevel">;

export const RiskLevelCell: FC<RiskLevelCellProps> = ({ riskLevel }) => {
  if (riskLevel === RiskLevel.LOW) {
    return <LowRiskLevelCellValue>Low</LowRiskLevelCellValue>;
  }

  if (riskLevel === RiskLevel.MEDIUM) {
    return <MediumRiskLevelCellValue>Mid</MediumRiskLevelCellValue>;
  }

  if (riskLevel === RiskLevel.HIGH) {
    return <HighRiskLevelCellValue>High</HighRiskLevelCellValue>;
  }

  return <CellValue>-</CellValue>;
};
