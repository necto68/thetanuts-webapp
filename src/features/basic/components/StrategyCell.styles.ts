import styled from "styled-components";

import type { BasicVault } from "../../basic-vault/types";
import type { AppTheme, Theme } from "../../app/constants/appTheme";
import { BasicVaultType } from "../types";

import { Title } from "./BasicVaultAssetCell.styles";

type StrategyTitleProps = Pick<BasicVault, "basicVaultType">;

export const StrategyTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const StrategyTitle = styled(Title)<StrategyTitleProps>`
  color: ${({ basicVaultType, theme }: StrategyTitleProps & Theme<AppTheme>) =>
    basicVaultType === BasicVaultType.DEGEN
      ? theme.warningColor
      : theme.textColor};
  text-transform: uppercase;
`;

export const PeriodTitle = styled(Title)`
  text-transform: uppercase;
  white-space: nowrap;
`;
