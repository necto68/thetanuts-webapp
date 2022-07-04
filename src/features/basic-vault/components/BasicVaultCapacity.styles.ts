import styled from "styled-components";
import { motion } from "framer-motion";

import type { BasicVault } from "../types";
import { VaultType } from "../types";

interface ProgressBarProps extends Pick<BasicVault, "type"> {
  value: number;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ProgressBarContainer = styled.div`
  display: flex;
  height: 4px;
  background-color: #ffffff;
`;

export const ProgressBar = styled(motion.div).attrs<ProgressBarProps>(
  ({ value }) => ({
    initial: {
      width: "0%",
    },

    animate: {
      width: `${value}%`,
    },
  })
)<ProgressBarProps>`
  display: flex;
  background-color: ${({ type }) =>
    type === VaultType.CALL ? "#02d1ff" : "#fe9902"};
`;

export const Title = styled.span`
  font-family: Roboto;
  font-weight: 700;
  font-size: 12px;
  color: #ffffff;
`;
