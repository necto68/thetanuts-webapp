import styled from "styled-components";

import { ComponentContainer } from "./LongOptionContent.styles";

export const Container = styled(ComponentContainer)`
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.span`
  font-family: "Roboto";
  font-weight: 600;
  font-size: 20px;
  color: #ffffff;
`;

export const SubTitle = styled.span`
  font-family: "Roboto";
  font-weight: 500;
  font-size: 12px;
  color: #a6b0c7;
`;

export const PriceTitle = styled(Title)`
  font-size: 16px;
`;

export const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const CurrentPriceContainer = styled(PriceContainer)`
  align-items: end;
`;
