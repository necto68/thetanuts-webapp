import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Title = styled.span`
  font-family: Roboto;
  font-weight: 600;
  font-size: 18px;
  color: #061f3a;
`;

export const ContentContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const YieldContainer = styled.div`
  display: flex;
  gap: 4px;
`;

export const YieldValue = styled.span`
  font-family: Roboto;
  font-weight: 600;
  font-size: 14px;
  color: #000000;
`;

export const YieldTitle = styled(YieldValue)`
  font-weight: 400;
`;
