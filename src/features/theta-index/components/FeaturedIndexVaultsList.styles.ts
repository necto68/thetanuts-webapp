import styled from "styled-components";

import { screens } from "../../shared/constants";

export const Container = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;

  ${screens.md} {
    justify-content: center;
  }
`;
