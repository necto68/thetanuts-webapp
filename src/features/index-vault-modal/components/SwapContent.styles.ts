import styled from "styled-components";

import { sizes } from "../../shared/constants";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  padding: 0 35px 25px;

  @media (max-width: ${sizes.md}px) {
    padding: 0 15px 15px;
  }
`;
