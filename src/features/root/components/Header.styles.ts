import styled from "styled-components";

import { sizes } from "../../shared/constants";

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-height: 75px;
  padding: 13px 25px;
  gap: 25px;

  @media (max-width: ${sizes.md}px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
`;
