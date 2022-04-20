import styled from "styled-components";

import { screens } from "../../shared/constants";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  padding: 0 2.5rem 1.5rem;

  ${screens.md} {
    padding: 0 1.5rem 1.5rem;
  }
`;
