import styled from "styled-components";
import { motion } from "framer-motion";

import { ProgressBarColor } from "../types";

interface ProgressBarProps {
  color: ProgressBarColor;
  value: number;
}

const progressBarColors = {
  [ProgressBarColor.blue]: "#02d1ff",
  [ProgressBarColor.orange]: "#fe9902",
  [ProgressBarColor.red]: "#eb5353",
};

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
  background-color: ${({ color }) => progressBarColors[color]};
`;

export const Title = styled.span`
  font-family: Roboto;
  font-weight: 700;
  font-size: 12px;
  color: #ffffff;
`;

export const SubTitle = styled(Title)`
  color: #000000;
`;
