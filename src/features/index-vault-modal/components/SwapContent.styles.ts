import styled from "styled-components";

import { sizes } from "../../shared/constants";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  padding: 0 2.5rem 1.5rem;

  @media (max-width: ${sizes.md}px) {
    padding: 0 1.5rem 1.5rem;
  }
`;
