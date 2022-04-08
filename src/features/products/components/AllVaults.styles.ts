import styled from "styled-components";
import { motion } from "framer-motion";

import { BaseButton } from "../../shared/components";

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
