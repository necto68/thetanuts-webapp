import styled from "styled-components";
import { motion } from "framer-motion";

import { BaseButton } from "../../shared/components";
import { screens } from "../../shared/constants";

interface IsActiveProps {
  isActive: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Button = styled(BaseButton)`
  font-size: 2rem;
  border: 0;
  text-transform: uppercase;

  padding: 2rem 0;

  ${screens.md} {
    padding: 1rem 0;
  }
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
  height: 5px;
  border-radius: 2px;
  background-color: #1fffab;
  transform: translateY(3px);
`;
