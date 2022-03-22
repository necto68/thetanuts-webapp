import styled from "styled-components";

import { sizes } from "../../shared/constants";

export const Container = styled.div`
  display: flex;
  justify-content: end;
  gap: 25px;

  @media (max-width: ${sizes.md}px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const LogoContainer = styled.div`
  display: none;

  @media (max-width: ${sizes.md}px) {
    display: flex;
    justify-content: space-between;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;
