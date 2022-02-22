import styled from "styled-components";
import { motion } from "framer-motion";

import { BaseButton } from "../shared/components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.span`
  font-family: Roboto;
  font-weight: 700;
  font-size: 32px;
  color: #e5e5e5;
`;

export const VaultsTable = styled.table`
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
  border: none;
  box-shadow: none !important;
  border-radius: 0;
  padding: 0;
`;

export const SortArrowContainer = styled(motion.div).attrs<{ show: boolean }>(
  ({ show }) => ({
    animate: {
      opacity: show ? 1 : 0,
    },
  })
)<{ show: boolean }>``;

export const Header = styled.span`
  font-family: Barlow;
  font-weight: 700;
  font-size: 18px;
  color: #ffffff;
`;

export const Row = styled(motion.tr).attrs(() => ({
  layout: true,
  whileHover: { scale: 1.02 },

  whileTap: {
    scale: 0.97,
    opacity: 0.8,
  },
}))`
  cursor: pointer;

  &:nth-child(odd) {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

export const Cell = styled.td`
  vertical-align: center;
  padding: 22px 20px;
`;

export const CellValue = styled.span`
  font-family: Barlow;
  font-weight: 600;
  font-size: 18px;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const CenteredCell = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: transparent;
  border: none;
`;

export const SwapButton = styled.button`
  background: transparent;
  font-family: Barlow;
  font-weight: 600;
  font-size: 18px;
  color: #ffffff;
  border: 2px solid green;
  border-radius: 10px;
  padding: 10px 30px;
  cursor: pointer;
`;
