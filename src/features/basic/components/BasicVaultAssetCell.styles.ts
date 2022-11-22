import styled from "styled-components";

import { IconContainer } from "../../shared/components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const IconsContainer = styled.div<{ isPair: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  width: 36px;
  min-width: 36px;

  ${IconContainer} {
    :nth-child(1) {
      transform: ${({ isPair }) => (isPair ? "translateX(6px)" : 0)};
    }
    :nth-child(2) {
      transform: translateX(-6px);
    }
  }
`;

export const TitlesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Title = styled.span`
  font-family: Roboto;
  font-weight: 500;
  font-size: 12px;
  color: #ffffff;
`;
