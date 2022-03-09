import styled from "styled-components";
import { motion } from "framer-motion";

import { BaseButton } from "../../shared/components";

export const TableContainerDiv = styled.div`
  overflow-x:auto
`;

export const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const HeaderRow = styled.tr`
  background-color: #010c1a;
`;

export const HeaderCell = styled.th`
  &:first-child {
    border-top-left-radius: 10px;
  }

  &:last-child {
    border-top-right-radius: 10px;
  }
`;

export const SortContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 15px 20px;
`;

export const SortButton = styled(BaseButton)`
  display: flex;
  flex: 1;
  border: none;
  box-shadow: none !important;
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
  font-size: 16px;
  color: #ffffff;
`;

export const Row = styled(motion.tr).attrs(() => ({
  layout: true,
}))`
  &:nth-child(odd) {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

export const Cell = styled.td`
  padding: 15px 20px;
`;

export const CellValue = styled.span`
  font-family: Roboto;
  font-weight: 400;
  font-size: 16px;
  color: #ffffff;
`;

export const APYCellValue = styled(CellValue)`
  color: #81e429;
  margin-right:5px;
  
`;
