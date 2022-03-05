import styled, { css } from "styled-components";

import { BaseButton } from "../../shared/components";

interface IsSmallProps {
  isSmall: boolean;
}

export const Container = styled.div`
  position: relative;
`;

export const SelectButton = styled(BaseButton)<IsSmallProps>`
  ${({ isSmall }) =>
    isSmall &&
    css`
      padding: 4px 12px;
      font-size: 16px;
    `}
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border-width: 2px;
  border-style: solid;
  border-color: #ffffff;
  background-color: #061f3a;
`;

export const ButtonContentContainer = styled.div<IsSmallProps>`
  display: flex;
  align-items: center;
  gap: ${({ isSmall }) => (isSmall ? "5px" : "10px")};
`;

export const OptionButton = styled(SelectButton)`
  border: none;
  box-shadow: none !important;
  border-radius: 0;
  border-bottom: 1px solid #9c9c9c;
`;
