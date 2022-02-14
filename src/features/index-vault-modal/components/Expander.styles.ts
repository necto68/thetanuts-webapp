import styled from "styled-components";
import { motion } from "framer-motion";

import { BaseButton } from "../../shared/components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 15px;
  border-radius: 20px;
  border: 1px solid #9e9e9e;
`;

export const HeaderButton = styled(BaseButton).attrs(() => ({
  primaryColor: "transparent",
}))`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  border: 0;
  box-shadow: none !important;
  padding: 15px 0;
`;

export const Title = styled.span`
  font-family: Roboto;
  font-weight: 400;
  font-size: 16px;
  color: #061f3a;
`;

export const ExpandableContainer = styled(motion.div).attrs<{
  isOpen: boolean;
}>(({ isOpen }) => ({
  animate: {
    height: isOpen ? "auto" : 0,
  },
}))<{
  isOpen: boolean;
}>`
  overflow: hidden;
`;
