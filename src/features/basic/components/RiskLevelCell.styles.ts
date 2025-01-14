import styled from "styled-components";

import { CellValue } from "../../table/components";
import type { AppTheme, Theme } from "../../app/constants/appTheme";

export const LowRiskLevelCellValue = styled(CellValue)`
  color: #00ff29;
`;

export const MediumRiskLevelCellValue = styled(CellValue)`
  color: #ffe600;
`;

export const HighRiskLevelCellValue = styled(CellValue)`
  color: ${({ theme }: Theme<AppTheme>) => theme.warningColor};
`;
