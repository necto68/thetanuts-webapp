import styled from "styled-components";

import type { AppTheme, Theme } from "../../app/constants/appTheme";
import { Title } from "../../basic/components/BasicVaultAssetCell.styles";

interface StrategyTitleProps {
  isActive?: boolean;
}

export const Container = styled.div`
  display: flex;
  gap: 2px;
`;

export const StrategyTitle = styled(Title)<StrategyTitleProps>`
  color: ${({ isActive, theme }: StrategyTitleProps & Theme<AppTheme>) =>
    isActive ? theme.brandColor : theme.textColor};
`;
