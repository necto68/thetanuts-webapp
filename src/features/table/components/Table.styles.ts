import styled, { css } from "styled-components";
import { motion } from "framer-motion";

import { BaseButton } from "../../shared/components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  gap: 25px;
`;

export const TableContainerWrapper = styled.div`
  display: flex;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  overflow-x: auto;
`;

export const TableContainer = styled.table`
  border-collapse: collapse;
  min-width: 800px;
  width: 100%;
  table-layout: fixed;
`;

export const HeaderRow = styled.tr`
  background-color: #010c1a;
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
})<{ minWidth?: string }>`
  &:first-child {
    border-top-left-radius: 10px;

    ${SortContainer} {
      padding-left: 15px;
    }
  }

  &:last-child {
    border-top-right-radius: 10px;

    ${SortContainer} {
      padding-right: 15px;
    }
  }

  // Setting cell min-width in the table that has "table-layout: fixed" is actually setting width.
  // That means that the table layout is responsive and cell width can be changed but it will not be less than this width.
  ${({ minWidth }) =>
    minWidth &&
    css`
      width: ${minWidth}px;
    `}
`;

export const SortButton = styled(BaseButton)`
  display: flex;
  flex: 1;
  border: none;
  border-radius: 0;
  padding: 0;
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
  color: #ffffff;
  line-height: 1;
`;

export const Row = styled.tr.attrs(() => ({
  layout: true,
}))`
  &:nth-child(odd) {
    background-color: rgba(0, 0, 0, 0.3);
  }

  &:nth-child(even) {
    background-color: rgba(0, 0, 0, 0.5);
  }
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
  color: #ffffff;
  line-height: 1;
`;

export const GreenCellValue = styled(CellValue)`
  color: #81e429;
`;

export const GreenCellSubValue = styled(CellValue)`
  font-size: 10px;
  color: #81e429;
`;

export const CellValueContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const APYCellContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export { TooltipText } from "../../shared/components/Tooltip.styles";
