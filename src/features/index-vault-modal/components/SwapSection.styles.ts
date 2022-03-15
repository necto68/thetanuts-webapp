import styled from "styled-components";

import { BaseButton } from "../../shared/components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const SwapInputsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FlipButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 25px;
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
  })
)<{ isFlipped: boolean }>`
  padding: 8px;
  border-radius: 50%;
`;
