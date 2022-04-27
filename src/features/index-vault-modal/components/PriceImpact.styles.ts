import styled from "styled-components";
import { motion } from "framer-motion";

export const PriceImpactValue = styled(motion.span).attrs<{ isError: boolean }>(
  ({ isError }) => ({
    initial: false,

    animate: {
      color: isError ? "#eb5853" : "#e5e5e5",
    },
  })
)<{ isError: boolean }>`
  font-family: Roboto;
  font-weight: 600;
  font-size: 12px;
`;
