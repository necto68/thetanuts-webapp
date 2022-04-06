import styled from "styled-components";

import { sizes } from "../../shared/constants";

export const Container = styled.div`
  display: flex;
  justify-content: end;
  gap: 25px;

  @media (max-width: ${sizes.md}px) {
    flex: 1;
    justify-content: center;
  }
`;

export const SwitchToV0ButtonContainer = styled.div`
  display: flex;

  @media (max-width: ${sizes.md}px) {
    display: none;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: ${sizes.md}px) {
    flex: 1;
    justify-content: space-between;
  }
`;
