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
  gap: ${({ isSmall }) => (isSmall ? "5px" : "10px")};
`;

export const ButtonTitle = styled.span``;

export const ButtonIcon = styled.div``;

export const OptionButton = styled(BaseButton)`
  border: none;
  border-radius: 0;
  padding: 12px 18px;

  &:hover {
    background-color: #2e5989;
  }
`;
