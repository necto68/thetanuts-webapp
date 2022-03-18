import styled from "styled-components";

import { sizes } from "../../shared/constants";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  background-color: rgba(1, 12, 26, 0.7);
  border-radius: 10px;

  padding: 40px;

  @media (max-width: ${sizes.md}px) {
    padding: 20px;
  }
`;

export const Title = styled.span`
  font-family: Roboto;
  font-weight: 700;
  font-size: 32px;
  color: #e5e5e5;
`;

export const Description = styled.p`
  font-family: Roboto;
  font-weight: 400;
  font-size: 18px;
  color: #e5e5e5;
  margin: 0;
`;
