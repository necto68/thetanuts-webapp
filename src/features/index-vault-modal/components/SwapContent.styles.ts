import styled from "styled-components";

import { screens } from "../../shared/constants";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  padding: 0 25px 15px;

  ${screens.md} {
    padding: 0 15px 15px;
  }
`;
