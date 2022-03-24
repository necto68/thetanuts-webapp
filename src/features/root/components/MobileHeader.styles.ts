import styled from "styled-components";

import { sizes } from "../../shared/constants";

export const Container = styled.div`
  display: none;

  @media (max-width: ${sizes.md}px) {
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    background-color: rgba(0, 0, 0, 0.8);
  }
`;
