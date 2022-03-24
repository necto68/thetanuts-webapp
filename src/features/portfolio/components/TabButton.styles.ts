import styled from "styled-components";
import { motion } from "framer-motion";

import { BaseButton } from "../../shared/components";

interface IsActiveProps {
  isActive: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Button = styled(BaseButton)`
  font-size: 24px;
  border: 0;
  box-shadow: none !important;
  padding: 15px 0;
  text-transform: uppercase;
`;

export const Underline = styled(motion.div).attrs<IsActiveProps>(
  ({ isActive }) => ({
    initial: false,

    animate: {
      opacity: isActive ? 1 : 0,
    },
  })
)<IsActiveProps>`
  width: 100%;
  height: 3px;
  border-radius: 1px;
  background-color: #81e429;
  transform: translateY(2px);
`;
