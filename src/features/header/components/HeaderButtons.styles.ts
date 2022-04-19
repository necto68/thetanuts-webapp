import styled from "styled-components";

import { sizes } from "../../shared/constants";

export const Container = styled.div`
  display: flex;
  justify-content: end;
  gap: 1.5rem;

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
  gap: 1.5rem;

  @media (max-width: ${sizes.md}px) {
    flex: 1;
    justify-content: space-between;
  }
`;
