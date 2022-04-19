import styled from "styled-components";

import { BaseButton } from "../../shared/components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const SwapInputsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FlipButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 1.9rem;
`;

export const FlipButton = styled(BaseButton).attrs<{ isFlipped: boolean }>(
  ({ isFlipped }) => ({
    primaryColor: "#061F3A",
    secondaryColor: "#061F3A",

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
  })
)<{ isFlipped: boolean }>`
  padding: 0.6rem;
  border-radius: 50%;
`;
