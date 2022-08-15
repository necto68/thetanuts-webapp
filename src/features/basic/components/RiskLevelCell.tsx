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
  switch (riskLevel) {
    case RiskLevel.LOW:
      return <LowRiskLevelCellValue>Low</LowRiskLevelCellValue>;

    case RiskLevel.MEDIUM:
      return <MediumRiskLevelCellValue>Mid</MediumRiskLevelCellValue>;

    case RiskLevel.HIGH:
      return <HighRiskLevelCellValue>High</HighRiskLevelCellValue>;

    default:
      return <CellValue>-</CellValue>;
  }
};
