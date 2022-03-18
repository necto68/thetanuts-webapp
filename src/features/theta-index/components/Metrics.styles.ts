import styled from "styled-components";

import { sizes } from "../../shared/constants";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;

  gap: 20px;

  @media (max-width: ${sizes.md}px) {
    gap: 10px;
  }
`;
