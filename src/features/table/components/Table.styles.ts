import styled, { css } from "styled-components";
import { motion } from "framer-motion";

import type { AppTheme, Theme } from "../../app/constants/appTheme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  gap: 25px;
`;

export const TableContainerWrapper = styled.div`
  display: flex;
  scroll-snap-type: x mandatory;
  // -webkit-overflow-scrolling: touch;
  overflow-x: auto;
`;

export const TableContainer = styled.table<{ minWidth: number }>`
  border-collapse: collapse;
  width: 100%;
  min-width: ${({ minWidth }) => minWidth}px;
  border: 1px solid ${({ theme }: Theme<AppTheme>) => theme.borderColor};
`;

export const HeaderRow = styled.tr`
  background-color: ${({ theme }: Theme<AppTheme>) => theme.secondaryBgColor};
  border-bottom: 2px solid ${({ theme }: Theme<AppTheme>) => theme.borderColor};
`;

export const SortContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 20px 5px;
`;

export const TooltipContainer = styled.div`
  min-width: 200px;
`;

export const HeaderCell = styled.th.withConfig({
  shouldForwardProp: (property, defaultValidatorFunction) =>
    ["align"].includes(property) || defaultValidatorFunction(property),
})<{ minWidth?: number }>`
  &:first-child {
    ${SortContainer} {
      padding-left: 15px;
    }
  }

  &:last-child {
    ${SortContainer} {
      padding-right: 15px;
    }
  }

  ${({ minWidth }) =>
    minWidth &&
    css`
      min-width: ${minWidth}px;
    `}
`;

export const SortButton = styled.div`
  display: flex;
  flex: 1;
  border: none;
  border-radius: 0;
  padding: 0;
  cursor: pointer;
`;

export const SortArrowContainer = styled(motion.div).attrs<{ show: boolean }>(
  ({ show }) => ({
    initial: false,

    animate: {
      opacity: show ? 1 : 0,
    },
  })
)<{ show: boolean }>``;

export const Header = styled.span`
  font-family: Roboto;
  font-weight: 600;
  font-size: 13px;
  color: ${({ theme }: Theme<AppTheme>) => theme.textColor};
  line-height: 1;
`;

export const Row = styled.tr`
  background: ${({ theme }: Theme<AppTheme>) => theme.bgColor};
  border-bottom: 2px solid ${({ theme }: Theme<AppTheme>) => theme.borderColor};

  :last-child {
    border-bottom: none;
  }
`;

export const SkeletonWrapper = styled.div`
  padding: 8px 0;
`;

export const Cell = styled.td`
  padding: 10px 5px;
  scroll-snap-align: start;

  &:first-child {
    padding-left: 15px;
  }

  &:last-child {
    display: flex;
    justify-content: end;
    padding-right: 15px;
  }
`;

export const CellValue = styled.span`
  font-family: Roboto;
  font-weight: 500;
  font-size: 13px;
  color: ${({ theme }: Theme<AppTheme>) => theme.textColor};
  line-height: 1;
  white-space: nowrap;
`;

export const GreenCellValue = styled(CellValue)`
  color: ${({ theme }: Theme<AppTheme>) => theme.brandColor}; ;
`;

export const GreenCellSubValue = styled(CellValue)`
  font-size: 10px;
  color: ${({ theme }: Theme<AppTheme>) => theme.brandColor}; ;
`;

export const CellValueContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const APYCellContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 5px;
`;

export { TooltipText } from "../../shared/components/Tooltip.styles";
