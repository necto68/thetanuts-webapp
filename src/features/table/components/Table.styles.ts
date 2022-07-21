import styled from "styled-components";
import { motion } from "framer-motion";

import { BaseButton } from "../../shared/components";
import { screens } from "../../shared/constants";

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  gap: 25px;

  ${screens.md} {
    gap: 15px;
  }
`;

export const TableContainer = styled.table`
  border-collapse: collapse;

  ${screens.md} {
    & > tbody {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }
`;

export const HeaderRow = styled.tr`
  background-color: #010c1a;

  ${screens.md} {
    display: none;
  }
`;

export const SortContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 20px 5px;
`;

export const HeaderCell = styled.th.withConfig({
  shouldForwardProp: (property, defaultValidatorFunction) =>
    ["align"].includes(property) || defaultValidatorFunction(property),
})`
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
  font-size: 13px;
  color: #ffffff;
`;

export const Row = styled(motion.tr).attrs(() => ({
  layout: true,
}))`
  &:nth-child(odd) {
    background-color: rgba(0, 0, 0, 0.3);
  }

  &:nth-child(even) {
    background-color: rgba(0, 0, 0, 0.5);
  }

  ${screens.md} {
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

  ${screens.md} {
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
  display: none;

  ${screens.md} {
    display: initial;

    font-family: Roboto;
    font-weight: 400;
    font-size: 14px;
    color: #ffffff;
    line-height: 1;
  }
`;

export const CellValue = styled.span`
  font-family: Roboto;
  font-weight: 400;
  font-size: 13px;
  color: #ffffff;
  line-height: 1;

  ${screens.md} {
    font-size: 16px;
  }
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
