import styled from "styled-components";

import { screens } from "../../shared/constants";

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  flex-wrap: wrap;
  gap: 15px;

  ${screens.md} {
    flex-direction: column-reverse;
    align-items: initial;
  }
`;

export const MetricsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;
