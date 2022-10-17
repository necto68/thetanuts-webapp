import styled from "styled-components";

import { screens } from "../../shared/constants";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  padding: 0 24px 24px;

  ${screens.md} {
    padding: 0 16px 16px;
  }
`;
