import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

export const PriceTitle = styled.span`
  font-family: Roboto;
  font-weight: 400;
  font-size: 14px;
  color: #e5e5e5;
`;

export const PriceImpactTitle = styled(PriceTitle)`
  color: #eb5853;
`;
