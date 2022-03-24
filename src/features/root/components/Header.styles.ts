import styled from "styled-components";

import { sizes } from "../../shared/constants";

export const Container = styled.div`
  display: flex;
  justify-content: end;

  @media (max-width: ${sizes.md}px) {
    justify-content: center;
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
