import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding: 185px 0;
`;

export const SwapTitle = styled.span`
  font-family: Barlow;
  font-weight: 700;
  font-size: 70px;
  color: #81e429;
  text-align: center;
`;

export const RatioTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

export const RatioTitle = styled(SwapTitle)`
  font-size: 30px;
  color: #061f3a;
`;

export const ToTitle = styled(RatioTitle)`
  font-weight: 300;
`;
