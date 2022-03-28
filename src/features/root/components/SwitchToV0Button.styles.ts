import styled from "styled-components";
import { motion } from "framer-motion";

import { Link } from "../../shared/components";

export const BaseSwitchToV0Link = styled(Link)`
  display: flex;
  text-decoration: none;
`;

export const BaseSwitchToV0Button = styled(motion.button).attrs<{
  secondaryColor: string;
}>(() => ({
  whileHover: {
    scale: 1.02,
    boxShadow: "0 0 10px #ffffff",
  },

  whileTap: {
    scale: 0.97,
    boxShadow: "0 0 0px #ffffff",
    opacity: 0.8,
  },
}))<{
  secondaryColor: string;
}>`
  border-radius: 10px;
  border: 2px solid transparent;

  background: ${({ secondaryColor }) =>
      `linear-gradient(${secondaryColor}, ${secondaryColor}) padding-box`},
    linear-gradient(
        90deg,
        #04feb1 -22.19%,
        #d9ef46 19.09%,
        #ff9635 58.71%,
        #a2f9e9 95.86%,
        #04feb1 136.29%
      )
      border-box;

  padding: 5px 24px;
  cursor: pointer;
`;

export const ButtonText = styled.span`
  font-family: Barlow;
  font-weight: 400;
  font-size: 18px;

  background: linear-gradient(
    90deg,
    #04feb1 -22.19%,
    #d9ef46 19.09%,
    #ff9635 58.71%,
    #a2f9e9 95.86%,
    #04feb1 136.29%
  );

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
`;
