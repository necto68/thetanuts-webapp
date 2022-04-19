import styled from "styled-components";
import { motion } from "framer-motion";

import { BaseButton } from "../../shared/components";
import { sizes } from "../../shared/constants";

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  gap: 2.5rem;

  @media (max-width: ${sizes.md}px) {
    gap: 1.5rem;
  }
`;

export const TableContainer = styled.table`
  border-collapse: collapse;

  @media (max-width: ${sizes.md}px) {
    & > tbody {
      display: flex;
      flex-direction: column;
      gap: 1rem;
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
  gap: 1rem;
  align-items: center;
  padding: 2rem 0.5rem;
`;

export const HeaderCell = styled.th`
  &:first-child {
    border-top-left-radius: 10px;

    ${SortContainer} {
      padding-left: 1.5rem;
    }
  }

  &:last-child {
    border-top-right-radius: 10px;
    width: 30%;

    ${SortContainer} {
      padding-right: 1.5rem;
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
  font-size: 1.3rem;
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
    gap: 1rem;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    background-color: rgba(1, 12, 26, 0.9) !important;
  }
`;

export const Cell = styled.td`
  padding: 1rem 0.5rem;

  &:first-child {
    padding-left: 1.5rem;
  }

  &:last-child {
    display: flex;
    justify-content: end;
    padding-right: 1.5rem;
  }

  @media (max-width: ${sizes.md}px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.3rem;
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

  @media (max-width: ${sizes.md}px) {
    display: initial;

    font-family: Roboto;
    font-weight: 400;
    font-size: 1.4rem;
    color: #ffffff;
    line-height: 1;
  }
`;

export const CellValue = styled.span`
  font-family: Roboto;
  font-weight: 400;
  font-size: 1.3rem;
  color: #ffffff;
  line-height: 1;

  @media (max-width: ${sizes.md}px) {
    font-size: 1.6rem;
  }
`;

export const APYCellValue = styled(CellValue)`
  color: #81e429;
`;

export const APYCellContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
