import styled from "styled-components";

import { sizes } from "../../shared/constants";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.span`
  font-family: Barlow;
  font-weight: 500;
  font-size: 20px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 30px;

  @media (max-width: ${sizes.md}px) {
    gap: 10px;
  }
`;
