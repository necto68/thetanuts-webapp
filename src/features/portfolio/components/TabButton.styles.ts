import styled from "styled-components";
import { motion } from "framer-motion";

import { BaseButton } from "../../shared/components";

interface IsActiveProps {
  isActive: boolean;
}

export const Container = styled(motion.div).attrs<IsActiveProps>(
  ({ isActive }) => ({
    animate: {
      borderBottomColor: isActive
        ? "rgba(129, 228, 41, 1)"
        : "rgba(129, 228, 41, 0)",
    },
  })
)<IsActiveProps>`
  transform: translateY(2px);
  border-bottom-width: 3px;
  border-bottom-style: solid;
`;

export const Button = styled(BaseButton)`
  font-size: 24px;
  border: 0;
  box-shadow: none !important;
  padding: 15px 0;
  text-transform: uppercase;
`;
