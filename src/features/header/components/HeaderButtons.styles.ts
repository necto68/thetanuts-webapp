import styled from "styled-components";

import { screens } from "../../shared/constants";

export const Container = styled.div`
  display: flex;
  justify-content: end;
  gap: 1.5rem;

  ${screens.md} {
    flex: 1;
    justify-content: center;
  }
`;

export const SwitchToV0ButtonContainer = styled.div`
  display: flex;

  ${screens.md} {
    display: none;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 1.5rem;

  ${screens.md} {
    flex: 1;
    justify-content: space-between;
  }
`;
