import styled from "styled-components";

import { sizes } from "../../shared/constants";

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  flex-wrap: wrap;
  gap: 1.5rem;

  @media (max-width: ${sizes.md}px) {
    flex-direction: column-reverse;
    align-items: initial;
  }
`;

export const MetricsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
`;
