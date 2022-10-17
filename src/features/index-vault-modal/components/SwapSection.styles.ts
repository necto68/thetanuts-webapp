import styled from "styled-components";

import { BaseButton } from "../../shared/components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SwapInputsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FlipButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 8px;
  overflow: visible;
`;

export const FlipButton = styled(BaseButton).attrs<{
  isFlipped: boolean;
}>(({ isFlipped }) => ({
  primaryColor: "#323844",
  secondaryColor: "#323844",

  initial: false,

  animate: {
    rotate: isFlipped ? "-180deg" : 0,
    transition: { duration: 0.6 },
  },

  whileHover: {
    scale: 1.02,
  },

  whileTap: {
    scale: 0.97,
    opacity: 0.8,
  },
}))<{ isFlipped: boolean }>`
  padding: 6px;
  border-radius: 50%;
  z-index: 1;
  border: 1px solid white;
`;
