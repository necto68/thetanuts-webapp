import styled from "styled-components";
import { motion } from "framer-motion";

import { BaseButton } from "../../shared/components";
import { sizes } from "../../shared/constants";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

export const TableContainer = styled.table`
  border-collapse: collapse;

  @media (max-width: ${sizes.md}px) {
    & > tbody {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }
`;

export const HeaderRow = styled.tr`
  background-color: #010c1a;

  @media (max-width: ${sizes.md}px) {
    display: none;
  }
`;

export const SortContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 20px 5px;
`;

export const HeaderCell = styled.th`
  &:first-child {
    border-top-left-radius: 10px;

    ${SortContainer} {
      padding-left: 15px;
    }
  }

  &:last-child {
    border-top-right-radius: 10px;
    width: 30%;

    ${SortContainer} {
      padding-right: 15px;
    }
  }
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
  font-size: 16px;
  color: #ffffff;
`;

export const Row = styled(motion.tr).attrs(() => ({
  layout: true,

  initial: {
    y: -50,
    opacity: 0,
  },

  animate: {
    y: 0,
    opacity: 1,
  },

  exit: {
    y: -50,
    opacity: 0,
  },
}))`
  &:nth-child(odd) {
    background-color: rgba(0, 0, 0, 0.3);
  }

  &:nth-child(even) {
    background-color: rgba(0, 0, 0, 0.5);
  }

  @media (max-width: ${sizes.md}px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    padding: 10px 15px;
    border-radius: 10px;
    background-color: rgba(1, 12, 26, 0.9) !important;
  }
`;

export const Cell = styled.td`
  padding: 10px 5px;

  &:first-child {
    padding-left: 15px;
  }

  &:last-child {
    display: flex;
    justify-content: end;
    padding-right: 15px;
  }

  @media (max-width: ${sizes.md}px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 3px;
    padding: 0 !important;

    &:nth-child(odd) {
      align-items: start;
    }

    &:nth-child(even) {
      align-items: end;
      text-align: right;
    }

    &:last-child {
      grid-column: 1 / span 2;
      align-items: stretch;
    }
  }
`;

export const CellTitle = styled.span`
  font-family: Roboto;
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
  line-height: 1;

  display: none;

  @media (max-width: ${sizes.md}px) {
    display: initial;
  }
`;

export const CellValue = styled.span`
  font-family: Roboto;
  font-weight: 400;
  font-size: 16px;
  color: #ffffff;
  line-height: 1;
`;

export const APYCellValue = styled(CellValue)`
  color: #81e429;
`;

export const APYCellContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
