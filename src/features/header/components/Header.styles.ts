import styled from "styled-components";

import { screens } from "../../shared/constants";

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 15px;
  padding: 24px 16px 0 16px;

  ${screens.xl} {
    padding: 0 16px;
  }
  ${screens.md} {
    flex-direction: column-reverse;
    align-items: initial;
    padding: 0 4px;
  }
`;

export const MetricsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  ${screens.md} {
    flex-direction: column;
    gap: 4px;
  }
`;
