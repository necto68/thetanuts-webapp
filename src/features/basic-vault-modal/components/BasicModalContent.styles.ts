import styled from "styled-components";

import { screens } from "../../shared/constants";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  padding: 24px;

  ${screens.md} {
    padding: 16px;
  }
`;

export const MainButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
