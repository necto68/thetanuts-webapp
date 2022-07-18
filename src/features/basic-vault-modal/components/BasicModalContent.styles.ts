import styled from "styled-components";

import { screens } from "../../shared/constants";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  padding: 15px 25px;

  ${screens.md} {
    padding: 15px 15px;
  }
`;

export const MainButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
