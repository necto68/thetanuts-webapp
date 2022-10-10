import styled from "styled-components";
import { motion } from "framer-motion";

import { BaseButton } from "../../shared/components";
import { screens } from "../../shared/constants";
import type { AppTheme, Theme } from "../../app/constants/appTheme";

interface IsActiveProps {
  isActive: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Button = styled(BaseButton)`
  font-size: 20px;
  border: 0;

  padding: 20px 0;

  ${screens.md} {
    padding: 10px 0;
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
  background-color: ${({ theme }: Theme<AppTheme>) => theme.brandColor};
`;
