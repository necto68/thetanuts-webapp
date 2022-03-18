import styled from "styled-components";

import { sizes } from "../../shared/constants";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: min(640px, 85vh);
`;

export const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

export const SwapTitle = styled.span`
  font-family: Barlow;
  font-weight: 700;
  font-size: 70px;
  color: #81e429;
  text-align: center;

  @media (max-width: ${sizes.md}px) {
    font-size: 60px;
  }
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
