import styled from "styled-components";

import { BaseButton } from "../../shared/components";

interface IsSmallProps {
  isSmall: boolean;
}

export const Container = styled.div`
  position: relative;
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: #232738;
  overflow: hidden;
`;

export const ButtonContentContainer = styled.div<IsSmallProps>`
  display: flex;
  align-items: center;
  gap: ${({ isSmall }) => (isSmall ? "0.5rem" : "1rem")};
`;

export const OptionButton = styled(BaseButton)`
  border: none;
  border-radius: 0;
  padding: 1.2rem 1.8rem;

  &:hover {
    background-color: #2e5989;
  }
`;
