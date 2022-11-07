import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const TooltipContainer = styled.div`
  background-color: black;
`;

export const Title = styled.span`
  font-family: Roboto;
  font-weight: 700;
  font-size: 12px;
  color: #ffffff;
`;

export const SubTitle = styled(Title)`
  color: #000000;
`;
