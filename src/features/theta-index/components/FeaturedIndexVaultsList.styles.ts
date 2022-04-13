import styled from "styled-components";

import { sizes } from "../../shared/constants";

export const Container = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  @media (max-width: ${sizes.md}px) {
    justify-content: center;
  }
`;
