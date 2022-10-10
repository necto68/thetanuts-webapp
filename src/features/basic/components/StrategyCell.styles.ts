import styled from "styled-components";

import type { BasicVault } from "../../basic-vault/types";
import type { AppTheme, Theme } from "../../app/constants/appTheme";

import { Title } from "./BasicVaultAssetCell.styles";

type StrategyTitleProps = Pick<BasicVault, "type">;

export const StrategyTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const StrategyTitle = styled(Title)<StrategyTitleProps>`
  color: ${({ theme }: Theme<AppTheme>) => theme.textColor};
  text-transform: uppercase;
`;

export const PeriodTitle = styled(Title)`
  text-transform: uppercase;
`;
